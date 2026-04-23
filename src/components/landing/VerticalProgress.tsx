import React from "react";

interface VerticalProgressProps {
  stepNumber: number;
  isActive: boolean;
  hasLine: boolean;
  onClick: () => void;
}

export function VerticalProgress({
  stepNumber,
  isActive,
  hasLine,
  onClick,
}: VerticalProgressProps) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      {/* Step Badge */}
      <div
        className="inline-flex items-center gap-[6px] px-3 py-2 rounded-full border transition-colors shrink-0 w-fit"
        style={{
          backgroundColor: isActive ? "#FFFFFF" : "#FFFFFF",
          borderColor: isActive
            ? "rgba(37, 99, 235, 0.2)"
            : "rgba(229, 231, 235, 0.6)",
        }}
      >
        {/* Circle/Checkmark Indicator */}
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{
            backgroundColor: isActive ? "#105AE2" : "#E5E7EB",
          }}
        >
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
          >
            <path
              d="M1 4.5L4.5 8L11 1"
              stroke={isActive ? "white" : "#9CA3AF"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text */}
        <span
          className="text-sm transition-colors whitespace-nowrap"
          style={{
            color: isActive ? "#2563EB" : "#6B7280",
            fontFamily: "Inter",
            fontWeight: isActive ? 500 : 400,
          }}
        >
          Step {stepNumber}
        </span>
      </div>

      {/* Connecting Dashed Line - Centered */}
      {hasLine && (
        <div
          className="mt-2 h-[250px] md:h-[180px]"
          style={{
            width: "3px",
            borderLeft: `3px dashed ${isActive ? "#105AE2" : "#E5E7EB"}`,
            transition: "border-color 0.3s",
          }}
        />
      )}
    </div>
  );
}