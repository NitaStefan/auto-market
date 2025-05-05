export type Masina = {
  tip: "vanzare" | "dezmembrari"
  an: number
  marca: string
  model: string
  motorizare: string
  kilometraj: number
  pret: number
  descriere: string
  caiPutere: number
  cutieViteze: "manuala" | "automata"
  euroPoluant:
    | "non-euro"
    | "euro 1"
    | "euro 2"
    | "euro 3"
    | "euro 4"
    | "euro 5"
    | "euro 6"
    | "euro 6a"
    | "euro 6b"
    | "euro 6c"
    | "euro 6d-temp"
    | "euro 6d"
  tipCombustibil:
    | "benzina"
    | "motorina"
    | "gpl"
    | "cng"
    | "etanol"
    | "biodiesel"
    | "electricitate"
    | "hidrogen"
    | "hibrid clasic"
    | "plug-in hybrid"
    | "mild hybrid"
}
