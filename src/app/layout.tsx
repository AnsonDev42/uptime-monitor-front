import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const prod = process.env.PRODUCTION_FLAG === "true";
export const metadata: Metadata = {
  title: prod? "☑️Uptime Monitor Demo page" : "🚧Uptime Monitor Internal Demo page",
  description: "Uptime Monitor Internal Demo page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
