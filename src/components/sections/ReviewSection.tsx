"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTicketStore } from "@/lib/stores/ticketStore";
import { useTicketProcessor } from "@/lib/hooks/use-ticket";
import { useEffect, useState } from "react";
import AmountConfirmation from "@/components/sections/amountConfirmation";

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
  onNoOutstandingCharge: () => void;
  onConfirmationError: () => void;
  onFineNotReady: (pcnNumber: string) => void;
}

export default function ReviewSection({
  formData,
  validationErrors,
  councils,
  onBack,
  onInputChange,
  onFormSubmit,
  onNoOutstandingCharge,
  onConfirmationError,
  onFineNotReady
}: ReviewSectionProps) {
  const { ticketData } = useTicketStore();
  const { confirmTicket } = useTicketProcessor();
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState<string | null>(null);
  const [confirmationError, setConfirmationError] = useState(false);
  const [confirmationAttempted, setConfirmationAttempted] = useState(false);

  // Confirm ticket details when component mounts
  useEffect(() => {
    const confirmTicketDetails = async () => {
      if (!ticketData?.pcn_number || !ticketData?.council_name || confirmationAttempted) {
        return;
      }

      setIsConfirming(true);
      setConfirmationError(false);
      setConfirmationAttempted(true);

      try {
        const result = await confirmTicket(
          ticketData.pcn_number,
          ticketData.council_name,
          ticketData.plate_number || ''
        );
        
        if (result?.success) {
          if (result.status === "No Outstanding Charge" || result.paymentRequired === false) {
            // Redirect to HomeSection and trigger notification there
            setTimeout(() => {
              onNoOutstandingCharge();
            }, 500); // Small delay to complete the loading animation
          } else if (result.status === "Payment required" && result.amount) {
            // Update with confirmed amount (remove £ symbol if present)
            const cleanAmount = result.amount.replace(/[£,]/g, '');
            setConfirmedAmount(cleanAmount);
            // Update the form data with confirmed amount
            onInputChange('fineAmount', cleanAmount);
          } else {
            // Fallback if we can't determine status clearly - redirect with error
            setTimeout(() => {
              onConfirmationError();
            }, 500);
          }
        } else {
          // Check if it's a pending status response
          if (result?.status === "pending_update" && 
              result?.message?.includes("The ticket has not been updated by the council yet")) {
            // Handle fine not ready case
            setTimeout(() => {
              onFineNotReady(result.pcnNumber || ticketData.pcn_number);
            }, 500);
          } else {
            // API returned success: false - redirect to HomeSection with error
            setTimeout(() => {
              onConfirmationError();
            }, 500);
          }
        }
      } catch (error) {
        // Network error or exception - redirect to HomeSection with error
        setTimeout(() => {
          onConfirmationError();
        }, 500);
      } finally {
        setIsConfirming(false);
      }
    };

    confirmTicketDetails();
  }, [ticketData?.pcn_number, ticketData?.council_name]);

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      {/* Loading overlay */}
      {isConfirming && (
        <AmountConfirmation />
      )}



      <div className="w-full flex flex-col gap-[16px] pt-[20px] px-[16px]">
        <button
          className="flex items-center gap-[16px] text-gray-700 hover:text-black font-sora font-medium"
          onClick={onBack}
        >
          <div className="p-[12px] rounded-full bg-[#E7EFFD] active:bg-[#D7E9FE]">
            <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
          </div>
          <p className="flex flex-col text-left">
            <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">Review Details</span>
          </p>
        </button>

        <div className="text-[14px] text-[#034496] bg-[#F1F7FE] leading-[20px] font-sora font-medium p-[12px] rounded-[8px] border-1 border-[#CFDFFC]">
          <p>Please verify the details below are correct before proceeding to payment.</p>
        </div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={onFormSubmit}
          >
            {/* Council Name Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                Council Name
                {validationErrors.council && <span className="text-red-500">*</span>}
              </label>
              <select
                name="council"
                value={formData.council || (ticketData?.council_name ? ticketData.council_name : '')}
                onChange={(e) => onInputChange('council', e.target.value)}
                disabled
                className="appearance-none border border-[#D1D5DB] text-[#4A4C4F] rounded-[8px] pl-[16px] pr-[40px] py-[16px] text-[14px] outline-none bg-gray-50 cursor-not-allowed opacity-75"
              >
                <option value="">Select Council</option>
                {councils.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                {/* Add ticket data option if it's not in the councils list */}
                {ticketData?.council_name && !councils.includes(ticketData.council_name) && (
                  <option value={ticketData.council_name}>{ticketData.council_name}</option>
                )}
              </select>
            </div>

            {/* PCN Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                PCN Number
                {validationErrors.pcnNumber && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="pcnNumber"
                value={formData.pcnNumber || ticketData?.pcn_number || ''}
                onChange={(e) => onInputChange('pcnNumber', e.target.value)}
                placeholder="Enter PCN number"
                readOnly
                className="border border-[#D1D5DB] rounded-[8px] p-[16px] text-[14px] text-[#4A4C4F] outline-none bg-gray-50 cursor-not-allowed opacity-75"
              />
            </div>

            {/* Vehicle Registration Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                Vehicle Registration Number
                {validationErrors.vehicleNumber && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber || ticketData?.plate_number || ''}
                onChange={(e) => onInputChange('vehicleNumber', e.target.value)}
                placeholder="Enter vehicle registration number"
                readOnly
                className="border border-[#D1D5DB] rounded-[8px] text-[#4A4C4F] p-[16px] text-[14px] outline-none bg-gray-50 cursor-not-allowed opacity-75"
              />
            </div>

            {/* Fine Amount */}
            <div className="flex flex-col gap-1">
              <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                Fine Amount (£)
                {validationErrors.fineAmount && <span className="text-red-500">*</span>}
                {confirmedAmount && !confirmationError && (
                  <span className="text-[12px] text-green-600 font-normal ml-2">(Confirmed)</span>
                )}
                {confirmationError && (
                  <span className="text-[12px] text-orange-600 font-normal ml-2"></span>
                )}
              </label>
              <input
                type="number"
                name="fineAmount"
                value={confirmedAmount || formData.fineAmount || (ticketData?.amount ? ticketData.amount.toString() : '')}
                onChange={(e) => onInputChange('fineAmount', e.target.value)}
                placeholder="Enter fine amount"
                readOnly
                className="border border-[#D1D5DB] rounded-[8px] p-[16px] text-[14px] text-[#4A4C4F] outline-none bg-gray-50 cursor-not-allowed opacity-75"
              />
            </div>

            {/* Continue Button */}
            <div className="text-[black] w-full font-medium font-sora flex flex-col gap-[8px]">
              <Button
                type="submit"
                disabled={isConfirming}
                className={`p-[16px] text-[14px] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2 transition-colors font-medium ${
                  isConfirming
                    ? "text-[#ffffff] bg-[#CFDFFC] cursor-not-allowed"
                    : "text-white bg-[#0464DD] cursor-pointer hover:bg-[#0E4FC1] active:bg-[#045BC8]"
                }`}
              >
                {isConfirming ? "Confirming..." : "Continue to payment"} 
                <ArrowRight className="w-[20px] h-[20px]" />
              </Button>
              <p className="text-[12px] text-[#7E8081] leading-[16px] font-sora font-regular text-center px-[30px]">By continuing, you agree to proceed with secure payment through your bank&apos;s gateway</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
