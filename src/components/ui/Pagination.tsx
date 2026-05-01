"use client";

import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1, 2, 3);
            if (currentPage > 4) pages.push("...");
            for (let i = Math.max(4, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            if (currentPage < totalPages - 3) pages.push("...");
            if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1);
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-[#374151] rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <ArrowLeft size={14} /> Previous
            </button>

            {getPageNumbers().map((page, i) =>
                page === "..." ? (
                    <span key={`dots-${i}`} className="px-2 text-[14px] text-[#6B7280]">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-[14px] font-medium cursor-pointer ${
                            currentPage === page
                                ? "bg-[#0464DD] text-white"
                                : "text-[#374151] hover:bg-[#F9FAFB] border border-[#E5E7EB]"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-[#374151] rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                Next <ArrowRight size={14} />
            </button>
        </div>
    );
};

export default Pagination;
