import { oswald } from "./fonts"
import "./globals.css"

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
    <html lang="en" className={oswald.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  )
}
