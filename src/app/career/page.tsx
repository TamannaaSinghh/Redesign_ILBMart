import type { Metadata } from "next";
import Careers from "./Careers";
import "./page.css";

export const metadata: Metadata = {
  title: "Careers | ILB-Mart - Join Our Team",
  description:
    "Explore career opportunities at ILB-Mart. Join our mission to build India’s most trusted local online bazaar for everything from groceries to gadgets.",
  keywords: [
    "ILB-Mart careers",
    "jobs at ILB-Mart",
    "work with ILB-Mart",
    "ecommerce jobs India",
    "retail careers India",
    "tech jobs India",
    "startup jobs",
    "Indian marketplace careers",
    "career growth ILB-Mart",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function CareerPage() {
  return (
    <main className="career-main">
      {/* <h1 className="career-title">Join Our Team</h1> */}
      <Careers />
    </main>
  );
}
