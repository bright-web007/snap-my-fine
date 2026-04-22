import React from 'react'

const bulletPoints = [
    "Understand the details of a Council PCN through automated OCR scanning",
    "Track payment deadlines — the 14-day discount and 28-day challenge windows",
    "Decide whether to pay or challenge a fine based on information we provide",
    "Submit payment for a PCN securely through Open Banking infrastructure",
    "Draft an appeal letter for submission to the relevant Council or adjudicator",
];

const Section2 = () => {
    return (
        <section id="about-snapmyfine">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 02
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
                About SnapMyFine
            </h2>

            {/* Description */}
            <p
                className="text-[#5A5C63] mb-3"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                SnapMyFine is a technology company registered in the UK. We are not a law firm, claims management company, or financial institution. We are a technology platform that helps drivers manage Council PCNs more efficiently.
            </p>

            {/* Sub-heading */}
            <p
                className="text-[#0D0E10] mb-4"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "27.2px",
                }}
            >
                The Service is designed to help you:
            </p>

            {/* Bullet List */}
            <ul className="space-y-3">
                {bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="mt-[10px] w-[6px] h-[6px] rounded-full bg-[#105AE2] shrink-0" />
                        <span
                            className="text-[#5A5C63]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "27.2px",
                            }}
                        >
                            {point}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Section2