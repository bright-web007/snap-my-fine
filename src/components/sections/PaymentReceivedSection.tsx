"use client";

interface FormData {
  council: string;
  pcnNumber: string;
  vehicleNumber: string;
  fineAmount: string;
  email: string;
}

interface PaymentReceivedSectionProps {
  formData: FormData;
}

export default function PaymentReceivedSection({
  formData
}: PaymentReceivedSectionProps) {
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center min-h-screen bg-white text-center px-[15px]">
      {/* Animated spinner */}
      <div className="relative w-[80px] h-[80px] animate-spin">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #1a73e8, #4dabf7, #cfe2ff, #ffffff, #ffffff)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 12px), black 0)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 12px), black 0)",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-[16px]">
        {/* Heading */}
        <h1 className="text-[20px] font-inter font-semibold text-[#19191A] leading-[28px] ">
          Payment Received
        </h1>

        {/* Subtext */}
        <div className="flex flex-col gap-[8px]">
          <p className="text-[16px] text-[#19191A] font-regular font-inter leading-[18px] max-w-xs tracking-[0.5%]">
            Your payment of <span className="font-semibold">£{formData.fineAmount ? (Number(formData.fineAmount) + 3).toFixed(2) : '3.00'}</span> has been received successfully. We're now processing your payment with the council.
          </p>
          <p className="text-[14px] text-[#4A4C4F] font-inter font-regular leading-[20px] tracking-[0.25%]">
            This may take a few moments. Please keep this page open.
          </p>
        </div>
      </div>
    </div>
  );
}