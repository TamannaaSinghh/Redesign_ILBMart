import type { Metadata } from "next";
import "./page.css";
export const metadata: Metadata = {
  title: "Privacy Policy Indian Local Bazaar",
  description: "ILB-Mart is your one-stop Indian local online bazaar for groceries, fashion, electronics, home essentials, and more. Shop local, shop smart.",
  keywords: [
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
    <main className="privacy-main">
      <h1 className="privacy-title">Welcome to Privacy Policy Page</h1>
    </main>
  );
}
