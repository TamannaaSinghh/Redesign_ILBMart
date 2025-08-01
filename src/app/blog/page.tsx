import type { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "Blog | ILB-Mart - Indian Local Bazaar",
  description: "Stay updated with the latest trends, shopping tips, and community stories from ILB-Mart’s blog. Discover insights about Indian local markets and more.",
  keywords: [
    "ILB-Mart blog",
    "shopping tips India",
    "Indian market insights",
    "online shopping blog",
    "local bazaar news",
    "Indian e-commerce",
    "customer stories",
    "market trends India",
    "buying guides India"
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function BlogPage() {
  return (
    <main className="blog-main">
      <h1 className="blog-title">Welcome to Blog Page</h1>
    </main>
  );
}
