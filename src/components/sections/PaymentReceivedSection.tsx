"use client";
import { useState, useEffect } from "react";
import ProcessingSection from "./ProcessingSection";

interface FormData {
    council: string;
    pcnNumber: string;
    vehicleNumber: string;
    fineAmount: string;
    email: string;
}

interface PaymentReceivedSectionProps {
    formData: FormData;
}

export default function PaymentReceivedSection({
    formData
}: PaymentReceivedSectionProps) {
    console.log('formData.fineAmount:', formData.fineAmount);
    console.log('Calculated display amount:', Number(formData.fineAmount) + 3);
    
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Check if we have a valid fine amount (not just "3.00" default)
        const hasValidAmount = formData.fineAmount && Number(formData.fineAmount) > 3;
        
        if (hasValidAmount) {
            // If we have a valid amount, show loading for 2 seconds then show the payment details
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            
            return () => clearTimeout(timer);
        } else {
            // If no valid amount yet, keep loading
            const checkInterval = setInterval(() => {
                const currentAmount = formData.fineAmount && Number(formData.fineAmount) > 3;
                if (currentAmount) {
                    setIsLoading(false);
                    clearInterval(checkInterval);
                }
            }, 500);
            
            return () => clearInterval(checkInterval);
        }
    }, [formData.fineAmount]);
    
    if (isLoading) {
        return (
            <ProcessingSection />
        );
    }
    
    return (
        <div className="flex flex-col gap-[24px] items-center justify-center min-h-screen bg-white text-center px-[15px]">
            {/* Animated spinner */}
            <div className="relative w-[80px] h-[80px] animate-spin">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            "conic-gradient(from 0deg, #1a73e8, #4dabf7, #cfe2ff, #ffffff, #ffffff)",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 12px), black 0)",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 12px), black 0)",
                    }}
                ></div>
            </div>

            <div className="flex flex-col gap-[16px]">
                {/* Heading */}
                <h1 className="text-[20px] font-sora font-semibold text-[#19191A] leading-[28px] ">
                    Payment Received
                </h1>

                {/* Subtext */}
                <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#19191A] font-regular font-sora leading-[18px] tracking-[0.5%]">
                        Your payment of <span className="font-semibold">£{formData.fineAmount ? Number(formData.fineAmount).toFixed(2) : '3.00'}</span> has been received successfully. We&apos;re now processing your payment with the council.
                    </p>
                    <p className="text-[14px] text-[#4A4C4F] font-sora font-regular leading-[20px] tracking-[0.25%]">
                        This may take a few moments. Please keep this page open.
                    </p>
                </div>
            </div>
        </div>
    );
}