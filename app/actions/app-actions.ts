"use server"

export const addCar = async (previousState: unknown, formData: FormData) => {
  const marca = formData.get("marca")?.toString()
  const model = formData.get("model")?.toString()
  const an = formData.get("an")?.toString()
  const pret = formData.get("pret")?.toString()
  const tip = formData.get("tip")?.toString()
  const motorizare = formData.get("motorizare")?.toString()
  const tipCombustibil = formData.get("tipCombustibil")?.toString()
  const kilometraj = formData.get("kilometraj")?.toString()
  const cutieViteze = formData.get("cutieViteze")?.toString()
  const caiPutere = formData.get("caiPutere")?.toString()
  const euroPoluant = formData.get("euroPoluant")?.toString()

  const errors: { pret?: string; marca?: string; model?: string } = {}

  if (!marca) errors.marca = "Marca este obligatorie."
  if (!model) errors.model = "Modelul este obligatoriu."
  if (tip === "vanzare" && !pret)
    errors.pret = "Prețul este obligatoriu la mașina de vânzare."

  if (Object.keys(errors).length > 0)
    return {
      errors,
      fieldData: {
        marca,
        model,
        an,
        tip,
        pret,
        motorizare,
        tipCombustibil,
        kilometraj,
        cutieViteze,
        caiPutere,
        euroPoluant,
      },
    }

  // simulate DB logic
  await new Promise(resolve => setTimeout(resolve, 1000))

  // You can return success or null/undefined
  return {
    message: "Anuntul a fost adaugat cu succes",
  }
}
