import React from 'react'

const Section14 = () => {
  return (
    <section id="termination">
      {/* Badge */}
      <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
        <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
          Section 14
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
        Termination
      </h2>

      {/* PCN scanning and interpretation */}
      <p
        className="text-[#0D0E10] mb-2"
        style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
      >
        Termination by you
      </p>
      <p
        className="text-[#5A5C63] mb-3"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        You may stop using the Service at any time by deleting the App from your device and closing your account. To request deletion of your account and data, please contact support@snapmyfine.com.
      </p>

      {/* Deadline tracking and reminders */}
      <p
        className="text-[#0D0E10] mb-2"
        style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
      >
        Termination by SnapMyFine
      </p>
      <p
        className="text-[#5A5C63] mb-3"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        SnapMyFine reserves the right to suspend or terminate your access to the Service at any time if we reasonably believe you have breached these Terms, provided false or misleading information, used the Service for any unlawful purpose, or engaged in conduct that could harm SnapMyFine, its users, or third parties.
      </p>

      {/* Payment facilitation */}
      <p
        className="text-[#0D0E10] mb-2"
        style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
      >
        Effect of termination
      </p>
      <p
        className="text-[#5A5C63]"
        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
      >
        Upon termination, your right to use the Service will cease immediately. Provisions that by their nature should survive termination — including Sections 11, 12, and 16 — shall continue in full force and effect.
      </p>
    </section>
  )
}

export default Section14