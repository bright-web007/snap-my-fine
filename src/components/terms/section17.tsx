import React from 'react'

const contactCards = [
    { label: "GENERAL SUPPORT", value: "support@snapmyfine.com", href: "mailto:support@snapmyfine.com" },
    { label: "PHONE", value: "+44 330 133 5245 (Mon–Fri, 9am–5pm)", href: "tel:+443301335245" },
    { label: "WEBSITE", value: "snapmyfine.com", href: "https://snapmyfine.com" },
    { label: "REGISTERED NAME", value: "SnapMyFine" },
];

const Section17 = () => {
    return (
        <section id="contact-us">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 17
                </span>
            </div>

            {/* Heading */}
            <h2
                className="text-[#0D0E10] mb-3"
                style={{
                    fontFamily: "Sora",
                    fontWeight: 800,
                    fontSize: "20px",
                    lineHeight: "1.3",
                    letterSpacing: "-0.5px",
                }}
            >
                Contact us
            </h2>

            {/* Description */}
            <p
                className="text-[#5A5C63] mb-6"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                If you have any questions, concerns, or feedback about these Terms or the SnapMyFine Service, please contact us using the details below. We aim to respond to all enquiries within 5 working days.
            </p>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-[600px]">
                {contactCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-[#F6F8FF] rounded-xl p-[16px] border border-[#E2E6EF]"
                    >
                        <p
                            className="text-[#9CA0AB] mb-2 uppercase tracking-wider"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 500,
                                fontSize: "11px",
                                lineHeight: "1",
                            }}
                        >
                            {card.label}
                        </p>
                        {card.href ? (
                            <a
                                href={card.href}
                                className="text-[#105AE2] whitespace-nowrap"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    lineHeight: "27.2px",
                                }}
                            >
                                {card.value}
                            </a>
                        ) : (
                            <p
                                className="text-[#105AE2] whitespace-nowrap"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    lineHeight: "27.2px",
                                }}
                            >
                                {card.value}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Section17