"use client";

import { useState, useEffect } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="w-full h-[3px] bg-[#E5E7EB] rounded-full overflow-hidden lg:hidden">
      <div
        className="h-full bg-[#105AE2] rounded-full transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
