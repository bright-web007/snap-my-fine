import React from 'react'

const Section4 = () => {
    return (
        <section id="your-account">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 04
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
                Your account
            </h2>

            {/* Registration */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "27.2px",
                }}
            >
                Registration
            </p>
            <p
                className="text-[#5A5C63] mb-3"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                Certain features of the Service require you to create an account. You agree to provide accurate, current, and complete information during registration and to keep that information updated at all times.
            </p>

            {/* Account security */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "27.2px",
                }}
            >
                Account security
            </p>
            <p
                className="text-[#5A5C63] mb-3"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at support@snapmyfine.com if you become aware of any unauthorised access.
            </p>

            {/* Account restrictions */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "27.2px",
                }}
            >
                Account restrictions
            </p>
            <p
                className="text-[#5A5C63]"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                You may not share your account with any third party, create multiple accounts for the same person, or use another person&apos;s account without their express permission.
            </p>
        </section>
    )
}

export default Section4