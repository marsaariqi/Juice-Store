
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";



const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "800"] });

export const metadata: Metadata = {
  title: "Payment Gateaway",
  description: "Showcasing the usage of payment gateaway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col`}>
        <div className="grow bg-base-200 max-w-lg mx-auto w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
