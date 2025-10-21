"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

interface HamburgerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSavedFines: () => void;
    onPaymentHistory: () => void;
    onContactUs: () => void;
}

export default function HamburgerModal({
    isOpen,
    onClose,
    onSavedFines,
    onPaymentHistory,
    onContactUs
}: HamburgerModalProps) {
    // Close modal on escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Modal - slides in from left without backdrop */}
            <div
                className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-[485px] w-[330px] px-[18px] pt-[18px] flex flex-col gap-[18px] bg-white shadow-xl">
                    {/* Close Button - positioned at top right */}
                    <div className="flex justify-end">
                        <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={onClose}
                        >
                            <X className="w-[24px] h-[24px] text-[#000000]" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="text-[#000000] text-[18px] leading-[100%] font-inter font-medium flex flex-col gap-[24px]">
                        <button
                            className="text-left hover:text-[#105AE2] transition-colors"
                            onClick={() => {
                                onSavedFines();
                                onClose();
                            }}
                        >
                            Saved Fine
                        </button>
                        <hr />

                        <button
                            className="text-left hover:text-[#105AE2] transition-colors"
                            onClick={() => {
                                onPaymentHistory();
                                onClose();
                            }}
                        >
                            Payment History
                        </button>
                        <hr />

                        <button
                            className="text-left hover:text-[#105AE2] transition-colors"
                            onClick={onContactUs}
                        >
                            Contact Us
                        </button>
                        <hr />
                    </div>
                </div>
            </div>

            {/* Invisible overlay to detect clicks outside modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                        // Only close if clicking outside the modal area
                        // const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX;
                        if (clickX > 330) { // 330px is the modal width
                            onClose();
                        }
                    }}
                />
            )}
        </>
    );
}