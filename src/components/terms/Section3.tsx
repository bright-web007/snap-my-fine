import React from 'react'

const Section3 = () => {
    return (
        <section id="eligibility">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 03
                </span>
            </div>

            {/* Heading */}
            <h2
                className="text-[#0D0E10] mb-4"
                style={{
                    fontFamily: "Sora",
                    fontWeight: 800,
                    fontSize: "20px",
                    lineHeight: "1.3",
                    letterSpacing: "-0.5px",
                }}
            >
                Eligibility
            </h2>

            {/* Description */}
            <p
                className="text-[#5A5C63] mb-4"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                To use the SnapMyFine Service, you must be at least 18 years of age, be a UK resident or using the Service in connection with a UK-registered vehicle, have legal authority to act in relation to the PCN, and agree to these Terms in full.
            </p>

            {/* Sub-heading */}
            <p
                className="text-[#0D0E10] mb-1"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "27.2px",
                }}
            >
                Authorised representatives
            </p>

            {/* Paragraph 1 */}
            <p
                className="text-[#5A5C63] mb-2"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                Where you are acting as an authorised representative of the registered keeper or driver, you confirm that you hold written or email authority from that person to manage the PCN on their behalf. SnapMyFine may request evidence of that authority at any time.
            </p>

            {/* Paragraph 2 */}
            <p
                className="text-[#5A5C63]"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                If you are using the Service on behalf of a business or organisation — including to manage PCNs across a fleet or multiple vehicles — you confirm that you have the authority to bind that organisation to these Terms and that a responsible individual has been designated to oversee use of the Service.
            </p>
        </section>
    )
}

export default Section3