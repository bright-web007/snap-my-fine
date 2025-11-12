import React from "react";
import Image from "next/image";
const testimonialQuote = "/landing/testimonial/quotes-icon.svg";

interface TestimonialCardProps {
  quote: string;
  rating: number;
  name: string;
  role: string;
  date: string;
}

export function TestimonialCard({
  quote,
  rating,
  name,
  // role,
  date,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] flex-shrink-0">
      <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
      <p
        className="text-[#374151] mb-6"
        style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "27.2px",
          letterSpacing: "0px",
        }}
      >
        {quote}
      </p>
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[#000000]"
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {rating.toFixed(1)}
        </span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                fill="#FFA500"
              />
            </svg>
          ))}
        </div>
      </div>
      <p
        className="text-[#000000] mb-1"
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        {name}
      </p>
      <p
        className="text-[#6B7280]"
        style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "14px",
        }}
      >
        {date}
      </p>
    </div>
  );
}
