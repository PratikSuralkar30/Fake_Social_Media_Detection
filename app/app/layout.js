import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Fake Account Detector | AI-Powered Social Media Analysis",
  description:
    "Detect fake social media accounts using advanced machine learning. Analyze Instagram profiles with our AI-powered detection system for authenticity verification.",
  keywords: "fake account detector, social media analysis, AI detection, Instagram verification",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
