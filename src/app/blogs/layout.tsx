import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Parking Ticket Help, Appeals & Driver Guides - Snapmyfine Blog | London, UK",
    description: "Explore the Snapmyfine blog for clear, practical advice on parking tickets in the UK, parking notice appeals, deadlines, and driver tips to help you stay informed and take the right next step.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
