import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
