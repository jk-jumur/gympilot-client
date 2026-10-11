import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "GymPilot — Fitness & Gym Management Platform",
    template: "%s | GymPilot",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      
        <Providers>
          <Navbar />
          <main className="w-full flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

         <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--bg-secondary, #fff)",
              color: "var(--text-primary, #171717)",
              border: "1px solid var(--border, #E7E5E4)",
              borderRadius: "12px",
              padding: "12px 18px",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            },
          }}
        />
      </body>
    </html>
  );
}