import { Toaster } from "@/components/ui/sonner"
import { archivo, oswald } from "./fonts"
import "./globals.css"
import FbAssociationChecker from "@/components/facebook/FbAssociationChecker"
import { Suspense } from "react"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Auto Market",
  description: "Anunturi auto cu masini second-hand si dezmembrari",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={archivo.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Suspense>
          <FbAssociationChecker />
        </Suspense>

        <main>{children}</main>
        <Toaster />
        <footer></footer>
      </body>
    </html>
  )
}
