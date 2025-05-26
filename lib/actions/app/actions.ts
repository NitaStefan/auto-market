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

export const addCar = async (car: Masina, images: File[]) => {
  try {
    const supabase = await createClient()

    //todo: only take the dbCarId
    const dbCar = await insertCarRecord(supabase, car)

    await Promise.all([
      uploadCarImages(supabase, images, dbCar.id),
      insertCarImagesPaths(supabase, images.length, dbCar.id),
    ])

    revalidatePath("/masini")

    return {
      success: true,
      message: "Car and images added successfully",
      carId: dbCar.id as number,
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

    return { success: true, message: "Facebook data inserted successfully" }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
