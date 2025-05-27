"use server"

import { revalidatePath } from "next/cache"
import {
  deleteMedia,
  deletePost,
  postMessage,
  uploadMediaImage,
} from "./action-steps"

export const makeFacebookPost = async (
  message: string,
  carId: number,
  numberOfImages: number
) => {
  try {
    const imageUploadPromises = Array.from(
      { length: numberOfImages },
      (_, index) => uploadMediaImage(carId, index)
    )
    const mediaIds = await Promise.all(imageUploadPromises)

    const postId = await postMessage(message, mediaIds)

    return {
      success: true,
      message: "Post created successfully",
      postId,
      mediaIds,
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "A apărut o eroare neașteptată. Încearcă din nou.",
    }
  }
}

export const updateFacebookPost = async (message: string, postId: string) => {
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

  return res.json()
}

export const deleteFacebookPost = async (
  postId: string,
  mediaIds: string[],
  revalidate: boolean
) => {
  try {
    const deleteMediaPromises = mediaIds.map(mediaId => deleteMedia(mediaId))
    const deletePostPromise = deletePost(postId)

    await Promise.all([deletePostPromise, ...deleteMediaPromises])

    if (revalidate) revalidatePath("/masini")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
