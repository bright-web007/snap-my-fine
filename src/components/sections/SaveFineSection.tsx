"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft } from "lucide-react";
import { useMailer } from "@/lib/hooks/use-mailer";
import { useTicketStore } from "@/lib/stores/ticketStore";
import { useTicketProcessor } from "@/lib/hooks/use-ticket";

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

interface SaveFineSectionProps {
  formData: FormData;
  validationErrors: ValidationErrors;
  onBack: () => void;
  onInputChange: (field: string, value: string) => void;
  onCreateAccount: () => void;
  isValidEmail: (email: string) => boolean;
}

export default function SaveFineSection({
  formData,
  validationErrors,
  onBack,
  onInputChange,
  onCreateAccount,
  isValidEmail,
}: SaveFineSectionProps) {
  const { sendPayLaterEmail } = useMailer();
  const { saveTicket } = useTicketProcessor();
  const { ticketData } = useTicketStore();

  const handleCreateAccount = async () => {
    if (!isValidEmail(formData.email)) {
      return;
    }

    try {
      const fineDetails = {
        council: ticketData?.council_name || formData.council,
        email: formData.email || null,
        pcn_number: ticketData?.pcn_number || formData.pcnNumber || null,
        plate_number: ticketData?.plate_number || formData.vehicleNumber || null,
        amount: ticketData?.amount || parseInt(formData.fineAmount) || null,
        service_date_notice: ticketData?.service_date_notice || null,
        council_name: ticketData?.council_name || null,
        issued_by: ticketData?.issued_by || null,
        convtravention_time_from: ticketData?.convtravention_time_from || null,
        convtravention_time_to: ticketData?.convtravention_time_to || null,
      }
      await saveTicket(formData.email, fineDetails);
      await sendPayLaterEmail(fineDetails);

      // Call the original onCreateAccount function to save the fine locally
      onCreateAccount();
    } catch (error) {
      alert(
        "An error occurred while saving the fine. Please try again.",
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full flex flex-col gap-[16px] pt-[20px] px-[16px]">
        <button
          className="flex items-center gap-[16px] text-gray-700 hover:text-black font-sora font-medium"
          onClick={onBack}
        >
          <div className="p-[12px] rounded-full bg-[#E7EFFD] active:bg-[#D7E9FE]">
            <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
          </div>
          <p className="flex flex-col text-left">
            <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">
              Save Fine
            </span>
          </p>
        </button>

        {/* Content aligned from top */}
        <div className="w-full max-w-md mx-auto flex flex-col gap-[16px]">
          <div className="text-[14px] text-[#034496] bg-[#F1F7FE] leading-[20px] font-sora font-medium p-[12px] rounded-[8px] border-1 border-[#CFDFFC]">
            <p>
              Note: You need to create an account to allow us save your ticket
              so you can pay when you&apos;re ready. You&apos;ll also receive
              reminders before the deadline.
            </p>
          </div>

          <div className="w-full flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[16px] py-[24px] px-[24px] border-1 border-[#CACCCE] rounded-[16px]">
              {/* Email */}
              <div className="flex flex-col gap-[16px]">
                <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora tracking-[0.1%] flex items-center gap-1">
                  Email Address
                  {validationErrors.email && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => onInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="border border-[#D1D5DB] rounded-[8px] text-[#4A4C4F] h-[36px] px-[12px] text-[14px] outline-none focus:ring-2 focus:ring-[#105AE2]"
                />
              </div>
              <p className="flex flex-col gap-[8px]">
                <span className="text-[#4A4C4F] text-[14px] font-inter font-regular leading-[20px] tracking-[0.25%]">
                  Enter your email to create an account and save this fine to
                  pay later
                </span>
                <span className="text-[#7E8081] text-[12px] font-inter font-regular leading-[16px] tracking-[0.4%]">
                  We&apos;ll send gentle reminders before your payment deadline.
                </span>
              </p>
              <Button
                disabled={!isValidEmail(formData.email)}
                onClick={handleCreateAccount}
                className={`text-[14px] w-full h-[48px] transition-colors font-sora font-medium ${isValidEmail(formData.email)
                    ? "text-[#FFFFFF] bg-[#0464DD] hover:bg-[#0e4cc7] cursor-pointer active:bg-[#045BC8]"
                    : "text-[#ffffff] bg-[#CFDFFC] cursor-not-allowed"
                  }`}
              >
                Create Account
              </Button>
            </div>

            <div className="flex flex-col gap-[6px] py-[24px] px-[16px] border-1 border-[#CFDFFC] bg-[#F1F7FE] rounded-[16px]">
              <h3 className="text-[#000000] font-inter font-medium text-[12px]">What you&apos;e saving</h3>
              <p className="flex justify-between">
                <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">
                  Council:
                </span>
                <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">
                  {formData.council}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">
                  PCN Number:
                </span>
                <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">
                  {formData.pcnNumber}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">
                  VRM:
                </span>
                <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">
                  {formData.vehicleNumber}
                </span>
              </p>

              <p className="flex justify-between">
                <span className="text-[12px] text-[#000000] leading-[16px] font-regular font-inter tracking-[0.4%] ">
                  Due date:
                </span>
                <span className="text-[12px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%] ">
                  Now 12,2025
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
