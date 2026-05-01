import React from "react";
import Image from "next/image";

const problemIllustration = "/landing/problemcase/right-image.png";
const problemNumberOne = "/landing/problemcase/numberOne.svg";
const problemNumberTwo = "/landing/problemcase/numberTwo.svg";
const problemNumberThree = "/landing/problemcase/numberThree.svg";
const problemNumberFour = "/landing/problemcase/numberFour.svg";
const logoColored = "/landing/logo/logoColored.svg";

const TheProblem = () => {
    return (
        <section
            id="problem"
            className="relative bg-white py-16 md:py-24"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center lg:justify-between">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-[#EBF3FF] rounded-full border border-[#2563EB]/20">
                            <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-[#2563EB] text-sm">
                                The problem
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            className="text-[#000000]"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 400,
                                fontSize: "40px",
                                lineHeight: "57.6px",
                                letterSpacing: "-1px",
                                verticalAlign: "middle",
                            }}
                        >
                            Paying parking fines shouldn't be hard
                        </h2>

                        {/* Description */}
                        <p
                            className="text-[#6B7280]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "27.2px",
                                letterSpacing: "0px",
                                verticalAlign: "middle",
                            }}
                        >
                            Across the UK, drivers waste time on multiple
                            council portals, typing long PCN numbers, and
                            hoping payments go through.
                        </p>

                        {/* Subheading */}
                        <h3
                            className="text-[#1970DF]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "27.2px",
                                letterSpacing: "0px",
                                verticalAlign: "middle",
                            }}
                        >
                            What drivers struggle with:
                        </h3>

                        {/* Problem Cards Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Card 1 */}
                            <div
                                className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                style={{
                                    gap: "19px",
                                    padding: "21px 22px",
                                    border: "1px solid #0464DD17",
                                    boxShadow: "0px 4px 12px 0px #BABABA40",
                                    minHeight: "142px",
                                }}
                            >
                                <Image src={problemNumberOne} alt="Problem 1" width={32} height={32} className="flex-shrink-0" />
                                <p
                                    className="text-[#374151]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Multiple council portals for a single fine
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div
                                className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                style={{
                                    gap: "19px",
                                    padding: "21px 22px",
                                    border: "1px solid #0464DD17",
                                    boxShadow: "0px 4px 12px 0px #BABABA40",
                                    minHeight: "142px",
                                }}
                            >
                                <Image src={problemNumberTwo} alt="Problem 2" width={32} height={32} className="flex-shrink-0" />
                                <p
                                    className="text-[#374151]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Typing long PCN and vehicle details
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div
                                className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                style={{
                                    gap: "19px",
                                    padding: "21px 22px",
                                    border: "1px solid #0464DD17",
                                    boxShadow: "0px 4px 12px 0px #BABABA40",
                                    minHeight: "142px",
                                }}
                            >
                                <Image src={problemNumberThree} alt="Problem 3" width={32} height={32} className="flex-shrink-0" />
                                <p
                                    className="text-[#374151]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    Missing deadlines that double fines
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div
                                className="bg-[#FFFFFF] rounded-xl flex flex-col"
                                style={{
                                    gap: "19px",
                                    padding: "21px 22px",
                                    border: "1px solid #0464DD17",
                                    boxShadow: "0px 4px 12px 0px #BABABA40",
                                    minHeight: "142px",
                                }}
                            >
                                <Image src={problemNumberFour} alt="Problem 4" width={32} height={32} className="flex-shrink-0" />
                                <p
                                    className="text-[#374151]"
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "27.2px",
                                        letterSpacing: "0px",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    No confirmation after payment
                                </p>
                            </div>
                        </div>

                        {/* Closing Text */}
                        <p
                            className="text-[#6B7280]"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                            }}
                        >
                            Sounds familiar?{" "}
                            <span
                                className="text-[#2563EB]"
                                style={{
                                    fontFamily: "Sora",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    verticalAlign: "middle",
                                }}
                            >
                                Snapmyfine makes all these disappear
                            </span>
                        </p>
                    </div>

                    {/* Right Content - Illustration */}
                    <div className="flex justify-center lg:justify-end mt-12 lg:mt-0">
                        <Image
                            src={problemIllustration}
                            alt="Person at parking meter illustration"
                            width={562}
                            height={400}
                            style={{
                                maxWidth: "561.59px",
                                paddingTop: "29.65px",
                                paddingBottom: "29.66px",
                            }}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TheProblem;
