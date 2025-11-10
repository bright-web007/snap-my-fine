"use client";
import { useState, useEffect } from "react";
import { Button } from "@/component/ui/button/index";
import { Camera, Upload, Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import logo2 from "@/assets/images/logo2.svg";

interface Transaction {
    council: string;
    pcnNumber: string;
    fineAmount: string;
    status: 'success' | 'failed';
}

interface HomeSectionProps {
    transactions: Transaction[];
    onScanTicket: () => void;
    onUploadFromGallery: () => void;
    onShowAllTransactions: () => void;
    onHamburgerClick: () => void;
}

export default function HomeSection({
    transactions,
    onScanTicket,
    onUploadFromGallery,
    onShowAllTransactions,
    onHamburgerClick
}: HomeSectionProps) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <div className="w-full max-w-md min-h-screen flex flex-col">

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center pt-3">
                <div className="w-full max-w-md flex flex-col gap-[38px]">

                    <div className="relative flex flex-row items-start bg-[#F1F7FE] rounded-2xl shadow-md py-8 pl-8 w-[100%] mx-auto overflow-visible">
                        {/* Left content */}
                        <div className="space-y-4 flex flex-col gap-[120px] z-10 w-[100%]">
                            <div className="flex flex-row justify-between items-center w-[100%]">
                                <Image src={logo} alt="SnapMyFine Logo" className="w-[128px] h-[21px]" />

                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors font-sora font-medium"
                                    onClick={onHamburgerClick}
                                >
                                    <Menu className="w-[24px] h-[24px] text-[#323333]" />
                                </button>

                            </div>
                            <div className="flex flex-col gap-3 w-[220px]">
                                <h2 className="text-[30px] font-bold text-[#0464DD] leading-[33px] font-sora">
                                    Pay your parking fine<br />in seconds
                                </h2>
                                <p className="text-[#4C4C4D] text-[12px] font-inter font-regular leading-[16px] tracking-[0.4%]">
                                    SnapMyFine helps you pay your parking fine instantly – <span className="text-[#19191A] font-inter font-regular">fast, secure, and stress-free.</span>
                                </p>
                            </div>
                        </div>

                        {/* Right illustration - positioned absolutely */}
                        <div className="absolute top-18 -right-12">
                            <Image src={logo2} alt="Car illustration" className="w-[290px] h-[200px]" />
                        </div>
                    </div>

                    <div className="w-full max-w-md flex flex-col items-center gap-6">
                        <div className="flex flex-col gap-[8px] w-full font-medium font-sora">
                            <Button
                                className="cursor-pointer p-[16px] text-[14px] text-white bg-[#0464DD] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2 font-medium font-sora"
                                onClick={onScanTicket}
                            >
                                <Camera className="w-[24px] h-[24px] text-white" />
                                Scan Ticket
                            </Button>
                            <Button
                                className="cursor-pointer p-[16px] text-[14px] text-[#323333] border-1 border-[#7B8084] w-full h-[48px] rounded-[8px] flex items-center justify-center gap-2 font-medium font-sora"
                                onClick={onUploadFromGallery}
                            >
                                <Upload className="w-[24px] h-[24px] text-[#323333]" />
                                Upload from Gallery
                            </Button>
                        </div>

                        {/* Recent Transactions Section */}
                        {isHydrated && transactions.length > 0 && (
                            <div className="w-full flex flex-col gap-[8px] mt-2">
                                <div className="flex justify-between">
                                    <p className="text-[#000000] font-sora text-[14px] font-medium leading-[20px] tracking-[0.1%]">Recent</p>
                                    <button
                                        onClick={onShowAllTransactions}
                                        className="text-[#105AE2] font-sora text-[14px] font-medium leading-[100%] tracking-[0.1%] hover:underline"
                                    >
                                        show all
                                    </button>
                                </div>
                                {transactions.slice(0, 2).map((tx, idx) => (
                                    <div key={idx} className="flex flex-col gap-[4px] border-1 border-[#ADA8A8] p-[16px] rounded-[12px]">
                                        <p className="flex justify-between">
                                            <span className="font-medium text-[12px] font-sora leading-[100%] text-[#000000]">{tx.council}</span>
                                            <span className="font-semibold text-[12px] font-sora leading-[100%] text-[#000000]"> £{tx.fineAmount ? (Number(tx.fineAmount) - 3).toFixed(2) : '0.00'}</span>
                                        </p>
                                        <div className="flex justify-between">
                                            <span className="font-regular text-[12px] font-sora leading-[100%] text-[#4A4A4A]">PCN:{tx.pcnNumber}</span>
                                            <div className={`px-[4px] py-[4px] rounded-[12px] flex items-center justify-center ${tx.status === 'success' ? 'bg-[#D2F9E0]' : 'bg-[#F9D2D2]'}`}>
                                                <span className={`font-regular text-[8px] font-sora leading-[100%] ${tx.status === 'success' ? 'text-[#16A34A]' : 'text-[#A31616]'}`}>{tx.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="text-[#19191A] bg-[#F1F7FE] p-[16px] w-full">
                            <h2 className="text-[16px] font-medium font-sora leading-[24px]">How it works</h2>
                            <ol className="text-[12px] font-regular font-inter list-decimal list-inside">
                                <li>Pay us securely through your bank.</li>
                                <li>We process your payment and take care of all the paperwork.</li>
                                <li>You receive a confirmation once the payment is made.</li>
                            </ol>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="w-full text-center">
                            <p className="text-[10px] text-[#7E8081] font-sora font-regular leading-[16px] mb-2">
                                By using SnapMyFine, you agree to our{" "}
                                <button className="text-[#0464DD] underline hover:no-underline font-sora font-medium">
                                    Terms and Conditions
                                </button>
                                {" "}and{" "}
                                <button className="text-[#0464DD] underline hover:no-underline font-sora font-medium">
                                    Privacy Policy
                                </button>
                            </p>
                            <p className="text-[10px] text-[#7E8081] font-sora font-regular leading-[14px]">
                                Service fee is non-refundable. Additional charges may apply for payment processing.
                            </p>
                        </div>

                        <p className="text-[14px] text-[#0464DD] font-light font-sora text-center">Need help?</p>
                    </div>
                </div>
            </div>
        </div>
    );
}