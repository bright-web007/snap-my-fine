import React from 'react'

const definitions = [
    { term: '"SnapMyFine"', description: 'SnapMyFine, a company registered in the UK, operator of the mobile application and website at snapmyfine.com.' },
    { term: '"App"', description: 'The SnapMyFine mobile application available on iOS and Android.' },
    { term: '"Service"', description: 'All features, tools, and functionality including PCN scanning, payment processing, appeal assistance, and deadline reminders.' },
    { term: '"PCN"', description: 'A Penalty Charge Notice issued by a local authority under the Traffic Management Act 2004 or Road Traffic Act 1991.' },
    { term: '"User" / "You"', description: 'Any individual who downloads, installs, accesses, or uses the App or Service.' },
    { term: '"Open Banking"', description: 'The secure payment infrastructure regulated by the FCA through which SnapMyFine facilitates fine payments on your behalf.' },
    { term: '"Council"', description: 'Any local authority empowered to issue PCNs under applicable UK legislation.' },
    { term: '"Appeal"', description: 'A formal or informal representation made to a Council or adjudicator disputing the validity of a PCN.' },
];

const Section1 = () => {
    return (
        <section id="definitions">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#105AE266] mb-3">
                <span className="text-[#2563EB] text-xs" style={{ fontFamily: "Inter", fontWeight: 500 }}>
                    Section 01
                </span>
            </div>

            {/* Heading */}
            <h2
                className="text-[#0C2D76] mb-3"
                style={{
                    fontFamily: "Sora",
                    fontWeight: 800,
                    fontSize: "20px",
                    lineHeight: "1.3",
                    letterSpacing: "-0.5px",
                }}
            >
                Definitions
            </h2>

            {/* Intro */}
            <p
                className="text-[#5A5C63] mb-8"
                style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "27.2px",
                }}
            >
                In these Terms and Conditions, the following words and phrases have the meanings set out below.
            </p>

            {/* Definitions Table */}
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F6F8FF] overflow-hidden">
                {definitions.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col sm:flex-row gap-2 sm:gap-0 px-5 py-4 ${index !== definitions.length - 1 ? 'border-b border-[#E5E7EB]' : ''
                            }`}
                    >
                        <div className="sm:w-[200px] shrink-0">
                            <span
                                className="text-[#2563EB]"
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                }}
                            >
                                {item.term}
                            </span>
                        </div>
                        <p
                            className="text-[#374151]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "13px",
                                lineHeight: "27.2px",
                            }}
                        >
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Section1