import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import svgPaths from "../lib/landing/svg-im39sd3dvf";
import Header from "@/components/sections/Header";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import Organisation from "@/components/sections/Organisation";
import Schedule from "@/components/sections/Schedule";
import StatsBar from "@/components/sections/StatsBar";
import EasyPayment from "@/components/sections/EasyPayment";
import OurProcess from "@/components/sections/OurProcess";
import CallToAction from "@/components/sections/CallToAction";
import Dispute from "@/components/sections/Dispute";
import { TestimonialColumn } from "../components/landing/TestimonialColumn";
import { FAQAccordion } from "../components/landing/FAQAccordion";

const heroPhoneMockup = "/landing/hero/right-image.png";
const patternImage = "/landing/hero/bg-grid-image.png";

const whyUsPattern = "/landing/whyus/bgPattern.png";
const councilBot = "/landing/whyus/icons/council_bot.svg";
const payNow = "/landing/whyus/icons/pay_now.svg";
const autoPayment = "/landing/whyus/icons/auto_payment.svg";
const ocrExtraction = "/landing/whyus/icons/ocr_extraction.svg";
const photoCamera = "/landing/whyus/icons/photo_camera.svg";
const receipts = "/landing/whyus/icons/receipts.svg";

const faqIllustration = "/landing/faq/illustration.svg";
const testimonialQuote = "/landing/testimonial/quotes-icon.svg";

const logoWhite = "/landing/logo/logoWhite.svg";
const logoColored = "/landing/logo/logoColored.svg";

export const metadata: Metadata = {
    title: "Manage Parking Tickets & Appeals - Snapmyfine | London, UK",
    description: "Snapmyfine helps drivers and organisations manage parking tickets, track important deadlines, understand parking notices, and take the next step with less stress. Download the app or book a demo.",
};

