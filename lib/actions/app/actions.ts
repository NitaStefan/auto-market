"use server"

import { Masina, MasinaRecord } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import {
  insertCarRecord,
  insertCarImagesPaths,
  uploadCarImages,
  updateCarRecord,
  deleteCarImagesPaths,
  removeCarImages,
  deleteCarRecord,
  insertFbPostRecord,
  insertMediaId,
} from "./action-steps"

export const addCar = async (
  car: Masina,
  images: File[],
  revalidate: boolean
) => {
  try {
    const supabase = await createClient()

    const carId = await insertCarRecord(supabase, car)

    await Promise.all([
      uploadCarImages(supabase, images, carId),
      insertCarImagesPaths(supabase, images.length, carId),
    ])

    if (revalidate) revalidatePath("/masini")

    return {
      success: true,
      message: "Car and images added successfully",
      carId: carId,
    }
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

    const { car_images, ...carWithoutImages } = car

    if (images.length !== 0) {
      await Promise.all([
        removeCarImages(supabase, car_images),
        deleteCarImagesPaths(supabase, car.id),
        uploadCarImages(supabase, images, car.id),
        insertCarImagesPaths(supabase, images.length, car.id),
        updateCarRecord(supabase, carWithoutImages),
      ])
    } else await updateCarRecord(supabase, carWithoutImages)

    revalidatePath("/masini")

    return { success: true, message: "Car and images updated successfully" }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export const deleteCar = async (
  carId: number,
  car_images: MasinaRecord["car_images"]
) => {
  try {
    const supabase = await createClient()

    await Promise.all([
      removeCarImages(supabase, car_images),
      deleteCarRecord(supabase, carId),
    ])

    revalidatePath("/masini")
    return { success: true, message: "Car and images deleted successfully" }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

export const addFacebookPostData = async (
  carId: number,
  postId: string,
  mediaIds: string[]
) => {
  try {
    const supabase = await createClient()

    const fbPostRecordId = await insertFbPostRecord(supabase, carId, postId)

    await Promise.all(
      mediaIds.map(mediaId => insertMediaId(supabase, fbPostRecordId, mediaId))
    )

    revalidatePath("/masini")

    return { success: true, message: "Facebook data inserted successfully" }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}

//RETRIEVE

export const getThenDeleteFacebookPostData = async (carId: number) => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("facebook_posts")
      .select("id, facebook_media (id)")
      .eq("car_id", carId)
      .single()

    if (error) {
      console.error("Error retrieving facebook data", error.message)
      throw new Error(error.message || `Failed to retrieve facebook data`)
    }

    await supabase.from("facebook_posts").delete().eq("car_id", carId)

    return {
      success: true,
      postId: data.id as string,
      mediaIds: data.facebook_media.map(m => m.id as string),
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
