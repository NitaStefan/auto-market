"use server"

import {
  deleteMedia,
  deletePost,
  postMessage,
  uploadMediaImage,
} from "./action-steps"
import { handleServerError } from "@/utils/utils"
import { MakeFacebookPostResult, SimpleResult } from "@/types/server-responses"
import { cookies } from "next/headers"

export const makeFacebookPost = async (
  message: string,
  carId: number,
  numberOfImages: number,
  version = 0
): Promise<MakeFacebookPostResult> => {
  try {
    const imageUploadPromises = Array.from(
      { length: numberOfImages },
      (_, index) => uploadMediaImage(carId, index, version)
    )
    const mediaIds = await Promise.all(imageUploadPromises)

    const postId = await postMessage(message, mediaIds)

    return {
      success: true,
      postId,
      mediaIds,
    }
  } catch (error) {
    return handleServerError("postarea anunțului pe Facebook", error)
  }
}

export const updateFacebookPost = async (
  postId: string,
  message: string
): Promise<SimpleResult> => {
  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FB_PAGE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        message,
      }),
    })

    if (!res.ok) throw new Error("Failed to update post")

    return { success: true }
  } catch (error) {
    return handleServerError("actualizarea anunțului pe Facebook", error)
  }
}

export const deleteFacebookPost = async (
  postId: string,
  mediaIds: string[]
): Promise<SimpleResult> => {
  try {
    const deleteMediaPromises = mediaIds.map(mediaId => deleteMedia(mediaId))
    const deletePostPromise = deletePost(postId)

    await Promise.all([deletePostPromise, ...deleteMediaPromises])

    return { success: true }
  } catch (error) {
    return handleServerError("ștergerea anunțului de pe Facebook", error)
  }
}

//AUTHORIZATION

export const getFacebookPageAccessToken = async () => {
  const cookieStore = await cookies()
  cookieStore.set("simulate_fb_access_token", "cel mai prost token", {
    httpOnly: true,
    secure: true,
    maxAge: 20,
  })
}
