import { Masina } from "@/types/app-types";
import { convertCpToKw } from "./utils";

export const formatLabel = (text?: string) => {
  if (!text) return "";

  if (text === "automata") return "Automată";
  if (text === "manuala") return "Manuală";
  if (text === "benzina") return "Benzină";
  if (text === "motorina") return "Diesel";
  if (text === "euro_6d-temp") return "Euro 6d-TEMP";
  return text.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};

export const imagePathFormat = (carId: number, index: number, version = 0) => {
  return `masina-${carId}/poza-${index + 1}.${version}`;
};

export const formatFbMessage = (car: Masina) => {
  const lines = [
    `${car.tip === "vanzare" ? "Vând" : "Dezmembrez"} ${car.marca} ${car.model}${car.an ? `, ${car.an}` : ""}`,
    car.tip === "vanzare" && car.pret
      ? `🏷️ ${car.pret.toLocaleString("ro-RO")} €${car.negociabil ? " (negociabil)" : ""}`
      : null,
    car.motorizare || car.tip_combustibil
      ? `✔️ ${formatLabel(car.motorizare)}${car.tip_combustibil && car.motorizare ? ", " : ""}${formatLabel(car.tip_combustibil)}`
      : null,
    car.kilometraj
      ? `✔️ ${car.kilometraj.toLocaleString("ro-RO")} km rulați`
      : null,
    car.cutie_viteze
      ? `✔️ Cutie ${car.cutie_viteze === "automata" ? "automată" : "manuală"}`
      : null,
    car.cai_putere
      ? `✔️ ${car.cai_putere} CP (${convertCpToKw(car.cai_putere)} kW)`
      : null,
    car.euro_poluant ? `✔️ Normă Euro: ${formatLabel(car.euro_poluant)}` : null,
    car.detalii ? `\n${car.detalii}` : null,
  ];

  return lines.filter(Boolean).join("\n");
};

export const versionOf = (path: string) => {
  return Number(path.split(".").pop());
};

export const normalizeBrand = (brand: string) =>
  brand.trim().toLowerCase().replace(/\s+/g, "-");
