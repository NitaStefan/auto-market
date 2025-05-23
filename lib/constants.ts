export const euroPoluantOptions = [
  "non-euro",
  "euro_1",
  "euro_2",
  "euro_3",
  "euro_4",
  "euro_5",
  "euro_6",
  "euro_6a",
  "euro_6b",
  "euro_6c",
  "euro_6d-temp",
  "euro_6d",
] as const

export const tipCombustibilOptions = [
  "benzina",
  "motorina",
  "gpl",
  "cng",
  "etanol",
  "biodiesel",
  "electricitate",
  "hidrogen",
  "hibrid_clasic",
  "plug-in_hybrid",
  "mild_hybrid",
] as const

export const CAR_IMAGES_BUCKET_URL =
  "https://rdwokiscvwvwsfkbyadb.supabase.co/storage/v1/object/public/car-images/"
