import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceModalProvider from "@/components/services/ServiceModalProvider";

export const metadata: Metadata = {
  title: {
    default: "Engineering Automation Technology Limited (EATL) — Oil & Gas Engineering Services, Nigeria",
    template: "%s | EATL",
  },
  description:
    "EATL is an indigenous Nigerian oil & gas engineering company delivering Engineering, Construction & Maintenance, Instrumentation & Control, Testing & Metering and Asset Integrity Management. Home of West Africa's first gravimetric flow metering facility.",
  keywords: ["EATL", "Engineering Automation Technology Limited", "flow metering Nigeria", "calibration laboratory Nigeria", "ISO 17025 Nigeria", "oil and gas engineering Nigeria", "Wrapmaster Nigeria", "Emerson Nigeria"],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Engineering Automation Technology Limited (EATL)",
    description: "Delivering Excellence in Oil & Gas Services since 2007.",
    type: "website",
    images: [{ url: "/images/eatl/gmc.png", width: 793, height: 612, alt: "EATL gravimetric flow metering facility, Eket" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Automation Technology Limited (EATL)",
    description: "Delivering Excellence in Oil & Gas Services since 2007.",
    images: ["/images/eatl/gmc.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-ink antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <ServiceModalProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ServiceModalProvider>
      </body>
    </html>
  );
}
