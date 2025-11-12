"use client";
import { ArrowLeft, Bell, Hourglass } from "lucide-react";
import { Button } from "@/component/ui/button/index";
import { useState } from "react";

interface FineNotReadyProps {
    onBack: () => void;
    onSubmit: (email: string, phone?: string) => void;
}

export default function FineNotReady({ onBack, onSubmit }: FineNotReadyProps) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !email.includes("@")) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
        onSubmit(email, phone);
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-white">
            <div className="w-full flex flex-col gap-[24px] pt-[20px] px-[16px]">
                {/* Header */}
                <button
                    className="flex items-center gap-[16px] text-gray-700 hover:text-black font-sora font-medium"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD] active:bg-[#D7E9FE]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-sora font-semibold">
                            Fine Not Ready
                        </span>
                    </p>
                </button>

                {/* Content */}
                <div className="flex flex-col items-center gap-[24px] px-[16px] pt-[32px]">
                    {/* Hourglass Icon */}
                    <div className="w-[80px] h-[80px] rounded-full bg-[#E7EFFD] flex items-center justify-center">
                        <Hourglass
                            className="w-[40px] h-[40px] text-[#105AE2] rotate-12"
                        />
                    </div>

                    {/* Title and Description */}
                    <div className="flex flex-col gap-[8px] text-center">
                        <h1 className="text-[20px] font-sora font-semibold text-[#19191A] leading-[28px]">
                            Fine not payable yet
                        </h1>
                        <p className="text-[14px] text-[#4A4C4F] font-inter font-regular leading-[20px]">
                            It looks like this fine hasn't been activated by the council yet.
                        </p>
                        <p className="text-[14px] text-[#4A4C4F] font-inter font-regular leading-[20px]">
                            Councils sometimes take up to 24 hours to register new tickets.
                        </p>
                    </div>

                    {/* Alert Text */}
                    <div className="p-12 border-1 bg-[#F1F7FE] border-[#CFDFFC] rounded-[8px]">
                    <p className="text-[14px] text-[#034496] font-sora font-medium leading-[20px] text-center max-w-[320px]">
                        Please provide your details so we can alert you as soon as the council activates it.
                    </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[20px]">
                        {/* Email Input */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora">
                                Email
                                {emailError && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                className={`border ${emailError ? "border-red-500" : "border-[#D1D5DB]"
                                    } rounded-[8px] p-[16px] text-[14px] text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2]`}
                                required
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="text-[#19191A] text-[14px] leading-[20px] font-medium font-sora">
                                Phone number
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                className="border border-[#D1D5DB] rounded-[8px] p-[16px] text-[14px] text-[#4A4C4F] outline-none focus:ring-2 focus:ring-[#105AE2]"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col gap-[8px]">
                            <Button
                                type="submit"
                                disabled={!email.trim() ||phone.trim() === ""}
                                className={`p-[16px] text-[14px] text-white w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2 transition-colors font-sora font-medium ${
                                    !email.trim() 
                                        ? 'bg-[#105AE2]/40 cursor-not-allowed' 
                                        : 'bg-[#0464DD] hover:bg-[#0e4cc7] cursor-pointer active:bg-[#045BC8]'
                                }`}
                            >
                                <Bell className="w-[50px] h-[50px]" />
                                Notify me
                            </Button>
                            <p className="text-[11px] text-[#7E8081] leading-[16px] font-inter font-regular text-center px-[20px]">
                                You'll get an email or text once your fine is ready for payment
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}