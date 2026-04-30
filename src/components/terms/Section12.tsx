import React from 'react'

const Section12 = () => {
    return (
        <section id="limitation-of-liability">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 12
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
                Limitation of liability
            </h2>

            {/* Paragraph 1 - underlined text */}
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                To the fullest extent permitted by applicable law, SnapMyFine shall not be liable for any increase in a penalty charge resulting from a missed deadline, any unsuccessful appeal outcome, any loss arising from inaccurate OCR extraction you failed to verify, or any indirect, consequential, special, or punitive loss.
            </p>

            {/* Paragraph 2 */}
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                Our total aggregate liability to you for any claim shall not exceed the total amount of fees paid by you to SnapMyFine in the 12 months preceding the event giving rise to the claim, or £100, whichever is greater.
            </p>

            {/* Green callout */}
            <div className="rounded-xl border border-[#A0D058] bg-[#EAF3DE] p-5">
                <p
                    className="text-[#27500A] mb-1  border-l-4 border-l-[#27500A] pl-2"
                    style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "14px", lineHeight: "24px" }}
                >
                    Your consumer rights are protected
                </p>
                <p
                    className="text-[#5A5C63] pl-2"
                    style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "13px", lineHeight: "22px" }}
                >
                    Nothing in these Terms limits or excludes any liability that cannot be limited under applicable UK law, including liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any liability under the Consumer Rights Act 2015.
                </p>
            </div>
        </section>
    )
}

export default Section12