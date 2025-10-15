"use client";
import { Button } from "@/component/ui/button/index";
import { Camera, Upload, Clock, Menu } from "lucide-react";

interface Transaction {
  council: string;
  pcnNumber: string;
  fineAmount: string;
  status: 'success' | 'failed';
}

interface HomeSectionProps {
  transactions: Transaction[];
  onScanTicket: () => void;
  onUploadFromGallery: () => void;
  onShowSavedFines: () => void;
  onShowAllTransactions: () => void;
  onHamburgerClick: () => void;
}

export default function HomeSection({
  transactions,
  onScanTicket,
  onUploadFromGallery,
  onShowSavedFines,
  onShowAllTransactions,
  onHamburgerClick
}: HomeSectionProps) {
  return (
    <div className="w-full max-w-md">
      {/* Header with Hamburger Menu */}
      <div className="w-full flex justify-end p-4 pb-0">
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={onHamburgerClick}
        >
          <Menu className="w-[24px] h-[24px] text-[#323333]" />
        </button>
      </div>

      {/* Centered Main Content */}
      <div className="flex flex-col gap-[38px] p-2 pt-0">
        <div className="flex flex-col gap-[4px] text-center">
          <h1 className="text-[#105AE2] text-[32px] font-bold leading-[100%]">SnapMyFine</h1>
          <p className="text-[#B2B2B3] text-[16px] leading-[24px]">Pay your parking fine in seconds</p>
        </div>

        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <div className="flex flex-col gap-[8px] w-full font-medium font-inter">
            <Button
              className="p-[12px] text-[14px] text-[white] bg-[#105AE2] w-full"
              onClick={onScanTicket}
            >
              <Camera className="w-[24px] h-[24px] text-[white]" />
              <p>Scan Ticket</p>
            </Button>
            <Button
              className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full"
              onClick={onUploadFromGallery}
            >
              <Upload className="w-[24px] h-[24px] text-[#323333]" />
              <p>Upload from Gallery</p>
            </Button>
            <Button
              className="p-[12px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full"
              onClick={onShowSavedFines}
            >
              <Clock className="w-[24px] h-[24px] text-[#323333]" />
              <p>Saved Fine</p>
            </Button>
          </div>

          {/* Recent Transactions Section */}
          {transactions.length > 0 && (
            <div className="w-full flex flex-col gap-[8px] mt-2">
              <div className="flex justify-between">
                <p className="text-[#000000] font-inter text-[14px] font-medium leading-[20px] tracking-[0.1%]">Recent</p>
                <button
                  onClick={onShowAllTransactions}
                  className="text-[#105AE2] font-inter text-[14px] font-medium leading-[100%] tracking-[0.1%] hover:underline"
                >
                  show all
                </button>
              </div>
              {transactions.slice(0, 2).map((tx, idx) => (
                <div key={idx} className="flex flex-col gap-[4px] border-1 border-[#ADA8A8] p-[16px] rounded-[12px]">
                  <p className="flex justify-between">
                    <span className="font-medium text-[12px] font-inter leading-[100%] text-[#000000]">{tx.council}</span>
                    <span className="font-semibold text-[12px] font-inter leading-[100%] text-[#000000]">£{tx.fineAmount ? (Number(tx.fineAmount) + 3).toFixed(2) : '3.00'}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-regular text-[12px] font-inter leading-[100%] text-[#4A4A4A]">PCN:{tx.pcnNumber}</span>
                    <div className={`px-[4px] py-[4px] rounded-[12px] flex items-center justify-center ${tx.status === 'success' ? 'bg-[#D2F9E0]' : 'bg-[#F9D2D2]'}`}>
                      <span className={`font-regular text-[8px] font-inter leading-[100%] ${tx.status === 'success' ? 'text-[#16A34A]' : 'text-[#A31616]'}`}>{tx.status}</span>
                    </div>
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full">
            <h2 className="text-[16px] font-medium font-inter leading-[24px]">How it works</h2>
            <ol className="text-[12px] font-medium font-inter list-decimal list-inside">
              <li>Pay us securely through your bank.</li>
              <li>We process your payment and take care of all the paperwork.</li>
              <li>You receive a confirmation once the payment is made.</li>
            </ol>
          </div>
          <p className="text-[14px] text-[#105AE2] font-medium font-inter text-center">Need help?</p>
        </div>
      </div>
    </div>
  );
}