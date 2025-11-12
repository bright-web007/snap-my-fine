"use client";

import React, { useState } from "react";
import Image from "next/image";
const chevronUpIcon = "/landing/faq/icons/chevronUpIcon.png";
const chevronDownIcon = "/landing/faq/icons/chevronDownIcon.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "./ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openItem, setOpenItem] = useState("item-1");

  return (
    <Accordion
      type="single"
      collapsible
      value={openItem}
      onValueChange={setOpenItem}
      className="space-y-4"
    >
      {faqs.map((faq, index) => {
        const isOpen = openItem === faq.value;
        const isFirst = index === 0;

        return (
          <AccordionItem
            key={faq.value}
            value={faq.value}
            className={`${
              isOpen && isFirst
                ? "bg-white"
                : "bg-[#F9FAFB]"
            } border-[#E5E7EB] rounded-2xl border px-6 py-2 ${isFirst ? "shadow-sm" : ""}`}
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                className="hover:no-underline flex flex-1 items-center gap-3 rounded-md py-4 text-left outline-none transition-all"
                style={{
                  fontFamily: "Sora",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  color: isOpen ? "#0464DD" : "#000000",
                }}
              >
                <Image
                  src={isOpen ? chevronUpIcon : chevronDownIcon}
                  width={isOpen ? 72 : 36}
                  height={isOpen ? 72 : 36}
                  alt=""
                  className="w-8 h-8 shrink-0"
                />
                {faq.question}
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent
              className="pt-2 pb-4 pl-11"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "24px",
                color: "#6B7280",
              }}
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}