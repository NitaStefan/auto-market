"use server"

import { Masina, MasinaRecord } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import {
  insertCarRecord,
  insertCarImagesPaths,
  uploadCarImages,
  updateCarRecord,
} from "./app-actions-steps"

export const addCar = async (car: Masina, images: File[]) => {
  try {
    const supabase = await createClient()

    const dbCar = await insertCarRecord(supabase, car)

    const uploadedPaths = await uploadCarImages(supabase, images, dbCar.id)

    await insertCarImagesPaths(supabase, uploadedPaths, dbCar.id)

    revalidatePath("/masini")

    return { success: true, message: "Car and images added successfully" }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export const updateCar = async (car: MasinaRecord, images: File[]) => {
  try {
    const supabase = await createClient()

    // Update car record in the database
    const { car_images, ...carWithoutImages } = car
    await updateCarRecord(supabase, carWithoutImages)

    // todo: continue splitting into action steps
    // Upload new images to Supabase storage
    if (images.length !== 0) {
      const pathsToDelete = car.car_images.map(image => image.path)

      const { error: deleteError } = await supabase.storage
        .from("car-images")
        .remove(pathsToDelete)

      if (deleteError) {
        console.error("Error deleting folder contents:", deleteError.message)
        return {
          success: false,
          message:
            deleteError.message ||
            "Failed to delete folder contents from storage",
        }
      }

      const { error: deleteImageError } = await supabase
        .from("car_images")
        .delete()
        .eq("masina_id", car.id)

      if (deleteImageError) {
        console.error("Error deleting image paths:", deleteImageError.message)
        return {
          success: false,
          message: deleteImageError.message || "Failed to delete image paths",
        }
      }

      const uploadedPaths = await Promise.all(
        images.map(async file => {
          const { data, error } = await supabase.storage
            .from("car-images")
            .upload(`masina-${car.id}/${file.name}`, file)

          if (error || !data) {
            console.error(`Error uploading file ${file.name}:`, error?.message)
            return {
              success: false,
              message: error?.message || `Failed to upload ${file.name}`,
            }
          }

          return data.path
        })
      )

      // Insert image paths into car_images table
      const { error: imageError } = await supabase.from("car_images").insert(
        uploadedPaths.map(path => ({
          masina_id: car.id,
          path,
        }))
      )

      if (imageError) {
        console.error("Error inserting image paths:", imageError.message)
        return {
          success: false,
          message: imageError.message || "Failed to insert image paths",
        }
      }
    }

    console.log("Car and images updated successfully")
    revalidatePath("/masini")
    return { success: true, message: "Car and images updated successfully" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

export const deleteCar = async (
  carId: number,
  car_images: MasinaRecord["car_images"]
) => {
  try {
    const supabase = await createClient()

    // Delete images from storage
    const pathsToDelete = car_images.map(image => image.path)

    const { error: deleteError } = await supabase.storage
      .from("car-images")
      .remove(pathsToDelete)

    if (deleteError) {
      console.error("Error deleting folder contents:", deleteError.message)
      return {
        success: false,
        message:
          deleteError.message ||
          "Failed to delete folder contents from storage",
      }
    }

    // Delete car record from database
    const { error: carDeleteError } = await supabase
      .from("cars")
      .delete()
      .eq("id", carId)

    if (carDeleteError) {
      console.error("Error deleting car:", carDeleteError.message)
      return {
        success: false,
        message: carDeleteError.message || "Failed to delete car",
      }
    }

    console.log("Car and images deleted successfully")
    revalidatePath("/masini")
    return { success: true, message: "Car and images deleted successfully" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}
