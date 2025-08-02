// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/components/context/CartContext";
import { LocationProvider } from "@/components/context/LocationContext";
import { AuthProvider } from "@/components/context/AuthContext";
import { ThemeProvider } from "@/components/context/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";

import "@/lib/fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";


import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ILB-Mart Indian Local Bazaar",
  description:
    "ILB-Mart is your one-stop Indian local online bazaar for groceries, fashion, electronics, home essentials, and more. Shop local, shop smart.",
  keywords: [
    "ILB-Mart",
    "Indian local bazaar",
    "online shopping India",
    "Indian groceries",
    "buy electronics online",
    "Indian fashion",
    "local marketplace",
    "affordable shopping India",
    "home essentials India",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add Material Symbols font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="ilb-theme">
          <TooltipProvider>
            <CartProvider>
              <AuthProvider>
                <LocationProvider>
                  <Header />
                  <main>
                    {/* Main content goes here */}
                    {children}
                  </main>

                  <Footer />
                  <PerformanceMonitor />
                </LocationProvider>
              </AuthProvider>
            </CartProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
