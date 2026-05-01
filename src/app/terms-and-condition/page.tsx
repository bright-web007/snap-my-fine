import React from 'react'
import Image from "next/image";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Section1 from "@/components/terms/Section1"
import Section2 from "@/components/terms/Section2";
import Section3 from "@/components/terms/Section3";
import Section4 from "@/components/terms/Section4";
import Section5 from "@/components/terms/Section5";
import Section6 from "@/components/terms/Section6";
import Section7 from "@/components/terms/Section7";
import Section8 from "@/components/terms/Section8";
import Section9 from "@/components/terms/Section9";
import Section10 from "@/components/terms/Section10";
import Section11 from "@/components/terms/Section11";
import Section12 from "@/components/terms/Section12";
import Section13 from "@/components/terms/Section13";
import Section14 from "@/components/terms/Section14";
import Section15 from "@/components/terms/Section15";
import Section16 from "@/components/terms/Section16";
import Section17 from "@/components/terms/Section17";
import SideNav from "@/components/terms/SideNav";

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
            <div className="bg-[#105AE2] h-20 lg:h-17 w-full" />
            {/* Hero Section */}
            <div className="bg-[#0C2D76] py-16 md:py-20">
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-[6px] px-4 py-2 bg-white rounded-full mb-4">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#393939] text-sm" style={{ fontFamily: "Inter", fontWeight: 400 }}>
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

            <div className="flex max-w-[1280px] mx-auto">
                {/* side nav-bar */}
                <SideNav sections={sections} />

                {/* content  */}
                <div className="flex flex-col gap-10 min-w-0 max-w-[1172px] px-4 md:px-8 py-10">
                    <Section1 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section2 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section3 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section4 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section5 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section6 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section7 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section8 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section9 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section10 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section11 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section12 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section13 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section14 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section15 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section16 />
                    <hr className="border-t border-[#E2E6EF]" />
                    <Section17 />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default TermsAndConditionPage