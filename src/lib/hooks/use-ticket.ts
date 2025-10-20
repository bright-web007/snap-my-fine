import { useState, useCallback } from "react";
import { N8nResponseSchema, N8nResponse, TicketResponse } from "@/lib/schema";
import { useTicketStore } from "@/lib/stores/ticketStore";

interface UseTicketProcessorReturn {
  fetchTickets: (email: string) => Promise<TicketResponse[]>;
  fetchTicket: (email: string, pcnNumber: string) => Promise<TicketResponse>;
  deleteTicket: (email: string, pcnNumber: string) => Promise<TicketResponse>;
  saveTicket: (email: string, ticket: N8nResponse["output"]) => Promise<void>;
  processTicket: (imageData: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useTicketProcessor = (): UseTicketProcessorReturn => {
  const { setTicketData, addSavedTicket, setSavedTickets, removeSavedTicket } = useTicketStore();
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
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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

      // Validate the response using the schema
      let validatedData;
      const validationResult = N8nResponseSchema.safeParse(result);

      if (validationResult.success) {
        validatedData = { ...result["output"] };
      } else {
        console.error(
          "n8n response validation failed:",
          validationResult.error,
        );
        // If validation fails, create a default object
        validatedData = null;
      }
      // Store the validated data in the zustand store
      setTicketData(validatedData);
      console.log("Ticket processed successfully:", validatedData);
    } catch (err) {
      console.error("Error processing ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
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
      console.error("Error fetching ticket:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
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
      const savedFines = fetchedTickets.map((ticket: any) => ({
        id: ticket.id || Date.now().toString() + Math.random().toString(36).substr(2, 9), // Generate unique ID
        council: ticket.council_name || ticket.council || '',
        pcnNumber: ticket.pcn_number || ticket.pcnNumber || '',
        vehicleNumber: ticket.plate_number || ticket.vehicleNumber || '',
        fineAmount: ticket.amount ? ticket.amount.toString() : ticket.fineAmount || '',
        email: ticket.email || email,
        dateSaved: ticket.dateSaved || new Date().toLocaleDateString()
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


  return {
    processTicket,
    fetchTickets,
    fetchTicket,
    deleteTicket,
    saveTicket,
    loading,
    error,
  };
};
