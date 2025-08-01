import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | ILB-Mart - Indian Local Bazaar",
  description: "Have questions? Get in touch with ILB-Mart for customer support, business inquiries, or partnership opportunities. We're here to help.",
  keywords: [
    "ILB-Mart contact",
    "customer support ILB-Mart",
    "help ILB-Mart",
    "business inquiries India",
    "local bazaar support",
    "Indian ecommerce help",
    "contact local marketplace",
    "partnership ILB-Mart"
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold">Contact ILB-Mart</h1>
    </main>
  );
}
