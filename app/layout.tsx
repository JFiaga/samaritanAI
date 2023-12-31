import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samaritan AI",
  description: "AI Platform to bost your productivty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <link rel="icon" href='logo.png'/>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}