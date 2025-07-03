import type { Metadata } from "next";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = siteConfig;
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const headerList = await headers();
    const theme = headerList.get("x-theme") === "dark" ? "dark" : "";

    return (
        <html lang={locale} className={theme}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <NextIntlClientProvider locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
