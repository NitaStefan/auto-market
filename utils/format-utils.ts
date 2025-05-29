import { Masina } from "@/types/app-types"

export const formatLabel = (text: string) => {
  if (text === "benzina") return "Benzină"
  if (text === "motorina") return "Motorină"
  if (text === "euro_6d-temp") return "Euro 6d-TEMP"
  return text.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())
}

export const imagePathFormat = (carId: number, index: number, version = 0) => {
  return `masina-${carId}/poza-${index + 1}.${version}`
}

export const formatFbMessage = (car: Masina) => {
  return `${car.marca}, ${car.model}\n - ${car.tip}`
}

export const versionOf = (path: string) => {
  return Number(path.split(".").pop())
}
