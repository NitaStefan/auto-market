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
    <html lang="en" className={archivo.className}>
      <body className="text-foreground bg-[#F5F5F5]">
        <header className="sticky top-0 right-0 left-0 z-50 mx-auto w-full max-w-7xl">
          <Navbar />
        </header>
        <main className="relative mx-auto min-h-[calc(100vh-16.75rem)] max-w-7xl overflow-x-hidden px-5 py-8 sm:px-8 md:px-12">
          {/* !!! THIS MAKES THE ROUTE DYNAMIC */}
          {/* <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
            <FbAssociationChecker />
          </Suspense> */}
          {children}
          {/* <div className="absolute right-0 bottom-0 z-8 h-13 w-screen overflow-hidden bg-[#F5F5F5]"></div> */}
        </main>
        <Toaster
          toastOptions={{
            classNames: {
              success: "!border-1 !border-green-700 !text-green-700 !bg-white",
              error: "!border-1 !border-red-700 !text-red-700 !bg-white",
            },
          }}
        />
        <footer className="bg-secondary-800 relative z-20 h-50"></footer>
      </body>
    </html>
  );
}
