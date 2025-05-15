"use server"

import { postMessage, uploadMediaImage } from "./facebook-actions-steps"

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
        error instanceof Error ? error.message : "An unexpected error occurred",
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

  if (!res.ok) {
    throw new Error("Failed to update post")
  }

  return res.json()
}
