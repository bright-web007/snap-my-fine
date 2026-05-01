"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import svgPaths from "@/lib/landing/svg-im39sd3dvf";

const navLinks = [
    { label: "Features", href: "/#schedule" },
    { label: "Our process", href: "/#process" },
    { label: "Why Snapmyfine", href: "/#why" },
    { label: "Blogs", href: "/blogs" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQs", href: "/#faqs" },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-6 backdrop-blur-md bg-[#034496]/60">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-0 lg:gap-3">
                        <svg
                            width="29"
                            height="25"
                            viewBox="0 0 29 29"
                            fill="none"
                            className="flex-shrink-0 lg:h-[29px]"
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
                            viewBox="0 0 137 24"
                            fill="none"
                            className="flex-shrink-0 h-[20px] lg:h-[24px]"
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
                    </Link>

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
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white hover:opacity-80 transition-opacity"
                            >
                                {link.label}
                            </Link>
                        ))}
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
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-white text-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        fontFamily: "Sora",
                                        fontWeight: 400,
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Join Waitlist Button */}
                    <div className="px-4 pt-4">
                        <Link
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
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
