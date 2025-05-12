import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./layout.client";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WebDevCo - Modern Web Solutions",
    description: "Professional web development and design services",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
} 