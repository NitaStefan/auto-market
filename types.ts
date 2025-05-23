import { euroPoluantOptions, tipCombustibilOptions } from "./lib/constants"

export type Masina = {
  id?: number
  post_id?: string
  tip: "vanzare" | "dezmembrari"
  marca: string
  model: string
  an?: number
  motorizare?: string
  kilometraj?: number
  pret?: number
  negociabil?: boolean
  cai_putere?: number
  cutie_viteze?: "manuala" | "automata"
  euro_poluant?: (typeof euroPoluantOptions)[number]
  tip_combustibil?: (typeof tipCombustibilOptions)[number]
  detalii?: string
  car_images?: { path: string; media_id?: string }[]
}

export type MasinaRecord = Masina & {
  id: number
  car_images: { path: string }[]
}
