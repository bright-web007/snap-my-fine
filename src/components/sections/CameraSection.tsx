"use client";
import { Button } from "@/component/ui/button/index";
import { Camera, Upload, ArrowLeft } from "lucide-react";

interface CameraSectionProps {
    isVideoVisible: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    onBack: () => void;
    onStartCamera: () => void;
    onTakeSnapshot: () => void;
    onUploadFromGallery: () => void;
}

export default function CameraSection({
    isVideoVisible,
    videoRef,
    canvasRef,
    onBack,
    onStartCamera,
    onTakeSnapshot,
    onUploadFromGallery
}: CameraSectionProps) {
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
                        <span className="text-[#4A4C4F] text-[14px] leading-[24px] font-inter font-light">Pay your parking fine in seconds</span>
                    </p>
                </button>

                <div className="w-full px-[12px] py-[15px]">
                    {/* Position ticket div - Hidden when video is visible */}
                    <div className={`bg-[#EAE9FC] w-full h-[423px] flex flex-col items-center justify-center gap-1 rounded-[12px] ${isVideoVisible ? 'hidden' : ''}`}>
                        <Camera className="w-[48px] h-[48px] text-[#105AE2]" />
                        <p className="text-[black] text-[12px] font-inter font-light">Position ticket within frame</p>
                    </div>

                    {/* Video div - Visible when video is active */}
                    <div className={`${isVideoVisible ? '' : 'hidden'}`}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-[423px] rounded-[12px] object-cover"
                        ></video>
                    </div>

                    <canvas ref={canvasRef} className="hidden"></canvas>
                </div>

            </div>
            <div className="flex flex-col gap-[8px] w-full font-inter px-[16px]">
                {/* Capture Ticket button - Visible when video is NOT showing */}
                <Button
                    onClick={onStartCamera}
                    className={`cursor-pointer p-[16px] text-[14px] text-white bg-[#105AE2] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2 ${isVideoVisible ? 'hidden' : ''}`}
                >
                    <Camera className="w-[24px] h-[24px] text-white" />
                    Capture Ticket
                </Button>

                {/* Take Snapshot button - Visible when video IS showing */}
                <Button
                    onClick={onTakeSnapshot}
                    className={`cursor-pointer p-[16px] text-[14px] text-white bg-[#105AE2] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2 ${isVideoVisible ? '' : 'hidden'}`}
                >
                    <Camera className="w-[24px] h-[24px] text-white" />
                    Take Snapshot
                </Button>

                <Button
                    className="cursor-pointer p-[16px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2"
                    onClick={onUploadFromGallery}
                >
                    <Upload className="w-[24px] h-[24px] text-[#323333]" />
                    Upload from Gallery
                </Button>
            </div>
        </div>
    );
}