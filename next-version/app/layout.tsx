import type { Metadata } from "next";
import { Fredoka, Baloo_2 } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zaffo Word Quest – English Adventure",
  description: "Fun English learning game for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${baloo2.variable}`}>
        {children}
      </body>
    </html>
  );
}
