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
                    <div className="absolute left-1/3 md:left-1/2 -translate-x-[55%] md:-translate-x-[95%] bottom-12 w-[255px] sm:w-[350px] h-[194px] sm:h-[260px] rounded-3xl overflow-hidden z-0">
                        <Image src={NotificationBg} alt="" fill className="object-cover pointer-events-none z-30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#105AE2]/90 to-[#FFFFFF]/30" />
                        <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-lg" />
                        <div className="absolute top-16 right-10 w-5 h-5 bg-white/15 rounded-md" />
                        <div className="absolute bottom-10 left-6 w-6 h-6 bg-white/15 rounded-md" />
                    </div>
                    {/* Top-right blue container - behind phone */}
                    <div className="absolute left-1/3  md:left-1/2 translate-x-[5%] sm:translate-x-[1%] md:translate-x-[5%] xl:-translate-x-[15%] -top-4 w-[255px] sm:w-[350px] h-[194px] sm:h-[260px] rounded-3xl overflow-hidden z-0">
                        <Image src={NotificationBg} alt="" fill className="object-cover pointer-events-none z-30" />
                        <div className="absolute inset-0 bg-gradient-to-l from-[#105AE2]/90 to-[#FFFFFF]/30" />
                        <div className="absolute top-4 left-4 w-7 h-7 bg-white/20 rounded-lg" />
                        <div className="absolute bottom-8 right-6 w-5 h-5 bg-white/15 rounded-md" />
                        <div className="absolute top-14 left-10 w-4 h-4 bg-white/15 rounded-md" />
                    </div>

                    {/* Phone image */}
                    <div className="relative z-10">
                        {/* Safe and secure badge - top left of phone */}
                        <div className="absolute top-16 -left-16 z-20 flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-md">
                            <div className="w-6 h-6 bg-[#0278E6] rounded-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="6.5" width="8" height="6" rx="1.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 6.5V4.5C5 3.12 6.12 2 7.5 2V2C8.88 2 10 3.12 10 4.5V6.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#393939]">Safe and secure</span>
                        </div>

                        {/* Clear and stress-free badge - top right of phone */}
                        <div className="absolute top-4 -right-20 z-20 flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-md">
                            <div className="w-6 h-6 bg-[#23D660] rounded-full flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#23D660" strokeWidth="1.2" /><path d="M4.5 7L6.5 9L9.5 5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#393939]">Clear and stress-free</span>
                        </div>

                        <Image src={Phone} alt="Payment screen" width={197.01} height={550} className="drop-shadow-2xl sm:w-[269px]" />
                    </div>

                    {/* Bottom stepper bar */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white rounded-lg px-4 py-[19.2px] flex items-center gap-6" style={{ boxShadow: '0 10px 15px -3px #3D9CF540, 0 4px 6px -4px #3D9CF540' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#CCE6FE] rounded-full flex items-center justify-center">
                                <svg width="20" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2H5C4.45 2 4 2.45 4 3V8H12V3C12 2.45 11.55 2 11 2H10Z" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 2V5H12" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 10H13" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" /><path d="M4 10V13C4 13.55 4.45 14 5 14H11C11.55 14 12 13.55 12 13V10" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <span className="text-[13px] font-medium text-[#0C2D76]">Scan</span>
                            <div className="flex gap-1 ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCE6FE]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#94CBFE]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#5DB0FD]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0278E6]" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#CCE6FE] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="10" rx="2" stroke="#2563EB" strokeWidth="1.5" /><path d="M2 4C2 2.9 2.9 2 4 2H11L14 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><rect x="10" y="7.5" width="4" height="3" rx="1" stroke="#2563EB" strokeWidth="1.5" /><circle cx="12" cy="9" r="0.5" fill="#2563EB" /></svg>
                            </div>
                            <span className="text-[13px] font-medium text-[#0C2D76]">Pay</span>
                            <div className="flex gap-1 ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCE6FE]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#94CBFE]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#5DB0FD]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0278E6]" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#CCE6FE] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#0464DD" strokeWidth="1.5" /><path d="M5.5 8L7.5 10L10.5 6" stroke="#5622c5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                                <div className="w-10 h-10 bg-[#0464DD] rounded-xl flex items-center justify-center shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M7.5 5C7.5 2.5 10.5 2.5 10.5 5H12.5Q14 5 14 6.5V7.5C16 7.5 16 10.5 14 10.5V12.5Q14 14 12.5 14H5.5Q4 14 4 12.5V10.5C6 10.5 6 7.5 4 7.5V6.5Q4 5 5.5 5Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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