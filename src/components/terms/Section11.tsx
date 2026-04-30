import React from 'react'

const Section11 = () => {
    return (
        <section id="intellectual-property">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 11
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
                Intellectual property
            </h2>

            {/* Paragraph 1 */}
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                All intellectual property rights in the SnapMyFine App, website, and Service &mdash; including software, design, text, graphics, logos, and trade marks &mdash; are owned by or licensed to SnapMyFine. Nothing in these Terms grants you any right to use our intellectual property beyond what is necessary to use the Service.
            </p>

            {/* Paragraph 2 */}
            <p
                className="text-[#5A5C63]"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                You must not copy, reproduce, distribute, modify, or create derivative works from any part of the Service without our prior written consent, or reverse engineer, decompile, or attempt to extract the source code of the App.
            </p>
        </section>
    )
}

export default Section11