export default function LandingPage() {
    return (
        <div className="relative h-[120vh] lg:h-[110vh] w-full bg-[#2563EB] overflow-x-clip">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.7] z-0"
                style={{
                    backgroundImage: `url(${patternImage})`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="relative z-10 px-4 md:px-8 pt-30 lg:pt-15 lg:pb-5  xl:pb-0">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-32 items-center overflow-hidden">
                    {/* Left Content */}
                    <div className="w-full flex flex-col gap-4 md:gap-6">
                        <section className="flex flex-col gap-4 md:gap-6">
                            <h1
                                className="text-white text-[48px] md:text-[52px]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 700,
                                    lineHeight: "115%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                Got a London Council PCN?
                            </h1>
                            <h5 className="text-white text-[26px] md:text-[26px] font-semibold max-w-[489px]">
                                Find out in <span className="text-[#ABE073]">60 seconds</span> if you should pay or challenge it
                            </h5>
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
                                Just take a photo of your ticket. We'll read it, explain it in simple terms, tell you exactly how long you have, and whether you have grounds to challenge it. Free, on your phone, in under a minute!
                            </p>
                        </section>
                        <section className="flex flex-col gap-4 md:gap-6">
                            <div className="flex flex-wrap gap-3">
                                {[
                                    'Free to download',
                                    'iOS & Android',
                                    '2 in 3 appeals succeed',
                                    'All London councils covered',
                                ].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 flex items-center gap-2 rounded-full bg-[#60BA0036] text-white text-[13px] font-medium"
                                    >
                                        <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                <path d="M2.5 5L4.5 7L7.5 3" stroke="#60BA0090" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col md:flex-row w-full justify-start gap-3">
                                <a
                                    style={{
                                        borderColor: "none",
                                        paddingLeft: "18px",
                                        paddingRight: "18px",
                                        textDecoration: "none",
                                    }}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex w-fit justify-center flex-row group transition-all items-center hover:bg-white bg-[#003880] border-none py-3 gap-[3.75px] rounded-[8px]" href={process.env.NEXT_PUBLIC_APP_STORE_LINK || "/"}>
                                    <svg className="text-white transition-all group-hover:text-[#313131]" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6781 8.37031C11.6719 7.30469 12.1547 6.50156 13.1297 5.90938C12.5844 5.12813 11.7594 4.69844 10.6719 4.61562C9.64219 4.53437 8.51562 5.21562 8.10312 5.21562C7.66719 5.21562 6.67031 4.64375 5.88594 4.64375C4.26719 4.66875 2.54688 5.93437 2.54688 8.50937C2.54688 9.27031 2.68594 10.0563 2.96406 10.8656C3.33594 11.9313 4.67656 14.5422 6.075 14.5C6.80625 14.4828 7.32344 13.9812 8.275 13.9812C9.19844 13.9812 9.67656 14.5 10.4922 14.5C11.9031 14.4797 13.1156 12.1063 13.4688 11.0375C11.5766 10.1453 11.6781 8.425 11.6781 8.37031ZM10.0359 3.60469C10.8281 2.66406 10.7563 1.80781 10.7328 1.5C10.0328 1.54062 9.22344 1.97656 8.7625 2.5125C8.25469 3.0875 7.95625 3.79844 8.02031 4.6C8.77656 4.65781 9.46719 4.26875 10.0359 3.60469Z" fill="currentColor" />
                                    </svg>
                                    <p className="text-[#F3F3F3] transition-all group-hover:text-[#313131] font-medium leading-[20.25px] text-[16px] whitespace-nowrap"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >Download on App Store</p>
                                </a>
                                <a
                                    style={{
                                        borderColor: "none",
                                        paddingLeft: "18px",
                                        paddingRight: "18px",
                                        textDecoration: "none",
                                    }}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex w-fit justify-center flex-row group items-center hover:bg-white transition-all bg-[#FFFFFF42] border-none py-3 gap-[3.75px] rounded-[8px]" href={process.env.NEXT_PUBLIC_GOOGLE_PLAY_LINK || "/"}>
                                    <svg className="text-white transition-all group-hover:text-[#313131]" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.40698 1.20935L9.19564 8.00002L2.40764 14.7907C2.28714 14.7396 2.18433 14.6543 2.11202 14.5452C2.0397 14.4361 2.00108 14.3082 2.00098 14.1774V1.82335C2.0009 1.69245 2.03935 1.56442 2.11155 1.45524C2.18375 1.34605 2.2865 1.26053 2.40698 1.20935ZM9.66698 8.47135L11.2016 10.006L3.91031 14.228L9.66698 8.47135ZM11.7996 6.33935L13.671 7.42335C13.772 7.48195 13.8559 7.56607 13.9142 7.66727C13.9724 7.76848 14.0031 7.88322 14.0031 8.00002C14.0031 8.11681 13.9724 8.23155 13.9142 8.33276C13.8559 8.43396 13.772 8.51808 13.671 8.57668L11.799 9.66068L10.1383 8.00002L11.7996 6.33935ZM3.91031 1.77202L11.2023 5.99335L9.66698 7.52868L3.91031 1.77202Z" fill="currentColor" />
                                    </svg>

                                    <p className="text-[#F3F3F3] transition-all group-hover:text-[#313131] font-medium leading-[20.25px] text-[16px] whitespace-nowrap"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >Get it on Google Play</p>
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <div className="overflow-hidden h-[340px] md:h-[500px] lg:h-full">
                        <div className="relative flex justify-center items-center min-h-[500px] md:min-h-[800px]">
                            {/* Phone Mockup Image */}
                            <div className="relative flex items-center justify-center z-[2]">
                                <Image
                                    src={heroPhoneMockup}
                                    width={542}
                                    height={602}
                                    alt="SnapMyFine app mockup"
                                    className="w-auto h-[500px] md:h-[680px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                                    sizes="(max-width: 768px) 100vw, 542px"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* schedule section */}
            <Schedule />

            {/* StatsBar section */}
            <StatsBar />

            {/* easy payment section */}
            <EasyPayment />

            {/* dispute section */}
            <Dispute />

            {/* Our Process Section */}
            <OurProcess />


            {/* Why Us Section */}
            <section
                id="why"
                className="relative bg-[#105AE2] py-24 md:py-32 overflow-hidden"
            >
                {/* Grid Pattern Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-100"
                    style={{
                        backgroundImage: `url(${whyUsPattern})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                />

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="text-left  space-y-4 mb-20 md:mb-24">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Image src={logoWhite} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-white text-sm">
                                Why Snapmyfine
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            className="text-white max-w-md"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 800,
                                fontSize: "36px",
                                lineHeight: "41px",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            Everything you need, in one app on your phone
                        </h2>

                        <p
                            className="text-white max-w-2xl"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "0px",
                                verticalAlign: "middle",
                            }}
                        >
                            Built for London drivers who don't have time to figure out the system. Every feature is designed to take something complicated and make it feel manageable.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-y-20">
                        {/* Feature 1 - Photo-based Fine Capture */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="4"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg> */}
                                <Image src={photoCamera} alt="Photo Camera" width={24} height={24} className="flex-shrink-0" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white mb-2"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Instant ticket scanning
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    Point your camera at any London Council PCN and the app reads it in seconds. No typing, no errors, no hunting through council portals.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 - Intelligent OCR Extraction */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13H15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 17H15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                                <Image src={ocrExtraction} alt="OCR Extraction" width={24} height={24} className="flex-shrink-0" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white mb-2"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Honest pay-or-appeal guidance
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    We'll tell you clearly whether you have genuine grounds to challenge and just as clearly when you don't. No false hope, no wasted effort.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 - Automated Payment Workflow */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 10H22"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg> */}
                                <Image src={autoPayment} alt="Auto Payment" width={24} height={24} className="flex-shrink-0" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white mb-2"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Appeal letters that get results
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    If you have a case, the app helps you write a structured, evidence-led dispute; the kind that councils take seriously and are harder to dismiss.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 - Council Integration Bots */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                                <Image src={councilBot} alt="Council Bot" width={24} height={24} className="flex-shrink-0" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white mb-2"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Pay in seconds, no card needed
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    Settle your fine safely through UK Open Banking. It takes seconds, and you get a proper digital receipt the moment it's done.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5 - Payment Confirmation & Receipts */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15L11 17L15 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
                                <Image src={receipts} alt="Receipts" width={24} height={24} className="flex-shrink-0" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white mb-2"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Deadline reminders built in
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    The app keeps track of your fine and reminds you before the important windows close. You focus on your day while  we'll handle the clock-watching.
                                </p>
                            </div>
                        </div>

                        {/* Feature 6 - Pay Now / Pay Later Options */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg> */}
                                <Image src={payNow} alt="Pay Now" width={24} height={24} className="flex-shrink-0" />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-white mb-2"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Your records, always safe
                                </h3>
                                <p
                                    className="text-white/80"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    Every payment and submission is stored securely in the app. If you ever need proof, it's right there — no digging through emails or paperwork.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="relative bg-white py-16 md:py-24 overflow-hidden"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="text-left lg:text-center space-y-6 mb-12 md:mb-16">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                            <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-[#393939] text-sm">
                                From the people who have used it
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            className="text-[#0C2D76] max-w-3xl lg:mx-auto"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 800,
                                fontSize: "38px",
                                lineHeight: "100%",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            What drivers say after using the app
                        </h2>

                        <p
                            className="text-[#393939] max-w-lg lg:mx-auto"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 400,
                                fontSize: "15px",
                                lineHeight: "21px",
                                letterSpacing: "-0.5px",
                                verticalAlign: "middle",
                            }}
                        >
                            From confused and frustrated — to sorted. Here's what London drivers told us.
                        </p>
                    </div>

                    {/* Testimonials Animated Columns - Desktop Only */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                        {/* Column 1 - Scrolls Up */}
                        <TestimonialColumn
                            direction="up"
                            speed={50}
                            testimonials={[
                                {
                                    quote: "I used to spend 20 minutes trying to pay a single parking fine on my council’s website. With SnapMyFine, it’s literally a photo and done. Best app I’ve downloaded this year, saved me from a charge of £160.",
                                    rating: 5.0,
                                    name: "Sarah M., London Driver",
                                    role: "London Driver",
                                    date: "Nov 2, 2025",
                                },
                                {
                                    quote: "Finally, a service that takes away the headache of fine payments. It's secure, transparent, and super easy to use.",
                                    rating: 5.0,
                                    name: "Tom W., Small Business Owner",
                                    role: "Small Business Owner",
                                    date: "Oct 25, 2025",
                                },
                                {
                                    quote: "I was ready to just pay it and move on. The app flagged that the signage wasn't clear; I challenged it, and the PCN was cancelled. Never would have known otherwise.",
                                    rating: 5.0,
                                    name: "Michael R., Tech Enthusiast",
                                    role: "Tech Enthusiast",
                                    date: "Oct 30, 2025",
                                },
                            ]}
                        />

                        {/* Column 2 - Scrolls Down */}
                        <TestimonialColumn
                            direction="down"
                            speed={55}
                            testimonials={[
                                {
                                    quote: "I missed two payments last year because I forgot the due dates. Now SnapMyFine reminds me early and pays automatically. I haven't had a single late fee since.",
                                    rating: 4.9,
                                    name: "James O., Delivery Driver",
                                    role: "Delivery Driver",
                                    date: "Oct 28, 2025",
                                },
                                {
                                    quote: "SnapMyFine saved me during a hectic week. I got a fine on Monday and completely forgot — the app reminded me and paid it before the deadline. Total lifesaver!",
                                    rating: 5.0,
                                    name: "David L., Office Worker",
                                    role: "Office Worker",
                                    date: "Nov 5, 2025",
                                },
                                {
                                    quote: "It’s so refreshing to have something this simple for parking fines. No endless forms or confusing websites just one tap and done.",
                                    rating: 5.0,
                                    name: "Emma S., Taxi Driver",
                                    role: "Taxi Driver",
                                    date: "Oct 18, 2025",
                                },
                            ]}
                        />

                        {/* Column 3 - Scrolls Up */}
                        <TestimonialColumn
                            direction="up"
                            speed={45}
                            testimonials={[
                                {
                                    quote: "It's simple, quick, and actually works. I love that it shows the payment status in real time — gives peace of mind I never had before.",
                                    rating: 4.8,
                                    name: "Aisha K., Commuter",
                                    role: "Commuter",
                                    date: "Nov 4, 2025",
                                },
                                {
                                    quote: "As someone managing a small fleet, I used to waste hours paying fines one by one. Now SnapMyFine handles them automatically, and every transaction is tracked. Brilliant.",
                                    rating: 5.0,
                                    name: "Rachel P., Fleet Manager",
                                    role: "Fleet Manager",
                                    date: "Oct 29, 2025",
                                },
                                {
                                    quote: "I wasn’t sure what to expect, but the whole experience is incredibly smooth. I love that I can see every payment confirmation instantly.",
                                    rating: 5.0,
                                    name: "Chris B., Rideshare Driver",
                                    role: "Rideshare Driver",
                                    date: "Nov 1, 2025",
                                },
                            ]}
                        />
                    </div>

                    {/* Mobile Static Grid */}
                    <div className="lg:hidden grid grid-cols-1 gap-6">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            {/* Testimonial 1 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    I used to spend 20 minutes trying to pay a single parking fine on my council’s website. With SnapMyFine, it’s literally a photo and done. Best app I’ve downloaded this year, saved me from a charge of £160.
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        5.0
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    Sarah M., London Driver
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Nov 2, 2025
                                </p>
                            </div>

                            {/* Testimonial 4 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    Finally, a service that takes away the
                                    headache of fine payments. It's secure,
                                    transparent, and super easy to use.
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        5.0
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    Tom W., Small Business Owner
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Oct 25, 2025
                                </p>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                            {/* Testimonial 2 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    I missed two payments last year because I
                                    forgot the due dates. Now SnapMyFine reminds
                                    me early and pays automatically. I haven't had
                                    a single late fee since.
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        4.9
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    James O., Delivery Driver
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Oct 28, 2025
                                </p>
                            </div>

                            {/* Testimonial 5 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    SnapMyFine saved me during a hectic week. I
                                    got a fine on Monday and completely forgot —
                                    the app reminded me and paid it before the
                                    deadline. Total lifesaver!
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        5.0
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    David L., Office Worker
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Nov 5, 2025
                                </p>
                            </div>

                            {/* Testimonial 7 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    It's so refreshing to have something this
                                    simple for parking fines. No endless forms or
                                    confusing websites just one tap and done.
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        5.0
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    Emma S., Taxi Driver
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Oct 18, 2025
                                </p>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-6">
                            {/* Testimonial 3 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    It's simple, quick, and actually works. I love
                                    that it shows the payment status in real time —
                                    gives peace of mind I never had before.
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        4.8
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    Aisha K., Commuter
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Nov 4, 2025
                                </p>
                            </div>

                            {/* Testimonial 6 */}
                            <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
                                <Image src={testimonialQuote} alt="Quote" width={32} height={32} className="flex-shrink-0 mb-2" />
                                <p
                                    className="text-[#374151] mb-6"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                    }}
                                >
                                    As someone managing a small fleet, I used to
                                    waste hours paying fines one by one. Now
                                    SnapMyFine handles them automatically, and
                                    every transaction is tracked. Brilliant.
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-[#000000]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                        }}
                                    >
                                        5.0
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 1L10 6L15 6.5L11 10.5L12 15.5L8 13L4 15.5L5 10.5L1 6.5L6 6L8 1Z"
                                                    fill="#FFA500"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p
                                    className="text-[#000000] mb-1"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    Rachel P., Fleet Manager
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                    }}
                                >
                                    Oct 29, 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog section */}
            <Blog />

            {/* Organisation section */}
            <Organisation />

            {/* FAQ Section */}
            <section
                id="faqs"
                className="relative bg-[#F9FAFB] py-16 md:py-24 overflow-hidden min-h-[900px]"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-start">
                        {/* Left Column - Header & Illustration */}
                        <div className="space-y-3 lg:sticky lg:top-0">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                                <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                                <span className="text-[#393939] text-sm">Questions answered</span>
                            </div>

                            {/* Main Heading */}
                            <h2
                                className="text-[#0C2D76]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 800,
                                    fontSize: "38px",
                                    lineHeight: "41px",
                                    letterSpacing: "-1px",
                                }}
                            >
                                A few things drivers
                                <br />
                                often want to know
                            </h2>
                            <p
                                className="text-[#666666]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "24px",
                                    letterSpacing: "-1px",
                                }}
                            >
                                If something's holding you back, it's probably answered here.
                            </p>

                            {/* Illustration with decorative elements */}
                            <div className="relative max-w-md mx-auto xl:pt-9 lg:mx-0">
                                {/* Background decorative circles */}
                                <div className="absolute -top-8 -left-8 w-20 h-20 bg-[#E5E7EB] rounded-full opacity-50" />
                                <div className="absolute top-12 -right-4 w-16 h-16 bg-[#E5E7EB] rounded-full opacity-40" />
                                <div className="absolute -bottom-4 left-1/4 w-24 h-24 bg-[#E5E7EB] rounded-full opacity-30" />
                                <div className="absolute bottom-1/3 -right-8 w-32 h-32 bg-[#E5E7EB] rounded-full opacity-25" />

                                {/* Main illustration */}
                                <div className="relative z-10">
                                    <Image
                                        src={faqIllustration}
                                        alt="FAQ Illustration"
                                        width={400}
                                        height={300}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - FAQ Accordion */}
                        <div className="relative">
                            {/* Decorative dotted patterns */}
                            <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    <pattern
                                        id="dots-faq-1"
                                        x="0"
                                        y="0"
                                        width="20"
                                        height="20"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <circle cx="2" cy="2" r="1.5" fill="#2563EB" />
                                    </pattern>
                                    <rect width="80" height="80" fill="url(#dots-faq-1)" />
                                </svg>
                            </div>
                            <div className="absolute top-1/4 -right-8 w-16 h-16 opacity-30">
                                <svg width="64" height="64" viewBox="0 0 64 64">
                                    <pattern
                                        id="dots-faq-2"
                                        x="0"
                                        y="0"
                                        width="16"
                                        height="16"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <circle cx="2" cy="2" r="1.5" fill="#2563EB" />
                                    </pattern>
                                    <rect width="64" height="64" fill="url(#dots-faq-2)" />
                                </svg>
                            </div>

                            <FAQAccordion
                                faqs={[
                                    {
                                        value: "item-1",
                                        question: "Is the app actually free?",
                                        answer:
                                            "Yes. SnapMyFine is free to download on both iOS and Android. There's no subscription and no account required to get started.",
                                    },
                                    {
                                        value: "item-2",
                                        question: "Am I allowed to challenge a Council PCN?",
                                        answer:
                                            "Every driver has a statutory right to challenge. Councils expect appeals — they're built into the process. The app helps you understand whether you have genuine grounds before you decide.",
                                    },
                                    {
                                        value: "item-3",
                                        question: "What if my case isn't strong enough to challenge?",
                                        answer:
                                            "We'll tell you honestly. If it's not worth challenging, we'll say so clearly — and help you pay at the discounted rate before the deadline passes. No pressure either way.",
                                    },
                                    {
                                        value: "item-4",
                                        question: "I've had the fine for a few weeks. Is it too late?",
                                        answer:
                                            "It might not be. Download the app, snap your PCN, and we'll tell you exactly where you stand and what options are still available to you.",
                                    },
                                    {
                                        value: "item-5",
                                        question: "Is my data and payment information safe?",
                                        answer:
                                            "Yes. Payments go through trusted UK Open Banking infrastructure. We never store your card details, and your personal data is never sold or shared with third parties.",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* CTA Section */}
            <CallToAction />

            {/* Footer Section */}
            <Footer />

        </div>
    );
}