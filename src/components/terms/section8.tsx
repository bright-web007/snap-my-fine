import React from 'react'

const Section8 = () => {
    return (
        <section id="ocr-technology">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 08
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
                OCR technology and accuracy
            </h2>

            {/* Description */}
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                The App uses optical character recognition (OCR) technology to extract information from photographs of PCNs. While our technology achieves an accuracy rate of 85% or above in controlled conditions, we cannot guarantee 100% accuracy in all cases. Factors affecting accuracy include image quality, lighting conditions, physical damage, and the format used by different Councils.
            </p>

            {/* Info callout */}
            <div className="rounded-xl border border-[#88B4F4] bg-[#E8F0FE] p-5 mb-8">
                <p
                    className="text-[#0C48C0] mb-1"
                    style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "14px", lineHeight: "24px" }}
                >
                    Always verify before acting
                </p>
                <p
                    className="text-[#5A5C63]"
                    style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "13px", lineHeight: "22px" }}
                >
                    You must always verify the information extracted by the App against your original PCN before taking any action, including making payment or submitting an appeal. SnapMyFine shall not be liable for any loss arising from reliance on inaccurately extracted information without verification.
                </p>
            </div>

            {/* Closing paragraph */}
            <p
                className="text-[#5A5C63]"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                By submitting a photograph of your PCN, you confirm that it is genuine and unaltered, and relates to a vehicle for which you have authority to act.
            </p>
        </section>
    )
}

export default Section8