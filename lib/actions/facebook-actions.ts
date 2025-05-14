"use server"

export const makeFacebookPost = async (message: string) => {
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
      }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: data.error?.message || "Failed to create post",
    }
  }

  return {
    success: true,
    message: "Post created successfully",
    postId: data.id as string,
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
