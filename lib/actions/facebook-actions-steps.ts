import { CAR_IMAGES_BUCKET_URL } from "../constants"
import { imagePathFormat } from "../custom-utils"

export const postMessage = async (message: string, mediaIds: string[]) => {
  const res = await fetch(
    `https://graph.facebook.com/v22.0/${process.env.FB_PAGE_ID}/feed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FB_PAGE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        message,
        attached_media: mediaIds.map(mediaId => {
          media_fbid: mediaId
        }),
      }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    console.error("Error posting message on facebook:", data.error.message)
    throw new Error(data.error.message || "Failed to post message on facebook")
  }

  return data.id as string
}

export const uploadMediaImage = async (carId: number, index: number) => {
  const res = await fetch(
    `https://graph.facebook.com/v22.0/${process.env.FB_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FB_PAGE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        url: `${CAR_IMAGES_BUCKET_URL}${imagePathFormat(carId, index)}`,
        published: false,
      }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    console.error("Error uploading image to Facebook:", data.error.message)
    throw new Error(data.error.message || "Failed to upload image to Facebook")
  }

  return data.id as string
}
