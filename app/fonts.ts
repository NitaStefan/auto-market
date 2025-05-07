import { Archivo, Oswald } from "next/font/google"

export const oswald = Oswald({
  display: "swap",
  weight: ["400", "500"],
  subsets: ["latin"],
})

export const archivo = Archivo({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})
