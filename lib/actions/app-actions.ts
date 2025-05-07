"use server"

import { Masina } from "@/types"
import { createClient } from "@/utils/supabase/server"

export const addCar = async (car: Masina, images: File[]) => {
  try {
    const supabase = await createClient()

    // Insert the car data
    const { data: dbCar, error: carError } = await supabase
      .from("cars")
      .insert(car)
      .select()
      .single()

    if (carError || !dbCar) {
      throw new Error(carError?.message || "Failed to insert car")
    }

    // Upload the images to Supabase storage
    const uploadedPaths = await Promise.all(
      images.map(async file => {
        const { data, error } = await supabase.storage
          .from("car-images")
          .upload(`masina-${dbCar.id}/${file.name}`, file)

        if (error || !data)
          throw new Error(error?.message || `Failed to upload ${file.name}`)

        return data.path
      })
    )

    // Insert image paths into car_images table
    const { error: imageError } = await supabase.from("car_images").insert(
      uploadedPaths.map(path => ({
        masina_id: dbCar.id,
        path,
      }))
    )

    if (imageError)
      throw new Error(imageError.message || "Failed to insert image paths")

    console.log("Car and images added successfully")
  } catch (error) {
    console.error("Error adding car and images:", error)
  }
}
