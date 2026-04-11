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

export const metadata: Metadata = {
  title: "Shahid J — Software Engineer",
  description: "Backend engineer specializing in Python, Django, FastAPI, REST APIs, and ML integration.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/vAGA.png",
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
