"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PaymentFailedSectionProps {
    onBack: () => void;
    onTryAgain: () => void;
    onReportIssue: () => void;
}

export default function PaymentFailedSection({
    onBack,
    onTryAgain,
    onReportIssue
}: PaymentFailedSectionProps) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full mt-[20px]">
                <button
                    className="flex items-center gap-[16px] text-gray-700 hover:text-black font-sora font-medium"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">Payment Status</span>
                    </p>
                </button>
            </div>

            {/* Centered content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md flex flex-col items-center gap-[8px] border-1 border-[#F1F7FE] bg-[#F1F7FE] rounded-[16px] px-[16px] py-[20px]">
                    {/* Success icon and messages */}
                    <div className="flex flex-col items-center gap-[8px]">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#F8D3D3] flex justify-center items-center">
                            <AlertCircle className="w-8 h-8 text-[#DC2626]" />
                        </div>

                        <div className="text-center">
                            <p className="text-[#000000] text-[20px] font-sora font-semibold leading-[28px] tracking-[0.15%] mb-2">
                                Payment Unsuccessful
                            </p>
                            <p className="text-[#19191A] text-[14px] font-sora font-regular leading-[20px] tracking-[0.25%]">
                                Oops... something went wrong while processing your payment.
                            </p>
                        </div>
                    </div>

                    {/* Email section */}
                    <div className="w-full flex flex-col gap-[8px]">

                        <div className="flex flex-col  gap-[16px] w-full font-medium font-sora">
                            <Button
                                onClick={onTryAgain}
                                className="text-[14px] w-full h-[48px] text-[#FFFFFF] bg-[#105AE2] active:bg-[#045BC8] hover:bg-[#0e4cc7] cursor-pointer"
                            >
                                <p>Try Again</p>
                            </Button>
                        </div>
                        <div className="flex flex-col gap-[12px]">
                            <p className="text-[#7E8081] text-[12px] font-sora font-regular leading-[16px] tracking-[0.25%] text-center">
                                if your bank already charged you, don&apos;t worry, we&apos;ll double check and update your receipt soon.
                            </p>
                            <Button
                                onClick={onReportIssue}
                                className="text-[14px] w-full h-[48px] text-[#FFFFFF] bg-[#105AE2] rounded-[8px] border-2 border-[#105AE2] hover:bg-[#F1F7FE] cursor-pointer"
                            >
                                <p>Report Issue</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}