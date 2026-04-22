import React from 'react'

const Section10 = () => {
    return (
        <section id="your-data-privacy">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 10
                </span>
            </div>

            {/* Heading */}
            <h2
                className="text-[#0C2D76] mb-6"
                style={{
                    fontFamily: "Sora",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "1.3",
                    letterSpacing: "-0.5px",
                }}
            >
                Your data and privacy
            </h2>

            {/* Paragraph 1 */}
            <p
                className="text-[#374151] mb-6"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "15px", lineHeight: "27.2px" }}
            >
                SnapMyFine takes your privacy seriously. The collection, use, and storage of your personal data is governed by our Privacy Policy, which forms part of these Terms and Conditions and is incorporated herein by reference.
            </p>

            {/* Paragraph 2 */}
            <p
                className="text-[#374151] mb-6"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "15px", lineHeight: "27.2px" }}
            >
                We collect and process personal data solely for the purpose of providing the Service. We do not sell your personal data to any third party. You have rights under UK GDPR and the Data Protection Act 2018, including the right to access, correct, and request deletion of your personal data. To exercise these rights, contact support@snapmyfine.com.
            </p>

            {/* Info callout */}
            <div className="rounded-xl border border-[#2563EB]/20 bg-[#EBF3FF] p-5 border-l-4 border-l-[#2563EB]">
                <p
                    className="text-[#0C2D76] mb-1"
                    style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "14px", lineHeight: "24px" }}
                >
                    PCN photograph deletion
                </p>
                <p
                    className="text-[#374151]"
                    style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "13px", lineHeight: "22px" }}
                >
                    Photographs of PCNs submitted through the App are processed for OCR extraction and then deleted from our servers within 30 days unless you have saved them to your account.
                </p>
            </div>
        </section>
    )
}

export default Section10