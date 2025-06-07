import { Masina, Specs } from "@/types/app-types";
import { convertCpToKw } from "./utils";
import { CAR_BRANDS, CarBrandKey } from "./constants";

// specs values
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
    `${car.tip === "vanzare" ? "Vând" : "Dezmembrez"} ${CAR_BRANDS[car.marca as CarBrandKey]} ${car.model}${car.an ? `, ${car.an}` : ""}`,
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
    "\n✆ 0744 227 641\n",
    car.detalii ? `\n${car.detalii}` : null,
  ];

  return lines.filter(Boolean).join("\n");
};

export const versionOf = (path: string) => {
  return Number(path.split(".").pop());
};

export const formatSpecName = (spec: Specs) => {
  if (spec === "an") return "An fabricație";
  if (spec === "motorizare") return "Motorizare";
  if (spec === "tip_combustibil") return "Tip combustibil";
  if (spec === "kilometraj") return "Kilometraj";
  if (spec === "cutie_viteze") return "Cutie de viteze";
  if (spec === "cai_putere") return "Cai putere";
  if (spec === "euro_poluant") return "Standard poluare";
};

// WHATSAPP

export function generateWhatsAppLink(
  masina: string,
  tip: "vanzare" | "dezmembrari",
  carId: number,
): string {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  const linkMasina = `${baseUrl}/masini/${carId}`;

  const fullMessage =
    tip === "vanzare"
      ? `Bună ziua!\nSunt interesat(ă) de mașina ${masina} pe care ați publicat-o.\nEste încă disponibilă? Ați putea să-mi oferiți mai multe detalii?\n\nLinkul anunțului: ${linkMasina}`
      : `Bună ziua!\nAm văzut că dezmembrați o mașină ${masina}. M-ar interesa câteva piese (ex: far dreapta, bară față).\n\nLinkul anunțului: ${linkMasina}`;

  const encodedMessage = encodeURIComponent(fullMessage);

  return `https://wa.me/40744227641?text=${encodedMessage}`;
}
