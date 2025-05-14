import { Masina, MasinaRecord } from "@/types"
import { SupabaseClient } from "@supabase/supabase-js"
import { imagePathFormat } from "../custom-utils"

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

  console.log("updateCarRecord ERROR", error)
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
    images.map(async (file, index) => {
      const { data, error } = await supabase.storage
        .from("car-images")
        .upload(imagePathFormat(carId, index), file)

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
  numberOfImages: number,
  carId: number
) => {
  const { error } = await supabase.from("car_images").insert(
    Array.from({ length: numberOfImages }, (_, index) => ({
      masina_id: carId,
      path: imagePathFormat(carId, index),
    }))
  )

  if (error) {
    console.error("Error inserting image paths:", error.message)
    throw new Error(error.message || "Failed to insert image paths")
  }
}

export const removeCarImages = async (
  supabase: SupabaseClient<any, "public", any>,
  car_images: MasinaRecord["car_images"]
) => {
  const pathsToDelete = car_images.map(image => image.path)

  const { error } = await supabase.storage
    .from("car-images")
    .remove(pathsToDelete)

  if (error) {
    console.error("Error deleting folder contents:", error.message)
    throw new Error(
      error.message || "Failed to delete folder contents from storage"
    )
  }
}

export const deleteCarImagesPaths = async (
  supabase: SupabaseClient<any, "public", any>,
  carId: number
) => {
  const { error } = await supabase
    .from("car_images")
    .delete()
    .eq("masina_id", carId)

  if (error) {
    console.error("Error deleting image paths:", error.message)
    throw new Error(error.message || "Failed to delete image paths")
  }
}

export const deleteCarRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  carId: number
) => {
  const { error } = await supabase.from("cars").delete().eq("id", carId)

  if (error) {
    console.error("Error deleting car:", error.message)
    throw new Error(error.message || "Failed to delete car")
  }
}
