"use client";

import { useState, useEffect, useRef } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureHeader = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    const onScroll = () => {
      // Update progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }

      // Check if header has reached the bar's natural position
      if (placeholderRef.current) {
        const rect = placeholderRef.current.getBoundingClientRect();
        const header = document.querySelector("header");
        const hHeight = header ? header.offsetHeight : 0;
        setIsFixed(rect.top <= hHeight);
      }
    };

    measureHeader();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measureHeader(); onScroll(); });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureHeader);
    };
  }, []);

  return (
    <div ref={placeholderRef} className="w-full h-[3px]">
      <div
        className={`h-[3px] bg-[#E5E7EB] z-20 ${isFixed ? "fixed left-0 right-0" : "w-full"}`}
        style={isFixed ? { top: `${headerHeight}px` } : undefined}
      >
        <div
          className="h-full bg-[#105AE2] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
