import { Toaster } from "@/components/ui/sonner";
import { archivo } from "./fonts";
import "./globals.css";
import FbAssociationChecker from "@/components/facebook/FbAssociationChecker";
import { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Auto Market",
  description: "Anunturi auto cu masini second-hand si dezmembrari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.className} suppressHydrationWarning>
      <body className="text-foreground bg-[#F5F5F5]">
        <header className="fixed top-0 right-0 left-0 z-50 mx-auto w-full max-w-7xl">
          <Navbar />
        </header>

        <main className="mx-auto max-w-7xl px-12 pt-20">
          {/* !!! THIS MAKES THE ROUTE DYNAMIC */}
          {/* <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
            <FbAssociationChecker />
          </Suspense> */}
          {children}
        </main>
        <Toaster />
        <footer></footer>
      </body>
    </html>
  );
}
