import { Masina, MasinaRecord } from "@/types"
import { SupabaseClient } from "@supabase/supabase-js"

export const insertCarRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  car: Masina
) => {
  const { data: dbCar, error } = await supabase
    .from("cars")
    .insert(car)
    .select()
    .single()

  if (error) {
    console.error("Error inserting car:", error?.message)
    throw new Error(error.message || "Failed to insert car")
  }

  return dbCar
}

export const updateCarRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  car: Omit<MasinaRecord, "car_images">
) => {
  const { error } = await supabase.from("cars").update(car).eq("id", car.id)

  if (error) {
    console.error("Error updating car:", error.message)
    throw new Error(error.message || "Failed to update car")
  }
}

export const uploadCarImages = async (
  supabase: SupabaseClient<any, "public", any>,
  images: File[],
  carId: number
) => {
  const uploadedPaths = await Promise.all(
    images.map(async file => {
      const { data, error } = await supabase.storage
        .from("car-images")
        .upload(`masina-${carId}/${file.name}`, file)

      if (error) {
        console.error(`Error uploading file ${file.name}:`, error?.message)
        throw new Error(error.message || `Failed to upload ${file.name}`)
      }

      return data.path
    })
  )

  return uploadedPaths
}

export const insertCarImagesPaths = async (
  supabase: SupabaseClient<any, "public", any>,
  paths: string[],
  carId: number
) => {
  const { error } = await supabase.from("car_images").insert(
    paths.map(path => ({
      masina_id: carId,
      path,
    }))
  )

  if (error) {
    console.error("Error inserting image paths:", error.message)
    throw new Error(error.message || "Failed to insert image paths")
  }
}
