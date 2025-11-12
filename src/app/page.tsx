"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import svgPaths from "../lib/landing/svg-im39sd3dvf";
const heroPhoneMockup = "/landing/hero/right-image.png";
const patternImage = "/landing/hero/bg-grid-image.png";

const problemIllustration = "/landing/problemcase/right-image.png";
const problemNumberOne = "/landing/problemcase/numberOne.svg";
const problemNumberTwo = "/landing/problemcase/numberTwo.svg";
const problemNumberThree = "/landing/problemcase/numberThree.svg";
const problemNumberFour = "/landing/problemcase/numberFour.svg";

const processStep1 = "/landing/process/step1.png";
const processStep2 = "/landing/process/step2.png";
const processStep3 = "/landing/process/step3.png";

const whyUsPattern = "/landing/whyus/bgPattern.png";
const councilBot = "/landing/whyus/icons/council_bot.svg";
const payNow = "/landing/whyus/icons/pay_now.svg";
const autoPayment = "/landing/whyus/icons/auto_payment.svg";
const ocrExtraction = "/landing/whyus/icons/ocr_extraction.svg";
const photoCamera = "/landing/whyus/icons/photo_camera.svg";
const receipts = "/landing/whyus/icons/receipts.svg";

const faqIllustration = "/landing/faq/illustration.png";

const logoWhite = "/landing/logo/logoWhite.svg";
const logoColored = "/landing/logo/logoColored.svg";

import styles from "../components/landing/PhoneMockup.module.css";
import { VerticalProgress } from "../components/landing/VerticalProgress";
import { TestimonialColumn } from "../components/landing/TestimonialColumn";
import { FAQAccordion } from "../components/landing/FAQAccordion";

