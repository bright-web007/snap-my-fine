import React from 'react'
import Image from "next/image";
import { ArrowRight } from 'lucide-react';

const logoColored = "/landing/logo/logoColored.svg";

const Dispute = () => {
    return (
        <section
            id="dispute"
            className="relative bg-white py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row xl:justify-between gap-10 xl:gap-12">
                {/* Header */}
                <div className="text-left space-y-3 mb-12 md:mb-16 w-full flex flex-col justify-between gap-6">
                    {/* Badge */}
                    <div className="inline-flex w-fit items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#393939] text-sm">
                            We handle disputes
                        </span>
                    </div>
                    <div className="flex flex-col flex-1 justify-between gap-6">
                        {/* Title */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-[31px] md:text-[36px] leading-[41px] font-bold text-[#0C2D76]">
                                Challenge unfair fines with confidence <span className="bg-gradient-to-r from-[#FFC4CE] to-[#5D55FF] text-[14px] text-white px-4 py-2 rounded-2xl whitespace-nowrap">Coming soon.</span>
                            </h2>
                            <p className="text-[#393939] text-[14px] font-regular leading-[23px]">
                                We're building a powerful dispute tool to help you fight back against incorrect parking fines
                            </p>
                        </div>
                        {/* Waitlist */}
                        <div className="max-w-[480px] flex flex-col gap-4">
                            <p className="text-[#393939] text-[16px] font-regular">
                                Join <span className="font-bold">2,347</span> users on the waitlist.
                            </p>
                            <p className="text-[#1A71DF] text-[16px] font-semibold">
                                We&apos;ll notify you the moment disputes go live.
                            </p>
                            <div className="flex flex-col lg:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-[14px] text-[#393939] placeholder:text-gray-400 outline-none focus:border-[#2563EB]"
                                />
                                <button className="px-6 py-3 bg-[#2563EB] text-white text-[14px] font-semibold rounded-lg whitespace-nowrap cursor-pointer">
                                    Join waitlist
                                </button>
                            </div>
                            <p className="text-[#868686] text-[12px]">
                                By joining the waitlist, you agree to receive updates about SnapMyFine.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px]">
                    {[
                        { title: 'Submit disputes directly', description: 'No more confusing council websites. Submit your dispute through the app with our guided process.' },
                        { title: 'Track status in real-time', description: 'See exactly where your dispute stands and get notified of updates from the council.' },
                        { title: 'Smart dispute support with AI', description: 'Technology that helps understand your fine and challenge it when appropriate.' },
                        { title: 'Dispute all in one place', description: 'Message councils, upload evidence, and track everything without leaving SnapMyFine.' },
                    ].map((card, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7 0H15V11L11 8.5L7 11V0Z" fill="white" />
                                </svg>
                            </div>
                            <h4 className="text-[#393939] text-[18px] font-semibold mb-2">{card.title}</h4>
                            <p className="text-[#5A5C63] text-[15px] font-regular leading-[22px]">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Dispute