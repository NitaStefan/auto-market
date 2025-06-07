"use server";

import {
  deleteMedia,
  deletePost,
  postMessage,
  uploadMediaImage,
} from "./action-steps";
import { handleServerError } from "@/utils/utils";
import { MakeFacebookPostResult, SimpleResult } from "@/types/server-responses";
import { cookies } from "next/headers";
import { NGROK_BASE_URL } from "@/utils/constants";

const getPageAccessToken = async () => {
  const cookieStore = await cookies();
  const pageAccessToken = cookieStore.get("page_access_token");
  if (!pageAccessToken) throw Error("Page access token not found");

  return pageAccessToken.value;
};

export const makeFacebookPost = async (
  message: string,
  carId: number,
  numberOfImages: number,
  version = 0,
): Promise<MakeFacebookPostResult> => {
  try {
    const pageAccessToken = await getPageAccessToken();

    const imageUploadPromises = Array.from(
      { length: numberOfImages },
      (_, index) => uploadMediaImage(carId, index, version, pageAccessToken),
    );
    const mediaIds = await Promise.all(imageUploadPromises);

    const postId = await postMessage(message, mediaIds, pageAccessToken);

    return {
      success: true,
      postId,
      mediaIds,
    };
  } catch (error) {
    return handleServerError("postarea anunțului pe Facebook", error);
  }
};

export const updateFacebookPost = async (
  postId: string,
  message: string,
): Promise<SimpleResult> => {
  try {
    const pageAccessToken = await getPageAccessToken();

    const res = await fetch(`https://graph.facebook.com/v22.0/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (!res.ok) throw new Error("Failed to update post");

    return { success: true };
  } catch (error) {
    return handleServerError("actualizarea anunțului pe Facebook", error);
  }
};

export const deleteFacebookPost = async (
  postId: string,
  mediaIds: string[],
): Promise<SimpleResult> => {
  try {
    const pageAccessToken = await getPageAccessToken();

    const deleteMediaPromises = mediaIds.map((mediaId) =>
      deleteMedia(mediaId, pageAccessToken),
    );
    const deletePostPromise = deletePost(postId, pageAccessToken);

    await Promise.all([deletePostPromise, ...deleteMediaPromises]);

    return { success: true };
  } catch (error) {
    return handleServerError("ștergerea anunțului de pe Facebook", error);
  }
};

//ENGAGEMENT

export const getPostComments = async (postId: string) => {
  const pageAccessToken = await getPageAccessToken();

  const res = await fetch(
    `https://graph.facebook.com/${postId}/comments?access_token=${pageAccessToken}`,
  );

  const data = await res.json();

  return data.data;
};

export const getNunmberOfReactions = async (postId: string) => {
  const pageAccessToken = await getPageAccessToken();

  const res = await fetch(
    `https://graph.facebook.com/${postId}/reactions?summary=true&access_token=${pageAccessToken}`,
  );

  const data = await res.json();

  return data.summary.total_count;
};

//AUTHORIZATION

// set a page_access_token secure cookie lasting 55 days
export const getFacebookPageAccessToken = async (code: string) => {
  const cookieStore = await cookies();
  try {
    const client_id = process.env.FACEBOOK_APP_ID;
    const client_secret = process.env.FACEBOOK_APP_SECRET;

    // Exchange code for user access token
    const exchangeCodeForUATRes = await fetch(
      `https://graph.facebook.com/oauth/access_token?client_id=${client_id}&redirect_uri=${NGROK_BASE_URL}facebook-auth&client_secret=${client_secret}&code=${code}`,
    );

    if (!exchangeCodeForUATRes.ok)
      throw new Error("Failed to get user access token");

    const { access_token: shortLivedUAT } = await exchangeCodeForUATRes.json();

    // Exchange short-lived user access token for long-lived user access token
    const longLivedUATRes = await fetch(
      `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${shortLivedUAT}`,
    );

    if (!longLivedUATRes.ok)
      throw new Error("Failed to prolong user access token");

    const { access_token: userAccessToken } = await longLivedUATRes.json();

    // Get page access token
    const getPageAccessToken = async (days: number) => {
      const PATRes = await fetch(
        `https://graph.facebook.com/v22.0/me/accounts?access_token=${userAccessToken}`,
      );

      if (!PATRes.ok) throw new Error("Failed to get page access token");

      const PATResJson = await PATRes.json();

      const page = PATResJson.data.find(
        (p: any) => p.id === process.env.FB_PAGE_ID,
      );
      const pageAccessToken = page.access_token;

      cookieStore.set("page_access_token", pageAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * days,
      });
    };

    await getPageAccessToken(55);

    return { success: true };
  } catch (error) {
    return handleServerError("asocierea contului de Facebook", error);
  }
};

export const setDummyPageAccessToken = async () => {
  const cookieStore = await cookies();

  cookieStore.set(
    "page_access_token",
    process.env.FB_PAGE_ACCESS_TOKEN as string,
    {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 55,
    },
  );
};