export default function LandingPage() {
    const [email, setEmail] = useState("");
    const [activeStep, setActiveStep] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [formState, setFormState] = useState<'idle' | 'error' | 'success'>('idle');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setFormState('error');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call - replace with actual API endpoint
        try {
            // await submitToWaitlist(email);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
            setFormState('success');
        } catch {
            setFormState('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Reset error state when user starts typing
        if (formState === 'error') {
            setFormState('idle');
        }
    };

    return (
        <div className="relative min-h-screen bg-[#2563EB]">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.7] z-0"
                style={{
                    backgroundImage: `url(${patternImage})`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Background blur circles - COMMENTED OUT to remove shadow under footer */}
            {/* <div className="absolute top-[-300px] left-[-300px] w-[1295px] h-[1295px] pointer-events-none z-0">
        <div className="absolute top-[354px] left-[354px] w-[587px] h-[587px] rounded-full bg-[#3182E9] blur-[177px] opacity-80" />
      </div>
      <div className="absolute top-[-300px] right-[-300px] w-[1295px] h-[1295px] pointer-events-none z-0">
        <div className="absolute top-[354px] left-[354px] w-[587px] h-[587px] rounded-full bg-[#3182E9] blur-[177px] opacity-80" />
      </div>
      <div className="absolute bottom-[-300px] left-[20%] w-[1295px] h-[1295px] pointer-events-none z-0">
        <div className="absolute top-[354px] left-[354px] w-[587px] h-[587px] rounded-full bg-[#3182E9] blur-[177px] opacity-80" />
      </div>
      <div className="absolute bottom-[-300px] right-[10%] w-[1295px] h-[1295px] pointer-events-none z-0">
        <div className="absolute top-[354px] left-[354px] w-[587px] h-[587px] rounded-full bg-[#3182E9] blur-[177px] opacity-80" />
      </div> */}

            {/* Header */}
            <header className="relative z-20 px-4 md:px-8 py-6">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <svg
                            width="29"
                            height="29"
                            viewBox="0 0 29 29"
                            fill="none"
                            className="flex-shrink-0"
                        >
                            <g>
                                <path d={svgPaths.p1c6a0600} fill="white" />
                                <path d={svgPaths.p94a9490} fill="white" />
                                <path d={svgPaths.pc04c280} fill="white" />
                                <path d={svgPaths.p251c2700} fill="white" />
                            </g>
                        </svg>
                        <svg
                            width="137"
                            height="24"
                            viewBox="0 0 137 24"
                            fill="none"
                            className="flex-shrink-0"
                        >
                            <g>
                                <path d={svgPaths.p4fbf500} fill="white" />
                                <path d={svgPaths.pe0d9380} fill="white" />
                                <path d={svgPaths.p5e1b200} fill="white" />
                                <path d={svgPaths.p2da1a1c0} fill="white" />
                                <path d={svgPaths.p1fea0980} fill="white" />
                                <path d={svgPaths.p1e3d9400} fill="white" />
                                <path d={svgPaths.p1b74e580} fill="white" />
                                <path d={svgPaths.p2537d30} fill="white" />
                                <path d={svgPaths.p362e0200} fill="white" />
                                <path d={svgPaths.p1c80d000} fill="white" />
                            </g>
                        </svg>
                    </div>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden md:flex items-center gap-8"
                        style={{
                            fontFamily: "Sora",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                        }}
                    >
                        <a
                            href="#problem"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            The problem
                        </a>
                        <a
                            href="#process"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Our process
                        </a>
                        <a
                            href="#why"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Why Snapmyfine
                        </a>
                        <a
                            href="#testimonials"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Testimonials
                        </a>
                        <a
                            href="#faqs"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            FAQs
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#034496] pb-6">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <svg
                                width="29"
                                height="29"
                                viewBox="0 0 29 29"
                                fill="none"
                                className="flex-shrink-0"
                            >
                                <g>
                                    <path d={svgPaths.p1c6a0600} fill="white" />
                                    <path d={svgPaths.p94a9490} fill="white" />
                                    <path d={svgPaths.pc04c280} fill="white" />
                                    <path d={svgPaths.p251c2700} fill="white" />
                                </g>
                            </svg>
                            <svg
                                width="137"
                                height="24"
                                viewBox="0 0 137 24"
                                fill="none"
                                className="flex-shrink-0"
                            >
                                <g>
                                    <path d={svgPaths.p4fbf500} fill="white" />
                                    <path d={svgPaths.pe0d9380} fill="white" />
                                    <path d={svgPaths.p5e1b200} fill="white" />
                                    <path d={svgPaths.p2da1a1c0} fill="white" />
                                    <path d={svgPaths.p1fea0980} fill="white" />
                                    <path d={svgPaths.p1e3d9400} fill="white" />
                                    <path d={svgPaths.p1b74e580} fill="white" />
                                    <path d={svgPaths.p2537d30} fill="white" />
                                    <path d={svgPaths.p362e0200} fill="white" />
                                    <path d={svgPaths.p1c80d000} fill="white" />
                                </g>
                            </svg>
                        </div>

                        {/* Close Button */}
                        <button
                            className="p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="px-4">
                        <div className="bg-[#0B4F8E] rounded-3xl p-8 space-y-8">
                            <a
                                href="#problem"
                                className="block text-white text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                }}
                            >
                                The problem
                            </a>
                            <a
                                href="#process"
                                className="block text-white text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                }}
                            >
                                Our process
                            </a>
                            <a
                                href="#why"
                                className="block text-white text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                }}
                            >
                                Why Snapmyfine
                            </a>
                            <a
                                href="#testimonials"
                                className="block text-white text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                }}
                            >
                                Testimonials
                            </a>
                            <a
                                href="#faqs"
                                className="block text-white text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                }}
                            >
                                FAQs
                            </a>
                        </div>
                    </nav>

                    {/* Join Waitlist Button */}
                    <div className="px-4 pt-4">
                        <a
                            href="#waitlist"
                            className="block w-full py-4 bg-white text-[#034496] text-center rounded-xl"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 600,
                                fontSize: "16px",
                            }}
                        >
                            Join the waitlist
                        </a>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="relative z-10 px-4 md:px-8 pt-12 md:pt-20 pb-16 md:pb-32">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 md:space-y-10">
                        <div className="space-y-2">
                            <h1
                                className="text-white text-[48px] md:text-[64px]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 700,
                                    lineHeight: "115%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                Snap it, Pay it, Sorted.
                            </h1>
                        </div>

                        {/* <div className="space-y-4 md:space-y-6">
                            <p
                                className="text-white/90 max-w-md"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "22.5px",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                Pay your parking fines in{" "}
                                <span style={{ fontWeight: 600 }}>
                                    60 seconds
                                </span>
                                . Just take a photo, and SnapMyFine automates
                                the rest.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-xl"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full md:flex-1 px-5 py-3.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className={`w-full md:w-auto px-8 py-3.5 transition-colors rounded-lg whitespace-nowrap text-center ${email
                                        ? "bg-white text-[#2563EB] hover:bg-white/90"
                                        : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10"
                                        }`}
                                >
                                    Join the waitlist
                                </button>
                            </form>

                            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                                By signing up, you agree to receive updates
                                about SnapMyFine. Unsubscribe anytime.
                            </p>
                        </div> */}
                        <div className="space-y-4 md:space-y-6">
                            <p
                                className="text-white/90 max-w-md"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "22.5px",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                Pay your parking fines in{" "}
                                <span style={{ fontWeight: 600 }}>
                                    60 seconds
                                </span>
                                . Just take a photo, and SnapMyFine automates
                                the rest.
                            </p>

                            {/* Email Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-3 max-w-xl"
                            >
                                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder="Enter your email"
                                            className={`w-full px-5 py-3.5 rounded-lg backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all ${formState === 'success'
                                                    ? 'bg-white/10 border border-white/30 pr-12'
                                                    : 'bg-white/10 border border-white/30'
                                                }`}
                                            required
                                            disabled={isSubmitting || formState === 'success'}
                                        />
                                        {/* Success checkmark icon */}
                                        {formState === 'success' && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="text-green-400"
                                                >
                                                    <circle cx="12" cy="12" r="11" fill="currentColor" />
                                                    <path
                                                        d="M7 12L10 15L17 8"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || formState === 'success'}
                                        className={`w-full md:w-auto px-8 py-3.5 transition-colors rounded-lg whitespace-nowrap text-center ${email && formState !== 'success'
                                                ? "bg-white text-[#2563EB] hover:bg-white/90"
                                                : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10"
                                            } ${(isSubmitting || formState === 'success') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? 'Joining...' : 'Join the waitlist'}
                                    </button>
                                </div>

                                {/* Error Message */}
                                {formState === 'error' && (
                                    <div className="flex items-center gap-2 text-red-400/90">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="flex-shrink-0"
                                        >
                                            <circle cx="10" cy="10" r="9" fill="currentColor" />
                                            <path
                                                d="M10 6V10M10 14H10.01"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className="text-sm">Invalid email format, try again</span>
                                    </div>
                                )}

                                {/* Success Message */}
                                {formState === 'success' && (
                                    <p className="text-white/90 text-sm">
                                        You've been added to the waitlist, you will receive an email.
                                    </p>
                                )}
                            </form>

                            {/* Agreement Text */}
                            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                                {formState === 'success'
                                    ? 'By joining the waitlist, you agree to receive updates about SnapMyFine.'
                                    : 'By signing up, you agree to receive updates about SnapMyFine. Unsubscribe anytime.'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <div className={styles.phoneSection}>
                        {/* Large transparent circle background */}
                        <div className={styles.circleBackground}></div>

                        {/* Phone Mockup Image */}
                        <div className={styles.phoneContainer}>
                            <Image
                                src={heroPhoneMockup}
                                width={542}
                                height={602}
                                alt="SnapMyFine app mockup"
                                className={styles.heroPhone}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Problem Section */}
            <section
                id="problem"
                className="relative bg-white py-16 md:py-24"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center lg:justify-between">
                        {/* Left Content */}
                        <div className="space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-[#EBF3FF] rounded-full border border-[#2563EB]/20">
                                <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                                <span className="text-[#2563EB] text-sm">
                                    The problem
                                </span>
                            </div>

                            {/* Heading */}
                            <h2
                                className="text-[#000000]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                    fontSize: "40px",
                                    lineHeight: "57.6px",
                                    letterSpacing: "-1px",
                                    verticalAlign: "middle",
                                }}
                            >
                                Paying parking fines shouldn't be hard
                            </h2>

                            {/* Description */}
                            <p
                                className="text-[#6B7280]"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "27.2px",
                                    letterSpacing: "0px",
                                    verticalAlign: "middle",
                                }}
                            >
                                Across the UK, drivers waste time on multiple
                                council portals, typing long PCN numbers, and
                                hoping payments go through.
                            </p>

                            {/* Subheading */}
                            <h3
                                className="text-[#1970DF]"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "27.2px",
                                    letterSpacing: "0px",
                                    verticalAlign: "middle",
                                }}
                            >
                                What drivers struggle with:
                            </h3>

                            {/* Problem Cards Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Card 1 */}
                                <div
                                    className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                    style={{
                                        gap: "19px",
                                        padding: "21px 22px",
                                        border: "1px solid #0464DD17",
                                        boxShadow: "0px 4px 12px 0px #BABABA40",
                                        minHeight: "142px",
                                    }}
                                >
                                    <Image src={problemNumberOne} alt="Problem 1" width={32} height={32} className="flex-shrink-0" />
                                    <p
                                        className="text-[#374151]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        Multiple council portals for a single fine
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div
                                    className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                    style={{
                                        gap: "19px",
                                        padding: "21px 22px",
                                        border: "1px solid #0464DD17",
                                        boxShadow: "0px 4px 12px 0px #BABABA40",
                                        minHeight: "142px",
                                    }}
                                >
                                    <Image src={problemNumberTwo} alt="Problem 2" width={32} height={32} className="flex-shrink-0" />
                                    <p
                                        className="text-[#374151]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        Typing long PCN and vehicle details
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div
                                    className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                    style={{
                                        gap: "19px",
                                        padding: "21px 22px",
                                        border: "1px solid #0464DD17",
                                        boxShadow: "0px 4px 12px 0px #BABABA40",
                                        minHeight: "142px",
                                    }}
                                >
                                    <Image src={problemNumberThree} alt="Problem 3" width={32} height={32} className="flex-shrink-0" />
                                    <p
                                        className="text-[#374151]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        Missing deadlines that double fines
                                    </p>
                                </div>

                                {/* Card 4 */}
                                <div
                                    className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                    style={{
                                        gap: "19px",
                                        padding: "21px 22px",
                                        border: "1px solid #0464DD17",
                                        boxShadow: "0px 4px 12px 0px #BABABA40",
                                        minHeight: "142px",
                                    }}
                                >
                                    <Image src={problemNumberFour} alt="Problem 4" width={32} height={32} className="flex-shrink-0" />
                                    <p
                                        className="text-[#374151]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        No confirmation after payment
                                    </p>
                                </div>
                            </div>

                            {/* Closing Text */}
                            <p
                                className="text-[#6B7280]"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                Sounds familiar?{" "}
                                <span
                                    className="text-[#2563EB]"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Snapmyfine makes all these disappear
                                </span>
                            </p>
                        </div>

                        {/* Right Content - Illustration */}
                        <div className="flex justify-center lg:justify-end mt-12 lg:mt-0">
                            <Image
                                src={problemIllustration}
                                alt="Person at parking meter illustration"
                                width={562}
                                height={400}
                                style={{
                                    maxWidth: "561.59px",
                                    paddingTop: "29.65px",
                                    paddingBottom: "29.66px",
                                }}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section
                id="process"
                className="relative bg-[#F9FAFB] py-16 md:py-24"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="text-center space-y-6 mb-16">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                            <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-[#2563EB] text-sm">
                                Our process
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            className="text-[#000000] max-w-3xl mx-auto"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 400,
                                fontSize: "40px",
                                lineHeight: "57.6px",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            How to pay your parking fine in three simple steps
                        </h2>

                        {/* Subheading */}
                        <p
                            className="text-[#6B7280]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "27.2px",
                                letterSpacing: "0px",
                                verticalAlign: "middle",
                            }}
                        >
                            No logins, no forms, no hassle. Just snap and
                            done.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="lg:grid lg:grid-cols-[27.4%_72.6%] lg:gap-12 lg:items-center lg:justify-between">
                        {/* Left Content - Steps */}
                        <div className="w-full lg:min-w-[600px] lg:max-w-[600px]">
                            {/* Step 1 */}
                            <div className="flex gap-6">
                                {/* Left - Step Indicator */}
                                <VerticalProgress
                                    stepNumber={1}
                                    isActive={activeStep === 1}
                                    hasLine={true}
                                    onClick={() => setActiveStep(1)}
                                />

                                {/* Right - Content */}
                                <div className="flex-1 pb-8">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-12 h-12 bg-[#EBF3FF] rounded-xl flex items-center justify-center flex-shrink-0">
                                            {activeStep === 1 ? (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8333 14.9999C20.5278 14.9999 20.2917 14.861 20.125 14.5833C19.9583 14.3055 19.9583 14.0277 20.125 13.7499L25 5.29159C25.2222 4.93047 25.5 4.71547 25.8333 4.64659C26.1667 4.5777 26.5278 4.63992 26.9167 4.83325C28.8333 5.69436 30.5278 6.89547 32 8.43659C33.4722 9.9777 34.6111 11.721 35.4167 13.6666C35.5556 14.0277 35.5345 14.3405 35.3533 14.6049C35.1722 14.8694 34.8878 15.001 34.5 14.9999H20.8333ZM14.875 17.0416L9.87501 8.37492C9.65279 8.01381 9.59723 7.6527 9.70834 7.29159C9.81945 6.93047 10.0417 6.63881 10.375 6.41659C11.7083 5.47214 13.1878 4.72214 14.8133 4.16659C16.4389 3.61103 18.1678 3.33325 20 3.33325C20.4167 3.33325 20.875 3.35436 21.375 3.39659C21.875 3.43881 22.2917 3.48714 22.625 3.54159C23.0139 3.59714 23.2711 3.76381 23.3967 4.04159C23.5222 4.31936 23.4872 4.62492 23.2917 4.95825L16.3333 17.0416C16.1667 17.3194 15.9239 17.4583 15.605 17.4583C15.2861 17.4583 15.0428 17.3194 14.875 17.0416ZM4.75001 23.3333C4.44445 23.3333 4.16668 23.2294 3.91668 23.0216C3.66668 22.8138 3.5139 22.5566 3.45834 22.2499C3.40279 21.9433 3.36834 21.6099 3.35501 21.2499C3.34168 20.8899 3.33445 20.4733 3.33334 19.9999C3.33334 18.2499 3.61834 16.5071 4.18834 14.7716C4.75834 13.036 5.64001 11.3899 6.83334 9.83325C7.1389 9.44436 7.49334 9.24992 7.89668 9.24992C8.30001 9.24992 8.61223 9.45825 8.83334 9.87492L15.8333 22.0833C16 22.361 15.9933 22.6388 15.8133 22.9166C15.6333 23.1944 15.39 23.3333 15.0833 23.3333H4.75001ZM13.0833 35.1666C11.25 34.2777 9.56945 33.0694 8.04168 31.5416C6.5139 30.0138 5.36112 28.2777 4.58334 26.3333C4.44445 25.9721 4.47223 25.6599 4.66668 25.3966C4.86112 25.1333 5.15279 25.001 5.54168 24.9999H19.125C19.4306 24.9999 19.6667 25.1388 19.8333 25.4166C20 25.6944 20 25.9721 19.8333 26.2499L15.0417 34.6249C14.8195 34.986 14.5417 35.2221 14.2083 35.3333C13.875 35.4444 13.5 35.3888 13.0833 35.1666ZM20 36.6666C19.6111 36.6666 19.1733 36.6455 18.6867 36.6033C18.2 36.561 17.7767 36.5127 17.4167 36.4583C17.0278 36.4027 16.7639 36.236 16.625 35.9583C16.4861 35.6805 16.5139 35.3749 16.7083 35.0416L23.5833 23.0416C23.75 22.7638 24.0278 22.6249 24.4167 22.6249C24.8056 22.6249 25.0833 22.7638 25.25 23.0416L30.1667 31.5833C30.3611 31.8888 30.4239 32.2221 30.355 32.5833C30.2861 32.9444 30.0567 33.2777 29.6667 33.5833C28.3889 34.5277 26.8961 35.2777 25.1883 35.8333C23.4806 36.3888 21.7511 36.6666 20 36.6666ZM31.2917 30.2083L24.2083 17.9166C24.0417 17.6388 24.0489 17.361 24.23 17.0833C24.4111 16.8055 24.6539 16.6666 24.9583 16.6666H35.25C35.5556 16.6666 35.8333 16.771 36.0833 16.9799C36.3333 17.1888 36.4861 17.4455 36.5417 17.7499C36.5972 18.0544 36.6317 18.3877 36.645 18.7499C36.6583 19.1121 36.6656 19.5288 36.6667 19.9999C36.6667 21.7499 36.3817 23.5071 35.8117 25.2716C35.2417 27.036 34.36 28.6816 33.1667 30.2083C32.9445 30.5138 32.625 30.6738 32.2083 30.6883C31.7917 30.7027 31.4861 30.5427 31.2917 30.2083Z" fill="#105ae2" /></svg>
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8334 14.9999C20.5278 14.9999 20.2917 14.861 20.125 14.5833C19.9584 14.3055 19.9584 14.0277 20.125 13.7499L25 5.29159C25.2223 4.93047 25.5 4.71547 25.8334 4.64659C26.1667 4.5777 26.5278 4.63992 26.9167 4.83325C28.8334 5.69436 30.5278 6.89547 32 8.43659C33.4723 9.9777 34.6112 11.721 35.4167 13.6666C35.5556 14.0277 35.5345 14.3405 35.3534 14.6049C35.1723 14.8694 34.8878 15.001 34.5 14.9999H20.8334ZM14.875 17.0416L9.87504 8.37492C9.65282 8.01381 9.59726 7.6527 9.70837 7.29159C9.81949 6.93047 10.0417 6.63881 10.375 6.41659C11.7084 5.47214 13.1878 4.72214 14.8134 4.16659C16.4389 3.61103 18.1678 3.33325 20 3.33325C20.4167 3.33325 20.875 3.35436 21.375 3.39659C21.875 3.43881 22.2917 3.48714 22.625 3.54159C23.0139 3.59714 23.2712 3.76381 23.3967 4.04159C23.5223 4.31936 23.4873 4.62492 23.2917 4.95825L16.3334 17.0416C16.1667 17.3194 15.9239 17.4583 15.605 17.4583C15.2862 17.4583 15.0428 17.3194 14.875 17.0416ZM4.75004 23.3333C4.44449 23.3333 4.16671 23.2294 3.91671 23.0216C3.66671 22.8138 3.51393 22.5566 3.45837 22.2499C3.40282 21.9433 3.36837 21.6099 3.35504 21.2499C3.34171 20.8899 3.33449 20.4733 3.33337 19.9999C3.33337 18.2499 3.61837 16.5071 4.18837 14.7716C4.75837 13.036 5.64004 11.3899 6.83337 9.83325C7.13893 9.44436 7.49337 9.24992 7.89671 9.24992C8.30004 9.24992 8.61226 9.45825 8.83337 9.87492L15.8334 22.0833C16 22.361 15.9934 22.6388 15.8134 22.9166C15.6334 23.1944 15.39 23.3333 15.0834 23.3333H4.75004ZM13.0834 35.1666C11.25 34.2777 9.56949 33.0694 8.04171 31.5416C6.51393 30.0138 5.36115 28.2777 4.58337 26.3333C4.44449 25.9721 4.47226 25.6599 4.66671 25.3966C4.86115 25.1333 5.15282 25.001 5.54171 24.9999H19.125C19.4306 24.9999 19.6667 25.1388 19.8334 25.4166C20 25.6944 20 25.9721 19.8334 26.2499L15.0417 34.6249C14.8195 34.986 14.5417 35.2221 14.2084 35.3333C13.875 35.4444 13.5 35.3888 13.0834 35.1666ZM20 36.6666C19.6112 36.6666 19.1734 36.6455 18.6867 36.6033C18.2 36.561 17.7767 36.5127 17.4167 36.4583C17.0278 36.4027 16.7639 36.236 16.625 35.9583C16.4862 35.6805 16.5139 35.3749 16.7084 35.0416L23.5834 23.0416C23.75 22.7638 24.0278 22.6249 24.4167 22.6249C24.8056 22.6249 25.0834 22.7638 25.25 23.0416L30.1667 31.5833C30.3612 31.8888 30.4239 32.2221 30.355 32.5833C30.2862 32.9444 30.0567 33.2777 29.6667 33.5833C28.3889 34.5277 26.8962 35.2777 25.1884 35.8333C23.4806 36.3888 21.7512 36.6666 20 36.6666ZM31.2917 30.2083L24.2084 17.9166C24.0417 17.6388 24.0489 17.361 24.23 17.0833C24.4112 16.8055 24.6539 16.6666 24.9584 16.6666H35.25C35.5556 16.6666 35.8334 16.771 36.0834 16.9799C36.3334 17.1888 36.4862 17.4455 36.5417 17.7499C36.5973 18.0544 36.6317 18.3877 36.645 18.7499C36.6584 19.1121 36.6656 19.5288 36.6667 19.9999C36.6667 21.7499 36.3817 23.5071 35.8117 25.2716C35.2417 27.036 34.36 28.6816 33.1667 30.2083C32.9445 30.5138 32.625 30.6738 32.2084 30.6883C31.7917 30.7027 31.4862 30.5427 31.2917 30.2083Z" fill="#caccce" /></svg>
                                            )}
                                        </div>
                                    </div>
                                    <h3
                                        className="text-[#000000] mb-3"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 400,
                                            fontSize: "22px",
                                            lineHeight: "130%",
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        Take a clear photo of your ticket
                                    </h3>
                                    <p
                                        className="text-[#6B7280]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        Use your phone to capture your parking or
                                        PCN ticket. SnapMyFine automatically detects
                                        all visible details — no typing or forms
                                        required.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-6">
                                {/* Left - Step Indicator */}
                                <VerticalProgress
                                    stepNumber={2}
                                    isActive={activeStep === 2}
                                    hasLine={true}
                                    onClick={() => setActiveStep(2)}
                                />

                                {/* Right - Content */}
                                <div className="flex-1 pb-8">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                                            {activeStep === 2 ? (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 25V33.345C34.9996 33.7838 34.8251 34.2045 34.5148 34.5148C34.2045 34.8251 33.7838 34.9996 33.345 35H6.65504C6.21611 35 5.79515 34.8256 5.48478 34.5153C5.17441 34.2049 5.00004 33.7839 5.00004 33.345V25H35ZM3.33337 18.3333H36.6667V21.6667H3.33337V18.3333ZM35 15H5.00004V6.655C5.00004 5.74167 5.74171 5 6.65504 5H33.345C34.2584 5 35 5.74167 35 6.655V15Z" fill="#105ae2" /></svg>
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 25V33.345C34.9996 33.7838 34.8251 34.2045 34.5148 34.5148C34.2045 34.8251 33.7838 34.9996 33.345 35H6.65501C6.21608 35 5.79512 34.8256 5.48475 34.5153C5.17438 34.2049 5.00001 33.7839 5.00001 33.345V25H35ZM3.33334 18.3333H36.6667V21.6667H3.33334V18.3333ZM35 15H5.00001V6.655C5.00001 5.74167 5.74168 5 6.65501 5H33.345C34.2583 5 35 5.74167 35 6.655V15Z" fill="#caccce" /></svg>
                                            )}
                                        </div>
                                    </div>
                                    <h3
                                        className="text-[#000000] mb-3"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 400,
                                            fontSize: "22px",
                                            lineHeight: "130%",
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        We process it through OCR technology
                                    </h3>
                                    <p
                                        className="text-[#6B7280]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        Our AI-powered OCR reads your ticket
                                        instantly, identifying your council, fine
                                        amount, and payment deadline with complete
                                        accuracy.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-6">
                                {/* Left - Step Indicator */}
                                <VerticalProgress
                                    stepNumber={3}
                                    isActive={activeStep === 3}
                                    hasLine={false}
                                    onClick={() => setActiveStep(3)}
                                />

                                {/* Right - Content */}
                                <div className="flex-1">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                                            {activeStep === 3 ? (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M37.1001 5.58333C36.9436 5.40039 36.7493 5.25352 36.5307 5.15282C36.312 5.05212 36.0741 4.99998 35.8334 5H20.8334C20.5967 5.0003 20.3629 5.05099 20.1474 5.1487C19.9318 5.2464 19.7396 5.38889 19.5834 5.56667C19.4268 5.745 19.3101 5.95472 19.2412 6.18179C19.1722 6.40886 19.1525 6.64804 19.1834 6.88333L20.8501 19.3833C20.8785 19.6022 20.9498 19.8133 21.0598 20.0046C21.1699 20.196 21.3165 20.3637 21.4914 20.4984C21.6663 20.633 21.866 20.7319 22.0791 20.7894C22.2922 20.8469 22.5145 20.8618 22.7334 20.8333C22.9523 20.8049 23.1634 20.7336 23.3547 20.6236C23.546 20.5135 23.7138 20.3669 23.8484 20.192C23.9831 20.0171 24.082 19.8174 24.1394 19.6043C24.1969 19.3912 24.2118 19.1689 24.1834 18.95L22.8334 8.8C22.824 8.74307 22.8281 8.68472 22.8455 8.6297C22.8629 8.57467 22.893 8.52453 22.9334 8.48333C22.9684 8.44086 23.0114 8.40574 23.06 8.37999C23.1087 8.35425 23.1619 8.33839 23.2167 8.33333H33.3334C33.3945 8.32992 33.4555 8.34186 33.5108 8.36806C33.5661 8.39426 33.614 8.43389 33.6501 8.48333C33.6908 8.52777 33.7209 8.58084 33.7382 8.63856C33.7555 8.69628 33.7596 8.75716 33.7501 8.81667L31.9334 19.7667C31.8605 20.2087 31.9661 20.6616 32.2271 21.0257C32.4881 21.3899 32.883 21.6354 33.3251 21.7083C33.5439 21.7444 33.7678 21.7371 33.9838 21.6867C34.1998 21.6363 34.4038 21.5439 34.5841 21.4146C34.9482 21.1536 35.1938 20.7587 35.2667 20.3167L37.5001 6.98333C37.5437 6.73492 37.5303 6.47985 37.461 6.23734C37.3917 5.99484 37.2683 5.77122 37.1001 5.58333Z" fill="#105ae2" /><path d="M31.6667 23.3332H21.6667C21.5891 23.336 21.5125 23.3152 21.4471 23.2735C21.3816 23.2319 21.3303 23.1713 21.3 23.0999L19.7 19.9999C19.6395 19.8738 19.5483 19.765 19.4347 19.6834C19.3211 19.6019 19.1888 19.5502 19.05 19.5332C18.9099 19.5171 18.768 19.5361 18.6371 19.5884C18.5062 19.6408 18.3903 19.7249 18.3 19.8332L15.1667 23.6832C14.9089 23.9564 14.558 24.1229 14.1833 24.1499H12.5167C12.4044 24.1476 12.2929 24.1681 12.1887 24.21C12.0846 24.2519 11.99 24.3144 11.9106 24.3938C11.8312 24.4732 11.7687 24.5678 11.7267 24.6719C11.6848 24.7761 11.6644 24.8876 11.6667 24.9999V34.9999C11.6639 35.1297 11.6929 35.2583 11.7509 35.3744C11.809 35.4906 11.8945 35.5908 12 35.6666C15.8333 38.5499 18.8 39.9999 20.8333 39.9999H30.0833C30.809 40.1227 31.554 39.9582 32.1606 39.5414C32.7672 39.1246 33.1878 38.488 33.3333 37.7666C34.1453 33.8288 34.7021 29.8428 35 25.8332C35 24.5832 33.85 23.3332 31.6667 23.3332ZM8.05 22.4999H2.91667C2.80616 22.4999 2.70018 22.5438 2.62204 22.6219C2.5439 22.7001 2.5 22.8061 2.5 22.9166V37.9166C2.5 38.0271 2.5439 38.133 2.62204 38.2112C2.70018 38.2893 2.80616 38.3332 2.91667 38.3332H8.05C8.18938 38.3496 8.33066 38.3365 8.46463 38.2947C8.5986 38.2528 8.72227 38.1833 8.8276 38.0906C8.93292 37.9978 9.01755 37.8839 9.07596 37.7563C9.13438 37.6287 9.16529 37.4902 9.16667 37.3499V23.4832C9.16529 23.3429 9.13438 23.2044 9.07596 23.0768C9.01755 22.9492 8.93292 22.8353 8.8276 22.7426C8.72227 22.6498 8.5986 22.5803 8.46463 22.5385C8.33066 22.4967 8.18938 22.4835 8.05 22.4999ZM25.8333 14.9999C25.8333 15.6629 26.0967 16.2988 26.5656 16.7677C27.0344 17.2365 27.6703 17.4999 28.3333 17.4999C28.9964 17.4999 29.6323 17.2365 30.1011 16.7677C30.5699 16.2988 30.8333 15.6629 30.8333 14.9999C30.8333 14.3369 30.5699 13.701 30.1011 13.2321C29.6323 12.7633 28.9964 12.4999 28.3333 12.4999C27.6703 12.4999 27.0344 12.7633 26.5656 13.2321C26.0967 13.701 25.8333 14.3369 25.8333 14.9999ZM16.6667 18.3332C16.9099 18.3364 17.1509 18.2862 17.3727 18.1863C17.5944 18.0864 17.7917 17.9392 17.9505 17.7549C18.1093 17.5707 18.2259 17.3539 18.292 17.1198C18.3582 16.8857 18.3723 16.64 18.3333 16.3999L16.2167 3.81656C16.1756 3.70924 16.1756 3.59055 16.2167 3.48323C16.2675 3.41543 16.3378 3.36474 16.4182 3.33794C16.4986 3.31114 16.5853 3.3095 16.6667 3.33323H30C30.442 3.33323 30.866 3.15763 31.1785 2.84507C31.4911 2.53251 31.6667 2.10859 31.6667 1.66656C31.6667 1.22453 31.4911 0.80061 31.1785 0.48805C30.866 0.175489 30.442 -0.00010552 30 -0.00010552H14.1667C13.9234 -0.00324261 13.6825 0.0469008 13.4607 0.146804C13.2389 0.246707 13.0417 0.393948 12.8828 0.57819C12.724 0.762431 12.6074 0.979206 12.5413 1.2133C12.4752 1.44738 12.4611 1.69311 12.5 1.93323L15 16.9332C15.0639 17.3276 15.2673 17.6859 15.5732 17.9429C15.8791 18.1998 16.2672 18.3384 16.6667 18.3332Z" fill="#105ae2" /></g><defs><clipPath id="a"><rect width="40" height="40" fill="#fff" /></clipPath></defs></svg>
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M37.1 5.58333C36.9435 5.40039 36.7493 5.25352 36.5306 5.15282C36.3119 5.05212 36.0741 4.99998 35.8333 5H20.8333C20.5967 5.0003 20.3628 5.05099 20.1473 5.1487C19.9318 5.2464 19.7395 5.38889 19.5833 5.56667C19.4268 5.745 19.3101 5.95472 19.2411 6.18179C19.1721 6.40886 19.1524 6.64804 19.1833 6.88333L20.85 19.3833C20.8784 19.6022 20.9497 19.8133 21.0598 20.0046C21.1698 20.196 21.3165 20.3637 21.4914 20.4984C21.6662 20.633 21.8659 20.7319 22.079 20.7894C22.2921 20.8469 22.5145 20.8618 22.7333 20.8333C22.9522 20.8049 23.1633 20.7336 23.3546 20.6236C23.546 20.5135 23.7137 20.3669 23.8484 20.192C23.983 20.0171 24.0819 19.8174 24.1394 19.6043C24.1968 19.3912 24.2118 19.1689 24.1833 18.95L22.8333 8.8C22.8239 8.74307 22.828 8.68472 22.8454 8.6297C22.8628 8.57467 22.8929 8.52453 22.9333 8.48333C22.9683 8.44086 23.0114 8.40574 23.06 8.37999C23.1086 8.35425 23.1619 8.33839 23.2167 8.33333H33.3333C33.3944 8.32992 33.4554 8.34186 33.5107 8.36806C33.566 8.39426 33.6139 8.43389 33.65 8.48333C33.6907 8.52777 33.7208 8.58084 33.7381 8.63856C33.7555 8.69628 33.7595 8.75716 33.75 8.81667L31.9333 19.7667C31.8604 20.2087 31.966 20.6616 32.227 21.0257C32.488 21.3899 32.883 21.6354 33.325 21.7083C33.5439 21.7444 33.7677 21.7371 33.9837 21.6867C34.1998 21.6363 34.4037 21.5439 34.584 21.4146C34.9482 21.1536 35.1937 20.7587 35.2667 20.3167L37.5 6.98333C37.5436 6.73492 37.5302 6.47985 37.461 6.23734C37.3917 5.99484 37.2682 5.77122 37.1 5.58333Z" fill="#caccce" /><path d="M31.6667 23.3332H21.6667C21.5891 23.336 21.5125 23.3152 21.4471 23.2735C21.3816 23.2319 21.3303 23.1713 21.3 23.0999L19.7 19.9999C19.6395 19.8738 19.5483 19.765 19.4347 19.6834C19.3211 19.6019 19.1888 19.5502 19.05 19.5332C18.9099 19.5171 18.768 19.5361 18.6371 19.5884C18.5062 19.6408 18.3903 19.7249 18.3 19.8332L15.1667 23.6832C14.9089 23.9564 14.558 24.1229 14.1833 24.1499H12.5167C12.4044 24.1476 12.2929 24.1681 12.1887 24.21C12.0846 24.2519 11.99 24.3144 11.9106 24.3938C11.8312 24.4732 11.7687 24.5678 11.7267 24.6719C11.6848 24.7761 11.6644 24.8876 11.6667 24.9999V34.9999C11.6639 35.1297 11.6929 35.2583 11.7509 35.3744C11.809 35.4906 11.8945 35.5908 12 35.6666C15.8333 38.5499 18.8 39.9999 20.8333 39.9999H30.0833C30.809 40.1227 31.554 39.9582 32.1606 39.5414C32.7672 39.1246 33.1878 38.488 33.3333 37.7666C34.1453 33.8288 34.7021 29.8428 35 25.8332C35 24.5832 33.85 23.3332 31.6667 23.3332ZM8.05 22.4999H2.91667C2.80616 22.4999 2.70018 22.5438 2.62204 22.6219C2.5439 22.7001 2.5 22.8061 2.5 22.9166V37.9166C2.5 38.0271 2.5439 38.133 2.62204 38.2112C2.70018 38.2893 2.80616 38.3332 2.91667 38.3332H8.05C8.18938 38.3496 8.33066 38.3365 8.46463 38.2947C8.5986 38.2528 8.72227 38.1833 8.8276 38.0906C8.93292 37.9978 9.01755 37.8839 9.07596 37.7563C9.13438 37.6287 9.16529 37.4902 9.16667 37.3499V23.4832C9.16529 23.3429 9.13438 23.2044 9.07596 23.0768C9.01755 22.9492 8.93292 22.8353 8.8276 22.7426C8.72227 22.6498 8.5986 22.5803 8.46463 22.5385C8.33066 22.4967 8.18938 22.4835 8.05 22.4999ZM25.8333 14.9999C25.8333 15.6629 26.0967 16.2988 26.5656 16.7677C27.0344 17.2365 27.6703 17.4999 28.3333 17.4999C28.9964 17.4999 29.6323 17.2365 30.1011 16.7677C30.5699 16.2988 30.8333 15.6629 30.8333 14.9999C30.8333 14.3369 30.5699 13.701 30.1011 13.2321C29.6323 12.7633 28.9964 12.4999 28.3333 12.4999C27.6703 12.4999 27.0344 12.7633 26.5656 13.2321C26.0967 13.701 25.8333 14.3369 25.8333 14.9999ZM16.6667 18.3332C16.9099 18.3364 17.1509 18.2862 17.3727 18.1863C17.5944 18.0864 17.7917 17.9392 17.9505 17.7549C18.1093 17.5707 18.2259 17.3539 18.292 17.1198C18.3582 16.8857 18.3723 16.64 18.3333 16.3999L16.2167 3.81656C16.1756 3.70924 16.1756 3.59055 16.2167 3.48323C16.2675 3.41543 16.3378 3.36474 16.4182 3.33794C16.4986 3.31114 16.5853 3.3095 16.6667 3.33323H30C30.442 3.33323 30.866 3.15763 31.1785 2.84507C31.4911 2.53251 31.6667 2.10859 31.6667 1.66656C31.6667 1.22453 31.4911 0.80061 31.1785 0.48805C30.866 0.175489 30.442 -0.00010552 30 -0.00010552H14.1667C13.9234 -0.00324261 13.6825 0.0469008 13.4607 0.146804C13.2389 0.246707 13.0417 0.393948 12.8828 0.57819C12.724 0.762431 12.6074 0.979206 12.5413 1.2133C12.4752 1.44738 12.4611 1.69311 12.5 1.93323L15 16.9332C15.0639 17.3276 15.2673 17.6859 15.5732 17.9429C15.8791 18.1998 16.2672 18.3384 16.6667 18.3332Z" fill="#caccce" /></g><defs><clipPath id="a"><rect width="40" height="40" fill="#fff" /></clipPath></defs></svg>
                                            )}
                                        </div>
                                    </div>
                                    <h3
                                        className="text-[#000000] mb-3"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 400,
                                            fontSize: "22px",
                                            lineHeight: "130%",
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        Secure payment completed
                                    </h3>
                                    <p
                                        className="text-[#6B7280] mb-4"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        Your fine is paid safely through Open
                                        Banking. You can track your payment status
                                        in real time and receive instant
                                        confirmation with a digital receipt.
                                    </p>
                                    <p
                                        className="text-[#2563EB]"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: "16px",
                                            lineHeight: "27.2px",
                                            letterSpacing: "0px",
                                            verticalAlign: "middle",
                                        }}
                                    >
                                        No credit card needed!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Phone Mockup */}
                        {/* Desktop: Side by side, Mobile: Below steps */}
                        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
                            {/* Blue gradient circle background - visible on mobile */}
                            <div className="absolute lg:hidden inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[300px] h-[300px] rounded-full bg-[#2563EB] opacity-30 blur-[80px]" />
                            </div>

                            {/* Phone Image - Conditional rendering based on active step for desktop */}
                            <div className="relative z-10 h-full flex items-center">
                                {/* Mobile: Always show step 1 image */}
                                <Image
                                    src={processStep1}
                                    width={973}
                                    height={730}
                                    alt="Process illustration"
                                    className="h-auto w-full max-w-[480px] lg:hidden"
                                />

                                {/* Desktop: Show based on active step */}
                                {activeStep === 1 && (
                                    <Image
                                        src={processStep1}
                                        width={973}
                                        height={730}
                                        alt="Step 1: Take a photo"
                                        className="hidden lg:block h-auto w-full max-w-[840px]"
                                    />
                                )}
                                {activeStep === 2 && (
                                    <Image
                                        src={processStep2}
                                        width={973}
                                        height={730}
                                        alt="Step 2: Processing ticket"
                                        className="hidden lg:block h-auto w-full max-w-[840px]"
                                    />
                                )}
                                {activeStep === 3 && (
                                    <Image
                                        src={processStep3}
                                        width={973}
                                        height={730}
                                        alt="Step 3: Payment completed"
                                        className="hidden lg:block h-auto w-full max-w-[840px]"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto",
                    }}
                />

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="text-left lg:text-center space-y-8 mb-20 md:mb-24">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Image src={logoWhite} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-white text-sm">
                                Why Snapmyfine
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            className="text-white max-w-4xl lg:mx-auto"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 400,
                                fontSize: "40px",
                                lineHeight: "57.6px",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            Pay your parking fines automatically without
                            frustration
                        </h2>
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
                                    Photo-based Fine Capture
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
                                    Snap a photo of your parking or PCN ticket on
                                    your system and let us handle all details like
                                    council name, fine amount, and payment
                                    deadline
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
                                    Intelligent OCR Extraction
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
                                    Our AI-powered OCR reads your parking fine
                                    with 85%+ accuracy, removing parking and
                                    manual data entry errors.
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
                                    Automated Payment Workflow
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
                                    Once verified, SnapMyFine processes your
                                    payment automatically through secure Open
                                    Banking no credit card required.
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
                                    Council Integration Bots
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
                                    We connect directly to UK council payment
                                    systems to ensure every fine goes to the right
                                    place, fast and securely.
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
                                    Payment Confirmation & Receipts
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
                                    Receive instant payment confirmation and
                                    digital proof of your parking fine payment,
                                    safely stored for your records.
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
                                    Pay Now / Pay Later Options
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
                                    Choose to settle your fine instantly or
                                    schedule it before the due date — your
                                    control, your timing.
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
                                Testimonials
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            className="text-[#000000] max-w-3xl lg:mx-auto"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 400,
                                fontSize: "40px",
                                lineHeight: "57.6px",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            What people are saying
                        </h2>
                    </div>

                    {/* Testimonials Animated Columns - Desktop Only */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                        {/* Column 1 - Scrolls Up */}
                        <TestimonialColumn
                            direction="up"
                            speed={50}
                            testimonials={[
                                {
                                    quote: "I used to spend 20 minutes trying to pay a single parking fine on my council's website. With SnapMyFine, it's literally a photo and done. Best app I've downloaded this year.",
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
                                    quote: "The OCR technology is spot-on. It read my parking ticket perfectly the first time, and payment was instant. This is the future of parking fines.",
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
                                    quote: "It's so refreshing to have something this simple for parking fines. No endless forms or confusing websites just one tap and done.",
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
                                    quote: "I was skeptical at first, but the app delivered exactly what it promised. Fast, secure, and incredibly convenient. Highly recommend!",
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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
                                    I used to spend 20 minutes trying to pay a
                                    single parking fine on my council's website.
                                    With SnapMyFine, it's literally a photo and
                                    done. Best app I've downloaded this year.
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="mb-4"
                                >
                                    <path
                                        d="M10 18C10 16.8954 9.10457 16 8 16C6.89543 16 6 16.8954 6 18V22C6 23.1046 6.89543 24 8 24C9.10457 24 10 23.1046 10 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M10 18C10 14.6863 7.31371 12 4 12V10C8.41828 10 12 13.5817 12 18H10Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 16.8954 25.1046 16 24 16C22.8954 16 22 16.8954 22 18V22C22 23.1046 22.8954 24 24 24C25.1046 24 26 23.1046 26 22V18Z"
                                        fill="#2563EB"
                                    />
                                    <path
                                        d="M26 18C26 14.6863 23.3137 12 20 12V10C24.4183 10 28 13.5817 28 18H26Z"
                                        fill="#2563EB"
                                    />
                                </svg>
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

            {/* FAQ Section */}
            <section
                id="faqs"
                className="relative bg-[#F9FAFB] py-16 md:py-24 overflow-hidden min-h-[900px]"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Column - Header & Illustration */}
                        <div className="space-y-8 lg:sticky lg:top-24">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                                <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                                <span className="text-[#393939] text-sm">FAQs</span>
                            </div>

                            {/* Main Heading */}
                            <h2
                                className="text-[#000000]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                    fontSize: "40px",
                                    lineHeight: "57.6px",
                                    letterSpacing: "-1px",
                                }}
                            >
                                Got questions?
                                <br />
                                We've got answers.
                            </h2>

                            {/* Illustration with decorative elements */}
                            <div className="relative max-w-md mx-auto lg:mx-0">
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
                                        question: "Who handles my payment?",
                                        answer:
                                            "Payments are processed through trusted UK-based gateways. You'll get a proper digital receipt, just like you would through the council's website only faster.",
                                    },
                                    {
                                        value: "item-2",
                                        question: "Do I still need my council's website?",
                                        answer:
                                            "Nope! SnapMyFine handles everything from OCR scanning to secure payment processing. You can skip the council website entirely — unless you prefer the 10-minute login and slow forms.",
                                    },
                                    {
                                        value: "item-3",
                                        question: "Is Snapmyfine official?",
                                        answer:
                                            "SnapMyFine is an independent service that makes paying parking fines easier. While we're not affiliated with councils, we work directly with their payment systems to process your fines securely and efficiently.",
                                    },
                                    {
                                        value: "item-4",
                                        question: "Is my information secure?",
                                        answer:
                                            "Absolutely. We use bank-level encryption (256-bit SSL) to protect your data. Your payment details are never stored on our servers — they go directly to PCI-compliant payment gateways. We're GDPR compliant and take your privacy seriously.",
                                    },
                                    {
                                        value: "item-5",
                                        question: "What happens to the photo I upload?",
                                        answer:
                                            "Your photo is securely processed by our OCR system to extract fine details, then encrypted and stored temporarily for verification. Once your payment is confirmed, we delete the image within 30 days, unless you choose to keep it for your records.",
                                    },
                                    {
                                        value: "item-6",
                                        question: "What if something goes wrong with my payment?",
                                        answer:
                                            "If a payment fails or there's an issue, we'll notify you immediately via email and in-app. Our support team is available to help resolve any problems, and we'll work with the council on your behalf if needed. You'll always have full visibility of your payment status.",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta" className="relative bg-[#F9FAFB] py-20 md:py-32">
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Blue CTA Card */}
                    <div className="relative bg-[#2563EB] rounded-[32px] overflow-hidden">
                        {/* Grid Pattern Background */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.7] z-0"
                            style={{
                                backgroundImage: `url(${patternImage})`,
                                backgroundRepeat: "repeat",
                            }}
                        />

                        {/* Background blur effects - COMMENTED OUT to remove shadow under footer */}
                        {/* <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0">
              <div className="absolute top-[50px] left-[50px] w-[300px] h-[300px] rounded-full bg-[#3182E9] blur-[100px] opacity-60" />
            </div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none z-0">
              <div className="absolute top-[50px] right-[50px] w-[300px] h-[300px] rounded-full bg-[#3182E9] blur-[100px] opacity-60" />
            </div> */}

                        {/* Content */}
                        <div className="relative z-10 px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-28">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                {/* Left Column - Heading */}
                                <div className="space-y-6">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                        {/* <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                      <circle cx="10" cy="10" r="3" fill="white" />
                    </svg> */}
                                        <Image src={logoWhite} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                                        <span
                                            className="text-white"
                                            style={{
                                                fontFamily: "Sora",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                lineHeight: "100%",
                                            }}
                                        >
                                            Early access available
                                        </span>
                                    </div>

                                    {/* Main Heading */}
                                    <h2
                                        className="text-white"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 700,
                                            fontSize: "clamp(32px, 5vw, 48px)",
                                            lineHeight: "115%",
                                            letterSpacing: "-1px",
                                        }}
                                    >
                                        Be among the first
                                        <br />
                                        to simplify parking fines
                                    </h2>
                                </div>

                                {/* Right Column - Form */}
                                <div className="space-y-8">
                                    {/* Description */}
                                    <p
                                        className="text-white/90"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "150%",
                                        }}
                                    >
                                        Launching soon across London councils, sign up to be notified
                                        first and get exclusive early access perks.
                                    </p>

                                    {/* Email Form */}
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="flex-1 px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                                                style={{
                                                    fontFamily: "Sora",
                                                    fontWeight: 400,
                                                    fontSize: "16px",
                                                }}
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className={`px-8 py-3.5 transition-colors rounded-lg whitespace-nowrap text-center ${email
                                                    ? "bg-white text-[#2563EB] hover:bg-white/90"
                                                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10"
                                                    }`}
                                                style={{
                                                    fontFamily: "Sora",
                                                    fontWeight: 600,
                                                    fontSize: "16px",
                                                }}
                                            >
                                                Join waitlist
                                            </button>
                                        </div>

                                        {/* Disclaimer */}
                                        <p
                                            className="text-white/70 text-sm"
                                            style={{
                                                fontFamily: "Sora",
                                                fontWeight: 400,
                                                fontSize: "13px",
                                                lineHeight: "150%",
                                            }}
                                        >
                                            By joining the waitlist, you agree to receive updates about
                                            SnapMyFine.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="relative bg-white py-12 md:py-16">
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
                        {/* Left Column - Logo & Description */}
                        <div className="md:col-span-4 space-y-6">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                {/* <img src={footerLogo} alt="Problem 1" className="w-8 h-8 flex-shrink-0" /> */}
                                <svg
                                    width="29"
                                    height="29"
                                    viewBox="0 0 29 29"
                                    fill="none"
                                    className="flex-shrink-0"
                                >
                                    <g>
                                        <path d={svgPaths.p1c6a0600} fill="#105AE2" />
                                        <path d={svgPaths.p94a9490} fill="#105AE2" />
                                        <path d={svgPaths.pc04c280} fill="#105AE2" />
                                        <path d={svgPaths.p251c2700} fill="#105AE2" />
                                    </g>
                                </svg>
                                <svg
                                    width="137"
                                    height="24"
                                    viewBox="0 0 137 24"
                                    fill="none"
                                    className="flex-shrink-0"
                                >
                                    <g>
                                        <path d={svgPaths.p4fbf500} fill="#000000" />
                                        <path d={svgPaths.pe0d9380} fill="#000000" />
                                        <path d={svgPaths.p5e1b200} fill="#000000" />
                                        <path d={svgPaths.p2da1a1c0} fill="#000000" />
                                        <path d={svgPaths.p1fea0980} fill="#000000" />
                                        <path d={svgPaths.p1e3d9400} fill="#000000" />
                                        <path d={svgPaths.p1b74e580} fill="#000000" />
                                        <path d={svgPaths.p2537d30} fill="#000000" />
                                        <path d={svgPaths.p362e0200} fill="#000000" />
                                        <path d={svgPaths.p1c80d000} fill="#000000" />
                                    </g>
                                </svg>
                            </div>

                            {/* Description */}
                            <p
                                className="text-[#6B7280] max-w-[350px]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "150%",
                                }}
                            >
                                SnapMyFine is redefining the way drivers manage their parking
                                fines by bringing automation, security, and transparency into one
                                simple experience.
                            </p>

                            {/* Contact */}
                            <div className="space-y-2">
                                <p
                                    className="text-[#000000]"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                    }}
                                >
                                    Contact:
                                </p>
                                <p
                                    className="text-[#6B7280]"
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "150%",
                                    }}
                                >
                                    +44 330 133 5245
                                    <br />
                                    support@snapmyfine.co.uk.
                                </p>
                            </div>
                        </div>

                        {/* Middle Column - Quick Links */}
                        <div className="md:col-span-4">
                            <h3
                                className="text-[#000000] mb-6"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                }}
                            >
                                Quick links
                            </h3>
                            <nav className="space-y-4">
                                {[
                                    { label: "The problem", href: "#problem" },
                                    { label: "Our process", href: "#process" },
                                    { label: "Why SnapMyFine", href: "#why" },
                                    { label: "Testimonials", href: "#testimonials" },
                                    { label: "FAQ", href: "#faq" },
                                    { label: "Join Waitlist", href: "#cta" },
                                ].map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="block text-[#6B7280] hover:text-[#105AE2] transition-colors"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 400,
                                            fontSize: "14px",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Right Column - Social Links */}
                        <div className="md:col-span-4">
                            <h3
                                className="text-[#000000] mb-6"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                }}
                            >
                                Follow us
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        name: "Facebook",
                                        icon: (
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        name: "Instagram",
                                        icon: (
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85938C15.0156 1.90234 15.5469 2.06641 15.8984 2.20313C16.3633 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.62891 17.7891 4.09375C17.9258 4.44531 18.0898 4.98047 18.1328 5.95313C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5391 17.7891 15.8906C17.6094 16.3555 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3633 17.6016 15.8984 17.7813C15.5469 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45313 17.918 4.10156 17.7813C3.63672 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3555 2.21094 15.8906C2.07422 15.5391 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95313C1.91016 4.97656 2.07422 4.44531 2.21094 4.09375C2.39063 3.62891 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.63672 2.38281 4.10156 2.20313C4.45313 2.06641 4.98828 1.90234 5.96094 1.85938C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117188 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M16.5391 4.66016C16.5391 5.32422 16 5.85938 15.3398 5.85938C14.6758 5.85938 14.1406 5.32031 14.1406 4.66016C14.1406 3.99609 14.6797 3.46094 15.3398 3.46094C16 3.46094 16.5391 4 16.5391 4.66016Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        name: "Tiktok",
                                        icon: (
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M14.7656 0H11.5312V13.6094C11.5312 15.1406 10.2969 16.4062 8.75 16.4062C7.20313 16.4062 5.96875 15.1406 5.96875 13.6094C5.96875 12.1094 7.17188 10.875 8.625 10.8125V7.53125C5.45313 7.59375 2.90625 10.2031 2.90625 13.6094C2.90625 17.0469 5.54688 19.7344 8.78125 19.7344C12.0156 19.7344 14.7969 17.0156 14.7969 13.6094V6.60938C16.0625 7.5625 17.6406 8.125 19.375 8.1875V4.90625C16.9844 4.8125 14.7656 2.5625 14.7656 0Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        ),
                                    },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href="#"
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#105AE2] flex items-center justify-center group-hover:bg-[#0d4cc4] transition-colors">
                                            {social.icon}
                                        </div>
                                        <span
                                            className="text-[#6B7280] group-hover:text-[#105AE2] transition-colors"
                                            style={{
                                                fontFamily: "Sora",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                            }}
                                        >
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#E5E7EB] mb-8"></div>

                    {/* Copyright */}
                    <p
                        className="text-[#6B7280]"
                        style={{
                            fontFamily: "Sora",
                            fontWeight: 400,
                            fontSize: "14px",
                        }}
                    >
                        © 2025 SnapMyFine Ltd. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}




// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";

// // Import components
// import HamburgerModal from "@/components/HamburgerModal";
// import { Notification } from "@/components/ui/notification";

// // Import section components
// import {
//     HomeSection,
//     CameraSection,
//     ImagePreviewSection,
//     ReviewSection,
//     PaymentSection,
//     RedirectingSection,
//     PaymentReceivedSection,
//     ProcessingSection,
//     PaymentStatusSection,
//     ReceiptSection,
//     SaveFineSection,
//     CheckInboxSection,
//     PaymentFailedSection,
//     SavedFinesSection,
//     AllTransactionsSection,
//     PartialPaymentStatusSection
// } from "@/components/sections";

// // Import new sections
// import FineNotReady from "@/components/sections/FineNotReadySection";
// import DetailsReceived from "@/components/sections/DetailsReceivedSection";

// // Import types
// // Import types
// import { FormData, ValidationErrors, SavedFine } from "@/types";
// import { Transaction } from "@/lib/stores/transactionStore";

// // Import stores and hooks
// import { useTicketStore } from "@/lib/stores/ticketStore";
// import { useTransactionStore } from "@/lib/stores/transactionStore";
// import { useTicketProcessor } from "@/lib/hooks/use-ticket";
// import { usePayment } from "@/lib/hooks/use-payment";

// export default function Home() {
//     const router = useRouter();
//     const { processTicket, fetchTickets, callbackPendingTicket } = useTicketProcessor();
//     const { makePayment } = usePayment();
//     const { addTransaction: addSuccessfulTransaction, getSuccessfulTransactions } = useTransactionStore();
//     const [showCamera, setShowCamera] = useState(false);
//     const [isVideoVisible, setIsVideoVisible] = useState(false);
//     const [showImagePreview, setShowImagePreview] = useState(false);
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const [snapshot, setSnapshot] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const [isProcessingTicket, setIsProcessingTicket] = useState(false);
//     const [hasProcessingError, setHasProcessingError] = useState(false);
//     const { savedTickets, ticketData, addSavedTicket, removeSavedTicket } = useTicketStore();

//     // Fetch tickets on component mount
//     // useEffect(() => {
//     //     const fetchSavedTickets = async () => {
//     //         try {
//     //             // You might want to get the user's email from somewhere (e.g., localStorage, auth context, etc.)
//     //             // For now, I'll use a placeholder - you'll need to replace this with actual user email
//     //             const userEmail = ''; // Replace with actual user email
//     //             await fetchTickets(userEmail);
//     //         } catch (error) {
//     //             console.error('Error fetching saved tickets:', error);
//     //         }
//     //     };

//     //     fetchSavedTickets();
//     // }, [fetchTickets]);

//     // Sync ticketData to formData when ticketData is available
//     useEffect(() => {
//         if (ticketData) {
//             setFormData(prev => ({
//                 ...prev,
//                 council: prev.council || ticketData.council_name || '',
//                 pcnNumber: prev.pcnNumber || ticketData.pcn_number || '',
//                 vehicleNumber: prev.vehicleNumber || ticketData.plate_number || '',
//                 fineAmount: prev.fineAmount || ticketData.amount?.toString() || ''
//             }));
//         }
//     }, [ticketData]);



//     // Form validation states
//     const [formData, setFormData] = useState<FormData>({
//         council: '',
//         pcnNumber: '',
//         vehicleNumber: '',
//         fineAmount: '',
//         email: ''
//     });
//     const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
//         council: false,
//         pcnNumber: false,
//         vehicleNumber: false,
//         fineAmount: false,
//         email: false
//     });

//     // Get successful transactions from store
//     const transactions = getSuccessfulTransactions();

//     // Section navigation state
//     const [showReviewSection, setShowReviewSection] = useState(false); // 4th section
//     const [showPaymentSection, setShowPaymentSection] = useState(false); // 5th section
//     const [showRedirectingSection, setShowRedirectingSection] = useState(false); // 6th section
//     const [showPaymentReceivedSection, setShowPaymentReceivedSection] = useState(false); // 7th section
//     const [showProcessingSection, setShowProcessingSection] = useState(false); // 8th section
//     const [showPaymentStatusSection, setShowPaymentStatusSection] = useState(false); // 9th section
//     const [showReceiptSection, setShowReceiptSection] = useState(false); // 10th section
//     const [showSaveFineSection, setShowSaveFineSection] = useState(false); // 11th section
//     const [showCheckInboxSection, setShowCheckInboxSection] = useState(false); // 12th section
//     const [showPaymentFailedSection, setShowPaymentFailedSection] = useState(false); // 13th section
//     const [showSavedFinesSection, setShowSavedFinesSection] = useState(false); // 14th section
//     const [showAllTransactionsSection, setShowAllTransactionsSection] = useState(false); // 15th section
//     const [showFineNotReadySection, setShowFineNotReadySection] = useState(false); // 16th section
//     const [showDetailsReceivedSection, setShowDetailsReceivedSection] = useState(false); // 17th section

//     // Track if payment section is loaded from a saved fine
//     const [isLoadedFromSavedFine, setIsLoadedFromSavedFine] = useState(false);

//     // Track if user arrived at section 5 from section 14
//     const [cameFromSavedFines, setCameFromSavedFines] = useState(false);  // Use the saved tickets from the store

//     // Hamburger modal state
//     const [showHamburgerModal, setShowHamburgerModal] = useState(false);

//     // No outstanding charge notification state
//     const [showNoOutstandingChargeNotification, setShowNoOutstandingChargeNotification] = useState(false);
//     const [showConfirmationErrorNotification, setShowConfirmationErrorNotification] = useState(false);
//     const [showProcessingErrorNotification, setShowProcessingErrorNotification] = useState(false);
//     const [showCouncilNotSupportedNotification, setShowCouncilNotSupportedNotification] = useState(false);

//     // Section 16 - Partial Payment state
//     const [showPartialPaymentSection, setShowPartialPaymentSection] = useState(false);
//     const [partialPaymentReceived] = useState<number>(77.00); // Amount user actually paid

//     // Section 6 to Section 7 transition (30 seconds) or failure after 10 seconds
//     useEffect(() => {
//         if (showRedirectingSection) {
//             // Simulate payment failure after 10 seconds (you can adjust this or add real failure logic)
//             const failureTimer = setTimeout(() => {
//                 // Simulate random failure (30% chance) - you can replace this with real failure detection
//                 const shouldFail = Math.random() < 0.3; // 30% chance of failure

//                 if (shouldFail) {
//                     setShowRedirectingSection(false);
//                     setShowPaymentFailedSection(true);
//                 }
//             }, 10000); // Check for failure after 10 seconds

//             // Normal success transition after 30 seconds
//             const successTimer = setTimeout(() => {
//                 setShowRedirectingSection(false);
//                 setShowPaymentReceivedSection(true);
//             }, 30000); // 30 seconds

//             return () => {
//                 clearTimeout(failureTimer);
//                 clearTimeout(successTimer);
//             };
//         }
//     }, [showRedirectingSection]);

//     // Section 7 to Section 8 transition (30 seconds)
//     useEffect(() => {
//         if (showPaymentReceivedSection) {
//             const timer = setTimeout(() => {
//                 setShowPaymentReceivedSection(false);
//                 setShowProcessingSection(true);
//             }, 30000); // 30 seconds

//             return () => clearTimeout(timer);
//         }
//     }, [showPaymentReceivedSection]);

//     // Section 8 to Section 9 transition (20 seconds)
//     useEffect(() => {
//         if (showProcessingSection) {
//             const timer = setTimeout(() => {
//                 setShowProcessingSection(false);
//                 setShowPaymentStatusSection(true);
//             }, 20000); // 20 seconds

//             return () => clearTimeout(timer);
//         }
//     }, [showProcessingSection]);

//     // Section 3 to Section 4 transition (5 seconds) - only if still on section 3 and no processing error
//     useEffect(() => {
//         if (showImagePreview && !isProcessingTicket) {
//             const timer = setTimeout(() => {
//                 // Only transition if still showing image preview, processing is done, and no error occurred
//                 if (showImagePreview && !hasProcessingError) {
//                     setShowImagePreview(false);
//                     setShowCamera(false); // Hide camera section
//                     setShowReviewSection(true);
//                 } else if (showImagePreview && hasProcessingError) {
//                     // If there's an error, go back to home section
//                     setShowImagePreview(false);
//                     setShowCamera(false);
//                     setSnapshot(null);
//                     setIsProcessingTicket(false);
//                     setHasProcessingError(false);
//                 }
//             }, 5000); // 5 seconds

//             return () => clearTimeout(timer);
//         }
//     }, [showImagePreview, isProcessingTicket, hasProcessingError]);

//     const councils = [
//         "Barking and Dagenham",
//         "Barnet",
//         "Bexley",
//         "Brent",
//         "Bromley",
//         "Camden",
//         "Croydon",
//         "Ealing",
//         "Enfield",
//         "Greenwich",
//         "Hackney",
//         "Hammersmith and Fulham",
//         "Haringey",
//         "Harrow",
//         "Havering",
//         "Hillingdon",
//         "Hounslow",
//         "Islington",
//         "Kensington and Chelsea",
//         "Kingston upon Thames",
//         "Lambeth",
//         "Lewisham",
//         "Merton",
//         "Newham",
//         "Redbridge",
//         "Richmond upon Thames",
//         "Southwark",
//         "Sutton",
//         "Tower Hamlets",
//         "Waltham Forest",
//         "Wandsworth",
//         "Westminster",
//     ];

//     const startCamera = async () => {
//         try {
//             // Mobile-optimized camera settings
//             let stream;
//             try {
//                 // Try back camera first (ideal for mobile document scanning)
//                 stream = await navigator.mediaDevices.getUserMedia({
//                     video: {
//                         facingMode: 'environment', // Use back camera on mobile
//                         width: { ideal: 1280 },
//                         height: { ideal: 720 }
//                     }
//                 });
//             } catch {
//                 // Fallback to any available camera if back camera fails
//                 stream = await navigator.mediaDevices.getUserMedia({
//                     video: {
//                         width: { ideal: 1280 },
//                         height: { ideal: 720 }
//                     }
//                 });
//             }

//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//                 await videoRef.current.play();
//                 setIsVideoVisible(true); // Show video, hide position text
//             }
//         } catch (error: unknown) {
//             console.error('Camera access failed:', error);
//             if (error instanceof Error && error.name === 'NotAllowedError') {
//                 alert('Camera permission denied. Please allow camera access in your browser settings.');
//             } else {
//                 alert('Unable to access camera. Make sure your device has a camera and try again.');
//             }
//         }
//     };

//     const takeSnapshot = async () => {
//         if (!videoRef.current || !canvasRef.current) return;
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         // Create high-quality JPEG for n8n processing (smaller file size, good for OCR)
//         const imgDataJPEG = canvas.toDataURL("image/jpeg", 0.9); // 90% quality
//         setSnapshot(imgDataJPEG);

//         // Stop video stream and show 3rd section
//         if (videoRef.current.srcObject) {
//             const stream = videoRef.current.srcObject as MediaStream;
//             stream.getTracks().forEach(track => track.stop());
//         }
//         setIsVideoVisible(false);
//         setShowCamera(false);
//         setShowImagePreview(true);

//         // Automatically send to n8n after capturing
//         console.log('Camera capture: sending to n8n...');
//         await sendToN8n(imgDataJPEG);
//     };



//     // Function to send image to n8n for processing
//     const sendToN8n = async (imageData?: string) => {
//         const imgData = imageData || snapshot;
//         if (!imgData) return;

//         setIsProcessingTicket(true);
//         setHasProcessingError(false);

//         // Clear any existing ticket data before processing new ticket
//         const { clearTicketData } = useTicketStore.getState();
//         clearTicketData();

//         try {
//             // Use the hook to process the ticket which handles the API call and state management
//             await processTicket(imgData);

//             // Handle the response from n8n (data is now stored in the zustand store)
//             setIsProcessingTicket(false);
//             console.log('Ticket processed successfully!');
//         } catch (error) {
//             console.error('Error sending to n8n:', error);
//             setIsProcessingTicket(false);
//             setHasProcessingError(true);

//             // Check if it's a council support error
//             const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//             const isCouncilNotSupported = errorMessage.includes("Council not supported yet!");

//             // Show appropriate error notification and return to home section
//             if (isCouncilNotSupported) {
//                 setShowCouncilNotSupportedNotification(true);
//             } else {
//                 setShowProcessingErrorNotification(true);
//             }
//             setShowImagePreview(false);
//             setShowCamera(false);
//             setSnapshot(null);
//         }
//     };

//     const retakePhoto = () => {
//         setSnapshot(null);
//         setShowImagePreview(false);
//         setShowCamera(true);
//         setIsProcessingTicket(false);
//         setHasProcessingError(false);
//     };

//     // Function to handle file upload from gallery
//     const handleFileUpload = () => {
//         // Clear any previous ticket data when starting a new scan
//         const { clearTicketData } = useTicketStore.getState();
//         clearTicketData();
        
//         // Clear form data as well
//         setFormData({
//             council: '',
//             pcnNumber: '',
//             vehicleNumber: '',
//             fineAmount: '',
//             email: ''
//         });
        
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     // Function to convert any image to JPEG format (like camera does)
//     const convertToJPEG = (imageDataURL: string): Promise<string> => {
//         return new Promise((resolve, reject) => {
//             const img = document.createElement('img');
//             img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 if (!ctx) {
//                     reject(new Error('Could not get canvas context'));
//                     return;
//                 }

//                 // Set canvas size to image size
//                 canvas.width = img.width;
//                 canvas.height = img.height;

//                 // Draw image to canvas
//                 ctx.drawImage(img, 0, 0);

//                 // Resize image if too large
//                 let targetWidth = img.width;
//                 let targetHeight = img.height;

//                 // If image is very large, resize it down
//                 const maxDimension = 1024; // Max width or height
//                 if (img.width > maxDimension || img.height > maxDimension) {
//                     if (img.width > img.height) {
//                         targetWidth = maxDimension;
//                         targetHeight = (img.height * maxDimension) / img.width;
//                     } else {
//                         targetHeight = maxDimension;
//                         targetWidth = (img.width * maxDimension) / img.height;
//                     }
//                 }

//                 canvas.width = targetWidth;
//                 canvas.height = targetHeight;

//                 // Draw resized image to canvas
//                 ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

//                 // Convert to JPEG with lower quality for smaller file size
//                 let jpegDataURL = canvas.toDataURL('image/jpeg', 0.7); // 70% quality

//                 // If still too large, reduce quality further
//                 if (jpegDataURL.length > 800000) { // If > 800KB
//                     jpegDataURL = canvas.toDataURL('image/jpeg', 0.5); // 50% quality
//                 }

//                 console.log('Converted to JPEG. Original size:', imageDataURL.length, 'New size:', jpegDataURL.length);
//                 console.log('Image resized from', img.width + 'x' + img.height, 'to', targetWidth + 'x' + targetHeight);
//                 resolve(jpegDataURL);
//             };

//             img.onerror = () => {
//                 reject(new Error('Failed to load image for conversion'));
//             };

//             img.src = imageDataURL;
//         });
//     };

//     // Function to handle file selection
//     const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file && file.type.startsWith('image/')) {
//             console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type);

//             const reader = new FileReader();
//             reader.onload = async (e) => {
//                 try {
//                     const result = e.target?.result as string;
//                     console.log('File read successfully, data URL length:', result.length);

//                     setSnapshot(result);
//                     setShowImagePreview(true);

//                     // Check file size before processing
//                     const fileSizeMB = result.length / (1024 * 1024);
//                     console.log('File size: ', fileSizeMB.toFixed(2), 'MB');

//                     if (fileSizeMB > 5) {
//                         alert('File is too large (' + fileSizeMB.toFixed(2) + 'MB). Please select a smaller image or use the camera to take a photo.');
//                         return;
//                     }

//                     // Try converting to JPEG for consistency with camera
//                     try {
//                         console.log('Converting to JPEG format...');
//                         const jpegResult = await convertToJPEG(result);
//                         console.log('JPEG conversion successful');

//                         // Send converted JPEG to n8n
//                         console.log('Sending converted JPEG to n8n...');
//                         sendToN8n(jpegResult);

//                     } catch (conversionError) {
//                         console.error('JPEG conversion failed, sending original:', conversionError);

//                         // Fallback: send original file if conversion fails
//                         console.log('Sending original file to n8n...');
//                         sendToN8n(result);
//                     }

//                 } catch (error) {
//                     console.error('Error processing file:', error);
//                     alert('Error processing the selected image.');
//                 }
//             };

//             reader.onerror = (error) => {
//                 console.error('FileReader error:', error);
//                 alert('Error reading the selected file.');
//             };

//             reader.readAsDataURL(file);
//         } else {
//             alert('Please select a valid image file.');
//         }

//         // Reset the file input so the same file can be selected again
//         event.target.value = '';
//     };

//     // Handle form input changes
//     const handleInputChange = (field: string, value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));

//         // Clear validation error when user starts typing
//         if (validationErrors[field as keyof typeof validationErrors]) {
//             setValidationErrors(prev => ({
//                 ...prev,
//                 [field]: false
//             }));
//         }
//     };

//     // Handle form submission with validation
//     const handleFormSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         // Check for empty fields, also considering ticketData if formData is empty
//         const errors = {
//             council: !(formData.council.trim() || (ticketData?.council_name || '').trim()),
//             pcnNumber: !(formData.pcnNumber.trim() || (ticketData?.pcn_number || '').trim()),
//             vehicleNumber: !(formData.vehicleNumber.trim() || (ticketData?.plate_number || '').trim()),
//             fineAmount: !(formData.fineAmount.trim() || (ticketData?.amount?.toString() || '').trim()),
//             email: false
//         };

//         setValidationErrors(errors);

//         // If all fields are filled, proceed to payment section
//         if (!Object.values(errors).some(error => error)) {
//             // Ensure formData has the final values before proceeding
//             setFormData(prev => ({
//                 ...prev,
//                 council: prev.council || ticketData?.council_name || '',
//                 pcnNumber: prev.pcnNumber || ticketData?.pcn_number || '',
//                 vehicleNumber: prev.vehicleNumber || ticketData?.plate_number || '',
//                 fineAmount: prev.fineAmount || ticketData?.amount?.toString() || ''
//             }));

//             setShowReviewSection(false);
//             setShowPaymentSection(true);
//         }
//     };

//     // Function to add successful council payment to transaction history
//     const addSuccessfulCouncilPayment = (referenceId?: string, paymentId?: string) => {
//         const serviceFee = '3.00'; // Fixed service fee
//         const fineAmount = formData.fineAmount || ticketData?.amount?.toString() || '0';
//         const totalPaid = (parseFloat(fineAmount) + parseFloat(serviceFee)).toFixed(2);

//         addSuccessfulTransaction({
//             council: formData.council || ticketData?.council_name || '',
//             pcnNumber: formData.pcnNumber || ticketData?.pcn_number || '',
//             fineAmount,
//             status: 'success',
//             totalPaid,
//             serviceFee,
//             referenceId,
//             paymentId,
//         });
//     };

//     // Email validation function
//     const isValidEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     // Function to open Gmail app
//     const openGmailApp = () => {
//         const userAgent = navigator.userAgent || navigator.vendor;

//         // Check if it's a mobile device
//         const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

//         if (isMobile) {
//             // For mobile devices, try to open Gmail app
//             if (/android/i.test(userAgent)) {
//                 // Android - try Gmail app first, fallback to web
//                 window.location.href = 'intent://mail.google.com#Intent;scheme=https;package=com.google.android.gm;end';
//             } else if (/iphone|ipad|ipod/i.test(userAgent)) {
//                 // iOS - try Gmail app, fallback to web
//                 window.location.href = 'googlegmail://';
//                 // Fallback after a short delay
//                 setTimeout(() => {
//                     window.open('https://mail.google.com', '_blank');
//                 }, 1000);
//             }
//         } else {
//             // For desktop, open Gmail in new tab
//             window.open('https://mail.google.com', '_blank');
//         }
//     };

//     // Function to handle fine not ready case
//     const handleFineNotReady = (_pcnNumber: string) => {
//         setShowReviewSection(false);
//         setShowFineNotReadySection(true);
//     };

//     // Function to handle callback submission
//     const handleCallbackSubmit = async (email: string, phone?: string) => {
//         try {
//             if (!ticketData?.pcn_number) return;

//             await callbackPendingTicket(email, phone || '', ticketData.pcn_number);

//             // Show details received section
//             setShowFineNotReadySection(false);
//             setShowDetailsReceivedSection(true);
//         } catch (error) {
//             console.error('Failed to submit callback:', error);
//             // You could show an error notification here if needed
//         }
//     };

//     // Function to handle details received close
//     const handleDetailsReceivedClose = () => {
//         setShowDetailsReceivedSection(false);
//     };

//     // Function to handle back to home from details received
//     const handleBackToHomeFromDetailsReceived = () => {
//         setShowDetailsReceivedSection(false);
//         goToHomeSection();
//     };

//     // Function to go back to section 1
//     const goToHomeSection = () => {
//         // Note: Successful transactions are now added when council payment actually succeeds
//         // in the payment verification flow, not when returning from sections
//         setShowReceiptSection(false);
//         setShowCamera(false);
//         setShowImagePreview(false);
//         setShowReviewSection(false);
//         setShowPaymentSection(false);
//         setShowSaveFineSection(false);
//         setShowCheckInboxSection(false);
//         setShowRedirectingSection(false);
//         setShowPaymentReceivedSection(false);
//         setShowProcessingSection(false);
//         setShowPaymentStatusSection(false);
//         setShowPaymentFailedSection(false);
//         setShowSavedFinesSection(false);
//         setShowAllTransactionsSection(false);
//         setShowFineNotReadySection(false);
//         setShowDetailsReceivedSection(false);
//         setIsLoadedFromSavedFine(false);
//         setCameFromSavedFines(false);
//         setShowNoOutstandingChargeNotification(false);
//         setShowConfirmationErrorNotification(false);
//         setShowProcessingErrorNotification(false);
//         setShowCouncilNotSupportedNotification(false);
//     };

//     // Function to retry payment (goes back to section 6)
//     const retryPayment = () => {
//         setShowPaymentFailedSection(false);
//         setShowRedirectingSection(true);
//     };

//     // Function to save fine to saved list
//     const saveFineToList = () => {
//         const newSavedFine = {
//             council: formData.council,
//             pcnNumber: formData.pcnNumber,
//             vehicleNumber: formData.vehicleNumber,
//             fineAmount: formData.fineAmount,
//             email: formData.email,
//         };

//         addSavedTicket(newSavedFine); // Add to store
//     };

//     // Function to delete saved fine
//     const deleteSavedFine = (fineId: string) => {
//         removeSavedTicket(fineId);
//     };

//     // Function to handle payment flow
//     const handlePayNow = async () => {
//         // Show RedirectingSection and start payment process
//         setShowPaymentSection(false);
//         setShowRedirectingSection(true);

//         try {
//             // Prioritize form data for amount (as OCR can be inaccurate), fall back to ticketData for other fields
//             const actualAmount = formData.fineAmount || ticketData?.amount?.toString() || '0';
//             const actualPcnNumber = ticketData?.pcn_number || formData.pcnNumber;
//             const actualVehicleNumber = ticketData?.plate_number || formData.vehicleNumber;
//             const actualCouncil = ticketData?.council_name || formData.council;

//             const paymentData = {
//                 amount: (Number(actualAmount) + 3).toString(), // Fine amount + £3 service fee
//                 pcnNumber: actualPcnNumber,
//                 vehicleReg: actualVehicleNumber,
//                 email: formData.email || "user@example.com", // Use form email or placeholder
//                 fullName: "Parking Fine Payer", // Placeholder - consider collecting this in the form
//                 council: actualCouncil
//             };

//             // Debug log to track what data is being sent for payment
//             console.log('Sending payment data:', paymentData);
//             console.log('TicketData used:', {
//                 amount: ticketData?.amount,
//                 pcn_number: ticketData?.pcn_number,
//                 plate_number: ticketData?.plate_number,
//                 council_name: ticketData?.council_name
//             });

//             const result = await makePayment(paymentData);

//             // Redirect to the payment gateway after 1 minute delay
//             if (result.billingRequestFlow?.authorisation_url) {
//                 // Clear ticket data before redirecting as it will be passed via URL params
//                 // Note: We don't clear it here as the verification page needs it
//                 // It will be cleared after successful receipt sending
//                 window.location.href = result.billingRequestFlow.authorisation_url;
//             } else {
//                 // Handle error - redirect failed
//                 setShowRedirectingSection(false);
//                 setShowPaymentFailedSection(true);
//             }
//         } catch (error) {
//             console.error('Payment failed:', error);
//             // Show payment failed section
//             setShowRedirectingSection(false);
//             setShowPaymentFailedSection(true);
//         }
//     };

//     // Function to show saved fines section
//     // const showSavedFines = () => {
//     //   setShowSavedFinesSection(true);
//     // };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center p-2">
//             {/* 1st section */}
//             {!showCamera && !showImagePreview && !showReviewSection && !showPaymentSection && !showRedirectingSection && !showPaymentReceivedSection && !showProcessingSection && !showPaymentStatusSection && !showReceiptSection && !showSaveFineSection && !showCheckInboxSection && !showPaymentFailedSection && !showSavedFinesSection && !showAllTransactionsSection && !showPartialPaymentSection && !showFineNotReadySection && !showDetailsReceivedSection && (
//                 <div className="relative w-full max-w-md">
//                     <HomeSection
//                         transactions={transactions}
//                         onScanTicket={() => {
//                             // Clear any previous ticket data when starting a new scan
//                             const { clearTicketData } = useTicketStore.getState();
//                             clearTicketData();
                            
//                             // Clear form data as well
//                             setFormData({
//                                 council: '',
//                                 pcnNumber: '',
//                                 vehicleNumber: '',
//                                 fineAmount: '',
//                                 email: ''
//                             });
                            
//                             setShowCamera(true);
//                         }}
//                         onUploadFromGallery={handleFileUpload}
//                         onShowAllTransactions={() => setShowAllTransactionsSection(true)}
//                         onHamburgerClick={() => setShowHamburgerModal(true)}
//                     />

//                     {/* Hamburger Modal - positioned relative to HomeSection container */}
//                     <HamburgerModal
//                         isOpen={showHamburgerModal}
//                         onClose={() => setShowHamburgerModal(false)}
//                         onSavedFines={() => {
//                             setShowSavedFinesSection(true);
//                             // Hide all other sections when navigating to saved fines
//                             setShowCamera(false);
//                             setShowImagePreview(false);
//                             setShowReviewSection(false);
//                             setShowPaymentSection(false);
//                             setShowRedirectingSection(false);
//                             setShowPaymentReceivedSection(false);
//                             setShowProcessingSection(false);
//                             setShowPaymentStatusSection(false);
//                             setShowReceiptSection(false);
//                             setShowSaveFineSection(false);
//                             setShowCheckInboxSection(false);
//                             setShowPaymentFailedSection(false);
//                             setShowAllTransactionsSection(false);
//                             setShowPartialPaymentSection(false);
//                             setShowFineNotReadySection(false);
//                             setShowDetailsReceivedSection(false);
//                             setShowHamburgerModal(false);
//                         }}
//                         onPaymentHistory={() => {
//                             setShowAllTransactionsSection(true);
//                             // Hide all other sections when navigating to payment history
//                             setShowCamera(false);
//                             setShowImagePreview(false);
//                             setShowReviewSection(false);
//                             setShowPaymentSection(false);
//                             setShowRedirectingSection(false);
//                             setShowPaymentReceivedSection(false);
//                             setShowProcessingSection(false);
//                             setShowPaymentStatusSection(false);
//                             setShowReceiptSection(false);
//                             setShowSaveFineSection(false);
//                             setShowCheckInboxSection(false);
//                             setShowPaymentFailedSection(false);
//                             setShowSavedFinesSection(false);
//                             setShowPartialPaymentSection(false);
//                             setShowFineNotReadySection(false);
//                             setShowDetailsReceivedSection(false);
//                             setShowHamburgerModal(false);
//                         }}
//                         onContactUs={() => {
//                             console.log("Contact Us clicked");
//                             setShowHamburgerModal(false);
//                         }}
//                     />
//                 </div>
//             )}

//             {/* 2nd section  */}
//             {showCamera && !showImagePreview && (
//                 <CameraSection
//                     isVideoVisible={isVideoVisible}
//                     videoRef={videoRef}
//                     canvasRef={canvasRef}
//                     onBack={() => setShowCamera(false)}
//                     onStartCamera={startCamera}
//                     onTakeSnapshot={takeSnapshot}
//                     onUploadFromGallery={handleFileUpload}
//                 />
//             )}


//             {/* 3rd section - Image Preview */}
//             {showImagePreview && snapshot && (
//                 <ImagePreviewSection
//                     snapshot={snapshot}
//                     isProcessing={isProcessingTicket}
//                     hasError={hasProcessingError}
//                     onBack={() => {
//                         setShowImagePreview(false);
//                         setShowCamera(true);
//                         setIsProcessingTicket(false);
//                         setHasProcessingError(false);
//                     }}
//                     onRetakePhoto={retakePhoto}
//                     onUploadFromGallery={handleFileUpload}
//                 />
//             )}

//             {/* Hidden file input for gallery upload */}
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileSelect}
//                 accept="image/*"
//                 style={{ display: 'none' }}
//             />

//             {/* 4th section - Review Details */}
//             {showReviewSection && (
//                 <ReviewSection
//                     formData={formData}
//                     validationErrors={validationErrors}
//                     councils={councils}
//                     onBack={() => {
//                         setShowReviewSection(false);
//                         setShowCamera(true);
//                     }}
//                     onInputChange={handleInputChange}
//                     onFormSubmit={handleFormSubmit}
//                     onNoOutstandingCharge={() => {
//                         setShowReviewSection(false);
//                         setShowCamera(false);
//                         setShowImagePreview(false);
//                         setShowNoOutstandingChargeNotification(true);
//                     }}
//                     onConfirmationError={() => {
//                         setShowReviewSection(false);
//                         setShowCamera(false);
//                         setShowImagePreview(false);
//                         setShowConfirmationErrorNotification(true);
//                     }}
//                     onFineNotReady={handleFineNotReady}
//                 />
//             )}

//             {/* 5th section - Payment Details */}
//             {showPaymentSection && (
//                 <PaymentSection
//                     formData={formData}
//                     isLoadedFromSavedFine={isLoadedFromSavedFine}
//                     onBack={() => {
//                         if (cameFromSavedFines) {
//                             setShowPaymentSection(false);
//                             setShowSavedFinesSection(true);
//                             setCameFromSavedFines(false);
//                         } else {
//                             setShowPaymentSection(false);
//                             setShowReviewSection(true);
//                         }
//                     }}
//                     onPayNow={handlePayNow}
//                     onPayLater={() => {
//                         setShowPaymentSection(false);
//                         setShowSaveFineSection(true);
//                     }}
//                 />
//             )}



//             {/* 6th section - Redirecting to Payment */}
//             {showRedirectingSection && (
//                 <RedirectingSection />
//             )}

//             {/* 7th section - Payment Received */}
//             {showPaymentReceivedSection && (
//                 <PaymentReceivedSection formData={formData} />
//             )}

//             {/* 8th section - Processing Payment */}
//             {showProcessingSection && (
//                 <ProcessingSection />
//             )}

//             {/* 9th section - Payment Status */}
//             {showPaymentStatusSection && (
//                 <PaymentStatusSection
//                     formData={formData}
//                     validationErrors={validationErrors}
//                     onBack={() => setShowCamera(false)}
//                     onInputChange={handleInputChange}
//                     onSendReceipt={() => {
//                         if (isValidEmail(formData.email)) {
//                             setShowPaymentStatusSection(false);
//                             setShowReceiptSection(true);
//                         }
//                     }}
//                     isValidEmail={isValidEmail}
//                 />
//             )}

//             {/* 10th section */}
//             {showReceiptSection && (
//                 <ReceiptSection
//                     onClose={goToHomeSection}
//                     onOpenGmail={openGmailApp}
//                 />
//             )}

//             {/* 11th section */}
//             {showSaveFineSection && (
//                 <SaveFineSection
//                     formData={formData}
//                     validationErrors={validationErrors}
//                     onBack={() => {
//                         setShowSaveFineSection(false);
//                         setShowPaymentSection(true);
//                     }}
//                     onInputChange={handleInputChange}
//                     onCreateAccount={() => {
//                         if (isValidEmail(formData.email)) {
//                             saveFineToList();
//                             setShowSaveFineSection(false);
//                             setShowCheckInboxSection(true);
//                         }
//                     }}
//                     isValidEmail={isValidEmail}
//                 />
//             )}

//             {/* 12th section-input email to get reciept */}
//             {showCheckInboxSection && (
//                 <CheckInboxSection
//                     formData={formData}
//                     onClose={goToHomeSection}
//                     onOpenGmail={openGmailApp}
//                 />
//             )}

//             {/* 13th section - Error Payment Status */}
//             {showPaymentFailedSection && (
//                 <PaymentFailedSection
//                     onBack={() => setShowCamera(false)}
//                     onTryAgain={retryPayment}
//                     onReportIssue={() => router.push('/report-incident')}
//                 />
//             )}


//             {/* 14th section - Saved Fines */}
//             {showSavedFinesSection && (
//                 <SavedFinesSection
//                     savedFines={savedTickets}
//                     onBack={goToHomeSection}
//                     onDeleteFine={deleteSavedFine}
//                     onPayFine={(fine) => {
//                         setFormData({
//                             council: fine.council,
//                             pcnNumber: fine.pcnNumber,
//                             vehicleNumber: fine.vehicleNumber,
//                             fineAmount: fine.fineAmount,
//                             email: fine.email
//                         });
//                         setShowSavedFinesSection(false);
//                         setShowPaymentSection(true);
//                         setIsLoadedFromSavedFine(true);
//                         setCameFromSavedFines(true);
//                     }}
//                 />
//             )}

//             {/* 15th section -payment reciept  */}
//             {showAllTransactionsSection && (
//                 <AllTransactionsSection
//                     transactions={transactions}
//                     onBack={goToHomeSection}
//                 />
//             )}



//             {/* 16th section - Partial Payment Status */}
//             {showPartialPaymentSection && (
//                 <PartialPaymentStatusSection
//                     partialPaymentReceived={partialPaymentReceived}
//                     formData={formData}
//                     isLoadedFromSavedFine={isLoadedFromSavedFine}
//                     onBack={() => setShowPartialPaymentSection(false)}
//                     onPayNow={() => setShowPaymentSection(true)}
//                     onPayLater={() => setShowSaveFineSection(true)}
//                 />
//             )}

//             {/* No Outstanding Charge Notification */}
//             {showNoOutstandingChargeNotification && (
//                 <Notification
//                     message="Great news! There is no outstanding charge on this PCN"
//                     type="success"
//                     duration={6000}
//                     onClose={() => setShowNoOutstandingChargeNotification(false)}
//                 />
//             )}

//             {/* Confirmation Error Notification */}
//             {showConfirmationErrorNotification && (
//                 <Notification
//                     message="Failed to confirm payment amount with council"
//                     type="error"
//                     duration={6000}
//                     onClose={() => setShowConfirmationErrorNotification(false)}
//                 />
//             )}

//             {/* Processing Error Notification */}
//             {showProcessingErrorNotification && (
//                 <Notification
//                     message="Failed to process ticket"
//                     type="error"
//                     duration={6000}
//                     onClose={() => setShowProcessingErrorNotification(false)}
//                 />
//             )}

//             {/* Council Not Supported Notification */}
//             {showCouncilNotSupportedNotification && (
//                 <Notification
//                     message="Council not supported yet!"
//                     type="error"
//                     duration={6000}
//                     onClose={() => setShowCouncilNotSupportedNotification(false)}
//                 />
//             )}

//             {/* Fine Not Ready Section */}
//             {showFineNotReadySection && (
//                 <FineNotReady
//                     onBack={() => {
//                         setShowFineNotReadySection(false);
//                         setShowReviewSection(true);
//                     }}
//                     onSubmit={handleCallbackSubmit}
//                 />
//             )}

//             {/* Details Received Section */}
//             {showDetailsReceivedSection && (
//                 <DetailsReceived
//                     onClose={handleDetailsReceivedClose}
//                     onBackToHome={handleBackToHomeFromDetailsReceived}
//                 />
//             )}
//         </div>
//     );
// }
