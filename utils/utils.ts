import { redirect } from "next/navigation"

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
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
}

// FROM ME:

export const getAddCarButtonLabel = (
  loaadingState:
    | "idle"
    | "addingCar"
    | "postingFb"
    | "savingFbData"
    | "finished",
  postOnFb: boolean
) => {
  switch (loaadingState) {
    case "addingCar":
      return "Se adaugă anunțul..."
    case "postingFb":
      return "Se postează pe Facebook..."
    case "savingFbData":
      return "Se salvează datele Facebook..."
    case "finished":
      return "Anunț adăugat cu succes!"
    case "idle":
    default:
      return `Postează pe platformă${postOnFb ? " și pe Facebook" : ""}`
  }
}
