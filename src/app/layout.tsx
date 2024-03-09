import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import React from "react";
import {Toaster} from "@/components/ui/sonner"

const inter = Inter({subsets: ["latin"]});
const prod = process.env.PRODUCTION_FLAG === "true";
export const metadata: Metadata = {
    title: prod ? "☑️Uptime Monitor Demo page" : "🚧Uptime Monitor Internal Demo page",
    description: "Uptime Monitor Internal Demo page",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        <Toaster/>
        </body>
        </html>);
}
