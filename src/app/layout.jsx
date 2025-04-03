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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark-mode scroll-smooth">
      <body className={inter.className}>
        <Toaster position="top-right" richColors closeButton />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
