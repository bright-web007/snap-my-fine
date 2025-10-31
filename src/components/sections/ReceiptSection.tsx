"use client";
import { Button } from "@/component/ui/button/index";
import { CheckCircle, X } from "lucide-react";

interface ReceiptSectionProps {
    onClose: () => void;
    onOpenGmail: () => void;
}

export default function ReceiptSection({
    onClose,
    onOpenGmail
}: ReceiptSectionProps) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Centered content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md flex flex-col items-center gap-[24px] bg-[#F1F7FE] rounded-[16px] py-[20px] px-[16px] relative shadow-lg">
                    {/* Cancel icon at top right */}
                    <button
                        onClick={onClose}
                        className="absolute top-[16px] right-[16px] p-[8px] hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X className="w-[20px] h-[20px] text-[#666]" />
                    </button>

                    {/* Success icon and messages */}
                    <div className="flex flex-col items-center gap-[16px]">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#D2F9E0] flex justify-center items-center">
                            <CheckCircle className="w-8 h-8 text-[#16A34A]" />
                        </div>

                        <div className="text-center flex flex-col gap-[8px]">
                            <p className="text-[#000000] text-[20px] font-inter font-semibold leading-[28px] tracking-[0.15%] mb-2">
                                Receipt Sent to your Mail
                            </p>
                            <p className="text-[#19191A] text-[14px] font-inter font-regular leading-[24px] tracking-[0.25%]">
                                Please Check your email for the receipt
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col p-[24px] gap-[16px] w-full font-medium font-inter">
                        <Button
                            onClick={onOpenGmail}
                            className="p-[12px] text-[14px] text-[#FFFFFF] bg-[#105AE2] w-full h-[48px] rounded-[8px] hover:bg-[#0e4cc7] transition-colors"
                        >
                            Open Gmail app
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}