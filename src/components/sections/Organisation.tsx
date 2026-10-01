"use client";
import React from 'react'
import Image from "next/image";
// ArrowRight not used



const logoColored = "/landing/logo/logoColored.svg";

const Organisation = () => {

    const openCalendly = () => {
        // @ts-ignore
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: "https://calendly.com/YOUR_USERNAME/30min"
            });
        } else {
            console.warn("Calendly script not loaded yet");
        }
    };

    return (
        <section
            id="organisation"
            className="relative bg-[#0C2E76] py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-left space-y-3 mb-12 md:mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-transparent rounded-full border border-[#2563EB]/20">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#FFFFFF] text-sm">
                            For Organisations
                        </span>
                    </div>
                    {/* Title */}
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-15">
                        <div className="flex flex-col gap-5 lg:w-[90%]">
                            <h2 className="text-[31px] md:text-[36px] leading-[41px] text-[white]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 800,
                                    letterSpacing: "-1px",
                                    verticalAlign: "middle",
                                }}>
                                Managing fines at scale?
                                <br />
                                We can help with that.
                            </h2>

                            <p className="text-[#99ABC2] text-[14px] font-regular leading-[23px]">
                                Whether you run a fleet, a logistics operation, or any business where vehicles are part of the picture — SnapMyFine can be embedded into your workflow. White-label dispute handling, bulk fine management, and full API access.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Fleet operators',
                                    'Car rental & leasing',
                                    'Delivery & logistics',
                                    'Mobility platforms',
                                    'Employee benefit providers',
                                    'Legal & admin services',
                                ].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 rounded-full border border-white/20 text-white text-[13px] font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={openCalendly}
                                className="inline-flex w-fit items-center gap-2 text-white font-semibold text-[14px] leading-[100%] bg-[#105AE2] hover:bg-[#0a2561] py-[16px] px-[32px] rounded-[6px] whitespace-nowrap cursor-pointer">
                                Book a demo call
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {[
                                { value: '85%+', label: 'OCR accuracy on first scan' },
                                { value: '60s', label: 'Average time to process a fine' },
                                { value: '100%', label: 'Digital receipts on every payment' },
                                { value: '33+', label: 'London councils supported' },
                            ].map((stat) => (
                                <div
                                    key={stat.value}
                                    className="bg-[#142A5C] rounded-xl h-[210px] flex flex-col items-center justify-center text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                                >
                                    <span className="text-[#ABE073] text-[36px] md:text-[42px] font-bold leading-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-[#99ABC2] text-[14px] mt-3">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Organisation