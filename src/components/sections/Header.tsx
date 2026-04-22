"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import svgPaths from "@/lib/landing/svg-im39sd3dvf";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="relative z-20 px-4 md:px-8 py-6">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3">
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
                    </a>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden lg:flex items-center gap-8"
                        style={{
                            fontFamily: "Sora",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                        }}
                    >
                        <a
                            href="/#schedule"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Features
                        </a>
                        <a
                            href="/#process"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Our process
                        </a>
                        <a
                            href="/#why"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Why Snapmyfine
                        </a>
                         <a
                            href="/#blog"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Blogs
                        </a>
                        <a
                            href="/#testimonials"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            Testimonials
                        </a>
                        <a
                            href="/#faqs"
                            className="text-white hover:opacity-80 transition-opacity"
                        >
                            FAQs
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[#034496] pb-6">
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
                                href="/#process"
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
                                href="/#why"
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
                                href="/#testimonials"
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
                                href="/#faqs"
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
                            href="/#waitlist"
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
        </>
    );
};

export default Header;
