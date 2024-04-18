import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle, ThemeProvider } from "@/components/ThemeProvider";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const prod = process.env.PRODUCTION_FLAG === "true";
export const metadata: Metadata = {
  title: prod
    ? "☑️Uptime Monitor Demo page"
    : "🚧Uptime Monitor Internal Demo page",
  description: "Uptime Monitor Internal Demo page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed top-4 right-4">
            <ModeToggle />
          </div>
        </ThemeProvider>
        <Toaster richColors closeButton expand={true} />
      </body>
    </html>
  );
}
