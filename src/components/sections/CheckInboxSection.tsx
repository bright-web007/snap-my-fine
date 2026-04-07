"use client";
import { Button } from "../../component/ui/button/index";
import { Mail, X } from "lucide-react";

interface FormData {
    council: string;
    pcnNumber: string;
    vehicleNumber: string;
    fineAmount: string;
    email: string;
}

interface CheckInboxSectionProps {
    formData: FormData;
    onClose: () => void;
    onOpenGmail: () => void;
}

export default function CheckInboxSection({
    formData,
    onClose,
    onOpenGmail
}: CheckInboxSectionProps) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Centered content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md flex flex-col items-center gap-[16px] bg-[#F1F7FE] rounded-[16px] py-[20px] px-[16px] relative shadow-lg">
                    {/* Cancel icon at top right */}
                    <button
                        onClick={onClose}
                        className="absolute top-[16px] right-[16px] p-[8px] hover:bg-gray-200 rounded-full transition-colors font-sora font-medium"
                    >
                        <X className="w-[20px] h-[20px] text-[#666]" />
                    </button>

                    {/* Success icon and messages */}
                    <div className="flex flex-col items-center gap-[16px]">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#CFDFFC] flex justify-center items-center">
                            <Mail className="w-8 h-8 text-[#105AE2]" />
                        </div>

                        <div className="text-center flex flex-col gap-[8px]">
                            <p className="text-[#000000] text-[20px] font-sora font-semibold leading-[28px] tracking-[0.15%] mb-2">
                                Check your inbox
                            </p>
                            <p className="text-[#000000] text-[14px] font-inter font-regular leading-[24px] tracking-[0.25%]">
                                We&apos;ve sent a verification link to <span className="font-semiBold">{formData.email}</span>
                            </p>
                            <p className="text-[#7C8083] text-[14px] font-inter font-regular leading-[24px] tracking-[0.25%]">
                                Click the link to verify your email and access your saved fines.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[16px] w-full font-medium font-sora">
                        <Button
                            onClick={onOpenGmail}
                            className="p-[12px] text-[14px] text-[#FFFFFF] bg-[#105AE2] h-[48px] font-sora font-medium w-full rounded-[8px] hover:bg-[#0e4cc7] transition-colors"
                        >
                            Open Gmail app
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}