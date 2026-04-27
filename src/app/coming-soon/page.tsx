"use client"
import React, { useState } from 'react'
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Link from 'next/dist/client/link';


const page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const isValidEmail = (emailValue: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };

    const isFormValid = name.trim() !== '' && isValidEmail(email);

    const handleSubmit = () => {
        if (isFormValid) {
            setSubmitted(true);
            setName('');
            setEmail('');
        }
    };
    return (
        <div>
            {/* Header */}
            <div className="bg-[#105AE2]">
                <Header />
            </div>
            <div className="bg-[#105AE2] h-20 lg:h-17 w-full" />
            <div className="relative z-20 px-4 md:px-8 py-6 bg-[#F6F8FF] ">
                <div className="max-w-[1280px] mx-auto flex items-center font-medium gap-2 text-sm text-[#9CA0AB] overflow-hidden">
                    <Link href="/">Home</Link>
                    <span>›</span>
                    <p className="text-[#105AE2]">Coming soon</p>
                </div>
            </div>
            <div className="relative z-10 px-4 md:px-8 py-[50px] lg:py-35  bg-[#07122A]">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-32 items-center overflow-hidden">
                    <div className="w-full flex flex-col gap-4 md:gap-6">
                        <section className="flex flex-col gap-4 md:gap-6">
                            <span
                                className="px-4 py-2 w-fit flex items-center gap-2 rounded-full bg-[#FFFFFF12] border border-[#FFFFFF1A] text-white text-[13px] font-medium"
                            >
                                <span className="w-[6px] h-[6px] rounded-full bg-[#5FAAFF] inline-block" />
                                Coming Soon
                            </span>
                            <h1
                                className="text-white text-[48px] md:text-[52px]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 800,
                                    lineHeight: "115%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                The app is almost ready. You should be first.?
                            </h1>
                            <p
                                className="text-[#FFFFFFCC] w-full"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "15px",
                                    lineHeight: "22.5px",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                    maxWidth: "489px",
                                }}
                            >
                                SnapMyFine is putting the finishing touches on its iOS and Android app. Drop your email and we'll notify you the moment it's live — plus early access perks.
                            </p>
                        </section>
                        <section className="flex flex-col gap-4 md:gap-6">
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Snap PCN',
                                    'AI analysis',
                                    'Reminders',
                                    'Appeal letters',
                                    'Secure pay',
                                ].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#FFFFFF12] border border-[#FFFFFF1A] text-white text-[13px] font-medium"
                                    >
                                        <span className="w-[6px] h-[6px] rounded-full bg-[#5FAAFF] inline-block" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                    <div>
                        <div className={`w-full flex flex-col gap-5 border border-[#FFFFFF1F] bg-[#FFFFFF0F] rounded-[20px] p-[20px] lg:p-[32px] ${submitted ? 'hidden' : 'block'}`}>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-white text-[18px] font-bold">Join the waitlist</h2>
                                <p className="text-[#FFFFFFCC] text-[13px] font-regular">Be first in line when we launch.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-1 px-4 py-4 rounded-lg border border-[#FFFFFF2E] bg-[#FFFFFF14] text-[14px] text-white placeholder:text-gray-400 outline-none focus:border-[#2563EB]"
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-4 py-4 rounded-lg border border-[#FFFFFF2E] bg-[#FFFFFF14] text-[14px] text-white placeholder:text-gray-400 outline-none focus:border-[#2563EB]"
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid}
                                    className={`px-6 py-4 text-white text-[14px] font-semibold rounded-lg whitespace-nowrap transition-all ${isFormValid
                                        ? 'bg-[#2563EB] cursor-pointer hover:bg-[#1d4ed8]'
                                        : 'bg-[#2563EB]/50 cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    Get early access
                                </button>
                            </div>
                            <div className="flex items-center gap-1 lg:gap-8 pt-4">
                                <div className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                                        <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF1F" strokeWidth="1" />
                                        <path
                                            d="M 12 2 L 12 12 A 10 10 0 0 0 17.32 4.68 Z"
                                            fill="#FFFFFF80"
                                            opacity="0.8"
                                        />
                                    </svg>
                                    <span className="text-[#FFFFFFCC] text-[10px] sm:text-[11px] font-regular whitespace-nowrap">No spam. Unsubscribe anytime.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <div className="h-5 w-5 sm:w-8 sm:h-8 rounded-full bg-[#2563EB] border-2 border-[#07122A] flex items-center justify-center text-white text-[9px] sm:text-[11px] font-bold">JT</div>
                                        <div className="h-5 w-5 sm:w-8 sm:h-8 rounded-full bg-[#5FAAFF] border-2 border-[#07122A] flex items-center justify-center text-white text-[9px] sm:text-[11px] font-bold">SR</div>
                                        <div className="h-5 w-5 sm:w-8 sm:h-8 rounded-full bg-[#0CEDFF] border-2 border-[#07122A] flex items-center justify-center text-white text-[9px] sm:text-[11px] font-bold">PM</div>
                                    </div>
                                    <span className="text-[#FFFFFFCC] text-[10px] sm:text-[11px] font-regular whitespace-nowrap">1,240+ on the waitlist</span>
                                </div>
                            </div>
                        </div>






                        {/* waitlist Successfull  */}
                        <div className={`w-full flex flex-col gap-5 border border-[#16A34A59] bg-[#FFFFFF0F] rounded-[20px] p-[20px] md:p-[32px] ${submitted ? 'block' : 'hidden'}`}>
                            <div className="flex flex-col gap-2">
                                <div className=" p-4 rounded-full bg-[#16A34A26] w-fit">
                                    <div className="rounded-full w-5 h-5 bg-[#16A34AB2]" />
                                </div>
                                <h2 className="text-[#4DDD80] text-[18px] font-bold">You're on the list!</h2>
                                <p className="text-[#FFFFFFCC] text-[13px] font-regular">We'll email you the moment SnapMyFine launches — with early access included.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page