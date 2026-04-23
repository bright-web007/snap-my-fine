"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { VerticalProgress } from "../landing/VerticalProgress";

const processStep1 = "/landing/process/step1.png";
const processStep2 = "/landing/process/step2.png";
const processStep3 = "/landing/process/step3.png";
const logoColored = "/landing/logo/logoColored.svg";
const NotificationBg = "/landing/hero/bg-grid-image.png";
const Phone = "/landing/hero/Phone.png";

const OurProcess = () => {
    const [activeStep, setActiveStep] = useState(1);
    const step1Ref = useRef<HTMLDivElement>(null);
    const step2Ref = useRef<HTMLDivElement>(null);
    const step3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const refs = [
            { ref: step1Ref, step: 1 },
            { ref: step2Ref, step: 2 },
            { ref: step3Ref, step: 3 },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    const top = visible.reduce((prev, curr) =>
                        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                    );
                    const match = refs.find((r) => r.ref.current === top.target);
                    if (match) setActiveStep(match.step);
                }
            },
            { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
        );

        refs.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="process"
            className="relative bg-[#F5F9FF] py-16 md:py-24"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-left space-y-1 mb-16  max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#393939] text-sm">
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
                <div className="lg:grid xl:grid-cols-[1fr_1fr] lg:gap-30 lg:items-center">
                    {/* Left Content - Steps */}
                    <div className="w-full">
                        {/* Step 1 */}
                        <div ref={step1Ref} className="flex gap-6">
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
                                        fontWeight: 500,
                                        fontSize: "16px",
                                        lineHeight: "130%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Take a photo of your PCN
                                </h3>
                                <p
                                    className="text-[#4D4F51]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
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
                        <div ref={step2Ref} className="flex gap-6">
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
                                        fontWeight: 500,
                                        fontSize: "16px",
                                        lineHeight: "130%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    We explain it in simple terms
                                </h3>
                                <p
                                    className="text-[#4D4F51]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    No jargon, no legalese. The app tells you exactly what your ticket means, what your rights are, and whether you have real grounds to challenge it.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div ref={step3Ref} className="flex gap-6">
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
                                        fontWeight: 500,
                                        fontSize: "16px",
                                        lineHeight: "130%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Pay or appeal — your choice, made easy
                                </h3>
                                <p
                                    className="text-[#4D4F51] mb-4"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Pay securely through Open Banking in seconds. Or let us help you build a proper appeal letter — calm, clear, and written the way councils actually respond to.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    {/* Desktop: Side by side, Mobile: Below steps */}
                    <div className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
                        {/* Phone Mockup - visible on mobile */}
                        <div className="relative flex items-center justify-center w-full lg:hidden">
                            {/* Background decorative squares */}
                            {/* Bottom-left blue container - behind phone */}
                            <div className="absolute left-1/3 md:left-1/2 -translate-x-[55%] md:-translate-x-[100%] bottom-12 w-[255px] sm:w-[350px] h-[194px] sm:h-[260px] rounded-3xl overflow-hidden z-0">
                                <Image src={NotificationBg} alt="" fill sizes="(max-width: 640px) 255px, 350px" className="object-cover opacity-90 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#105AE2]/80 to-[#FFFFFF]/30" />
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-lg" />
                                <div className="absolute top-16 right-10 w-5 h-5 bg-white/15 rounded-md" />
                                <div className="absolute bottom-10 left-6 w-6 h-6 bg-white/15 rounded-md" />
                            </div>
                            {/* Top-right blue container - behind phone */}
                            <div className="absolute left-1/3 md:left-1/2 translate-x-[5%] sm:translate-x-[1%] md:translate-x-[5%] -top-4 w-[255px] sm:w-[350px] h-[194px] sm:h-[260px] rounded-3xl overflow-hidden z-0">
                                <Image src={NotificationBg} alt="" fill sizes="(max-width: 640px) 255px, 350px" className="object-cover opacity-60 pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-l from-[#105AE2] to-[#FFFFFF]" />
                                <div className="absolute top-4 left-4 w-7 h-7 bg-white/20 rounded-lg" />
                                <div className="absolute bottom-8 right-6 w-5 h-5 bg-white/15 rounded-md" />
                                <div className="absolute top-14 left-10 w-4 h-4 bg-white/15 rounded-md" />
                            </div>

                            {/* Phone image */}
                            <div className="relative z-10">
                                <Image src={processStep1} alt="Payment screen" width={197.01} height={550} className="drop-shadow-2xl sm:w-[269px]" />
                            </div>
                        </div>

                        {/* Phone Image - Conditional rendering based on active step for desktop */}
                        <div className="relative hidden lg:flex items-center justify-center w-full">
                            {/* Background decorative squares */}
                            {/* Bottom-left blue container - behind phone */}
                            <div className="absolute left-1/2 -translate-x-[95%] bottom-12 w-[350px] h-[260px] rounded-3xl overflow-hidden z-0">
                                <Image src={NotificationBg} alt="" fill sizes="350px" className="object-cover pointer-events-none z-30" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#105AE2]/90 to-[#FFFFFF]/30" />
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-lg" />
                                <div className="absolute top-16 right-10 w-5 h-5 bg-white/15 rounded-md" />
                                <div className="absolute bottom-10 left-6 w-6 h-6 bg-white/15 rounded-md" />
                            </div>
                            {/* Top-right blue container - behind phone */}
                            <div className="absolute left-1/2 -translate-x-[15%] -top-4 w-[350px] h-[260px] rounded-3xl overflow-hidden z-0">
                                <Image src={NotificationBg} alt="" fill sizes="350px" className="object-cover pointer-events-none z-30" />
                                <div className="absolute inset-0 bg-gradient-to-l from-[#105AE2]/90 to-[#FFFFFF]/30" />
                                <div className="absolute top-4 left-4 w-7 h-7 bg-white/20 rounded-lg" />
                                <div className="absolute bottom-8 right-6 w-5 h-5 bg-white/15 rounded-md" />
                                <div className="absolute top-14 left-10 w-4 h-4 bg-white/15 rounded-md" />
                            </div>

                            {/* Phone image */}
                            <div className="relative z-10">
                                {activeStep === 1 && (
                                    <Image src={processStep1} alt="Step 1: Take a photo" width={197.01} height={550} className="drop-shadow-2xl w-[269px]" />
                                )}
                                {activeStep === 2 && (
                                    <Image src={processStep2} alt="Step 2: Processing ticket" width={197.01} height={550} className="drop-shadow-2xl w-[269px]" />
                                )}
                                {activeStep === 3 && (
                                    <Image src={processStep3} alt="Step 3: Payment completed" width={197.01} height={550} className="drop-shadow-2xl w-[269px]" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 w-full bg-[#FFF5E4] p-[20px] text-center">
                    <p
                        className="text-[#D58600]"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "27.2px",
                        }}
                    >
                        The app also watches your deadlines for you. We&apos;ll remind you before the 14-day and 28-day windows close, so nothing slips through the cracks.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OurProcess;
