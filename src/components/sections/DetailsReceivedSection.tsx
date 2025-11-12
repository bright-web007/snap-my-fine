"use client";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/component/ui/button/index";

interface DetailsReceivedProps {
    onClose: () => void;
    onBackToHome: () => void;
}

export default function DetailsReceived({ onClose, onBackToHome }: DetailsReceivedProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-[400px] mx-[16px] bg-white rounded-[16px] p-[24px]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-[16px] right-[16px] p-[8px] hover:bg-gray-100 rounded-full transition-colors font-sora font-medium"
                >
                    <X className="w-[20px] h-[20px] text-[#4A4C4F]" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center gap-[24px] pt-[24px]">
                    {/* Success Icon */}
                    <div className="w-[64px] h-[64px] rounded-full bg-[#D2F9E0] flex justify-center items-center">
                        <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                    </div>

                    {/* Title and Description */}
                    <div className="flex flex-col gap-[8px] text-center">
                        <h1 className="text-[20px] font-sora font-semibold text-[#19191A] leading-[28px]">
                            We've got your details
                        </h1>
                        <p className="text-[14px] text-[#4A4C4F] font-sora font-regular leading-[20px] max-w-[280px]">
                            We'll let you know as soon as your fine is ready for payment. Keep an eye on your inbox, we'll send you a link to complete it once it's active
                        </p>
                    </div>

                    {/* Back to Home Button */}
                    <Button
                        onClick={onBackToHome}
                        className="p-[16px] text-[14px] text-white bg-[#0464DD] active:bg-[#045BC8] font-sora font-medium w-full h-[48px] rounded-[8px] flex items-center justify-center hover:bg-[#0e4cc7]"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}