"use client";
import { Button } from "@/component/ui/button/index";
import { Camera, Upload, ArrowLeft, AlertCircle } from "lucide-react";
import Image from "next/image";

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
    isProcessing = false,
    onBack,
    onRetakePhoto,
    onUploadFromGallery
}: ImagePreviewSectionProps) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full flex flex-col gap-[16px] pt-[20px] px-[16px]">
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
                        <Image
                            src={snapshot}
                            alt="Captured ticket"
                            width={400}
                            height={423}
                            className="w-full h-full object-cover rounded-[12px]"
                        />
                    </div>
                </div>
            </div>

            {/* Status Messages with fixed spacing */}
            <div className="h-[125px] flex flex-col justify-center px-[16px]">
                {hasError ? (
                    <div className="px-[24px]">
                        <div className="p-[12px] rounded-full bg-[#F8D3D3] flex justify-center items-center w-fit mx-auto mb-[8px]">
                            <AlertCircle className="w-[24px] h-[24px] text-[#DC2626]" />
                        </div>
                        <p className="text-[16px] text-[#000000] font-inter font-medium leading-[24px] tracking-[0.15%] text-center">We couldn&apos;t read your ticket</p>
                        <p className="text-[14px] text-[#7E8081] font-inter font-regular leading-[20px] tracking-[0.25%] text-center">Try again with better lighting and make sure all text are visible</p>
                    </div>
                ) : isProcessing === false ? (
                    <div className="text-center px-[24px]">
                        <p className="text-[14px] text-[black] font-inter font-light leading-[24px] tracking-[0.15%]">Please wait ...</p>
                        {/* <p className="text-[14px] text-[#7E8081] font-inter font-regular leading-[20px] tracking-[0.25%]">Please wait...</p> */}
                    </div>
                ) : (
                    <div className="text-center px-[24px]">
                        <p className="text-[16px] text-[black] font-inter font-medium leading-[24px] tracking-[0.15%]">Processing your ticket...</p>
                        <p className="text-[14px] text-[#7E8081] font-inter font-regular leading-[20px] tracking-[0.25%]">We&apos;re automatically scanning your ticket for payment details</p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-[8px] w-full font-medium font-inter px-[16px] pt-[10px]">
                <Button
                    onClick={onRetakePhoto}
                    className="cursor-pointer p-[16px] text-[14px] text-white bg-[#105AE2] w-full h-[44px] rounded-[8px] flex items-center justify-center gap-2"
                >
                    <Camera className="w-[24px] h-[24px] text-[white]" />
                    Retake Photo
                </Button>
                <Button
                    className="cursor-pointer p-[16px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full h-[44px] rounded-[8px] flex items-center justify-center gap-2"
                    onClick={onUploadFromGallery}
                >
                    <Upload className="w-[24px] h-[24px] text-[#323333]" />
                    Upload from Gallery
                </Button>
            </div>
        </div>
    );
}