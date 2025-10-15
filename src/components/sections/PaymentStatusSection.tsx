"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";

interface FormData {
  council: string;
  pcnNumber: string;
  vehicleNumber: string;
  fineAmount: string;
  email: string;
}

interface ValidationErrors {
  council: boolean;
  pcnNumber: boolean;
  vehicleNumber: boolean;
  fineAmount: boolean;
  email: boolean;
}

interface PaymentStatusSectionProps {
  formData: FormData;
  validationErrors: ValidationErrors;
  onBack: () => void;
  onInputChange: (field: string, value: string) => void;
  onSendReceipt: () => void;
  isValidEmail: (email: string) => boolean;
}

export default function PaymentStatusSection({
  formData,
  validationErrors,
  onBack,
  onInputChange,
  onSendReceipt,
  isValidEmail
}: PaymentStatusSectionProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header with arrow and title - positioned at top left */}
      <div className="w-full">
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
        <div className="w-full max-w-md flex flex-col items-center gap-[32px]">
          {/* Success icon and messages */}
          <div className="flex flex-col items-center gap-[16px]">
            <div className="w-[64px] h-[64px] rounded-full bg-[#D2F9E0] flex justify-center items-center">
              <CheckCircle className="w-8 h-8 text-[#16A34A]" />
            </div>

            <div className="text-center">
              <p className="text-[#000000] text-[20px] font-inter font-semibold leading-[28px] tracking-[0.15%] mb-2">
                Payment Processed Successfully!
              </p>
              <p className="text-[#19191A] text-[16px] font-inter font-regular leading-[24px] tracking-[0.25%]">
                Your Payment has been successfully processed to the council.
              </p>
            </div>
          </div>

          {/* Email section */}
          <div className="w-full flex flex-col gap-[8px]">
            <p className="text-[#19191A] text-[16px] font-inter font-regular leading-[24px] tracking-[0.25%] text-center">
              Please provide your email so your receipts will be sent to you mail
            </p>
            <div className="flex flex-col p-[24px] gap-[16px] w-full font-medium font-inter border-1 border-[#CFDFFC] rounded-[16px]">
              {/* Email */}
              <div className="flex flex-col gap-[16px]">
                <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-inter tracking-[0.1%] flex items-center gap-1">
                  Email
                  {validationErrors.email && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="border border-[#D1D5DB] rounded-[8px] text-[#4A4C4F] h-[36px] px-[12px] text-[14px] outline-none focus:ring-2 focus:ring-[#105AE2]"
                />
              </div>
              <Button
                disabled={!isValidEmail(formData.email)}
                onClick={onSendReceipt}
                className={`text-[14px] w-full h-[48px] transition-colors ${isValidEmail(formData.email)
                  ? 'text-[#FFFFFF] bg-[#105AE2] hover:bg-[#0e4cc7] cursor-pointer'
                  : 'text-[#ffffff] bg-[#CFDFFC] cursor-not-allowed'
                  }`}
              >
                <Mail className={`w-[24px] h-[24px] ${isValidEmail(formData.email) ? 'text-[#FFFFFF]' : 'text-[#ffffff]'
                  }`} />
                <p>Send Receipt</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}