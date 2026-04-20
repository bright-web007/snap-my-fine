"use client";

import React, { useState } from 'react'
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Blogs } from '@/helpers/data';
import Pagination from '@/components/ui/Pagination';
import Footer from "@/components/sections/Footer";

const logoColored = "/landing/logo/logoColored.svg";
const ITEMS_PER_PAGE = 9;

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(Blogs.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBlogs = Blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const formatReadTime = (seconds: number) => {
        const minutes = Math.round(seconds / 60);
        return `${minutes} min read`;
    };

    const getFeaturedImage = (featuredImage: string) => {
        try {
            const parsed = JSON.parse(featuredImage);
            return parsed.src;
        } catch {
            return '';
        }
    };

    return (
        <div>
            <div
                className="relative bg-white py-16 md:py-24 overflow-hidden"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Blog cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedBlogs.map((blog, index) => {
                            const post = blog.data.post;
                            const imageUrl = getFeaturedImage(post.featured_image);

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col"
                                >
                                    {/* Featured Image */}
                                    <div className="relative w-full h-[200px] bg-[#2563EB] overflow-hidden">
                                        {imageUrl && (
                                            <img
                                                src={imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Tag + Date + Read Time */}
                                        <div className="flex items-center gap-2 text-[12px] text-[#6B7280] mb-3">
                                            <span className="inline-flex items-center bg-[#E1F5E9] px-3 py-1 rounded-2xl gap-1 text-[#16A34A] font-medium">
                                                <span className="w-[6px] h-[6px] rounded-full bg-[#16A34A] inline-block" />
                                                {post.category.name}
                                            </span>
                                            <span>•</span>
                                            <span>{formatDate(post.updated_at)}</span>
                                            <span>•</span>
                                            <span>{formatReadTime(post.read_time)}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[#0D0E10] font-bold text-[16px] leading-[130%] mb-2">
                                            {post.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-[#5A5C63] text-[13px] leading-[20px] mb-5 line-clamp-2 leading-[160%]">
                                            {post.excerpt.replace(/&hellip;/g, '...')}
                                        </p>

                                        {/* Footer: Author + Read Link */}
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#E0EDFF] flex items-center justify-center text-[#0464DD] text-[11px] font-bold">
                                                    ST
                                                </div>
                                                <span className="text-[#374151] text-[13px] font-medium">
                                                    SnapMyFine Team
                                                </span>
                                            </div>
                                            <a
                                                href={post.slug}
                                                className="inline-flex items-center gap-1 text-[#0464DD] text-[13px] font-semibold hover:underline"
                                            >
                                                Read <ArrowRight size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Page