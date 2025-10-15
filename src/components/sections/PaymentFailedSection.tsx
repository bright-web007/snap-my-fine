"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PaymentFailedSectionProps {
  onBack: () => void;
  onTryAgain: () => void;
}

export default function PaymentFailedSection({
  onBack,
  onTryAgain
}: PaymentFailedSectionProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full mt-[20px]">
        <button
          className="flex items-center gap-[16px] text-gray-700 hover:text-black"
          onClick={onBack}
        >
          <div className="p-[12px] rounded-full bg-[#E7EFFD]">
            <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
          </div>
          <p className="flex flex-col text-left">
            <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">Payment Status</span>
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
              <p className="text-[#000000] text-[20px] font-inter font-semibold leading-[28px] tracking-[0.15%] mb-2">
                Payment Unsuccessful
              </p>
              <p className="text-[#19191A] text-[14px] font-inter font-regular leading-[20px] tracking-[0.25%]">
                Oops... something went wrong while processing your payment.
              </p>
            </div>
          </div>

          {/* Email section */}
          <div className="w-full flex flex-col gap-[8px]">
            <p className="text-[#7E8081] text-[12px] font-inter font-regular leading-[16px] tracking-[0.25%] text-center">
              You can try again now or choose a different payment method.
            </p>
            <div className="flex flex-col  gap-[16px] w-full font-medium font-inter">
              <Button
                onClick={onTryAgain}
                className="text-[14px] w-full h-[48px] text-[#FFFFFF] bg-[#105AE2] hover:bg-[#0e4cc7] cursor-pointer"
              >
                <p>Try Again</p>
              </Button>
            </div>
            <p className="text-[#7E8081] text-[12px] font-inter font-regular leading-[16px] tracking-[0.25%] text-center">
              if your bank already charged you, don't worry, we'll double check and update your receipt soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}