export const formatLabel = (text: string) => {
  if (text === "benzina") return "Benzină"
  if (text === "motorina") return "Motorină"
  if (text === "euro_6d-temp") return "Euro 6d-TEMP"
  return text.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())
}

export const imagePathFormat = (carId: number, index: number) => {
  return `masina-${carId}/poza-${index + 1}`
}
