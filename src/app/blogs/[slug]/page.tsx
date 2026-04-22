"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Blogs } from "@/helpers/data";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import styles from "./page.module.css";

const BlogDetailPage = () => {
    const params = useParams();
    const slug = `/${params.slug}`;

    const blogEntry = Blogs.find((blog) => blog.data.post.slug === slug);

    if (!blogEntry) {
        notFound();
    }

    const post = blogEntry.data.post;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
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
            return "";
        }
    };

    const featuredImageUrl = getFeaturedImage(post.featured_image);

    const transformContent = (html: string) => {
        // Transform numbered steps (01-09) into styled step items with green badges
        html = html.replace(
            /<p><strong>(0\d)\s+(.+?)<\/strong><\/p>\s*<p>(.+?)<\/p>/g,
            `<div class="${styles.stepItem}"><div class="${styles.stepNumber}">$1</div><div class="${styles.stepContent}"><strong>$2</strong><p>$3</p></div></div>`
        );

        // Wrap consecutive step items in a stepList container
        html = html.replace(
            /((?:<div class="[^"]*stepItem[^"]*">[\s\S]*?<\/div><\/div>\s*)+)/g,
            `<div class="${styles.stepList}">$1</div>`
        );

        // Transform the success box pattern (last strong + last paragraph)
        html = html.replace(
            /<p><strong>(Informal challenges are free[^<]*)<\/strong><\/p>\s*<p>(If unsuccessful[^<]*)<\/p>/,
            `<div class="${styles.successBox}"><div class="${styles.successIcon}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="${styles.successText}"><strong>$1</strong><p>$2</p></div></div>`
        );

        // Transform blockquote: em followed by small
        html = html.replace(
            /<p><em>(.+?)<\/em><\/p>\s*<p><small>(.+?)<\/small><\/p>/g,
            `<div class="${styles.quote}"><em>$1</em></div><div class="${styles.quoteSource}">$2</div>`
        );

        // Add "Key takeaways" title before the first ul
        html = html.replace(
            /<h2>Key takeaways<\/h2>\s*<ul>/,
            `<div class="${styles.keyTakeaways}"><div class="${styles.keyTakeawaysTitle}"><span style="display:inline-block;width:4px;height:20px;background:#2563EB;border-radius:2px"></span> Key takeaways</div><ul>`
        );

        // Close the keyTakeaways wrapper after the ul
        html = html.replace(
            /(<div class="[^"]*keyTakeaways[^"]*">[\s\S]*?<\/ul>)/,
            `$1</div>`
        );

        return html;
    };

    return (
        <div>
            {/* Header */}
            <div className="bg-[#105AE2]">
                <Header />
            </div>
            <div className="relative z-20 px-4 md:px-8 py-6 bg-[#F6F8FF] ">
                <div className="max-w-[1280px] mx-auto flex items-center gap-2 text-sm text-[#9CA0AB] overflow-hidden">
                    <Link href="/">Home</Link>
                    <span>›</span>
                    <Link href="/blogs">Blog</Link>
                    <span>›</span>
                    <p className="text-[#105AE2] font-semibold w-[80%] flex-shrink-0 line-clamp-1 ">
                        {post.title}
                    </p>
                </div>
            </div>
            {featuredImageUrl && (
                <div className="bg-white lg:hidden">
                    <div className="max-w-[898px] mx-auto px-4 md:px-8 pb-2">
                        <div className="relative w-full h-[250px] md:h-[420px] rounded-2xl overflow-hidden bg-[#0C2D76]">
                            <img
                                src={featuredImageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Back link + Meta */}
            <div className="bg-white pt-8 pb-4">
                <div className="max-w-[898px] mx-auto px-4 md:px-8  lg:text-center">

                    {/* Category + Date + Read time */}
                    <div className="flex flex-wrap items-center lg:justify-center gap-2 text-[12px] sm:text-[14px] text-[#9CA0AB] font-regular mb-4">
                        <span className="inline-flex items-center bg-[#E8F0FE] px-3 py-1 rounded-2xl gap-1 text-[#105AE2] font-semibold">
                            {post.category.name}
                        </span>
                        <span>{formatDate(post.updated_at)}</span>
                        <span className="w-[5px] h-[5px] rounded-full bg-[#9CA0AB] inline-block" />
                        <span className="whitespace-nowrap line-clamp-1">{formatReadTime(post.read_time)}</span>
                    </div>

                    {/* Title */}
                    <h1
                        className="text-[#0C2D76] text-[28px] md:text-[48px] leading-[1.2] font-bold mb-4"
                        style={{ fontFamily: "Sora" }}
                    >
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p
                        className="hidden lg:block text-[#5A5C63] text-[15px] md:text-[18px] leading-[170%] mb-8 max-w-[680px] mx-auto"
                        style={{ fontFamily: "Inter" }}
                    >
                        {post.excerpt.replace(/&hellip;/g, '...')}
                    </p>

                    {/* Author + Updated + Share */}
                    <div className="flex flex-wrap items-center lg:justify-center gap-4 mb-8">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E0EDFF] flex items-center justify-center text-[#0464DD] text-[13px] font-bold">
                                JT
                            </div>
                            <div className="text-left">
                                <p
                                    className="text-[#374151] text-[14px] font-semibold"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    James Thornton
                                </p>
                                <p
                                    className="text-[#9CA3AF] text-[12px]"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    Legal Editor, SnapMyFine
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-10 bg-[#E5E7EB]" />

                        {/* Updated date */}
                        <span
                            className="text-[#9CA3AF] text-[13px]"
                            style={{ fontFamily: "Inter" }}
                        >
                            Updated {formatDate(post.updated_at)}
                        </span>

                        {/* Share buttons */}
                        <div className="flex items-center gap-2">
                            <span
                                className="text-[#9CA3AF] text-[13px]"
                                style={{ fontFamily: "Inter" }}
                            >
                                Share:
                            </span>
                            <button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                                className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                                style={{ fontFamily: "Inter" }}
                            >
                                Twitter
                            </button>
                            <button
                                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                                style={{ fontFamily: "Inter" }}
                            >
                                LinkedIn
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                                style={{ fontFamily: "Inter" }}
                            >
                                Copy link
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {featuredImageUrl && (
                <div className="bg-white hidden lg:block">
                    <div className="max-w-[898px] mx-auto px-4 md:px-8 pb-8">
                        <div className="relative w-full h-[250px] md:h-[420px] rounded-2xl overflow-hidden bg-[#0C2D76]">
                            <img
                                src={featuredImageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <div className="bg-white pb-16">
                <div className="max-w-[898px] mx-auto px-4 md:px-8">
                    <article
                        className={styles.container}
                        dangerouslySetInnerHTML={{ __html: transformContent(post.content) }}
                    />
                </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="bg-white pb-12">
                    <div className="max-w-[898px] mx-auto px-4 md:px-8">
                        <div className="border-t border-[#E5E7EB] pt-6 flex gap-16">
                            <div className="flex flex-wrap items-center gap-2">
                                <span
                                    className="text-[#6B7280] text-[13px] font-medium"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    Tags:
                                </span>
                                {post.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-[#F3F4F6] text-[#374151] text-[13px] rounded-full"
                                        style={{ fontFamily: "Inter" }}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            <div className=" hidden lg:flex items-center gap-2">
                                <span
                                    className="text-[#9CA3AF] text-[13px]"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    Share:
                                </span>
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                                    className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    Twitter
                                </button>
                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    LinkedIn
                                </button>
                                <button
                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                    className="px-3 py-1.5 rounded-sm text-[#105AE2] bg-[#E8F0FE] text-[13px] font-medium hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    Copy link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
