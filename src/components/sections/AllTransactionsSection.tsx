"use client";
import { Button } from "@/component/ui/button/index";
import { ArrowLeft, Clock, Send } from "lucide-react";
import { Transaction } from "@/lib/stores/transactionStore";

interface AllTransactionsSectionProps {
    transactions: Transaction[];
    onBack: () => void;
}

export default function AllTransactionsSection({
    transactions,
    onBack
}: AllTransactionsSectionProps) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full mt-[16px]">
                <button
                    className="flex items-center gap-[16px] text-gray-700 hover:text-black"
                    onClick={onBack}
                >
                    <div className="p-[12px] rounded-full bg-[#E7EFFD]">
                        <ArrowLeft className="w-[24px] h-[24px] text-[#105AE2]" />
                    </div>
                    <p className="flex flex-col text-left">
                        <span className="text-[#19191A] text-[20px] leading-[28px] font-inter font-semibold">Payment Receipts</span>
                    </p>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-4 py-6">
                <div className="w-full max-w-md mx-auto flex flex-col gap-[16px]">

                    {/* Show empty state when no transactions */}
                    {transactions.length === 0 && (
                        <div className="text-center py-12">
                            <Clock className="w-12 h-12 text-[#B2B2B3] mx-auto mb-4" />
                            <p className="text-[#19191A] text-[16px] font-inter font-medium mb-2">No Transaction Made</p>
                            <p className="text-[#7E8081] text-[14px] font-inter font-regular">You haven&apos;t made any transaction yet. Scan a ticket to get started.</p>
                        </div>
                    )}

                    {/* Show transactions list when there are transactions */}
                    {transactions.length > 0 && (
                        <div className="w-full flex flex-col gap-[12px]">
                            {transactions.map((tx, idx) => (
                                <div key={idx} className="flex flex-col gap-[8px] py-[24px] px-[16px] border-1 border-[#CFDFFC] bg-[#F1F7FE] rounded-[16px]">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="flex justify-between items-center mb-2">
                                                <span className="text-[14px] text-[#000000] leading-[16px] font-medium font-inter tracking-[0.4%]">{tx.council}</span>
                                                <span className="text-[14px] text-[#000000] leading-[16px] font-bold font-inter tracking-[0.4%]">
                                                    £{tx.totalPaid || (tx.fineAmount ? (Number(tx.fineAmount) + 3).toFixed(2) : '3.00')}
                                                </span>
                                            </p>

                                            <p className="flex justify-between">
                                                <span className="text-[12px] text-[#4A4C4F] leading-[16px] font-regular font-inter tracking-[0.4%]">PCN:{tx.pcnNumber}</span>
                                                <div className="px-[4px] py-[4px] rounded-[12px] flex items-center justify-center bg-[#D2F9E0]">
                                                    <span className="font-regular text-[8px] font-inter leading-[100%] text-[#16A34A]">success</span>
                                                </div>
                                            </p>

                                            <p className="mb-2">
                                                <span className="text-[12px] text-[#4A4C4F] leading-[16px] font-regular font-inter tracking-[0.4%]">
                                                    {tx.dateCompleted ? new Date(tx.dateCompleted).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-[8px] w-full">
                                        <Button
                                            className="bg-[#105AE2] rounded-[12px] text-[#FFFFFF] h-[48px] text-[14px] py-[12px] flex-1 min-w-0 flex items-center justify-center gap-2"
                                        >
                                            <Send className="w-[16px] h-[16px] mr-1" />
                                            Resend
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}