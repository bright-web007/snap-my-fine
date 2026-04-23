import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react';


const logoColored = "/landing/logo/logoColored.svg";
const Clock = "/landing/schedule/Clock.png";
const Notification = "/landing/schedule/Notification.png";
const NotificationBg = "/landing/schedule/Notificationbg.png";

const Schedule = () => {
    return (
        <section
            id="schedule"
            className="relative bg-white py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-left space-y-5 mb-12 md:mb-16 xl:w-[48%] ">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#393939] text-sm">
                            A better way to handle fines
                        </span>
                    </div>
                    {/* Title */}
                    <h2 className="text-[31px] md:text-[36px] leading-[41px] font-bold text-[#0C2D76]">
                        Avoid overpaying parking fines with smart reminders
                    </h2>
                    <p className="text-[#393939] text-[14px] font-regular leading-[23px]">
                        We remind you before the fine gets more expensive so you stay ahead of parking fines .
                    </p>
                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1 - Reminders that fit your schedule */}
                    <div className="bg-[#D1E3FFB0] rounded-2xl border border-gray-200 p-6 md:p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                        <h3 className="text-[22px] md:text-[22px] font-medium text-[#131515] mb-2">
                            Reminders that fit your schedule
                        </h3>
                        <p className="text-[#494D4D] text-[17px] leading-[22px] mb-6">
                            Set reminders your way and avoid late penalties before they happen.
                        </p>

                        {/* Inner card */}
                        <div className="bg-[#F8F9FB] rounded-2xl p-6 flex flex-col">
                            <div className="p-6 flex flex-col items-center text-center">
                                {/* Clock icon */}
                                <Image src={Clock} alt="Clock" width={85} height={85} className="flex-shrink-0" />
                                <h4 className="text-[20px] md:text-[20px] font-semibold text-[#000000] mb-1">
                                    Never miss out on discounts
                                </h4>
                                <p className="text-[#494D4D] text-[16px] font-regular leading-[20px] text-center mb-6">
                                    Timely reminders that help<br />you pay less.
                                </p>
                            </div>

                            {/* Calendar days */}
                            <div className="relative w-full overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#F8F9FB] to-transparent z-10 pointer-events-none" />
                                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#F8F9FB] to-transparent z-10 pointer-events-none" />
                                <div className="flex items-end justify-between gap-2 mb-6 pl-2">
                                    {[
                                        { day: 12, label: 'Mon', active: false },
                                        { day: 13, label: 'Tue', active: true },
                                        { day: 14, label: 'Wed', active: true },
                                        { day: 15, label: 'Thu', active: true },
                                        { day: 16, label: 'Fri', active: true },
                                        { day: 17, label: 'Sat', active: false },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex flex-col items-center gap-1 ${i === 0 ? '-ml-3 opacity-80' : i === 5 ? '-mr-3 opacity-100' : ''
                                            }`}>
                                            <div className="relative">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${item.active
                                                        ? 'bg-[#0D2E76] text-white'
                                                        : 'bg-gray-200 text-gray-400'
                                                        }`}
                                                >
                                                    {item.day}
                                                </div>
                                                {item.active && (
                                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#22C55E] rounded-full flex items-center justify-center">
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path d="M2.5 5L4.5 7L7.5 3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`text-[11px] ${item.active ? 'text-[#0C2D76] font-medium' : 'text-gray-400'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom badges - endless carousel */}
                        <div className="overflow-hidden mt-5">
                            <div className="flex gap-4 animate-scroll-badges">
                                {[...Array(2)].map((_, setIndex) => (
                                    <div key={setIndex} className="flex gap-4 shrink-0">
                                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shrink-0">
                                            <span className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="8" fill="white"/>
                                                    <path d="M8.5 10.5C8.8 9.7 10 9.7 10.3 10.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <path d="M13.7 10.5C14 9.7 15.2 9.7 15.5 10.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <path d="M5.5 13C5.5 13 7 12 12 12C17 12 18.5 13 18.5 13L17.5 16C17.5 16 16 18 12 18C8 18 6.5 16 6.5 16L5.5 13Z" fill="#7C3AED"/>
                                                    <path d="M5.5 13C5.5 13 7 14.5 12 14.5C17 14.5 18.5 13 18.5 13" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                                                </svg>
                                            </span>
                                            <span className="text-[13px] text-[#393939] font-medium whitespace-nowrap">Enjoy free reminders</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shrink-0">
                                            <span className="w-8 h-8 rounded-full bg-[#4A7C8A] flex items-center justify-center">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="4" y="5" width="16" height="15" rx="2" fill="white"/>
                                                    <rect x="4" y="3" width="16" height="4" rx="1" fill="white"/>
                                                    <line x1="8" y1="2" x2="8" y2="5" stroke="#4A7C8A" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <line x1="10.5" y1="2" x2="10.5" y2="5" stroke="#4A7C8A" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <line x1="13" y1="2" x2="13" y2="5" stroke="#4A7C8A" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <line x1="15.5" y1="2" x2="15.5" y2="5" stroke="#4A7C8A" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <text x="7" y="16" fill="#4A7C8A" fontSize="5" fontWeight="bold" fontFamily="sans-serif">SA</text>
                                                    <line x1="8" y1="17" x2="16" y2="10" stroke="#4A7C8A" strokeWidth="1" strokeLinecap="round"/>
                                                    <text x="11" y="19" fill="#4A7C8A" fontSize="5" fontWeight="bold" fontFamily="sans-serif">SU</text>
                                                </svg>
                                            </span>
                                            <span className="text-[13px] text-[#393939] font-medium whitespace-nowrap">Avoid missed deadlines</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shrink-0">
                                            <span className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-sm">📅</span>
                                            <span className="text-[13px] text-[#393939] font-medium whitespace-nowrap">Avoid penalties</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Notifications that keep you ahead */}
                    <div className="bg-[#0C2D76] rounded-2xl p-6 md:p-8 text-white overflow-hidden flex flex-col h-[618px] xl:h-full transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                        <h3 className="text-[20px] md:text-[22px] font-medium mb-2">
                            Notifications that keep you ahead
                        </h3>
                        <p className="text-[#B8B8B8] text-[16px] leading-[22px] mb-8">
                            Get calm, helpful notifications by email, push, or in-app designed to keep you informed without overwhelming you.
                        </p>

                        {/* Notification preview area with background */}
                        <div className="relative pt-1 flex-1 flex flex-col justify-center pb-4">
                            {/* Background image - only behind notification area */}
                            <Image
                                src={NotificationBg}
                                alt=""
                                fill
                                className="object-cover opacity-90 pointer-events-none"
                            />

                            {/* Notification card */}
                            <div className="relative z-10 flex justify-center">
                                <div className="relative w-full max-w-[380px] mx-auto mt-8">
                                    {/* Notification icon - top left, overlapping card edge */}
                                    <div className="absolute -top-10 -left-4 z-20">
                                        <Image src={Notification} alt="Notification" width={65} height={65} />
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/10">
                                    <div className="flex text-[#B8B8B8] text-[13.2px] font-regular items-center gap-1.5 mb-3">
                                        <span >8:30 PM</span>
                                        <span>•</span>
                                        <span>Discount expiry in 5 mins</span>
                                    </div>
                                    <h4 className="text-[19.1px] font-medium text-white mb-1">
                                        Pay <span className="text-[#ABE073]">£55</span> instead of £110
                                    </h4>
                                    <p className="text-[13.6px] font-regular text-[#B8B8B8] leading-[20px] mb-5">
                                        Save 50% on your parking fine<br />ticket today.
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="flex-1 py-3 px-[30px] rounded-xl bg-white text-[#0C2D76] text-[14px] font-semibold cursor-pointer">
                                            Pay now
                                        </button>
                                        <button className="flex-1 py-3 rounded-xl bg-[#1A1A1A] text-white text-[14px] font-semibold cursor-pointer">
                                            Later
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Schedule