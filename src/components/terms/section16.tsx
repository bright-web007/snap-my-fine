import React from 'react'

const section16 = () => {
  return (
    <section id="governing-law">
      {/* Badge */}
      <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#2563EB]/20 mb-3">
        <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
          Section 16
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
        Governing law and disputes
      </h2>

      {/* Paragraph 1 */}
      <p
        className="text-[#5A5C63] mb-4"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        These Terms and Conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of London.
      </p>

      {/* Paragraph 2 */}
      <p
        className="text-[#5A5C63]"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        If you have a complaint or dispute regarding the Service, we encourage you to contact us in the first instance at support@snapmyfine.com so that we can attempt to resolve the matter informally. If we are unable to resolve a dispute informally, both parties agree to submit to the exclusive jurisdiction of the courts of London.
      </p>
    </section>
  )
}

export default section16