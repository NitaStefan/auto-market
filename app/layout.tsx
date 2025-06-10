import { Toaster } from "@/components/ui/sonner";
import { archivo } from "./fonts";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { MapPin, Phone, UserCog } from "lucide-react";
import ForAdmin from "@/components/ForAdmin";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AutoDac",
  description:
    "Anunțuri auto cu mașini second-hand si pentru dezmembrări. Serviciu de tractări.",
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
        <main className="relative mx-auto min-h-[calc(100vh-4.25rem)] max-w-7xl overflow-x-hidden px-5 py-8 sm:px-8 md:px-12">
          {children}
        </main>
        <Toaster
          toastOptions={{
            classNames: {
              success: "!border-1 !border-green-700 !text-green-700 !bg-white",
              error: "!border-1 !border-red-700 !text-red-700 !bg-white",
            },
          }}
        />
        <footer className="bg-secondary-800 relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-y-4 border-t border-gray-500 pt-5 pb-18 text-sm text-gray-300 md:grid-cols-3">
          <div className="flex flex-col px-4">
            <p className="text-base text-white">Navigare rapidă</p>
            <Link href="/masini" className="hover:text-white">
              Mașini second-hand/ dezmembrări
            </Link>
            <Link href="/tractari" className="hover:text-white">
              Tractări auto
            </Link>
          </div>
          <div className="flex flex-col px-4">
            <p className="text-base text-white">Urmărește-mă și pe Facebook</p>
            <p>fb page link</p>
          </div>
          <div className="flex flex-col px-4">
            <p className="text-base text-white">Informații de contact</p>
            <a
              href="tel:0744227641"
              className="flex max-w-50 items-center gap-1.5 hover:text-white"
            >
              <Phone size={14} /> 0744 227 641
            </a>
            <p className="flex items-center gap-1.5">
              <MapPin size={14} /> Roma, jud. Botoșani
            </p>
          </div>
          <div className="absolute bottom-13 mx-6 h-px w-[calc(100%-3rem)] rounded-full bg-gray-500"></div>
          <p className="absolute bottom-4 w-full text-center">
            © {new Date().getFullYear()} AutoDac. Toate drepturile rezervate.
          </p>
          {/* ADMIN */}
          <Suspense>
            <ForAdmin not>
              <Link
                href="/sign-in"
                className="absolute right-8 bottom-18 flex flex-col items-center text-xs text-gray-400 hover:text-white hover:underline"
              >
                <UserCog size={20} />
                <span className="-mt-0.5">Intră ca </span>
                <span className="-mt-1">admin</span>
              </Link>
            </ForAdmin>
          </Suspense>
        </footer>
      </body>
    </html>
  );
}
