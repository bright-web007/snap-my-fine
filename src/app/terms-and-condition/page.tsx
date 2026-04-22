import React from 'react'
import Image from "next/image";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Section1 from "@/components/terms/section1";
import Section2 from "@/components/terms/section2";
import Section3 from "@/components/terms/section3";
import Section4 from "@/components/terms/section4";
import Section5 from "@/components/terms/section5";
import Section6 from "@/components/terms/section6";
import Section7 from "@/components/terms/section7";
import Section8 from "@/components/terms/section8";
import Section9 from "@/components/terms/section9";
import Section10 from "@/components/terms/section10";
import Section11 from "@/components/terms/section11";
import Section12 from "@/components/terms/section12";
import Section13 from "@/components/terms/section13";
import Section14 from "@/components/terms/section14";
import Section15 from "@/components/terms/section15";
import Section16 from "@/components/terms/section16";
import Section17 from "@/components/terms/section17";

const logoColored = "/landing/logo/logoColored.svg";

const sections = [
    { id: "definitions", number: "01", title: "Definitions" },
    { id: "about-snapmyfine", number: "02", title: "About SnapMyFine" },
    { id: "eligibility", number: "03", title: "Eligibility" },
    { id: "your-account", number: "04", title: "Your account" },
    { id: "our-services", number: "05", title: "Our services" },
    { id: "payments", number: "06", title: "Payments" },
    { id: "appeal-assistance", number: "07", title: "Appeal assistance" },
    { id: "ocr-technology", number: "08", title: "OCR technology" },
    { id: "fees-and-charges", number: "09", title: "Fees and charges" },
    { id: "your-data-privacy", number: "10", title: "Your data & privacy" },
    { id: "intellectual-property", number: "11", title: "Intellectual property" },
    { id: "limitation-of-liability", number: "12", title: "Limitation of liability" },
    { id: "disclaimer-of-warranties", number: "13", title: "Disclaimer of warranties" },
    { id: "termination", number: "14", title: "Termination" },
    { id: "changes-to-terms", number: "15", title: "Changes to terms" },
    { id: "governing-law", number: "16", title: "Governing law" },
    { id: "contact-us", number: "17", title: "Contact us" },
];

const TermsAndConditionPage = () => {
    return (
        <div>
            {/* Header */}
            <div className="bg-[#105AE2]">
                <Header />
            </div>

            {/* Hero Section */}
            <div className="bg-[#0C2D76] py-16 md:py-20">
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-[6px] px-4 py-2 bg-white rounded-full mb-4">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#2563EB] text-sm" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                            Legal document
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-white mb-4 text-[32px] md:text-[40px] leading-[1.2]"
                        style={{
                            fontFamily: "Sora",
                            fontWeight: 800,
                            letterSpacing: "-1px",
                        }}
                    >
                        Terms &amp; Conditions
                    </h1>

                    {/* Description */}
                    <p
                        className="text-[#B0C4DE] max-w-2xl text-[14px] md:text-[16px] leading-[27.2px] mb-7"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                        }}
                    >
                        Please read these terms carefully before using the SnapMyFine app or website.<br />
                        By using our service, you agree to be bound by these terms.
                    </p>


                    {/* Meta Info */}
                    <div className="flex gap-12 md:gap-16">
                        <div>
                            <p className="text-[#8A9BBF] text-[9px] md:text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                                Effective Date
                            </p>
                            <p className="text-white text-[13px] md:text-[14px]" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                                1 January 2025
                            </p>
                        </div>
                        <div>
                            <p className="text-[#8A9BBF] text-[9px] md:text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                                Last Updated
                            </p>
                            <p className="text-white text-[13px] md:text-[14px]" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                                1 January 2026
                            </p>
                        </div>
                        <div>
                            <p className="text-[#8A9BBF] text-[9px] md:text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                                Version
                            </p>
                            <p className="text-white text-[13px] md:text-[14px]" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                                1.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* side nav-bar */}
                <aside className="lg:w-[320px] shrink-0">
                    <div className="lg:sticky lg:top-8 bg-white rounded-2xl border border-[#F0F0F0] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] p-6">
                        <p
                            className="text-[#9CA0AB] text-[10px] font-semibold uppercase tracking-[0.15em] mb-5"
                            style={{ fontFamily: "Inter", fontWeight: 600 }}
                        >
                            Contents
                        </p>
                        <nav className="flex flex-col gap-1">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#EBF3FF] text-[#374151] hover:text-[#2563EB]"
                                    style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px" }}
                                >
                                    <span className="text-[#9CA0AB] font-medium text-[10px] group-hover:text-[#2563EB] w-5 text-right" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                                        {section.number}
                                    </span>
                                    <span>{section.title}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* content  */}
                <div className="flex-1 min-w-0">
                    <Section1 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section2 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section3 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section4 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section5 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section6 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section7 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section8 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section9 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section10 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section11 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section12 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section13 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section14 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section15 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section16 />
                    <hr className="border-t border-[#E5E7EB]" />
                    <Section17 />
                    <hr className="border-t border-[#E5E7EB]" />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default TermsAndConditionPage