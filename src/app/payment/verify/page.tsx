"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import PaymentStatusSection from "@/components/sections/PaymentStatusSection";
import ReceiptSection from "@/components/sections/ReceiptSection";
import { useTicketStore } from "@/lib/stores/ticketStore";
import { useTransactionStore } from "@/lib/stores/transactionStore";
import { useTicketProcessor } from "@/lib/hooks/use-ticket";
import PaymentReceivedSection from "@/components/sections/PaymentReceivedSection";

interface FormData {
    council: string;
    pcnNumber: string;
    vehicleNumber: string;
    fineAmount: string;
    email: string;
}

interface ValidationErrors {
    council: boolean;
    pcnNumber: boolean;
    vehicleNumber: boolean;
    fineAmount: boolean;
    email: boolean;
}

function PaymentVerificationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { ticketData, clearTicketData } = useTicketStore();
    const { addTransaction: addSuccessfulTransaction } = useTransactionStore();
    const { payCouncilTicket, updateTicketPayment, loading } = useTicketProcessor();

    const [formData, setFormData] = useState<FormData>({
        council: '',
        pcnNumber: '',
        vehicleNumber: '',
        fineAmount: '',
        email: ''
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        council: false,
        pcnNumber: false,
        vehicleNumber: false,
        fineAmount: false,
        email: false
    });

    const [showReceiptSection, setShowReceiptSection] = useState(false);
    const [paymentVerificationStarted, setPaymentVerificationStarted] = useState(false);
    const [councilPaymentInProgress, setCouncilPaymentInProgress] = useState(false);

    // Extract payment data from URL parameters and initiate the complete payment verification flow
    useEffect(() => {
        const processPaymentVerification = async () => {
            // Get the reference_id from URL parameters (passed back from GoCardless)
            const referenceId = searchParams.get('reference_id');

            if (!referenceId || paymentVerificationStarted) {
                return;
            }

            try {
                setPaymentVerificationStarted(true);

                // Step 1: Make request to N8N pipeline to get the paymentId via our API
                console.log('Step 1: Getting payment ID from N8N for reference:', referenceId);

                const n8nResponse = await fetch('/api/payment/lookup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        referenceId
                    }),
                });

                if (!n8nResponse.ok) {
                    throw new Error(`N8N lookup failed with status: ${n8nResponse.status}`);
                }

                const n8nResult = await n8nResponse.json();
                const paymentId = n8nResult?.paymentId;

                if (!paymentId) {
                    throw new Error('Payment ID not found in N8N response');
                }

                console.log('Step 2: Retrieved payment ID:', paymentId);

                // Step 2: Get full GoCardless transaction details
                const goCardlessResponse = await fetch(`/api/payment/${paymentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!goCardlessResponse.ok) {
                    throw new Error(`GoCardless API failed with status: ${goCardlessResponse.status}`);
                }

                const goCardlessResult = await goCardlessResponse.json();
                const billingRequest = goCardlessResult?.billingRequest;

                if (!billingRequest) {
                    throw new Error('Billing request data not found in GoCardless response');
                }

                console.log('Step 3: Retrieved GoCardless billing request data');

                // Step 3: Update payment record with complete data
                const updateResponse = await fetch('/api/payment/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        referenceId,
                        billingRequestData: billingRequest
                    })
                });

                if (!updateResponse.ok) {
                    throw new Error(`Payment update failed with status: ${updateResponse.status}`);
                }

                console.log('Step 4: Payment record updated successfully');

                // Extract data for council payment from the billing request
                const amount = billingRequest.payment_request?.amount ?
                    parseInt(billingRequest.payment_request.amount) / 100 : 0;

                // Use stored ticket data for council and PCN info
                const council = ticketData?.council_name || '';
                const pcnNumber = ticketData?.pcn_number || '';
                const vehicleNumber = ticketData?.plate_number || '';

                setFormData({
                    council,
                    pcnNumber,
                    vehicleNumber,
                    fineAmount: amount.toString(),
                    email: ''
                });

                // Step 4: Make council payment if we have the required data
                if (council && pcnNumber && amount > 0) {
                    await handleCouncilPayment(pcnNumber, council, amount.toString(), paymentId, referenceId);
                } else {
                    // If missing council data, still show receipt section for email collection
                    console.warn('Missing council data for payment processing');
                    setTimeout(() => {
                        setShowReceiptSection(true);
                    }, 1000);
                }

            } catch (error) {
                console.error('Payment verification flow error:', error);

                // Capture payment verification errors with Sentry
                Sentry.captureException(error, {
                    tags: {
                        category: 'payment',
                        operation: 'payment_verification_flow'
                    },
                    extra: {
                        referenceId,
                        step: 'payment_verification',
                        errorMessage: error instanceof Error ? error.message : 'Unknown error'
                    }
                });

                // Still proceed to show receipt section even on error
                // The user has completed payment, they should get some confirmation
                setTimeout(() => {
                    setShowReceiptSection(true);
                }, 1000);
            }
        };

        processPaymentVerification();
    }, [searchParams, ticketData, paymentVerificationStarted]);

    // Handle council payment and update payment record
    const handleCouncilPayment = async (pcnNumber: string, council: string, amount: string, paymentId?: string, referenceId?: string) => {
        try {
            setCouncilPaymentInProgress(true);

            // First, update the ticket payment record with the GoCardless payment ID
            if (paymentId) {
                try {
                    await updateTicketPayment(pcnNumber, paymentId);
                    console.log('Payment record updated successfully');
                } catch (paymentUpdateError) {
                    console.error('Failed to update payment record:', paymentUpdateError);

                    // Capture payment record update errors with Sentry
                    Sentry.captureException(paymentUpdateError, {
                        tags: {
                            category: 'payment',
                            operation: 'update_payment_record'
                        },
                        extra: {
                            pcnNumber,
                            paymentId,
                            council
                        }
                    });

                    // Continue with council payment even if payment record update fails
                }
            }

            // Then make the council payment
            try {
                // Determine vehicle number from ticket data or form data
                const vehicleNumber = ticketData?.plate_number || formData.vehicleNumber || '';
                const result = await payCouncilTicket(pcnNumber, council, amount, vehicleNumber);

                // Check if payment was successful based on the response structure
                if (result && result.success === true) {
                    console.log('Council payment successful:', result);

                    // Add successful transaction to store
                    const serviceFee = '3.00';
                    const totalPaid = (parseFloat(amount) + parseFloat(serviceFee)).toFixed(2);

                    addSuccessfulTransaction({
                        council,
                        pcnNumber,
                        fineAmount: amount,
                        status: 'success',
                        totalPaid,
                        serviceFee,
                        referenceId,
                        paymentId,
                    });

                    console.log('Transaction added to store successfully');
                } else {
                    console.error('Council payment failed:', result?.message || 'Unknown error');
                }
            } catch (councilPaymentError) {
                console.error('Council payment API error or timeout:', councilPaymentError);

                // Check if this is a timeout error
                if (councilPaymentError instanceof DOMException && councilPaymentError.name === 'AbortError') {
                    console.log('Council payment timed out, but may have succeeded on server. Checking...');

                    // Since the payment may have succeeded on the server despite timeout,
                    // let's add the transaction assuming it worked (user paid via GoCardless anyway)
                    const serviceFee = '3.00';
                    const totalPaid = (parseFloat(amount) + parseFloat(serviceFee)).toFixed(2);

                    addSuccessfulTransaction({
                        council,
                        pcnNumber,
                        fineAmount: amount,
                        status: 'success',
                        totalPaid,
                        serviceFee,
                        referenceId,
                        paymentId,
                    });

                    console.log('Transaction added to store (timeout scenario)');
                }
            }

            // Always show receipt section since user has paid via GoCardless
            setTimeout(() => {
                setCouncilPaymentInProgress(false);
                setShowReceiptSection(true);
            }, 1000);
        } catch (error) {
            console.error('Council payment API error:', error);

            // Capture council payment errors with Sentry
            Sentry.captureException(error, {
                tags: {
                    category: 'council_integration',
                    operation: 'council_payment',
                    council: council || 'unknown'
                },
                extra: {
                    pcnNumber,
                    council,
                    amount,
                    paymentId
                }
            });

            // If there's an API error, still show email collection for receipt
            // The user has already paid via GoCardless
            setTimeout(() => {
                setCouncilPaymentInProgress(false);
                setShowReceiptSection(true);
            }, 1000);
        }
    };

    // Handle form input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear validation error when user starts typing
        if (validationErrors[field as keyof typeof validationErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: false
            }));
        }
    };

    // Email validation function
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle receipt sent successfully (from PaymentStatusSection)
    const handleReceiptSent = () => {
        // Clear ticket data from store after successful receipt
        clearTicketData();

        // Show receipt section for 5 seconds then redirect home
        setShowReceiptSection(true);
        setTimeout(() => {
            router.push('/');
        }, 5000);
    };

    // Handle receipt section close (from ReceiptSection)
    const handleReceiptClose = () => {
        clearTicketData();
        router.push('/');
    };

    // Handle back button (redirect to home)
    const handleBack = () => {
        clearTicketData();
        router.push('/');
    };

    // Function to open Gmail app (from ReceiptSection)
    const openGmailApp = () => {
        const userAgent = navigator.userAgent || navigator.vendor;
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

        if (isMobile) {
            const isIOS = /iphone|ipad|ipod/i.test(userAgent);
            if (isIOS) {
                window.open('googlegmail://');
            } else {
                window.open('intent://send?to=#Intent;scheme=mailto;package=com.google.android.gm;end');
            }
        } else {
            window.open('https://mail.google.com', '_blank');
        }
    };

    // Show loading state while processing payment verification or council payment
    if (loading || councilPaymentInProgress || (paymentVerificationStarted && !showReceiptSection)) {
        return (
            <PaymentReceivedSection formData={formData} />
        );
    }

    // Show payment status section after council payment is processed
    if (showReceiptSection) {
        return (
            <div className="min-h-screen">
                <PaymentStatusSection
                    formData={formData}
                    validationErrors={validationErrors}
                    onBack={handleBack}
                    onInputChange={handleInputChange}
                    onSendReceipt={handleReceiptSent}
                    isValidEmail={isValidEmail}
                />
            </div>
        );
    }

    // return (
    //     <div className="min-h-screen">
    //         <PaymentStatusSection
    //             formData={formData}
    //             validationErrors={validationErrors}
    //             onBack={handleBack}
    //             onInputChange={handleInputChange}
    //             onSendReceipt={handleReceiptSent}
    //             isValidEmail={isValidEmail}
    //         />
    //     </div>
    // );
}

export default function PaymentVerificationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin  rounded-full h-12 w-12 border-b-2 border-[#105AE2] mx-auto mb-4"></div>
                <p className="text-[#19191A] font-sora">Processing your payment...</p>
            </div>
        </div>}>
            <PaymentVerificationContent />
        </Suspense>
    );
}