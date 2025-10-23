"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PaymentStatusSection from "@/components/sections/PaymentStatusSection";
import ReceiptSection from "@/components/sections/ReceiptSection";
import { useTicketStore } from "@/lib/stores/ticketStore";
import { useTicketProcessor } from "@/lib/hooks/use-ticket";

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
    const { payCouncilTicket, loading } = useTicketProcessor();
    
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
    const [councilPaymentProcessed, setCouncilPaymentProcessed] = useState(false);

    // Extract payment data from URL parameters or stored ticket data and initiate council payment
    useEffect(() => {
        // Try to get data from URL parameters first (if GoCardless passes them back)
        const urlCouncil = searchParams.get('council');
        const urlPcnNumber = searchParams.get('pcn_number');
        const urlVehicleNumber = searchParams.get('vehicle_number');
        const urlFineAmount = searchParams.get('amount');
        
        // Use URL params if available, otherwise fall back to ticketData
        const council = urlCouncil || ticketData?.council_name || '';
        const pcnNumber = urlPcnNumber || ticketData?.pcn_number || '';
        const vehicleNumber = urlVehicleNumber || ticketData?.plate_number || '';
        const fineAmount = urlFineAmount || ticketData?.amount?.toString() || '';
        
        setFormData({
            council,
            pcnNumber,
            vehicleNumber,
            fineAmount,
            email: ''
        });

        // Automatically make council payment if we have the required data
        if (council && pcnNumber && fineAmount && !councilPaymentProcessed) {
            handleCouncilPayment(pcnNumber, council, fineAmount);
        }
    }, [searchParams, ticketData, councilPaymentProcessed, payCouncilTicket]);

    // Handle council payment
    const handleCouncilPayment = async (pcnNumber: string, council: string, amount: string) => {
        try {
            setCouncilPaymentProcessed(true);
            const result = await payCouncilTicket(pcnNumber, council, amount);
            
            // Check if payment was successful based on the response structure
            if (result && result.success === true) {
                // Payment successful, show receipt section after a brief delay
                setTimeout(() => {
                    setShowReceiptSection(true);
                }, 1000);
            } else {
                // Payment failed according to the response
                // Even if council payment fails, user has already paid via GoCardless
                // So we still proceed to show the email collection for receipt
                setTimeout(() => {
                    setShowReceiptSection(true);
                }, 1000);
            }
        } catch (error) {
            // If there's an API error, still show email collection for receipt
            // The user has already paid via GoCardless
            setTimeout(() => {
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

    // Show receipt section after council payment is processed
    if (showReceiptSection) {
        return (
            <div className="min-h-screen">
                <ReceiptSection
                    onClose={handleReceiptClose}
                    onOpenGmail={openGmailApp}
                />
            </div>
        );
    }

    // Show loading state while processing council payment
    if (loading || (councilPaymentProcessed && !showReceiptSection)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#105AE2] mx-auto mb-4"></div>
                    <p className="text-[#19191A] font-inter">Processing council payment...</p>
                </div>
            </div>
        );
    }

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

export default function PaymentVerificationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#105AE2] mx-auto mb-4"></div>
                <p className="text-[#19191A] font-inter">Processing your payment...</p>
            </div>
        </div>}>
            <PaymentVerificationContent />
        </Suspense>
    );
}