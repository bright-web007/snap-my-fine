"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, Clock, Trash } from "lucide-react";
import { useTicketProcessor } from "@/lib/hooks/use-ticket";
import { useTicketStore } from "@/lib/stores/ticketStore";

interface SavedFine {
  id: string;
  council: string;
  pcnNumber: string;
  vehicleNumber: string;
  fineAmount: string;
  email: string;
  dateSaved: string;
}

interface SavedFinesSectionProps {
  savedFines: SavedFine[];
  onBack: () => void;
  onDeleteFine: (fineId: string) => void;
  onPayFine: (fine: SavedFine) => void;
}

export default function SavedFinesSection({
  savedFines,
  onBack,
  onDeleteFine,
  onPayFine
}: SavedFinesSectionProps) {
  const { deleteTicket, loading } = useTicketProcessor();
  const { removeSavedTicket } = useTicketStore();

  // Filter out empty objects that N8N sometimes returns
  const validSavedFines = savedFines.filter(fine =>
    fine &&
    fine.id &&
    fine.pcnNumber &&
    fine.council &&
    Object.keys(fine).length > 0 &&
    fine.id.trim() !== '' &&
    fine.pcnNumber.trim() !== ''
  );

  const handleDeleteFine = async (fine: SavedFine) => {
    if (loading) return;
    try {
      await deleteTicket(fine.email, fine.pcnNumber);
      removeSavedTicket(fine.id);
      onDeleteFine(fine.id);
    } catch {
      alert('Failed to delete ticket. Please try again.');
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full mt-[16px]">
        <button
          className="flex items-center gap-[16px] text-gray-700 hover:text-black font-sora font-medium"
          onClick={onBack}
        >
          <div className="p-[12px] rounded-full bg-[#E7EFFD] active:bg-[#D7E9FE]">
            <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
          </div>
          <p className="flex flex-col text-left">
            <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">Saved Fines</span>
          </p>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-6">
        <div className="w-full max-w-md mx-auto flex flex-col gap-[16px]">

          {validSavedFines.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-[#B2B2B3] mx-auto mb-4" />
              <p className="text-[#19191A] text-[16px] font-sora font-medium mb-2">No available saved fine</p>
              <p className="text-[#7E8081] text-[14px] font-inter font-regular">You haven&apos;t saved any fines yet. Scan a ticket to get started.</p>
            </div>
          ) : (
            // Saved fines list
            <div className="w-full flex flex-col gap-[12px]">
              {validSavedFines.map((fine) => (
                <div key={fine.id} className="flex flex-col gap-[8px] py-[24px] px-[16px] border-1 border-[#CFDFFC] bg-[#F1F7FE] rounded-[16px]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="flex justify-between items-center mb-2">
                        <span className="text-[14px] text-[#000000] leading-[16px] font-medium font-sora tracking-[0.4%]">{fine.council}</span>
                        <button
                          onClick={() => handleDeleteFine(fine)}
                          disabled={loading}
                          className="p-1 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sora font-medium"
                        >
                          <Trash className="w-[16px] h-[16px] text-[#7E8081]" />
                        </button>
                      </p>

                      <p className="mb-1">
                        <span className="text-[12px] text-[#4A4C4F] leading-[16px] font-regular font-sora tracking-[0.4%]">PCN: {fine.pcnNumber}</span>
                      </p>

                      <p className="mb-2">
                        <span className="text-[12px] text-[#4A4C4F] leading-[16px] font-regular font-sora tracking-[0.4%]">Vehicle: {fine.vehicleNumber}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="flex gap-[8px] items-center">
                      <Clock className="w-[16px] h-[16px] text-[#7E8081]" />
                      <span className="text-[12px] text-[#7E8081] leading-[16px] font-regular font-sora tracking-[0.4%]">Saved on {fine.dateSaved}</span>
                    </p>

                    <p className="text-[16px] font-semibold font-sora leading-[24px] text-[#19191A]">
                      £{fine.fineAmount ? Number(fine.fineAmount).toFixed(2) : '0.00'}
                    </p>
                  </div>

                  <hr className="border-1 border-[#E5E7EB] my-2" />

                  <Button
                    className="bg-[#105AE2] text-[#FFFFFF] text-[14px] h-[48px] px-[12px] w-full cursor-pointer font-medium"
                    onClick={() => onPayFine(fine)}
                  >
                    Pay Now
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
