"use server"

import { Masina, MasinaRecord } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export const addCar = async (car: Masina, images: File[]) => {
  try {
    const supabase = await createClient()

    const { data: dbCar, error: carError } = await supabase
      .from("cars")
      .insert(car)
      .select()
      .single()

    if (carError || !dbCar) {
      console.error("Error inserting car:", carError?.message)
      return {
        success: false,
        message: carError?.message || "Failed to insert car",
      }
    }

    const uploadedPaths = await Promise.all(
      images.map(async file => {
        const { data, error } = await supabase.storage
          .from("car-images")
          .upload(`masina-${dbCar.id}/${file.name}`, file)

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
        masina_id: dbCar.id,
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

    console.log("Car and images added successfully")
    revalidatePath("/masini")
    return { success: true, message: "Car and images added successfully" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

// Upload the images to Supabase storage
//     const folderPath = `masina-${dbCar.id}/`;

// // 1. Check if the folder already exists
// const { data: existingFiles, error: listError } = await supabase.storage
//   .from("car-images")
//   .list(folderPath);

// if (listError) {
//   console.error("Error checking for existing files:", listError.message);
//   throw new Error("Failed to check for existing folder.");
// }

// // 2. Delete the folder if it exists
// if (existingFiles && existingFiles.length > 0) {
//   const pathsToDelete = existingFiles.map(file => `${folderPath}${file.name}`);
//   const { error: deleteError } = await supabase.storage
//     .from("car-images")
//     .remove(pathsToDelete);

//   if (deleteError) {
//     console.error("Error deleting existing folder:", deleteError.message);
//     throw new Error("Failed to delete existing folder.");
//   }

//   console.log(`Successfully deleted existing folder: ${folderPath}`);
// }

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
