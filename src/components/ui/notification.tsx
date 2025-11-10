"use client";
import { CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
  onClose: () => void;
}

export function Notification({ message, type = "info", duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: "bg-green-50 border-green-200",
    info: "bg-blue-50 border-blue-200", 
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200"
  }[type];

  const textColor = {
    success: "text-green-800",
    info: "text-blue-800",
    warning: "text-yellow-800", 
    error: "text-red-800"
  }[type];

  const iconColor = {
    success: "text-green-500",
    info: "text-blue-500",
    warning: "text-yellow-500",
    error: "text-red-500"
  }[type];

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`${bgColor} border rounded-lg p-4 flex items-center gap-3 shadow-lg min-w-[380px] max-w-[390px]`}>
        <CheckCircle className={`w-5 h-5 ${iconColor}`} />
        <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`${textColor} hover:opacity-70 transition-opacity font-sora font-medium`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}