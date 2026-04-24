import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Blogs } from "@/helpers/data";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { formatDate, formatReadTime, getFeaturedImage, transformContent } from "./utils";
import { ShareButtons } from "./ShareButtons";
import { ReadingProgressBar } from "./ReadingProgressBar";

interface BlogDetailPageProps {
    params: Promise<{ slug: string }>;
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
    const { slug } = await params;
    const fullSlug = `/${slug}`;

    const blogEntry = Blogs.find((blog) => blog.data.post.slug === fullSlug);

    if (!blogEntry) {
        notFound();
    }

    const post = blogEntry.data.post;
    const featuredImageUrl = getFeaturedImage(post.featured_image);

    return (
        <div>
            {/* Header */}
            <div className="bg-[#105AE2]">
                <Header />
            </div>
            <div className="bg-[#105AE2] h-20 lg:h-17 w-full" />
            <div className="relative z-20 px-4 md:px-8 py-6 bg-[#F6F8FF] ">
                <div className="max-w-[1280px] mx-auto flex items-center font-medium gap-2 text-sm text-[#9CA0AB] overflow-hidden">
                    <Link href="/" className="hidden lg:inline-block">Home</Link>
                    <span className="hidden lg:inline-block">›</span>
                    <Link href="/blogs" className="text-[#105AE2] lg:text-[#9CA0AB]">Blog</Link>
                    <span>›</span>
                    <p className="text-[#9CA0AB] lg:text-[#105AE2] font-semibold w-[80%] flex-shrink-0 line-clamp-1 ">
                        {post.title}
                    </p>
                </div>
            </div>
            {featuredImageUrl && (
                <div className="bg-white lg:hidden">
                    <div className="max-w-[898px] mx-auto  pb-2">
                        <div className="relative w-full h-[250px] md:h-[420px] overflow-hidden bg-[#0C2D76]">
                            <Image
                                src={featuredImageUrl}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 898px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Back link + Meta */}
            <div className="bg-white pt-5 lg:pt-8 pb-4">
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
                            className="text-[#9CA3AF] text-[13px] hidden lg:inline-block"
                            style={{ fontFamily: "Inter" }}
                        >
                            Updated {formatDate(post.updated_at)}
                        </span>

                        {/* Share buttons */}
                        <ShareButtons title={post.title} />
                    </div>
                </div>
                <ReadingProgressBar />
            </div>
            

            {/* Featured Image */}
            {featuredImageUrl && (
                <div className="bg-white hidden lg:block">
                    <div className="max-w-[898px] mx-auto px-4 md:px-8 pb-8">
                        <div className="relative w-full h-[250px] md:h-[420px] rounded-2xl overflow-hidden bg-[#0C2D76]">
                            <Image
                                src={featuredImageUrl}
                                alt={post.title}
                                fill
                                sizes="898px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Article Content */}
            <div className="bg-white pb-16">
                <div className="max-w-[898px] mx-auto px-4 md:px-8">
                    <article
                        className="blog-content"
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
                            <div className="hidden lg:flex items-center gap-2">
                                <ShareButtons title={post.title} />
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
