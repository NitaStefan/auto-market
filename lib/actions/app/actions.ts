"use server"

import { Masina, MasinaRecord } from "@/types/app-types"
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
import { handleServerError } from "@/utils/utils"
import {
  AddCarResult,
  AddFacebookPostDataResult,
} from "@/types/server-responses"

export const addCar = async (
  car: Masina,
  images: File[],
  revalidate: boolean
): Promise<AddCarResult> => {
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
      carId: carId,
    }
  } catch (error) {
    return handleServerError("adăugarea anunțului", error)
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

    return { success: true }
  } catch (error) {
    return handleServerError("modificarea anunțului", error)
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
    return { success: true }
  } catch (error) {
    return handleServerError("ștergerea anunțului", error)
  }
}

export const addFacebookPostData = async (
  carId: number,
  postId: string,
  mediaIds: string[]
): Promise<AddFacebookPostDataResult> => {
  try {
    const supabase = await createClient()

    const fbPostRecordId = await insertFbPostRecord(supabase, carId, postId)

    await Promise.all(
      mediaIds.map(mediaId => insertMediaId(supabase, fbPostRecordId, mediaId))
    )

    revalidatePath("/masini")

    return { success: true }
  } catch (error) {
    return handleServerError("adăugarea datelor postării de pe Facebook", error)
  }
}

//RETRIEVE

export const getThenDeleteFacebookPostData = async (carId: number) => {
  try {
    const supabase = await createClient()

    const { data, error: selectError } = await supabase
      .from("facebook_posts")
      .select("id, facebook_media (id)")
      .eq("car_id", carId)
      .single()

    if (selectError) {
      console.error("Error retrieving facebook data", selectError)
      throw selectError
    }

    const { error: deleteError } = await supabase
      .from("facebook_posts")
      .delete()
      .eq("car_id", carId)

    if (deleteError) {
      console.error("Error deleting facebook data", deleteError)
      throw deleteError
    }

    return {
      success: true,
      postId: data.id as string,
      mediaIds: data.facebook_media.map(m => m.id as string),
    }
  } catch (error) {
    return handleServerError(
      "obținerea/ștergerea datelor postării de pe Facebook",
      error
    )
  }
}
