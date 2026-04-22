import React from "react";
import Image from "next/image";
import svgPaths from "@/lib/landing/svg-im39sd3dvf";

const Footer = () => {
    return (
        <footer className="relative bg-[#113279] py-17.5">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-12">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row justify-between gap-15.5 lg:gap-0 xl:gap-[97px]">
                    {/* Left Column - Logo & Description */}
                    <section className="flex flex-col w-full max-w-107 gap-7.75">
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
                                    <path d={svgPaths.p4fbf500} fill="#FFFFFF" />
                                    <path d={svgPaths.pe0d9380} fill="#FFFFFF" />
                                    <path d={svgPaths.p5e1b200} fill="#FFFFFF" />
                                    <path d={svgPaths.p2da1a1c0} fill="#FFFFFF" />
                                    <path d={svgPaths.p1fea0980} fill="#FFFFFF" />
                                    <path d={svgPaths.p1e3d9400} fill="#FFFFFF" />
                                    <path d={svgPaths.p1b74e580} fill="#FFFFFF" />
                                    <path d={svgPaths.p2537d30} fill="#FFFFFF" />
                                    <path d={svgPaths.p362e0200} fill="#FFFFFF" />
                                    <path d={svgPaths.p1c80d000} fill="#FFFFFF" />
                                </g>
                            </svg>
                        </div>

                        {/* Description */}
                        <p
                            className="text-[#FFFFFFDB] w-full text-base leading-[27.2px]"
                            style={{
                                fontFamily: "Inter",
                            }}
                        >
                            SnapMyFine is redefining the way drivers manage their parking
                            fines by bringing automation, security, and transparency into one
                            simple experience.
                        </p>

                        {/* Contact */}
                        <div className="flex flex-col gap-1">
                            <p
                                className="text-[#FFFFFFDB] text-sm font-semibold leading-[150%]"
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                Contact:
                            </p>
                            <p
                                className="text-[#FFFFFFDB] font-normal leading-[150%] text-sm"
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                +44 330 133 5245
                                <br />
                                support@snapmyfine.co.uk.
                            </p>
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <p className="font-medioum text-sm leading-6 text-[#FFFFFFDB]">Download the Snapmyfine mobile app</p>
                            <div className="flex flex-row gap-4">
                                <a href={process.env.NEXT_PUBLIC_APP_STORE_LINK || "/"} target="_blank" rel="noopener noreferrer">
                                    <Image src="/applestore.svg" alt="Download on the Apple App Store" width={128} height={40} />
                                </a>
                                <a href={process.env.NEXT_PUBLIC_GOOGLE_PLAY_LINK || "/"} target="_blank" rel="noopener noreferrer">
                                    <Image src="/playstore.svg" alt="Get it on Google Play" width={128} height={40} />
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 gap-y-8 w-full">
                        <div className="flex flex-col gap-7.75">
                            <h3
                                className="text-white text-[16px] leading-[27.2px] tracking-[-0.3px] font-medium"
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                Quick links
                            </h3>
                            <nav className="flex flex-col gap-3">
                                {[
                                    { label: "Our process", href: "/#process" },
                                    { label: "Why SnapMyFine", href: "/#why" },
                                    { label: "Testimonials", href: "/#testimonials" },
                                    { label: "FAQ", href: "/#faq" },
                                    { label: "Blog", href: "/blogs" },
                                ].map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="block text-[#FFFFFFDB] hover:text-[#105AE2] transition-colors text-[14px] leading-[27.2px] tracking-[0.3px] font-normal"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="flex flex-col gap-7.75">
                            <h3
                                className="text-white text-[16px] font-medium leading-[27.2px] tracking-[-0.3px] font-medium"
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                Features
                            </h3>
                            <nav className="flex flex-col gap-3">
                                {[
                                    { label: "Smart Reminders", href: "/#schedule" },
                                    { label: "Disputes", href: "/#dispute" },
                                    { label: "Easy Payments", href: "/#easypayment" },
                                    { label: "Organizations", href: "/#organisation" },
                                ].map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="block text-[#FFFFFFDB] hover:text-[#105AE2] transition-colors text-[14px] leading-[27.2px] tracking-[0.3px] font-normal"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="flex flex-col gap-7.75">
                            <h3
                                className="text-white text-[16px] font-medium leading-[27.2px] tracking-[-0.3px] font-medium"
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                Legal
                            </h3>
                            <nav className="flex flex-col gap-3">
                                {[
                                    // { label: "Privacy Policy", href: "/" },
                                    { label: "Terms and Conditions", href: "/terms-and-condition" },
                                    // { label: "Cookie", href: "/" },
                                ].map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="block text-[#FFFFFFDB] hover:text-[#105AE2] transition-colors text-[14px] leading-[27.2px] tracking-[0.3px] font-normal"
                                        style={{
                                            fontFamily: "Inter",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Right Column - Social Links */}
                        <div className="flex flex-col gap-4">
                            <h3
                                className="text-white text-base leading-[27.2px] tracking-[-0.3px] font-medium"
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                Follow us
                            </h3>
                            <div className="flex flex-col">
                                {[
                                    {
                                        name: "Facebook",
                                        href: "https://www.facebook.com/SnapMyFine",
                                        icon: (
                                            <svg
                                                width="18"
                                                height="18"
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
                                        href: "https://www.instagram.com/snapmyfine?igsh=MXZ5N3VtZWM4YWR0dQ==",
                                        icon: (
                                            <svg
                                                width="18"
                                                height="18"
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
                                        name: "TikTok",
                                        href: "https://www.tiktok.com/@snapmyfine?_r=1&_t=ZS-95ipDFpUYE8",
                                        icon: (
                                            <svg
                                                width="18"
                                                height="18"
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
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex py-2 items-center gap-3 group"
                                    >
                                        <div className="w-10 h-10 p-2 rounded-full bg-[#0464DD] flex items-center justify-center group-hover:bg-[#0d4cc4] transition-colors">
                                            {social.icon}
                                        </div>
                                        <span
                                            className="text-white group-hover:text-[#105AE2] transition-colors font-roboto font-normal leading-[150%] text-sm"
                                        >
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="w-full border-t border-[#F8F8F826] pt-6 xl:flex xl:gap-8">
                    <p
                        className="text-white text-[16px] leading-[27.2px] tracking-[-0.3px] whitespace-nowrap"
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                        }}
                    >
                        © 2025 SnapMyFine Ltd. All rights reserved.
                    </p>
                    <hr className="my-4 border-t border-[#F8F8F826] w-full" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
