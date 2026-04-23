import React from 'react'

const Section15 = () => {
  return (
    <section id="changes-to-terms">
      {/* Badge */}
      <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
        <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
          Section 15
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
        Changes to these terms
      </h2>

      {/* Paragraph 1 */}
      <p
        className="text-[#5A5C63] mb-4"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        SnapMyFine may update these Terms from time to time to reflect changes to the Service, applicable law, or our business practices. When we make material changes, we will notify you through the App or by email at least 14 days before the changes take effect.
      </p>

      {/* Paragraph 2 */}
      <p
        className="text-[#5A5C63]"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        Your continued use of the Service after the effective date of any updated Terms constitutes your acceptance of those changes. The most current version of these Terms will always be available within the App and on our website.
      </p>
    </section>
  )
}

export default Section15