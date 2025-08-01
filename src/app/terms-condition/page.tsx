import type { Metadata } from "next";
import "./page.css";
export const metadata: Metadata = {
  title: "Terms conditions Indian Local Bazaar",
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
    <main className="terms-main">
      <h1 className="terms-title">Welcome to Terms And Conditions Page</h1>
    </main>
  );
}
