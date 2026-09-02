import type { Metadata } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteSettings } from "@/lib/hygraph/get-site-settings";
import "./globals.css";

/** Match Hygraph Data Cache TTL so every route revalidates every 5 minutes. */
export const revalidate = 300;

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow-family",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal font-barlow text-foreground overflow-x-hidden">
        <Header siteConfig={settings.siteConfig} />
        <main className="flex-1">{children}</main>
        <Footer siteConfig={settings.siteConfig} />
      </body>
    </html>
  );
}
