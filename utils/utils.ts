import { MasinaRecord, ModifyLoadingState } from "@/types/app-types";
import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

// FROM ME:

export const getAddCarButtonLabel = (
  loadingState: "idle" | "adding-car" | "posting-fb" | "saving-fb-data",
  postOnFb: boolean,
) => {
  switch (loadingState) {
    case "adding-car":
      return "Se adaugă anunțul...";
    case "posting-fb":
      return "Se postează pe Facebook...";
    case "saving-fb-data":
      return "Se salvează datele Facebook...";
    case "idle":
    default:
      return `Postează pe platformă${postOnFb ? " și pe Facebook" : ""}`;
  }
};

export const getModifyCarButtonLabel = (loadingState: ModifyLoadingState) => {
  switch (loadingState) {
    case "deleting-fb-post":
      return "Se șterge anunțul de pe Facebook...";
    case "deleting-record":
      return "Se șterge anunțul de pe platformă...";
    case "updating-record":
      return "Se modifică anunțul de pe platformă...";
    case "posting-fb":
      return "Se postează pe Facebook...";
    case "updating-post":
      return "Se modifică postarea de pe Facebook...";
    case "reposting-fb":
      return "Se repostează pe Facebook...";

    case "idle":
    default:
      return "Finalizează";
  }
};

export const convertCpToKw = (cp: number): number => {
  const kW = cp * 0.7355;
  return Math.round(kW);
};

export const handleServerError = (
  context: string,
  error: unknown,
): { success: false; message: string } => {
  console.error(`❌ CONTEXT: ${context}`, error);
  return {
    success: false,
    message: `A apărut o eroare neașteptată la ${context}`,
  };
};

//replace undefined values with null
export const normalizeCar = (
  car: Omit<MasinaRecord, "car_images" | "facebook_posts">,
) => {
  return {
    ...car,
    pret: car.pret === undefined ? null : car.pret,
    an: car.an === undefined ? null : car.an,
    motorizare: car.motorizare === undefined ? null : car.motorizare,
    tip_combustibil:
      car.tip_combustibil === undefined ? null : car.tip_combustibil,
    kilometraj: car.kilometraj === undefined ? null : car.kilometraj,
    cutie_viteze: car.cutie_viteze === undefined ? null : car.cutie_viteze,
    cai_putere: car.cai_putere === undefined ? null : car.cai_putere,
    euro_poluant: car.euro_poluant === undefined ? null : car.euro_poluant,
    detalii: car.detalii === undefined ? null : car.detalii,
  };
};
