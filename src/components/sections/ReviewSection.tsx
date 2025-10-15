"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

interface ReviewSectionProps {
  formData: FormData;
  validationErrors: ValidationErrors;
  councils: string[];
  onBack: () => void;
  onInputChange: (field: string, value: string) => void;
  onFormSubmit: (e: React.FormEvent) => void;
}

export default function ReviewSection({
  formData,
  validationErrors,
  councils,
  onBack,
  onInputChange,
  onFormSubmit
}: ReviewSectionProps) {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-[16px]">
        <button
          className="flex items-center gap-[16px] text-gray-700 hover:text-black"
          onClick={onBack}
        >
          <div className="p-[12px] rounded-full bg-[#E7EFFD]">
            <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
          </div>
          <p className="flex flex-col text-left">
            <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">Review Details</span>
          </p>
        </button>

        <div className="text-[14px] text-[#0A398F] bg-[#F1F7FE] leading-[20px] font-inter font-regular p-[12px] rounded-[8px] border-1 border-[#CFDFFC]">
          <p>Please verify the details below are correct before proceeding to payment.</p>
        </div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={onFormSubmit}
          >
            {/* Council Name Dropdown */}
            <div className="flex flex-col">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-inter tracking-[0.1%] flex items-center gap-1">
                Council Name
                {validationErrors.council && <span className="text-red-500">*</span>}
              </label>
              <select
                name="council"
                value={formData.council}
                onChange={(e) => onInputChange('council', e.target.value)}
                className="border border-[#D1D5DB] text-[#4A4C4F] rounded-[8px] p-[16px] text-[14px] outline-none focus:ring-2 focus:ring-[#105AE2]"
              >
                <option value="">Select Council</option>
                {councils.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* PCN Number */}
            <div className="flex flex-col">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-inter tracking-[0.1%] flex items-center gap-1">
                PCN Number
                {validationErrors.pcnNumber && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="pcnNumber"
                value={formData.pcnNumber}
                onChange={(e) => onInputChange('pcnNumber', e.target.value)}
                placeholder="Enter PCN number"
                className="border border-[#D1D5DB] rounded-[8px] p-[16px] text-[14px] text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2]"
              />
            </div>

            {/* Vehicle Registration Number */}
            <div className="flex flex-col">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-inter tracking-[0.1%] flex items-center gap-1">
                Vehicle Registration Number
                {validationErrors.vehicleNumber && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={(e) => onInputChange('vehicleNumber', e.target.value)}
                placeholder="Enter vehicle registration number"
                className="border border-[#D1D5DB] rounded-[8px] text-[#4A4C4F] p-[16px] text-[14px] outline-none focus:ring-2 focus:ring-[#105AE2]"
              />
            </div>

            {/* Fine Amount */}
            <div className="flex flex-col">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-inter tracking-[0.1%] flex items-center gap-1">
                Fine Amount (£)
                {validationErrors.fineAmount && <span className="text-red-500">*</span>}
              </label>
              <input
                type="number"
                name="fineAmount"
                value={formData.fineAmount}
                onChange={(e) => onInputChange('fineAmount', e.target.value)}
                placeholder="Enter fine amount"
                className="border border-[#D1D5DB] rounded-[8px] p-[16px] text-[14px] text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2]"
              />
            </div>

            {/* Continue Button */}
            <div className="text-[black] w-full font-medium font-inter flex flex-col gap-[8px]">
              <Button
                type="submit"
                className="p-[16px] text-[14px] text-white bg-[#105AE2] w-full h-[44px] rounded-[8px] flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-[20px] h-[20px]" /> Continue to payment
              </Button>
              <p className="text-[12px] text-[#7E8081] leading-[16px] font-inter font-regular text-center px-[30px]">By continuing, you agree to proceed with secure payment through your bank's gateway</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}