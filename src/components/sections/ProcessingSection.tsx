"use client";

export default function ProcessingSection() {
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center min-h-screen bg-white text-center px-[32px]">
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

      <div className="flex flex-col gap-[8px]">
        {/* Heading */}
        <h1 className="text-[20px] font-inter font-semibold text-[#19191A] leading-[28px] ">
          Processing Payment
        </h1>

        {/* Subtext */}
        <p className="text-[16px] text-[#4A4C4F] font-regular font-inter leading-[18px] max-w-xs tracking-[0.5%]">
          Redirecting to Confirmation...
        </p>
      </div>
    </div>
  );
}