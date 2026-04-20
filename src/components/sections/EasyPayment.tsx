import React from 'react'
import Image from "next/image";


const logoColored = "/landing/logo/logoColored.svg";
const Phone = "/landing/hero/Phone.png";
const NotificationBg = "/landing/hero/bg-grid-image.png";

const EasyPayment = () => {
    return (
        <section
            id="easypayment"
            className="relative bg-white py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col xl:flex-row gap-15 xl:justify-between">
                {/* Phone mockup with background */}
                <div className="relative flex items-center justify-center w-full">
                    {/* Background decorative squares */}
                    {/* Bottom-left blue container - behind phone */}
                    <div className="absolute left-1/3 md:left-1/2 -translate-x-[55%] md:-translate-x-[100%] bottom-12 w-[255px] sm:w-[350px] h-[194px] sm:h-[260px] rounded-3xl overflow-hidden z-0">
                        <Image src={NotificationBg} alt="" fill className="object-cover opacity-60 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#105AE2]/80 to-[#FFFFFF]/30" />
                        <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-lg" />
                        <div className="absolute top-16 right-10 w-5 h-5 bg-white/15 rounded-md" />
                        <div className="absolute bottom-10 left-6 w-6 h-6 bg-white/15 rounded-md" />
                    </div>
                    {/* Top-right blue container - behind phone */}
                    <div className="absolute left-1/3  md:left-1/2 translate-x-[5%] sm:translate-x-[1%] md:translate-x-[5%] xl:translate-x-[2%] -top-4 w-[255px] sm:w-[350px] h-[194px] sm:h-[260px] rounded-3xl overflow-hidden z-0">
                        <Image src={NotificationBg} alt="" fill className="object-cover opacity-60 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-l from-[#105AE2] to-[#FFFFFF]" />
                        <div className="absolute top-4 left-4 w-7 h-7 bg-white/20 rounded-lg" />
                        <div className="absolute bottom-8 right-6 w-5 h-5 bg-white/15 rounded-md" />
                        <div className="absolute top-14 left-10 w-4 h-4 bg-white/15 rounded-md" />
                    </div>

                    {/* Phone image */}
                    <div className="relative z-10">
                        {/* Safe and secure badge - top left of phone */}
                        <div className="absolute top-16 -left-16 z-20 flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-md">
                            <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L2.5 3.5V6.5C2.5 9.25 4.4 11.8 7 12.5C9.6 11.8 11.5 9.25 11.5 6.5V3.5L7 1Z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#393939]">Safe and secure</span>
                        </div>

                        {/* Clear and stress-free badge - top right of phone */}
                        <div className="absolute top-4 -right-20 z-20 flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-md">
                            <div className="w-6 h-6 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#22C55E" strokeWidth="1.2" /><path d="M4.5 7L6.5 9L9.5 5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#393939]">Clear and stress-free</span>
                        </div>

                        <Image src={Phone} alt="Payment screen" width={197.01} height={550} className="drop-shadow-2xl sm:w-[269px]" />
                    </div>

                    {/* Bottom stepper bar */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1" stroke="#2563EB" strokeWidth="1.5" /><path d="M5 8h6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            </div>
                            <span className="text-[13px] font-medium text-[#0C2D76]">Scan</span>
                            <div className="flex gap-1 ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1" stroke="#2563EB" strokeWidth="1.5" /><path d="M6 6h4M6 9h4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            </div>
                            <span className="text-[13px] font-medium text-[#0C2D76]">Pay</span>
                            <div className="flex gap-1 ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#22C55E]/10 rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#22C55E" strokeWidth="1.5" /><path d="M5.5 8L7.5 10L10.5 6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-[13px] font-medium text-[#0C2D76]">Sorted</span>
                        </div>
                    </div>
                </div>
                {/* Header */}
                <div className="text-left space-y-3 mb-12 md:mb-16 flex flex-col gap-6 justify-center">
                    {/* Badge */}
                    <div className="inline-flex w-fit items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#393939] text-sm">
                            Easy payments
                        </span>
                    </div>
                    {/* Title */}
                    <h2 className="text-[31px] md:text-[36px] leading-[41px] font-bold text-[#0C2D76]">
                        Simple, secure parking fine payment
                    </h2>
                    {/* Feature list */}
                    <div className="flex flex-col gap-6">
                        {[
                            { title: 'Fast & secure payment.', description: 'Pay your parking fine through a secure payment gateway in just a few steps.' },
                            { title: "See exactly what you'll pay before you tap.", description: 'All the important details are shown upfront, helping you pay confidently in just a few taps.' },
                            { title: 'No guesswork. No hunting through council websites.', description: 'If you need to pay, SnapMyFine helps you complete it smoothly without unnecessary steps or guesswork.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <rect x="2" y="3" width="14" height="12" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                                        <path d="M2 7h14" stroke="#2563EB" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-[#112248] text-[18px] font-semibold mb-1">{item.title}</h4>
                                    <p className="text-[#393939] text-[16px] leading-[22px]">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EasyPayment