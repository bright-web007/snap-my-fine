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
            {/* Modal - slides in from left without backdrop, positioned relative to container */}
            <div
                className={`absolute top-0 left-0 h-full max-w-md z-50 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-[485px] w-[330px] bg-white shadow-xl">
                    {/* Close Button - positioned at top right */}
                    <div className="flex justify-end px-6 pt-6">
                        <button
                            className="p-1 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                            onClick={onClose}
                        >
                            <X className="w-6 h-6 text-black" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="px-8 mt-8">
                        <button
                            className="w-full text-left py-4 border-b border-gray-300 text-[14px] font-medium text-black hover:text-[#105AE2] transition-colors"
                            onClick={() => {
                                onSavedFines();
                                onClose();
                            }}
                        >
                            Saved Fine
                        </button>

                        <button
                            className="w-full text-left py-4 border-b border-gray-300 text-[14px] font-medium text-black hover:text-[#105AE2] transition-colors mt-6"
                            onClick={() => {
                                onPaymentHistory();
                                onClose();
                            }}
                        >
                            Payment History
                        </button>

                        <button
                            className="w-full text-left py-4 border-b border-gray-300 text-[14px] font-medium text-black hover:text-[#105AE2] transition-colors mt-6"
                            onClick={onContactUs}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Invisible overlay to detect clicks outside modal - positioned relative to container */}
            {isOpen && (
                <div
                    className="absolute inset-0 z-40 max-w-md"
                    onClick={(e) => {
                        // Only close if clicking outside the modal area
                        const clickX = e.clientX;
                        const containerLeft = e.currentTarget.getBoundingClientRect().left;
                        const relativeClickX = clickX - containerLeft;
                        if (relativeClickX > 330) { // 330px is the modal width
                            onClose();
                        }
                    }}
                />
            )}
        </>
    );
}