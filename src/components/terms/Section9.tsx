import React from 'react'

const Section9 = () => {
    return (
        <section id="fees-and-charges">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 09
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
                Fees and charges
            </h2>

            {/* Paragraph 1 */}
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                The SnapMyFine App is free to download on iOS and Android. No subscription fee is required to access core features of the Service. Certain premium features or services within the App may be subject to a fee, which will be clearly displayed to you before you confirm use of that feature.
            </p>

            {/* Paragraph 2 */}
            <p
                className="text-[#5A5C63]"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                When facilitating payment of a PCN, SnapMyFine may charge a small service fee in addition to the Council&apos;s penalty charge. This fee, if applicable, will be clearly disclosed before you authorise payment. Service fees are non-refundable once a service has been delivered, except where required by applicable consumer protection law.
            </p>
        </section>
    )
}

export default Section9