"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PartialPaymentStatusSectionProps {
    partialPaymentReceived: number;
    formData: {
        council: string;
        pcnNumber: string;
        vehicleNumber: string;
        fineAmount: string;
    };
    isLoadedFromSavedFine: boolean;
    onBack: () => void;
    onPayNow: () => void;
    onPayLater: () => void;
}

export default function PartialPaymentStatusSection({
    partialPaymentReceived,
    formData,
    isLoadedFromSavedFine,
    onBack,
    onPayNow,
    onPayLater
}: PartialPaymentStatusSectionProps) {
    const totalFineAmount = formData.fineAmount ? Number(formData.fineAmount) + 3 : 3;
    const remainingBalance = totalFineAmount - partialPaymentReceived;

    return (
        <div className="w-full flex flex-col gap-[32px]">
            <div className="w-full flex flex-col gap-[32px]">
                <button
                    className="flex items-center gap-[20px] text-gray-700 hover:text-black font-sora font-medium"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left w-[248px]">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">Payment Status</span>
                    </p>
                </button>

                <div className="w-full flex flex-col gap-[28px]">
                    <div className="w-full flex flex-row gap-[8px] border-1 border-[#B01C1C] text-[#B01C1C] rounded-[8px] px-[12px] py-[24px] items-center">
                        <AlertCircle className="w-[24px] h-[24px] text-[#B01C1C]" />
                        <p className="text-[16px] leading-[20px] font-sora font-medium tracking-[0.4%] mt-[8px] text-center">Partial Payment Received</p>
                    </div>

                    <div>
                        <p className="text-[16px] text-[#19191A] leading-[24px] font-sora font-medium tracking-[0.15%]">Payment Amount Mismatch</p>
                        <p className="text-[14px] text-[#4A4C4F] leading-[20px] font-sora font-regular tracking-[0.25%]">We receive your payment, but it doesn&apos;t match the fine amount</p>
                    </div>

                    <div className="flex flex-col gap-[16px] py-[24px] px-[16px] border-1 border-[#CACCCE] rounded-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="flex justify-between">
                                <span className="text-[16px] text-[#000000] leading-[24px] font-regular font-sora tracking-[0.5%] ">Payment Received</span>
                                <span className="text-[16px] text-[#000000] leading-[24px] font-semibold font-sora tracking-[0.5%] ">£{partialPaymentReceived.toFixed(2)}</span>
                            </p>

                            <div className="flex flex-col gap-[4px]">
                                <p className="flex justify-between">
                                    <span className="text-[16px] text-[#000000] leading-[24px] font-regular font-sora tracking-[0.5%] ">Fine Amount</span>
                                    <span className="text-[16px] text-[#000000] leading-[24px] font-semibold font-sora tracking-[0.5%] ">£{totalFineAmount.toFixed(2)}</span>
                                </p>
                            </div>
                        </div>

                        <hr className="border-1 border-[#D7D7D7]" />

                        <p className="flex justify-between">
                            <span className="text-[16px] text-[#B01C1C] leading-[24px] font-semibold font-sora tracking-[0.5%] ">Remaining Balance</span>
                            <span className="text-[16px] text-[#B01C1C] leading-[24px] font-semibold font-sora tracking-[0.5%] ">£{remainingBalance.toFixed(2)}</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-[12px] border-1 border-[#CFDFFC] bg-[Color Pallete/Primary/Primary99] rounded-[8px] p-[16px]">
                        <p className="text-[#000000] text-[12px] leading-[100%] font-sora font-regular">
                            Your payment of <span>£{partialPaymentReceived.toFixed(2)}</span> is less than the fine of <span>£{totalFineAmount.toFixed(2)}</span>. Please pay the remaining <span>£{remainingBalance.toFixed(2)}</span> to complete the process.
                        </p>
                        <p className="text-[#4A4C4F] text-[12px] leading-[100%] font-sora font-regular">Note: Payments can&apos;t be refunded once submitted</p>
                    </div>

                    <div className="flex flex-col gap-[4px] py-[24px] px-[16px] border-1 border-[#CFDFFC] bg-[#F1F7FE] rounded-[16px]">
                        <p className="flex justify-between">
                            <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-sora tracking-[0.4%] ">Council:</span>
                            <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-sora tracking-[0.4%] ">{formData.council}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-sora tracking-[0.4%] ">PCN Number:</span>
                            <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-sora tracking-[0.4%] ">{formData.pcnNumber}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-sora tracking-[0.4%] ">VRM:</span>
                            <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-sora tracking-[0.4%] ">{formData.vehicleNumber}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[8px] w-full font-medium font-sora">
                {/* Pay Now button - shows remaining balance amount */}
                <Button
                    className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full h-[48px]"
                    onClick={onPayNow}
                >
                    Pay Now - £{remainingBalance.toFixed(2)}
                </Button>
                {!isLoadedFromSavedFine && (
                    <Button
                        className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full h-[48px]"
                        onClick={onPayLater}
                    >
                        Pay Later
                    </Button>
                )}
            </div>
        </div>
    );
}