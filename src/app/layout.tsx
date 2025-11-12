import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnapMyFine - Pay Parking Fines Fast",
  description: "Pay your parking fine in seconds with SnapMyFine",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mobile-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}