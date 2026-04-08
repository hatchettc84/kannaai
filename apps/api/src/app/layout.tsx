import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KannaAI — Cannabis Recommendation Platform",
  description: "AI-powered cannabis recommendations for consumers and inventory management for dispensaries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
