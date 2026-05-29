import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const sans = Inter({
  variable: "--font-sans-next",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const display = Fraunces({
  variable: "--font-display-next",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Thrybee — Build Lasting Professional Relationships",
  description:
    "Thrybee connects mentors and mentees through intelligent matching. Join a trusted community and build lasting professional relationships.",
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title: "Thrybee — Build Lasting Professional Relationships",
    description: "A trusted community of mentors and mentees.",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1115",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-center" theme="dark" richColors />
      </body>
    </html>
  );
}
