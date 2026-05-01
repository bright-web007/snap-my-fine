"use client";

import React from "react";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const getUrl = () => window.location.href;

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[#9CA3AF] text-[13px]"
        style={{ fontFamily: "Inter" }}
      >
        Share:
      </span>
      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(title)}`,
            "_blank"
          )
        }
        className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
        style={{ fontFamily: "Inter" }}
      >
        Twitter
      </button>
      <button
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
            "_blank"
          )
        }
        className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
        style={{ fontFamily: "Inter" }}
      >
        LinkedIn
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(getUrl())}
        className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
        style={{ fontFamily: "Inter" }}
      >
        Copy link
      </button>
    </div>
  );
}
