import { useState, useCallback } from "react";
import * as Sentry from "@sentry/nextjs";
import { N8nResponseSchema, N8nResponse, TicketResponse } from "@/lib/schema";
import { useTicketStore } from "@/lib/stores/ticketStore";

interface UseTicketProcessorReturn {
  fetchTickets: (email: string) => Promise<TicketResponse[]>;
  fetchTicket: (email: string, pcnNumber: string) => Promise<TicketResponse>;
  deleteTicket: (email: string, pcnNumber: string) => Promise<TicketResponse>;
  confirmTicket: (pcnNumber: string, council: string, vehicleNumber: string) => Promise<any>;
  payCouncilTicket: (pcnNumber: string, council: string, amount: string, vehicleNumber: string) => Promise<any>;
  updateTicketPayment: (pcnNumber: string, paymentId: string) => Promise<any>;
  saveTicket: (email: string, ticket: N8nResponse["output"]) => Promise<void>;
  callbackPendingTicket: (email: string, phone: string, pcnNumber: string) => Promise<void>;
  processTicket: (imageData: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useTicketProcessor = (): UseTicketProcessorReturn => {
  const { setTicketData, setSavedTickets } = useTicketStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processTicket = useCallback(async (imageData: string) => {
    if (!imageData) {
      setError("Image data is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract base64 data and MIME type from data URL
      const [header, base64Data] = imageData.split(",");
      const mimeMatch = header.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

      // Send in the format expected by our API route
      const payload = {
        type: "extraction",
        mime_type: mimeType,
        data: base64Data,
      };

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 30 second timeout

      // Send the request to our API route instead of directly to n8n
      const response = await fetch("/api/ticket/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to process ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();

      // Check if the result contains an error message (even with 200 status)
      if (result.error) {
        console.log('Processing error detected:', result.error);
        
        // Capture processing errors returned by the service (even with 200 status)
        Sentry.captureException(new Error(result.error), {
          tags: {
            category: 'processing_service_error',
            operation: 'image_processing_response',
            error_type: result.error.includes("Unsupported council:") ? 'unsupported_council' : 'processing_failure'
          },
          extra: {
            serviceError: result.error,
            imageDataLength: imageData?.length || 0,
            responseStatus: 200,
            fullResponse: result
          }
        });
        
        // Check for specific error messages that need special handling
        if (result.error.includes("Unsupported council:")) {
          console.log('Detected unsupported council, throwing custom error');
          throw new Error("Council not supported yet!");
        }
        throw new Error(result.error);
      }

      // Validate the response using the schema
      let validatedData;
      const validationResult = N8nResponseSchema.safeParse(result);

      if (validationResult.success) {
        validatedData = { ...result["output"] };
        
        // Check if the extracted data contains meaningful values
        const hasValidData = validatedData.pcn_number && 
                           validatedData.pcn_number.trim() !== '' &&
                           validatedData.plate_number && 
                           validatedData.plate_number.trim() !== '' &&
                           validatedData.council_name && 
                           validatedData.council_name.trim() !== '' &&
                           validatedData.amount && 
                           validatedData.amount > 0;

        if (!hasValidData) {
          // Log invalid extraction data to Sentry
          Sentry.captureException(new Error("Invalid ticket data extracted - empty or missing critical fields"), {
            tags: {
              category: 'processing_service_error',
              operation: 'data_validation_failure',
              error_type: 'invalid_extraction_data'
            },
            extra: {
              extractedData: validatedData,
              imageDataLength: imageData?.length || 0,
              responseStatus: 200,
              fullResponse: result,
              validationDetails: {
                hasPcnNumber: !!(validatedData.pcn_number && validatedData.pcn_number.trim()),
                hasPlateNumber: !!(validatedData.plate_number && validatedData.plate_number.trim()),
                hasCouncilName: !!(validatedData.council_name && validatedData.council_name.trim()),
                hasValidAmount: !!(validatedData.amount && validatedData.amount > 0)
              }
            }
          });
          
          throw new Error("We couldn't read your ticket. Please try again with better lighting and make sure all text is visible.");
        }
      } else {
        // If validation fails, throw an error
        throw new Error("Invalid response format from ticket processing service");
      }
      // Store the validated data in the zustand store
      setTicketData(validatedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      
      // Capture ticket processing errors with Sentry
      Sentry.captureException(err, {
        tags: {
          category: 'ticket_processing',
          operation: 'process_image'
        },
        extra: {
          imageDataLength: imageData?.length || 0,
          errorMessage
        }
      });
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setTicketData]);

  const saveTicket = useCallback(async (email: string, ticket: N8nResponse["output"]) => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (ticket == null) {
      setError("Ticket is required");
      return;
    }
    try {
      const payload = {
        type: "paylater",
        data: ticket,
      };
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch("/api/ticket/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to save ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      console.log("Ticket saved successfully");
    } catch (err) {
      console.error("Error saving ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const callbackPendingTicket = useCallback(async (email: string, phone: string, pcnNumber: string ) => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!pcnNumber) {
      setError("PCN number is required");
      return;
    }
    try {
      const payload = {
        type: "user",
        data: {
          email,
          phone,
          pcn_number: pcnNumber
        },
      };
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const response = await fetch("/api/ticket/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to callback pending ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      console.log("Ticket callback successfully");
    } catch (err) {
      console.error("Error saving ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteTicket = useCallback(async (email: string, pcnNumber: string): Promise<TicketResponse> => {
    if (!email) {
      setError("Email is required");
    }
    if (!pcnNumber) {
      setError("PCN number is required");
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        type: "single",
        data: {
          email,
          pcn_number: pcnNumber,
        },
      };
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`/api/ticket/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();
      return result.data || null;

      //remove the deleted ticket from the ticket list.
    } catch (err) {
      console.error("Error deleting ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      
      // Capture ticket deletion errors with Sentry
      Sentry.captureException(err, {
        tags: {
          category: 'ticket_management',
          operation: 'delete_ticket'
        },
        extra: {
          email: email.substring(0, 3) + '***', // Partial email for privacy
          pcnNumber,
          errorMessage
        }
      });
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmTicket = useCallback(async (pcnNumber: string, council: string, vehicleNumber: string): Promise<TicketResponse> => {
    if (!council) {
      setError("Council is required");
    }
    if (!pcnNumber) {
      setError("PCN number is required");
    }
    if (!vehicleNumber) {
      setError("Vehicle number is required");
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        pcnNumber,
        councilName: council,
        vehicleNumber,
      };
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(`/api/ticket/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();
      return result || null;

      //remove the deleted ticket from the ticket list.
    } catch (err) {
      console.error("Error confirming ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      
      // Capture ticket confirmation errors with Sentry
      Sentry.captureException(err, {
        tags: {
          category: 'council_integration',
          operation: 'confirm_ticket',
          council: council || 'unknown'
        },
        extra: {
          pcnNumber,
          council,
          errorMessage
        }
      });
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const payCouncilTicket = useCallback(async (pcnNumber: string, council: string, amount: string, vehicleNumber: string): Promise<TicketResponse> => {
    if (!council) {
      setError("Council is required");
    }
    if (!pcnNumber) {
      setError("PCN number is required");
    }
    if (!amount) {
      setError("Amount is required");
    }
    if (!vehicleNumber) {
      setError("Vehicle number is required");
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        pcnNumber,
        councilName: council,
        amount: parseInt(amount),
        vehicleNumber,
      };
      // Create AbortController for timeout - increased for slow council APIs
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 60 seconds timeout

      const response = await fetch(`/api/ticket/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();
      
      // Check if the response indicates success
      if (result && result.success === false) {
        throw new Error(result.message || "Council payment failed");
      }
      
      // If success field is missing but response is ok, assume success for backwards compatibility
      if (result && result.success !== false) {
        return result;
      }
      
      return result || null;

      //remove the deleted ticket from the ticket list.
    } catch (err) {
      console.error("Error paying council ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      
      // Capture council payment errors with Sentry
      Sentry.captureException(err, {
        tags: {
          category: 'council_integration',
          operation: 'pay_ticket',
          council: council || 'unknown'
        },
        extra: {
          pcnNumber,
          council,
          amount,
          errorMessage
        }
      });
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTicket = useCallback(async (email: string, pcnNumber: string): Promise<TicketResponse> => {
    if (!email) {
      setError("Email is required");
      throw new Error("Email is required");
    }
    if (!pcnNumber) {
      setError("Ticket ID is required");
      throw new Error("Ticket ID is required");
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        type: "single",
        data: { email, pcn_number: pcnNumber },
      };
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`/api/ticket/fetch/${pcnNumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch ticket: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();
      return result.data || null;
    } catch (err) {
      console.error("Error fetching ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTickets = useCallback(async (email: string): Promise<TicketResponse[]> => {
    if (!email) {
      setError("Email is required");
      throw new Error("Email is required");
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        type: "all",
        data: { email },
      };
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`/api/ticket/fetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch tickets: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();
      const fetchedTickets = result.data || [];

      // Convert fetched tickets to SavedFine format
      const savedFines = (fetchedTickets as TicketResponse[]).map((ticket) => ({
        id: (ticket as any).id || Date.now().toString() + Math.random().toString(36).slice(2, 11), // fall back id generation
        council: (ticket as any).council_name || ticket.council || '',
        pcnNumber: ticket.pcn_number || (ticket as any).pcnNumber || '',
        vehicleNumber: ticket.plate_number || (ticket as any).vehicleNumber || '',
        fineAmount: ticket.amount != null ? ticket.amount.toString() : (ticket as any).fineAmount || '',
        email: ticket.email || email,
        dateSaved: (ticket as any).dateSaved || new Date().toLocaleDateString()
      }));

      // Set all saved tickets at once to prevent duplicates
      setSavedTickets(savedFines);

      return fetchedTickets;
    } catch (err) {
      console.error("Error fetching tickets:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setSavedTickets]);

  const updateTicketPayment = useCallback(async (pcnNumber: string, paymentId: string): Promise<any> => {
    if (!pcnNumber) {
      setError("PCN number is required");
      throw new Error("PCN number is required");
    }
    if (!paymentId) {
      setError("Payment ID is required");
      throw new Error("Payment ID is required");
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        pcnNumber,
        paymentId,
      };

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`/api/ticket/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update ticket payment: ${response.status} ${response.statusText}. ${errorText}`,
        );
      }

      const result = await response.json();
      console.log("Ticket payment updated successfully");
      return result;
    } catch (err) {
      console.error("Error updating ticket payment:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    processTicket,
    confirmTicket,
    payCouncilTicket,
    updateTicketPayment,
    callbackPendingTicket,
    fetchTickets,
    fetchTicket,
    deleteTicket,
    saveTicket,
    loading,
    error,
  };
};
