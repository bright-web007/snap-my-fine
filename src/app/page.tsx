"use client";
import Image from "next/image";
import { Button } from "@/component/ui/button/index";
import { Upload, Camera, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";

export default function Home() {
  const [showCamera, setShowCamera] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const startCamera = async () => {
    try {
      // Mobile-optimized camera settings
      let stream;
      try {
        // Try back camera first (ideal for mobile document scanning)
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // Use back camera on mobile
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
      } catch (backCameraError) {
        // Fallback to any available camera if back camera fails
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsVideoVisible(true); // Show video, hide position text
      }
    } catch (error: any) {
      console.error('Camera access failed:', error);
      if (error.name === 'NotAllowedError') {
        alert('Camera permission denied. Please allow camera access in your browser settings.');
      } else {
        alert('Unable to access camera. Make sure your device has a camera and try again.');
      }
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/png");
    setSnapshot(imgData);
    
    // Stop video stream and show 3rd section
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsVideoVisible(false);
    setShowCamera(false);
    setShowImagePreview(true);
  };

  const retakePhoto = () => {
    setSnapshot(null);
    setShowImagePreview(false);
    setShowCamera(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2">
      {/* 1st section */}
      {!showCamera && !showImagePreview && (
        <div className="flex flex-col gap-[38px] p-2">
          <div className="flex flex-col gap-[4px] text-center">
            <h1 className="text-[#105AE2] text-[32px] font-bold leading-[100%]">SnapMyFine</h1>
            <p className="text-[#B2B2B3] text-[16px] leading-[24px]">Pay your parking fine in seconds</p>
          </div>

          <div className="w-full max-w-md flex flex-col items-center gap-6">
            <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
              <Button
                className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
                onClick={() => setShowCamera(true)}
              >
                <Camera className="w-[24px] h-[24px] text-[white]" />
                <p>Scan Ticket</p>
              </Button>
              <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
                <Upload className="w-[24px] h-[24px] text-[#323333]" />
                <p>Upload from Gallery</p>
              </Button>
            </div>

            <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full">
              <h2 className="text-[16px] font-medium font-inter leading-[24px]">How it works</h2>
              <ol className="text-[11px] font-medium font-inter list-decimal list-inside">
                <li>Pay us securely through your bank.</li>
                <li>We process your payment and take care of all the paperwork.</li>
                <li>You receive a confirmation once the payment is made.</li>
              </ol>
            </div>
            <p className="text-[14px] text-[#105AE2] font-medium font-inter text-center">Need help?</p>
          </div>
        </div>
      )}

      {/* 2nd section  */}
      {showCamera && !showImagePreview && (
        <div className="w-full">
          <div className="w-full flex flex-col gap-[1px]">
            <button
              className="flex items-center gap-[16px] text-gray-700 hover:text-black"
              onClick={() => setShowCamera(false)}
            >
              <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
              </div>
              <p className="flex flex-col text-left">
                <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">SnapMyFine</span>
                <span className="text-[#4A4C4F] text-[16px] leading-[24px] font-inter font-regular">Pay your parking fine in seconds</span>
              </p>
            </button>

            <div className="w-full px-[12px] py-[15px]">
              {/* Position ticket div - Hidden when video is visible */}
              <div className={`bg-[#EAE9FC] w-full h-[423px] flex flex-col items-center justify-center gap-1 rounded-[12px] ${isVideoVisible ? 'hidden' : ''}`}>
                <Camera className="w-[48px] h-[48px] text-[#105AE2]" />
                <p className="text-[black] text-[12px] font-inter font-regular">Position ticket within frame</p>
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
          <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
            {/* Capture Ticket button - Visible when video is NOT showing */}
            <Button
              onClick={startCamera}
              className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? 'hidden' : ''}`}
            >
              <Camera className="w-[24px] h-[24px] text-[white]" />
              <p>Capture Ticket</p>
            </Button>

            {/* Take Snapshot button - Visible when video IS showing */}
            <Button
              onClick={takeSnapshot}
              className={`p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full ${isVideoVisible ? '' : 'hidden'}`}
            >
              <Camera className="w-[24px] h-[24px] text-[white]" />
              <p>Take Snapshot</p>
            </Button>

            <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
              <Upload className="w-[24px] h-[24px] text-[#323333]" />
              <p>Upload from Gallery</p>
            </Button>
          </div>
        </div>
      )}


      {/* 3rd section - Image Preview */}
      {showImagePreview && snapshot && (
        <div className="w-full">
          <div className="w-full flex flex-col gap-[24px]">
            <button
              className="flex items-center gap-[16px] text-gray-700 hover:text-black"
              onClick={() => setShowImagePreview(false)}
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
          
          <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
            <Button 
              onClick={retakePhoto}
              className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
            >
              <Camera className="w-[24px] h-[24px] text-[#323333]" />
              <p>Retake</p>
            </Button>
            <Button className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full">
              <Upload className="w-[24px] h-[24px] text-[#323333]" />
              <p>Upload from Gallery</p>
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}