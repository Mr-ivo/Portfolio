import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"]
});

export const metadata = {
  title: "Ebong Thiery | Portfolio",
  description: "Full-stack developer crafting impactful web applications",
  keywords: ["web developer", "full stack", "react", "nextjs", "portfolio"],
  icons: {
    icon: [
      {
        url: '/logo.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark-mode scroll-smooth">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-right" richColors closeButton />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
