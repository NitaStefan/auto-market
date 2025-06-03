import { euroPoluantOptions, tipCombustibilOptions } from "../utils/constants";

export type Masina = {
  id?: number;
  tip: "vanzare" | "dezmembrari";
  pret?: number;
  negociabil?: boolean;
  marca: string;
  model: string;
  an?: number;
  motorizare?: string;
  tip_combustibil?: (typeof tipCombustibilOptions)[number];
  kilometraj?: number;
  cutie_viteze?: "manuala" | "automata";
  cai_putere?: number;
  euro_poluant?: (typeof euroPoluantOptions)[number];
  detalii?: string;
  // outside table
  car_images?: { path: string }[];
  facebook_posts: { id?: string };
};

export type MasinaRecord = Masina & {
  id: number;
  car_images: { path: string }[];
};

export type Specs =
  | "an"
  | "motorizare"
  | "tip_combustibil"
  | "kilometraj"
  | "cutie_viteze"
  | "cai_putere"
  | "euro_poluant";

export type ModifyLoadingState =
  | "idle"
  | "deleting-fb-post"
  | "deleting-record"
  | "updating-record"
  | "posting-fb"
  | "updating-post"
  | "reposting-fb";
