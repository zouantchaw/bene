import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Script from 'next/script';

const title =
  "Bene – The all-in-one event and party rental platform";  
const description =
  "Elevate your customer experience and streamline your operations with our all-in-one event and party rental platform.";
const image = "/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["/favicon.ico", "/favicon.svg"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@love_thegame_",
  },
  metadataBase: new URL("https://rentbene.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          strategy="afterInteractive"
          data-host="https://api.us-east.tinybird.co"
          data-token="p.eyJ1IjogImMzYjNlMjkzLTVlOTktNDBmZS05MjU2LTcyNzY3NjRiZmIwNCIsICJpZCI6ICI1ZDc4ODBkOC1kNTdmLTRmODAtOTU5My0yNWMwYzAyNjQ4YmQiLCAiaG9zdCI6ICJ1c19lYXN0In0.WTouAuLbFxLjif4ZO82JLHq4QWY-pI1Wzh8TZh4hZCM"
        />
      </head>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
