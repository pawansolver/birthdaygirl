import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Anni ❤️ | Our Story",
  description: "A cinematic love story and birthday surprise created with all my love, just for Anni.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Happy Birthday, Anni ❤️ | Our Story",
    description: "A cinematic love story and birthday surprise created with all my love, just for Anni.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050308",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050308] text-[#FFF7FA] selection:bg-[#160A13] selection:text-[#E8B4C8]">
        {children}
      </body>
    </html>
  );
}
