import React from 'react'

const Section5 = () => {
    return (
        <section id="our-services">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 05
                </span>
            </div>

            {/* Heading */}
            <h2
                className="text-[#0D0E10] mb-6"
                style={{
                    fontFamily: "Sora",
                    fontWeight: 800,
                    fontSize: "20px",
                    lineHeight: "1.3",
                    letterSpacing: "-0.5px",
                }}
            >
                Our services
            </h2>

            {/* PCN scanning and interpretation */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                PCN scanning and interpretation
            </p>
            <p
                className="text-[#5A5C63] mb-3"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                The App uses optical character recognition (OCR) technology to read the details of your PCN from a photograph. We extract information including the issuing Council, reference number, contravention code, fine amount, and payment deadlines.
            </p>

            {/* Deadline tracking and reminders */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                Deadline tracking and reminders
            </p>
            <p
                className="text-[#5A5C63] mb-3"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                Where you have provided a valid PCN, the App will calculate and display applicable statutory deadlines. You acknowledge that it remains your sole responsibility to act on any deadline.
            </p>

            {/* Payment facilitation */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                Payment facilitation
            </p>
            <p
                className="text-[#5A5C63] mb-3"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                SnapMyFine facilitates payment of Council PCNs on your behalf through Open Banking infrastructure. We act as a payment initiation service only and do not hold your funds at any point.
            </p>

            {/* Appeal assistance */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                Appeal assistance
            </p>
            <p
                className="text-[#5A5C63]"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                The App provides guidance on whether common grounds for appeal may apply to your PCN. Where applicable, we assist in drafting an informal challenge or formal representation for submission.
            </p>
        </section>
    )
}

export default Section5