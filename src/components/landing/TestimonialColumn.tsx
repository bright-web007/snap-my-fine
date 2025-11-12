import React from "react";
import { TestimonialCard } from "./TestimonialCard";

interface Testimonial {
  quote: string;
  rating: number;
  name: string;
  role: string;
  date: string;
}

interface TestimonialColumnProps {
  testimonials: Testimonial[];
  direction?: "up" | "down";
  speed?: number;
}

export function TestimonialColumn({
  testimonials,
  direction = "up",
  speed = 40,
}: TestimonialColumnProps) {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative h-[800px] overflow-hidden mask-gradient">
      <div
        className={`flex flex-col gap-6 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            quote={testimonial.quote}
            rating={testimonial.rating}
            name={testimonial.name}
            role={testimonial.role}
            date={testimonial.date}
          />
        ))}
      </div>
    </div>
  );
}
