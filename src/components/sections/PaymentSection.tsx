"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft } from "lucide-react";

interface FormData {
    council: string;
    pcnNumber: string;
    vehicleNumber: string;
    fineAmount: string;
    email: string;
}

interface PaymentSectionProps {
    formData: FormData;
    isLoadedFromSavedFine: boolean;
    onBack: () => void;
    onPayNow: () => void;
    onPayLater: () => void;
}

export default function PaymentSection({
    formData,
    isLoadedFromSavedFine,
    onBack,
    onPayNow,
    onPayLater
}: PaymentSectionProps) {
    return (
        <div className="w-full min-h-screen flex flex-col gap-[32px]">
            <div className="w-full flex flex-col gap-[32px] pt-[20px] px-[16px]">
                <button
                    className="flex items-center gap-[20px] text-gray-700 hover:text-black font-sora font-medium"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">What you will pay</span>
                    </p>
                </button>

                <div className="w-full flex flex-col gap-[28px]">
                    <p className="text-[#4A4C4F] text-[14px] leading-[20px] font-sora font-medium text-center mx-10">Review the total amount before proceeding to payment</p>
                    <div className="flex flex-col gap-[16px] py-[24px] px-[16px] border-1 border-[#CACCCE] rounded-[16px]">
                        <div>
                            <div className="flex flex-col gap-[8px]">
                                <p className="flex justify-between">
                                    <span className="text-[16px] text-[#000000] leading-[24px] font-regular font-sora tracking-[0.5%] ">Council Fine</span>
                                    <span className="text-[16px] text-[#000000] leading-[24px] font-semibold font-sora tracking-[0.5%] ">£{formData.fineAmount ? Number(formData.fineAmount).toFixed(2) : '0.00'}</span>
                                </p>

                                <div className="flex flex-col gap-[4px]">
                                    <p className="flex justify-between">
                                        <span className="text-[16px] text-[#000000] leading-[24px] font-regular font-sora tracking-[0.5%] ">Service Fee</span>
                                        <span className="text-[16px] text-[#000000] leading-[24px] font-semibold font-sora tracking-[0.5%] ">£3.00</span>
                                    </p>
                                    <p className="text-[12px] text-[#7E8081] leading-[16px] font-sora font-regular tracking-[0.4%] w-[256px]">This includes a SnapMyFine processing charge of £3.00</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-1 border-[#D7D7D7]" />

                        <p className="flex justify-between">
                            <span className="text-[16px] text-[#0464DD] leading-[24px] font-semibold font-sora tracking-[0.5%] ">Total Payable</span>
                            <span className="text-[16px] text-[#0464DD] leading-[24px] font-semibold font-sora tracking-[0.5%] ">£{formData.fineAmount ? (Number(formData.fineAmount) + 3).toFixed(2) : '3.00'}</span>
                        </p>
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
            <div className="flex flex-col gap-[8px] w-full font-medium font-sora px-[16px]">
                {/* Pay Now button - shows dynamic total */}
                <Button
                    onClick={onPayNow}
                    className="cursor-pointer p-[16px] text-[14px] text-white bg-[#0464DD] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2"
                >
                    Pay Now - £{formData.fineAmount ? (Number(formData.fineAmount) + 3).toFixed(2) : '3.00'}
                </Button>
                {!isLoadedFromSavedFine && (
                    <Button
                        onClick={onPayLater}
                        className="cursor-pointer p-[16px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2"
                    >
                        Pay Later
                    </Button>
                )}
            </div>
        </div>
    );
}