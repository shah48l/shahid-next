import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const SITE_URL = "https://shahid-portfolio.onrender.com"; // ← update once deployed

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shahid J — Software Engineer",
  description:
    "Backend engineer specializing in Python, Django, FastAPI, REST APIs, and ML integration. Building real-time systems and clean APIs.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/vAGA.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Shahid J — Software Engineer",
    description:
      "Backend engineer specializing in Python, Django, FastAPI, REST APIs, and ML integration.",
    siteName: "shahid.dev",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shahid J — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahid J — Software Engineer",
    description:
      "Backend engineer specializing in Python, Django, FastAPI, REST APIs, and ML integration.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.className} ${jetBrainsMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
