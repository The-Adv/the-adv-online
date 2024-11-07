import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const josefinSansLight = localFont({
  src: "./fonts/JosefinSans-Light.woff",
  variable: "--font-josefinsans-light",
  weight: "100",
});

const josefinSans = localFont({
  src: "./fonts/JosefinSans.woff",
  variable: "--font-josefinsans",
  weight: "400",
});

const josefinSansSemiBold = localFont({
  src: "./fonts/JosefinSans-SemiBold.woff",
  variable: "--font-josefinsans-bold",
  weight: "900",
});

export const metadata: Metadata = {
  title: "The Adv - Forum"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSansLight.variable} ${josefinSans.variable} ${josefinSansSemiBold.variable} antialiased bg-background text-forground uppercase flex justify-center items-center min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
