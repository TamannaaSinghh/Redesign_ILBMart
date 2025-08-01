import type { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "About Us | ILB-Mart - Indian Local Bazaar",
  description: "Learn about ILB-Mart, your trusted Indian local online bazaar offering groceries, fashion, electronics, and home essentials across India.",
  keywords: [
    "About ILB-Mart",
    "ILB-Mart",
    "Indian local bazaar",
    "online shopping India",
    "Indian groceries",
    "buy electronics online",
    "Indian fashion",
    "local marketplace",
    "affordable shopping India",
    "home essentials India"
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function AboutPage() {
  return (
    <main className="about-main">
      <h1 className="about-title">Welcome to About Page</h1>
    </main>
  );
}
