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
        <div className="w-full flex flex-col gap-[32px]">
            <div className="w-full flex flex-col gap-[32px]">
                <button
                    className="flex items-center gap-[20px] text-gray-700 hover:text-black"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left w-[248px]">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">What you will pay</span>
                        <span className="text-[#4A4C4F] text-[14px] leading-[20px] font-inter font-regular">Review the total amount before proceeding to payment</span>
                    </p>
                </button>

                <div className="w-full flex flex-col gap-[28px]">
                    <div className="flex flex-col gap-[16px] py-[24px] px-[16px] border-1 border-[#CACCCE] rounded-[16px]">
                        <div className="flex flex-col gap-[8px]">
                            <p className="flex justify-between">
                                <span className="text-[16px] text-[#000000] leading-[24px] font-regular font-inter tracking-[0.5%] ">Council Fine</span>
                                <span className="text-[16px] text-[#000000] leading-[24px] font-semibold font-inter tracking-[0.5%] ">£{formData.fineAmount ? Number(formData.fineAmount).toFixed(2) : '0.00'}</span>
                            </p>

                            <div className="flex flex-col gap-[4px]">
                                <p className="flex justify-between">
                                    <span className="text-[16px] text-[#000000] leading-[24px] font-regular font-inter tracking-[0.5%] ">Service Fee</span>
                                    <span className="text-[16px] text-[#000000] leading-[24px] font-semibold font-inter tracking-[0.5%] ">£3.00</span>
                                </p>
                                <p className="text-[12px] text-[#7E8081] leading-[16px] font-inter font-regular tracking-[0.4%] w-[256px]">This includes a SnapMyFine processing charge of £3.00</p>
                            </div>
                        </div>

                        <hr className="border-1 border-[#D7D7D7]" />

                        <p className="flex justify-between">
                            <span className="text-[16px] text-[#105AE2] leading-[24px] font-semibold font-inter tracking-[0.5%] ">Total Payable</span>
                            <span className="text-[16px] text-[#105AE2] leading-[24px] font-semibold font-inter tracking-[0.5%] ">£{formData.fineAmount ? (Number(formData.fineAmount) + 3).toFixed(2) : '3.00'}</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-[4px] py-[24px] px-[16px] border-1 border-[#CFDFFC] bg-[#F1F7FE] rounded-[16px]">
                        <p className="flex justify-between">
                            <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">Council:</span>
                            <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">{formData.council}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">PCN Number:</span>
                            <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">{formData.pcnNumber}</span>
                        </p>

                        <p className="flex justify-between">
                            <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">VRM:</span>
                            <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">{formData.vehicleNumber}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
                {/* Pay Now button - shows dynamic total */}
                <Button
                    onClick={onPayNow}
                    className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
                >
                    Pay Now - £{formData.fineAmount ? (Number(formData.fineAmount) + 3).toFixed(2) : '3.00'}
                </Button>
                {!isLoadedFromSavedFine && (
                    <Button
                        onClick={onPayLater}
                        className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full"
                    >
                        Pay Later
                    </Button>
                )}
            </div>
        </div>
    );
}