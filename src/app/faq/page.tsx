import type { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "FAQs | ILB-Mart - Common Questions Answered",
  description: "Find answers to frequently asked questions about shopping, delivery, payments, returns, and more at ILB-Mart, your trusted online Indian bazaar.",
  keywords: [
    "ILB-Mart FAQs",
    "frequently asked questions",
    "order help ILB-Mart",
    "delivery info",
    "returns and refunds India",
    "payment support",
    "shopping questions",
    "Indian online bazaar support"
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function FAQPage() {
  return (
    <main className="faq-main">
      <h1 className="faq-title">Frequently Asked Questions</h1>
    </main>
  );
}
