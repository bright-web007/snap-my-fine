import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { Blogs } from '@/helpers/data';
import { formatDate, formatReadTime, getFeaturedImage } from '@/helpers/blog';

const logoColored = "/landing/logo/logoColored.svg";

const Blog = () => {
    return (
        <section
            id="blog"
            className="relative bg-[#F5F9FF] py-16 md:py-24 overflow-hidden"
        >
            <div className="max-w-[1280px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-left space-y-3 mb-12 md:mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-[6px] px-3 py-2 bg-white rounded-full border border-[#2563EB]/20">
                        <Image src={logoColored} alt="Logo" width={16} height={16} className="flex-shrink-0" />
                        <span className="text-[#393939] text-sm">
                            From The Blog
                        </span>
                    </div>
                    {/* Title */}
                    <h2 className="text-[31px] md:text-[36px] leading-[41px] text-[#0C2D76]"
                        style={{
                            fontFamily: "Sora",
                            fontWeight: 800,
                            letterSpacing: "-1px",
                            verticalAlign: "middle",
                        }}>
                        Understand your fine, <br /> know your options
                    </h2>
                    <div className="flex flex-col xl:flex-row xl:justify-between gap-6">
                        <p className="text-[#666666] text-[14px] font-regular leading-[23px] xl:w-[45%]">
                            Simple, honest guides on PCNs, deadlines, appeals, and your rights as a London driver. Just the information you actually need.
                        </p>
                        <Link href="/blogs" className="inline-flex w-fit items-center gap-2 text-white font-semibold text-[14px] leading-[100%] bg-[#0464DD] hover:bg-[#0356b6] p-[12px] rounded-[6px] whitespace-nowrap cursor-pointer">
                            View all articles <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Blog cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Blogs.slice(0, 3).map((blog, index) => {
                        const post = blog.data.post;
                        const imageUrl = getFeaturedImage(post.featured_image);

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
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
            </div>
        </section>
    )
}

export default Blog