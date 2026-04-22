"use client";

import React, { useState, useEffect } from "react";

interface Section {
    id: string;
    number: string;
    title: string;
}

interface SideNavProps {
    sections: Section[];
}

const SideNav = ({ sections }: SideNavProps) => {
    const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    // Pick the one closest to the top
                    const top = visible.reduce((prev, curr) =>
                        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                    );
                    setActiveId(top.target.id);
                }
            },
            { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setActiveId(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <aside className="hidden lg:block lg:w-[320px] shrink-0">
            <div className="lg:sticky lg:top-8 bg-white rounded-2xl border border-[#F0F0F0] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] p-6">
                <p
                    className="text-[#9CA0AB] text-[10px] font-semibold uppercase tracking-[0.15em] mb-5"
                    style={{ fontFamily: "Inter", fontWeight: 600 }}
                >
                    Contents
                </p>
                <nav className="flex flex-col gap-1">
                    {sections.map((section) => {
                        const isActive = activeId === section.id;
                        return (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => handleClick(e, section.id)}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-[#EBF3FF] text-[#2563EB]"
                                        : "text-[#374151] hover:bg-[#EBF3FF] hover:text-[#2563EB]"
                                }`}
                                style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px" }}
                            >
                                <span
                                    className={`font-medium text-[10px] w-5 text-right ${
                                        isActive ? "text-[#2563EB]" : "text-[#9CA0AB] group-hover:text-[#2563EB]"
                                    }`}
                                    style={{ fontFamily: "Inter", fontWeight: 500 }}
                                >
                                    {section.number}
                                </span>
                                <span>{section.title}</span>
                            </a>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default SideNav;
