"use server"

import { Masina } from "@/types"
import { createClient } from "@/utils/supabase/server"

export const addCar = async (car: Masina, images: File[]) => {
  try {
    const supabase = await createClient()

    // Insert the car data
    const { data: dbCar, error: carError } = await supabase
      .from("masini")
      .insert(car)
      .select()

    if (carError) throw carError
    const carId = dbCar[0].id

    // Upload the images to Supabase storage
    const uploadedPaths = await Promise.all(
      images.map(async file => {
        const { data, error } = await supabase.storage
          .from("car-images")
          .upload(`masina-${carId}/${file.name}`, file)

        if (error) throw error
        return data.path
      })
    )

    // Insert image paths into car_images table
    const { error: imageError } = await supabase.from("car_images").insert(
      uploadedPaths.map(path => ({
        masina_id: carId,
        path,
      }))
    )

    if (imageError) throw imageError

    console.log("Car and images added successfully")
  } catch (error) {
    console.error("Error adding car and images:", error)
  }
}
