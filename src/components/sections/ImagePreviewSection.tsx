"use client";
import { Button } from "@/component/ui/button/index";
import { Camera, Upload, ArrowLeft, AlertCircle } from "lucide-react";

interface ImagePreviewSectionProps {
    snapshot: string;
    hasError?: boolean;
    isProcessing?: boolean;
    onBack: () => void;
    onRetakePhoto: () => void;
    onUploadFromGallery: () => void;
}

export default function ImagePreviewSection({
    snapshot,
    hasError = false,
    isProcessing = true,
    onBack,
    onRetakePhoto,
    onUploadFromGallery
}: ImagePreviewSectionProps) {
    return (
        <div className="w-full flex flex-col gap-[16px]">
            <div className="w-full flex flex-col gap-[24px]">
                <button
                    className="flex items-center gap-[16px] text-gray-700 hover:text-black"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">SnapMyFine</span>
                        <span className="text-[#4A4C4F] text-[16px] leading-[24px] font-inter font-regular">Review your ticket</span>
                    </p>
                </button>

                <div className="w-full px-[12px] py-[15px]">
                    <div className="w-full h-[423px] rounded-[12px] overflow-hidden">
                        <img
                            src={snapshot}
                            alt="Captured ticket"
                            className="w-full h-full object-cover rounded-[12px]"
                        />
                    </div>
                </div>
            </div>

            {isProcessing && !hasError && (
                <div className="justify-center text-center px-[24px]">
                    <p className="text-[16px] text-[black] font-inter font-medium leading-[24px] tracking-[0.15%]">Processing your ticket...</p>
                    <p className="text-[14px] text-[#7E8081] font-inter font-regular leading-[20px] tracking-[0.25%]">We're automatically scanning your ticket for payment details</p>
                </div>
            )}
            {hasError && (
                <div className="px-[48px]">
                    <div className="p-[12px] rounded-full bg-[#F8D3D3] flex justify-center items-center w-fit mx-auto mb-[8px]">
                        <AlertCircle className="w-[24px] h-[24px] text-[#DC2626]" />
                    </div>
                    <p className="text-[16px] text-[#000000] font-inter font-medium leading-[24px] tracking-[0.15%] text-center">We couldn't read your ticket</p>
                    <p className="text-[14px] text-[#7E8081] font-inter font-regular leading-[20px] tracking-[0.25%] text-center">Try again with better lighting and make sure all text are visible</p>
                </div>
            )}

            <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
                <Button
                    onClick={onRetakePhoto}
                    className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
                >
                    <Camera className="w-[24px] h-[24px] text-[white]" />
                    <p>Retake Photo</p>
                </Button>
                <Button
                    className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full"
                    onClick={onUploadFromGallery}
                >
                    <Upload className="w-[24px] h-[24px] text-[#323333]" />
                    <p>Upload from Gallery</p>
                </Button>
            </div>
        </div>
    );
}