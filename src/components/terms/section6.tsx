import React from 'react'

const payLaterBullets = [
    "You remain responsible for ensuring sufficient funds are available in your nominated bank account at the time of the scheduled payment.",
    "SnapMyFine will send you a reminder notification no later than 24 hours before your scheduled payment date. It remains your sole responsibility to ensure your account details remain valid and funds are available.",
    "If a scheduled payment fails for any reason — including insufficient funds, a closed account, or a revoked Open Banking authorisation — SnapMyFine shall not be liable for any resulting late payment penalty or fine escalation.",
    "You may cancel a scheduled payment within the App at any time before the payment is initiated. Once initiated, payment cannot be reversed.",
    "If a statutory deadline passes because a scheduled payment was not successfully processed, the higher penalty charge will apply. SnapMyFine strongly recommends confirming successful payment within the App after the scheduled date.",
];

const Section6 = () => {
    return (
        <section id="payments">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 06
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
                Payments
            </h2>

            {/* Payment initiation */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                Payment initiation
            </p>
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                When you instruct SnapMyFine to pay a PCN on your behalf, you authorise us to initiate a payment from your connected bank account to the relevant Council. This authorisation is specific to the PCN and amount you have confirmed and does not give SnapMyFine any ongoing access to your bank account.
            </p>

            {/* Open Banking */}
            <p
                className="text-[#0D0E10] mb-2"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                Open Banking
            </p>
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                Payments are processed through FCA-regulated Open Banking infrastructure. We do not store your bank account credentials or card details at any time. Upon successful payment you will receive a digital receipt within the App.
            </p>

            {/* Warning callout */}
            <div className="rounded-xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-5 mb-8 border-l-4 border-l-[#F59E0B]">
                <p
                    className="text-[#92400E] mb-1"
                    style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "24px" }}
                >
                    Payment cannot be reversed
                </p>
                <p
                    className="text-[#92400E]"
                    style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "22px" }}
                >
                    Once a PCN payment has been successfully initiated through the App, it cannot be reversed by SnapMyFine. Payment is generally treated as acceptance of the charge. Seek independent advice before making payment if you intend to appeal.
                </p>
            </div>

            {/* Pay Later */}
            <p
                className="text-[#0D0E10] mb-3"
                style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "15px", lineHeight: "27.2px" }}
            >
                Pay Later
            </p>
            <p
                className="text-[#5A5C63] mb-4"
                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "27.2px" }}
            >
                Where a Pay Later option is available, you may schedule payment of a PCN to be initiated on or before the applicable statutory deadline. The following terms apply:
            </p>

            {/* Bullet List */}
            <ul className="space-y-3">
                {payLaterBullets.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="mt-[10px] w-[6px] h-[6px] rounded-full bg-[#2563EB] shrink-0" />
                        <span
                            className="text-[#5A5C63]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "27.2px",
                            }}
                        >
                            {point}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Section6