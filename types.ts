import { euroPoluantOptions, tipCombustibilOptions } from "./lib/constants"

export type Masina = {
  tip: "vanzare" | "dezmembrari"
  marca: string
  model: string
  an?: number
  motorizare?: string
  kilometraj?: number
  pret?: number
  negociabil?: boolean
  caiPutere?: number
  cutieViteze?: "manuala" | "automata"
  euroPoluant?: (typeof euroPoluantOptions)[number]
  tipCombustibil?: (typeof tipCombustibilOptions)[number]
  detalii?: string
}
