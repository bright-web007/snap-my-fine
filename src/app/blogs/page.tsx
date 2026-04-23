"use client";

import React, { useState, useMemo } from 'react'
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import Header from "@/components/sections/Header";
import { Blogs } from '@/helpers/data';
import { formatDate, formatReadTime, getFeaturedImage } from '@/helpers/blog';
import Pagination from '@/components/ui/Pagination';
import Footer from "@/components/sections/Footer";
import CallToAction from "@/components/sections/CallToAction";

const logoColored = "/landing/logo/logoColored.svg";
const ITEMS_PER_PAGE = 9;
const CATEGORIES = ["All", "Guides", "Tips", "Legal", "News", "Appeals"];

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Most recent");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

    const filteredBlogs = useMemo(() => {
        let result = [...Blogs];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(blog => {
                const post = blog.data.post;
                return post.title.toLowerCase().includes(query) ||
                    post.excerpt.toLowerCase().includes(query) ||
                    post.category.name.toLowerCase().includes(query);
            });
        }

        if (activeCategory !== "All") {
            result = result.filter(blog =>
                blog.data.post.category.name.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        if (sortBy === "Most recent") {
            result.sort((a, b) => new Date(b.data.post.updated_at).getTime() - new Date(a.data.post.updated_at).getTime());
        } else {
            result.sort((a, b) => new Date(a.data.post.updated_at).getTime() - new Date(b.data.post.updated_at).getTime());
        }

        return result;
    }, [searchQuery, activeCategory, sortBy]);

    const isFiltered = searchQuery.trim() !== '' || activeCategory !== 'All';
    const gridBlogs = isFiltered && filteredBlogs.length === 1 ? [] : filteredBlogs.slice(1);
    const totalPages = Math.max(1, Math.ceil(gridBlogs.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBlogs = gridBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const featuredBlog = filteredBlogs[0];
    const featuredPost = featuredBlog?.data.post;
    const featuredImageUrl = featuredPost ? getFeaturedImage(featuredPost.featured_image) : '';

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="bg-[#105AE2]">
                <Header />
            </div>
            {/* Hero Section */}
            <div className="bg-[#FFFFFF] pt-16 pb-12 md:pt-24 md:pb-16">
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Heading */}
                    <div className="lg:text-center max-w-2xl mx-auto mb-8">
                        <h1
                            className="text-[#0C2D76] text-[30px] md:text-[48px] leading-[1.2] mb-4"
                            style={{
                                fontFamily: "Sora",
                                fontWeight: 700,
                                fontStyle: "italic",
                            }}
                        >
                            Understand your fine,
                            know your options
                        </h1>
                        <p
                            className="text-[#5A5C63] text-[16px] md:text-[16px] leading-[160%]"
                            style={{ fontFamily: "Inter" }}
                        >
                            Guides, tips, and expert breakdowns to help you understand,
                            challenge, and navigate UK parking fines with confidence.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-[560px] mx-auto mb-1 lg:mb-12">
                        <div className="flex items-center bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                placeholder="Search articles — e.g. 'appeal deadline', 'PCN guide'"
                                className="flex-1 px-4 py-3 text-[14px] text-[#393939] placeholder:text-[#9CA3AF] outline-none"
                                style={{ fontFamily: "Inter" }}
                            />
                            <button
                                type="submit"
                                className="bg-[#105AE2] text-white px-5 py-3 text-[14px] font-semibold hover:bg-[#0a2561] transition-colors cursor-pointer"
                                style={{ fontFamily: "Inter" }}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white  lg:pb-5">
                <div className="max-w-[1280px] border-t border-[#E5E7EB] mx-auto px-4 md:px-8 py-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer border ${activeCategory === cat
                                            ? "bg-[#105AE2] text-white border-[#0C2D76]"
                                            : "bg-white text-[#374151] border-[#E5E7EB] hover:border-[#0C2D76] hover:text-[#0C2D76]"
                                        }`}
                                    style={{ fontFamily: "Inter" }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <span className="text-[#9CA3AF] text-[13px]" style={{ fontFamily: "Inter" }}>Sort by:</span>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                                    className="flex items-center justify-between gap-6 text-[13px] font-medium text-[#374151] border border-[#E5E7EB] rounded-lg px-4 py-2 outline-none cursor-pointer bg-white min-w-[140px]"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    {sortBy}
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        className={`transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path d="M3 4.5L6 7.5L9 4.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                {sortDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setSortDropdownOpen(false)} />
                                        <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-[#E5E7EB] rounded-lg shadow-lg min-w-[180px] py-1 overflow-hidden">
                                            {["Most recent", "Oldest first"].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => { setSortBy(option); setSortDropdownOpen(false); }}
                                                    className={`block w-full text-left px-5 py-3 text-[14px] transition-colors ${sortBy === option
                                                            ? "font-semibold text-[#0C2D76] bg-[#F9FAFB]"
                                                            : "font-normal text-[#374151] hover:bg-[#F9FAFB]"
                                                        }`}
                                                    style={{ fontFamily: "Inter" }}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Featured Article */}
            {featuredPost && (
                <div className="bg-[#F6F8FF] py-10 md:py-14">
                    <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                        {/* Latest Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-[#E5E7EB] mb-6">
                            <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                            <span className="text-[#0C2D76] text-[14px] font-semibold" style={{ fontFamily: "Inter" }}>Latest</span>
                        </div>

                        {/* Featured Card */}
                        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col md:flex-row">
                            {/* Image */}
                            <div className="relative w-full md:w-[400px] h-[220px] md:h-auto bg-[#0C2D76] shrink-0 overflow-hidden">
                                {featuredImageUrl && (
                                    <Image
                                        src={featuredImageUrl}
                                        alt={featuredPost.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                                {/* Tag + Date + Read Time */}
                                <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6B7280] mb-4">
                                    <span className="inline-flex items-center bg-[#E1F5E9] px-3 py-1 rounded-2xl gap-1 text-[#16A34A] font-medium">
                                        <span className="w-[6px] h-[6px] rounded-full bg-[#16A34A] inline-block" />
                                        {featuredPost.category.name}
                                    </span>
                                    <span>{formatDate(featuredPost.updated_at)}</span>
                                    <span>·</span>
                                    <span>{formatReadTime(featuredPost.read_time)}</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-[#0D0E10] font-bold text-[22px] md:text-[26px] leading-[130%] mb-3" style={{ fontFamily: "Sora" }}>
                                    {featuredPost.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-[#5A5C63] text-[14px] leading-[160%] mb-6 line-clamp-2" style={{ fontFamily: "Inter" }}>
                                    {featuredPost.excerpt.replace(/&hellip;/g, '...')}
                                </p>

                                {/* Author + Read Link */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#E0EDFF] flex items-center justify-center text-[#0464DD] text-[12px] font-bold">
                                            JT
                                        </div>
                                        <div>
                                            <p className="text-[#374151] text-[13px] font-semibold" style={{ fontFamily: "Inter" }}>James Thornton</p>
                                            <p className="text-[#9CA3AF] text-[12px]" style={{ fontFamily: "Inter" }}>Legal Editor</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`/blogs${featuredPost.slug}`}
                                        className="inline-flex items-center gap-1.5 text-[#0464DD] text-[13px] font-semibold bg-[#F0F5FF] px-4 py-2 rounded-full hover:bg-[#E0EDFF] transition-colors"
                                        style={{ fontFamily: "Inter" }}
                                    >
                                        Read article <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div
                className="relative bg-white py-16 md:py-24 overflow-hidden"
            >
                <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                    {/* Blog cards */}
                    {paginatedBlogs.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-[#6B7280] text-[16px]" style={{ fontFamily: "Inter" }}>
                                {filteredBlogs.length === 0
                                    ? "No articles found. Try a different search or category."
                                    : "No other articles in this selection."}
                            </p>
                        </div>
                    ) : (
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
                                            <Image
                                                src={imageUrl}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover"
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

                                        <hr className="border-t border-[#E5E7EB] mb-5" />

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
                                                href={`/blogs${post.slug}`}
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
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            {/* CTA Section */}
            <CallToAction />
            <Footer />
        </div>

    )
}

export default Page