"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import svgPaths from "../lib/landing/svg-im39sd3dvf";
import { useForms } from "@/lib/hooks/use-forms";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import Organisation from "@/components/sections/Organisation";
import Schedule from "@/components/sections/Schedule";
import StatsBar from "@/components/sections/StatsBar";
import EasyPayment from "@/components/sections/EasyPayment";

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
const testimonialQuote = "/landing/testimonial/quotes-icon.svg";

const logoWhite = "/landing/logo/logoWhite.svg";
const logoColored = "/landing/logo/logoColored.svg";

import styles from "../components/landing/PhoneMockup.module.css";
import { VerticalProgress } from "../components/landing/VerticalProgress";
import { TestimonialColumn } from "../components/landing/TestimonialColumn";
import { FAQAccordion } from "../components/landing/FAQAccordion";
import { ClientOnly } from "../components/ui/ClientOnly";
import { QRCodeSVG } from 'qrcode.react';
import Dispute from "@/components/sections/Dispute";

export default function LandingPage() {
    const [email, setEmail] = useState("");
    const [ctaEmail, setCtaEmail] = useState("");
    const [activeStep, setActiveStep] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [formState, setFormState] = useState<'idle' | 'error' | 'success'>('idle');
    const [ctaFormState, setCtaFormState] = useState<'idle' | 'error' | 'success'>('idle');

    // Use forms hook for both hero and CTA forms
    const heroForm = useForms({
        onSuccess: () => {
            setFormState('success');
            setEmail('');
        },
        onError: () => setFormState('error')
    });

    const ctaForm = useForms({
        onSuccess: () => {
            setCtaFormState('success');
            setCtaEmail('');
        },
        onError: () => setCtaFormState('error')
    });

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

        try {
            await heroForm.submitWaitlist({
                email,
                source: 'hero'
            });
        } catch (error) {
            console.error('Hero form submission failed:', error);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Reset error state when user starts typing
        if (formState === 'error') {
            setFormState('idle');
        }
    };

    const handleCtaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(ctaEmail)) {
            setCtaFormState('error');
            return;
        }

        try {
            await ctaForm.submitWaitlist({
                email: ctaEmail,
                source: 'cta'
            });
        } catch (error) {
            console.error('CTA form submission failed:', error);
        }
    };

    const handleCtaEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCtaEmail(e.target.value);
        // Reset error state when user starts typing
        if (ctaFormState === 'error') {
            setCtaFormState('idle');
        }
    };

    return (
        <div className="relative h-[120vh] xl:min-h-screen bg-[#2563EB]">
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.7] z-0"
                style={{
                    backgroundImage: `url(${patternImage})`,
                    backgroundRepeat: "repeat",
                }}
            />

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
            <main className="relative z-10 px-4 md:px-8 pt-12 md:pt-20  md:pb-32">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-32 items-center">
                    {/* Left Content */}
                    <div className="w-full flex flex-col gap-10.5">
                        <section className="flex flex-col gap-[12px]">
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
                        <section className="flex flex-col gap-4">
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
                            <p className="text-white"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "150%",
                                    letterSpacing: "0%",
                                }}
                            >Download the app now:</p>
                            <div className="flex flex-col md:flex-row w-full justify-start gap-3">
                                <a
                                    style={{
                                        borderColor: "#FFFFFF5E",
                                        paddingLeft: "18px",
                                        paddingRight: "18px",
                                        textDecoration: "none",
                                    }}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex w-fit justify-center flex-row group transition-all items-center hover:bg-white bg-[#003880] border py-3 gap-[3.75px] rounded-[8px]" href={process.env.NEXT_PUBLIC_APP_STORE_LINK || "/"}>
                                    <svg className="text-white transition-all group-hover:text-[#313131]" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6781 8.37031C11.6719 7.30469 12.1547 6.50156 13.1297 5.90938C12.5844 5.12813 11.7594 4.69844 10.6719 4.61562C9.64219 4.53437 8.51562 5.21562 8.10312 5.21562C7.66719 5.21562 6.67031 4.64375 5.88594 4.64375C4.26719 4.66875 2.54688 5.93437 2.54688 8.50937C2.54688 9.27031 2.68594 10.0563 2.96406 10.8656C3.33594 11.9313 4.67656 14.5422 6.075 14.5C6.80625 14.4828 7.32344 13.9812 8.275 13.9812C9.19844 13.9812 9.67656 14.5 10.4922 14.5C11.9031 14.4797 13.1156 12.1063 13.4688 11.0375C11.5766 10.1453 11.6781 8.425 11.6781 8.37031ZM10.0359 3.60469C10.8281 2.66406 10.7563 1.80781 10.7328 1.5C10.0328 1.54062 9.22344 1.97656 8.7625 2.5125C8.25469 3.0875 7.95625 3.79844 8.02031 4.6C8.77656 4.65781 9.46719 4.26875 10.0359 3.60469Z" fill="currentColor" />
                                    </svg>
                                    <p className="text-[#F3F3F3] transition-all group-hover:text-[#313131] font-medium leading-[20.25px] text-[16px]"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >Download on App Store</p>
                                </a>
                                <a
                                    style={{
                                        borderColor: "#FFFFFF5E",
                                        paddingLeft: "18px",
                                        paddingRight: "18px",
                                        textDecoration: "none",
                                    }}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex w-fit justify-center flex-row group items-center hover:bg-white transition-all bg-[#FFFFFF42] border py-3 gap-[3.75px] rounded-[8px]" href={process.env.NEXT_PUBLIC_GOOGLE_PLAY_LINK || "/"}>
                                    <svg className="text-white transition-all group-hover:text-[#313131]" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.40698 1.20935L9.19564 8.00002L2.40764 14.7907C2.28714 14.7396 2.18433 14.6543 2.11202 14.5452C2.0397 14.4361 2.00108 14.3082 2.00098 14.1774V1.82335C2.0009 1.69245 2.03935 1.56442 2.11155 1.45524C2.18375 1.34605 2.2865 1.26053 2.40698 1.20935ZM9.66698 8.47135L11.2016 10.006L3.91031 14.228L9.66698 8.47135ZM11.7996 6.33935L13.671 7.42335C13.772 7.48195 13.8559 7.56607 13.9142 7.66727C13.9724 7.76848 14.0031 7.88322 14.0031 8.00002C14.0031 8.11681 13.9724 8.23155 13.9142 8.33276C13.8559 8.43396 13.772 8.51808 13.671 8.57668L11.799 9.66068L10.1383 8.00002L11.7996 6.33935ZM3.91031 1.77202L11.2023 5.99335L9.66698 7.52868L3.91031 1.77202Z" fill="currentColor" />
                                    </svg>

                                    <p className="text-[#F3F3F3] transition-all group-hover:text-[#313131] font-medium leading-[20.25px] text-[16px]"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >Get it on Google Play</p>
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <div className="overflow-hidden h-[340px] xl:h-full">
                    <div className={styles.phoneSection}>
                        {/* Large transparent circle background */}
                        {/* <div className={styles.circleBackground}></div> */}

                        {/* Phone Mockup Image */}
                        <div className={styles.phoneContainer}>
                            <Image
                                src={heroPhoneMockup}
                                width={542}
                                height={602}
                                alt="SnapMyFine app mockup"
                                className={styles.heroPhone}
                                priority
                            />
                        </div>
                    </div>
                    </div>
                </div>
            </main>

            {/* schedule section */}
            <Schedule />

            {/* easy payment section */}
            <EasyPayment />

            {/* StatsBar section */}
            <StatsBar />

            {/* dispute section */}
            <Dispute />

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
                className="relative bg-[#F5F9FF] py-16 md:py-24"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="text-left space-y-1 mb-16  max-w-3xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                            <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-[#2563EB] text-sm">
                                Our process
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2
                            className="text-[#0C2D76]"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 800,
                                fontSize: "40px",
                                lineHeight: "57.6px",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            Open the app. Snap your ticket.
                            We handle the rest.
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
                            No council websites. No confusing forms. No legal jargon. Just a clear, calm guide through what to do next — right from your phone.
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
                                <div className="bg-white h-fit p-[20px] rounded-xl  shadow-[0px_4px_12px_0px_#BABABA40]">
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
                                        Take a photo of your PCN
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
                                        Open SnapMyFine and snap your ticket. The app reads every detail automatically; council, fine amount, contravention code, and the deadlines that matter most.
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
                                <div className="bg-white h-fit p-[20px] rounded-xl  shadow-[0px_4px_12px_0px_#BABABA40]">
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
                                <div className="bg-white h-fit p-[20px] rounded-xl  shadow-[0px_4px_12px_0px_#BABABA40]">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                                            {activeStep === 3 ? (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path d="M37.1001 5.58333C36.9436 5.40039 36.7493 5.25352 36.5307 5.15282C36.312 5.05212 36.0741 4.99998 35.8334 5H20.8334C20.5967 5.0003 20.3629 5.05099 20.1474 5.1487C19.9318 5.2464 19.7396 5.38889 19.5834 5.56667C19.4268 5.745 19.3101 5.95472 19.2412 6.18179C19.1722 6.40886 19.1525 6.64804 19.1834 6.88333L20.8501 19.3833C20.8785 19.6022 20.9498 19.8133 21.0598 20.0046C21.1699 20.196 21.3165 20.3637 21.4914 20.4984C21.6663 20.633 21.866 20.7319 22.0791 20.7894C22.2922 20.8469 22.5145 20.8618 22.7334 20.8333C22.9523 20.8049 23.1634 20.7336 23.3547 20.6236C23.546 20.5135 23.7138 20.3669 23.8484 20.192C23.9831 20.0171 24.082 19.8174 24.1394 19.6043C24.1969 19.3912 24.2118 19.1689 24.1834 18.95L22.8334 8.8C22.824 8.74307 22.8281 8.68472 22.8455 8.6297C22.8629 8.57467 22.893 8.52453 22.9334 8.48333C22.9684 8.44086 23.0114 8.40574 23.06 8.37999C23.1087 8.35425 23.1619 8.33839 23.2167 8.33333H33.3334C33.3945 8.32992 33.4555 8.34186 33.5108 8.36806C33.5661 8.39426 33.614 8.43389 33.6501 8.48333C33.6908 8.52777 33.7209 8.58084 33.7382 8.63856C33.7555 8.69628 33.7596 8.75716 33.7501 8.81667L31.9334 19.7667C31.8605 20.2087 31.9661 20.6616 32.2271 21.0257C32.4881 21.3899 32.883 21.6354 33.3251 21.7083C33.5439 21.7444 33.7678 21.7371 33.9838 21.6867C34.1998 21.6363 34.4038 21.5439 34.5841 21.4146C34.9482 21.1536 35.1938 20.7587 35.2667 20.3167L37.5001 6.98333C37.5437 6.73492 37.5303 6.47985 37.461 6.23734C37.3917 5.99484 37.2683 5.77122 37.1001 5.58333Z" fill="#105ae2" /><path d="M31.6667 23.3332H21.6667C21.5891 23.336 21.5125 23.3152 21.4471 23.2735C21.3816 23.2319 21.3303 23.1713 21.3 23.0999L19.7 19.9999C19.6395 19.8738 19.5483 19.765 19.4347 19.6834C19.3211 19.6019 19.1888 19.5502 19.05 19.5332C18.9099 19.5171 18.768 19.5361 18.6371 19.5884C18.5062 19.6408 18.3903 19.7249 18.3 19.8332L15.1667 23.6832C14.9089 23.9564 14.558 24.1229 14.1833 24.1499H12.5167C12.4044 24.1476 12.2929 24.1681 12.1887 24.21C12.0846 24.2519 11.99 24.3144 11.9106 24.3938C11.8312 24.4732 11.7687 24.5678 11.7267 24.6719C11.6848 24.7761 11.6644 24.8876 11.6667 24.9999V34.9999C11.6639 35.1297 11.6929 35.2583 11.7509 35.3744C11.809 35.4906 11.8945 35.5908 12 35.6666C15.8333 38.5499 18.8 39.9999 20.8333 39.9999H30.0833C30.809 40.1227 31.554 39.9582 32.1606 39.5414C32.7672 39.1246 33.1878 38.488 33.3333 37.7666C34.1453 33.8288 34.7021 29.8428 35 25.8332C35 24.5832 33.85 23.3332 31.6667 23.3332ZM8.05 22.4999H2.91667C2.80616 22.4999 2.70018 22.5438 2.62204 22.6219C2.5439 22.7001 2.5 22.8061 2.5 22.9166V37.9166C2.5 38.0271 2.5439 38.133 2.62204 38.2112C2.70018 38.2893 2.80616 38.3332 2.91667 38.3332H8.05C8.18938 38.3496 8.33066 38.3365 8.46463 38.2947C8.5986 38.2528 8.72227 38.1833 8.8276 38.0906C8.93292 37.9978 9.01755 37.8839 9.07596 37.7563C9.13438 37.6287 9.16529 37.4902 9.16667 37.3499V23.4832C9.16529 23.3429 9.13438 23.2044 9.07596 23.0768C9.01755 22.9492 8.93292 22.8353 8.8276 22.7426C8.72227 22.6498 8.5986 22.5803 8.46463 22.5385C8.33066 22.4967 8.18938 22.4835 8.05 22.4999ZM25.8333 14.9999C25.8333 15.6629 26.0967 16.2988 26.5656 16.7677C27.0344 17.2365 27.6703 17.4999 28.3333 17.4999C28.9964 17.4999 29.6323 17.2365 30.1011 16.7677C30.5699 16.2988 30.8333 15.6629 30.8333 14.9999C30.8333 14.3369 30.5699 13.701 30.1011 13.2321C29.6323 12.7633 28.9964 12.4999 28.3333 12.4999C27.6703 12.4999 27.0344 12.7633 26.5656 13.2321C26.0967 13.701 25.8333 14.3369 25.8333 14.9999ZM16.6667 18.3332C16.9099 18.3364 17.1509 18.2862 17.3727 18.1863C17.5944 18.0864 17.7917 17.9392 17.9505 17.7549C18.1093 17.5707 18.2259 17.3539 18.292 17.1198C18.3582 16.8857 18.3723 16.64 18.3333 16.3999L16.2167 3.81656C16.1756 3.70924 16.1756 3.59055 16.2167 3.48323C16.2675 3.41543 16.3378 3.36474 16.4182 3.33794C16.4986 3.31114 16.5853 3.3095 16.6667 3.33323H30C30.442 3.33323 30.866 3.15763 31.1785 2.84507C31.4911 2.53251 31.6667 2.10859 31.6667 1.66656C31.6667 1.22453 31.4911 0.80061 31.1785 0.48805C30.866 0.175489 30.442 -0.00010552 30 -0.00010552H14.1667C13.9234 -0.00324261 13.6825 0.0469008 13.4607 0.146804C13.2389 0.246707 13.0417 0.393948 12.8828 0.57819C12.724 0.762431 12.6074 0.979206 12.5413 1.2133C12.4752 1.44738 12.4611 1.69311 12.5 1.93323L15 16.9332C15.0639 17.3276 15.2673 17.6859 15.5732 17.9429C15.8791 18.1998 16.2672 18.3384 16.6667 18.3332Z" fill="#105ae2" /></g><defs><clipPath id="a"><rect width="40" height="40" fill="#fff" /></clipPath></defs></svg>
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path d="M37.1 5.58333C36.9435 5.40039 36.7493 5.25352 36.5306 5.15282C36.3119 5.05212 36.0741 4.99998 35.8333 5H20.8333C20.5967 5.0003 20.3628 5.05099 20.1473 5.1487C19.9318 5.2464 19.7395 5.38889 19.5833 5.56667C19.4268 5.745 19.3101 5.95472 19.2411 6.18179C19.1721 6.40886 19.1524 6.64804 19.1833 6.88333L20.85 19.3833C20.8784 19.6022 20.9497 19.8133 21.0598 20.0046C21.1698 20.196 21.3165 20.3637 21.4914 20.4984C21.6662 20.633 21.8659 20.7319 22.079 20.7894C22.2921 20.8469 22.5145 20.8618 22.7333 20.8333C22.9522 20.8049 23.1633 20.7336 23.3546 20.6236C23.546 20.5135 23.7137 20.3669 23.8484 20.192C23.983 20.0171 24.0819 19.8174 24.1394 19.6043C24.1968 19.3912 24.2118 19.1689 24.1833 18.95L22.8333 8.8C22.8239 8.74307 22.828 8.68472 22.8454 8.6297C22.8628 8.57467 22.8929 8.52453 22.9333 8.48333C22.9683 8.44086 23.0114 8.40574 23.06 8.37999C23.1086 8.35425 23.1619 8.33839 23.2167 8.33333H33.3333C33.3944 8.32992 33.4554 8.34186 33.5107 8.36806C33.566 8.39426 33.6139 8.43389 33.65 8.48333C33.6907 8.52777 33.7208 8.58084 33.7381 8.63856C33.7555 8.69628 33.7595 8.75716 33.75 8.81667L31.9333 19.7667C31.8604 20.2087 31.966 20.6616 32.227 21.0257C32.488 21.3899 32.883 21.6354 33.325 21.7083C33.5439 21.7444 33.7677 21.7371 33.9837 21.6867C34.1998 21.6363 34.4037 21.5439 34.584 21.4146C34.9482 21.1536 35.1937 20.7587 35.2667 20.3167L37.5 6.98333C37.5436 6.73492 37.5302 6.47985 37.461 6.23734C37.3917 5.99484 37.2682 5.77122 37.1 5.58333Z" fill="#caccce" /><path d="M31.6667 23.3332H21.6667C21.5891 23.336 21.5125 23.3152 21.4471 23.2735C21.3816 23.2319 21.3303 23.1713 21.3 23.0999L19.7 19.9999C19.6395 19.8738 19.5483 19.765 19.4347 19.6834C19.3211 19.6019 19.1888 19.5502 19.05 19.5332C18.9099 19.5171 18.768 19.5361 18.6371 19.5884C18.5062 19.6408 18.3903 19.7249 18.3 19.8332L15.1667 23.6832C14.9089 23.9564 14.558 24.1229 14.1833 24.1499H12.5167C12.4044 24.1476 12.2929 24.1681 12.1887 24.21C12.0846 24.2519 11.99 24.3144 11.9106 24.3938C11.8312 24.4732 11.7687 24.5678 11.7267 24.6719C11.6848 24.7761 11.6644 24.8876 11.6667 24.9999V34.9999C11.6639 35.1297 11.6929 35.2583 11.7509 35.3744C11.809 35.4906 11.8945 35.5908 12 35.6666C15.8333 38.5499 18.8 39.9999 20.8333 39.9999H30.0833C30.809 40.1227 31.554 39.9582 32.1606 39.5414C32.7672 39.1246 33.1878 38.488 33.3333 37.7666C34.1453 33.8288 34.7021 29.8428 35 25.8332C35 24.5832 33.85 23.3332 31.6667 23.3332ZM8.05 22.4999H2.91667C2.80616 22.4999 2.70018 22.5438 2.62204 22.6219C2.5439 22.7001 2.5 22.8061 2.5 22.9166V37.9166C2.5 38.0271 2.5439 38.133 2.62204 38.2112C2.70018 38.2893 2.80616 38.3332 2.91667 38.3332H8.05C8.18938 38.3496 8.33066 38.3365 8.46463 38.2947C8.5986 38.2528 8.72227 38.1833 8.8276 38.0906C8.93292 37.9978 9.01755 37.8839 9.07596 37.7563C9.13438 37.6287 9.16529 37.4902 9.16667 37.3499V23.4832C9.16529 23.3429 9.13438 23.2044 9.07596 23.0768C9.01755 22.9492 8.93292 22.8353 8.8276 22.7426C8.72227 22.6498 8.5986 22.5803 8.46463 22.5385C8.33066 22.4967 8.18938 22.4835 8.05 22.4999ZM25.8333 14.9999C25.8333 15.6629 26.0967 16.2988 26.5656 16.7677C27.0344 17.2365 27.6703 17.4999 28.3333 17.4999C28.9964 17.4999 29.6323 17.2365 30.1011 16.7677C30.5699 16.2988 30.8333 15.6629 30.8333 14.9999C30.8333 14.3369 30.5699 13.701 30.1011 13.2321C29.6323 12.7633 28.9964 12.4999 28.3333 12.4999C27.6703 12.4999 27.0344 12.7633 26.5656 13.2321C26.0967 13.701 25.8333 14.3369 25.8333 14.9999ZM16.6667 18.3332C16.9099 18.3364 17.1509 18.2862 17.3727 18.1863C17.5944 18.0864 17.7917 17.9392 17.9505 17.7549C18.1093 17.5707 18.2259 17.3539 18.292 17.1198C18.3582 16.8857 18.3723 16.64 18.3333 16.3999L16.2167 3.81656C16.1756 3.70924 16.1756 3.59055 16.2167 3.48323C16.2675 3.41543 16.3378 3.36474 16.4182 3.33794C16.4986 3.31114 16.5853 3.3095 16.6667 3.33323H30C30.442 3.33323 30.866 3.15763 31.1785 2.84507C31.4911 2.53251 31.6667 2.10859 31.6667 1.66656C31.6667 1.22453 31.4911 0.80061 31.1785 0.48805C30.866 0.175489 30.442 -0.00010552 30 -0.00010552H14.1667C13.9234 -0.00324261 13.6825 0.0469008 13.4607 0.146804C13.2389 0.246707 13.0417 0.393948 12.8828 0.57819C12.724 0.762431 12.6074 0.979206 12.5413 1.2133C12.4752 1.44738 12.4611 1.69311 12.5 1.93323L15 16.9332C15.0639 17.3276 15.2673 17.6859 15.5732 17.9429C15.8791 18.1998 16.2672 18.3384 16.6667 18.3332Z" fill="#caccce" /></g><defs><clipPath id="a"><rect width="40" height="40" fill="#fff" /></clipPath></defs></svg>
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
                                        className="hidden lg:block h-auto w-full max-w-[840px] border-2 border-[red]"
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
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
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
            <section id="cta" className="relative bg-white py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Blue CTA Card */}
                    <div className="relative bg-[#105AE2] rounded-[12px] overflow-hidden">
                        {/* Grid Pattern Background */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.7] z-0"
                            style={{
                                backgroundImage: `url(${patternImage})`,
                                backgroundRepeat: "repeat",
                            }}
                        />

                        <div className="absolute z-5 -left-25 top-50 size-146.75 blur-xl bg-linear-to-r from-[#3182E9] to-[#105AE2] rounded-full" />
                        <div className="absolute z-5 -right-25 bottom-70 size-146.75 blur-3xl bg-linear-to-r from-[#3182E9] to-[#105AE2] rounded-full" />

                        {/* Content */}
                        <div className="relative z-10 px-5 md:px-16 py-7.5 md:py-[37.5px]">
                            <div className="flex flex-col md:flex-row items-start gap-7.5 md:gap-20">
                                {/* Left Column - Heading */}
                                <div className="flex flex-col gap-6 w-full max-w-136.5">
                                    {/* Badge */}
                                    <div className="flex flex-row items-center gap-2 px-3 py-2 bg-[#0464DD] rounded-full w-fit">
                                        <Image src={logoWhite} alt="Logo" width={24} height={24} className="shrink-0" />
                                        <span
                                            className="text-white"
                                            style={{
                                                fontFamily: "Sora",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                lineHeight: "21px",
                                            }}
                                        >
                                            Now live across London councils
                                        </span>
                                    </div>

                                    {/* Main Heading */}
                                    <h2
                                        className="text-white text-[40px] leading-12"
                                        style={{
                                            fontFamily: "Sora",
                                            fontWeight: 700,
                                            letterSpacing: "-1px",
                                        }}
                                    >
                                        Experience faster parking fine payments.
                                    </h2>

                                    <p style={{ fontFamily: "Inter" }} className="text-white font-normal text-base leading-[22.5px] max-w-[489px]">Settle your parking fines in just 60 seconds! Simply snap a photo, and let SnapMyFine handle everything else effortlessly.</p>
                                </div>

                                {/* Right Column - Form */}
                                <div className="flex flex-col w-full gap-7.5 md:gap-8">
                                    <section className="w-full flex flex-col gap-4">
                                        <p style={{ fontFamily: "Inter" }} className="text-white font-semibold text-base leading-[150%]">Download the app now:</p>
                                        <div className="flex flex-col xl:flex-row gap-3 w-full">
                                            <a
                                                style={{
                                                    borderColor: "#FFFFFF5E",
                                                    paddingLeft: "18px",
                                                    paddingRight: "18px",
                                                    textDecoration: "none",
                                                }}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex flex-row w-full justify-center group transition-all items-center hover:bg-white bg-[#003880] border py-3 gap-[3.75px] rounded-[8px]" href={process.env.NEXT_PUBLIC_APP_STORE_LINK || "/"}>
                                                <svg className="text-white transition-all group-hover:text-[#313131]" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.6781 8.37031C11.6719 7.30469 12.1547 6.50156 13.1297 5.90938C12.5844 5.12813 11.7594 4.69844 10.6719 4.61562C9.64219 4.53437 8.51562 5.21562 8.10312 5.21562C7.66719 5.21562 6.67031 4.64375 5.88594 4.64375C4.26719 4.66875 2.54688 5.93437 2.54688 8.50937C2.54688 9.27031 2.68594 10.0563 2.96406 10.8656C3.33594 11.9313 4.67656 14.5422 6.075 14.5C6.80625 14.4828 7.32344 13.9812 8.275 13.9812C9.19844 13.9812 9.67656 14.5 10.4922 14.5C11.9031 14.4797 13.1156 12.1063 13.4688 11.0375C11.5766 10.1453 11.6781 8.425 11.6781 8.37031ZM10.0359 3.60469C10.8281 2.66406 10.7563 1.80781 10.7328 1.5C10.0328 1.54062 9.22344 1.97656 8.7625 2.5125C8.25469 3.0875 7.95625 3.79844 8.02031 4.6C8.77656 4.65781 9.46719 4.26875 10.0359 3.60469Z" fill="currentColor" />
                                                </svg>
                                                <p className="text-[#F3F3F3] transition-all group-hover:text-[#313131] font-medium leading-[20.25px] text-base"
                                                    style={{
                                                        fontFamily: "Inter",
                                                    }}
                                                >App Store</p>
                                            </a>
                                            <a
                                                style={{
                                                    borderColor: "#FFFFFF5E",
                                                    paddingLeft: "18px",
                                                    paddingRight: "18px",
                                                    textDecoration: "none",
                                                }}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex flex-row w-full justify-center group items-center hover:bg-white transition-all bg-[#FFFFFF42] border py-3 gap-[3.75px] rounded-[8px]" href={process.env.NEXT_PUBLIC_GOOGLE_PLAY_LINK || "/"}>
                                                <svg className="text-white transition-all group-hover:text-[#313131]" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.40698 1.20935L9.19564 8.00002L2.40764 14.7907C2.28714 14.7396 2.18433 14.6543 2.11202 14.5452C2.0397 14.4361 2.00108 14.3082 2.00098 14.1774V1.82335C2.0009 1.69245 2.03935 1.56442 2.11155 1.45524C2.18375 1.34605 2.2865 1.26053 2.40698 1.20935ZM9.66698 8.47135L11.2016 10.006L3.91031 14.228L9.66698 8.47135ZM11.7996 6.33935L13.671 7.42335C13.772 7.48195 13.8559 7.56607 13.9142 7.66727C13.9724 7.76848 14.0031 7.88322 14.0031 8.00002C14.0031 8.11681 13.9724 8.23155 13.9142 8.33276C13.8559 8.43396 13.772 8.51808 13.671 8.57668L11.799 9.66068L10.1383 8.00002L11.7996 6.33935ZM3.91031 1.77202L11.2023 5.99335L9.66698 7.52868L3.91031 1.77202Z" fill="currentColor" />
                                                </svg>

                                                <p className="text-[#F3F3F3] transition-all group-hover:text-[#313131] font-medium leading-[20.25px] text-base"
                                                    style={{
                                                        fontFamily: "Inter",
                                                    }}
                                                >Google Play</p>
                                            </a>
                                        </div>
                                    </section>
                                    <section className="flex flex-col gap-4 w-full items-center">
                                        <div className="flex flex-row items-center w-full">
                                            <div className="flex-1 h-px bg-[#FFFFFF73]"></div>
                                            <p style={{ fontFamily: "Inter" }} className="text-white font-semibold leading-[150%] text-[14px] whitespace-nowrap px-3">Or scan QR code </p>
                                            <div className="flex-1 h-px bg-[#FFFFFF73]"></div>
                                        </div>
                                        <div className="p-2 w-fit h-fit bg-white">
                                            <QRCodeSVG value={process.env.NEXT_PUBLIC_QR_CODE_LINK || "https://snapmyfine.com"} size={119} />
                                        </div>
                                        <p className="text-white font-normal text-center leading-[150%] text-[14px]" style={{ fontFamily: "Inter" }}>Scan with your phone camera</p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />

        </div>
    );
}