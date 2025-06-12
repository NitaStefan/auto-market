"use server";

import { Masina, MasinaRecord } from "@/types/app-types";
import { createClient, createClientNoAuth } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import {
  insertCarRecord,
  insertCarImagesPaths,
  updateCarRecord,
  deleteCarImagesPaths,
  removeCarImages,
  deleteCarRecord,
  insertFbPostRecord,
  insertMediaId,
} from "./action-steps";
import { handleServerError } from "@/utils/utils";
import {
  AddCarResult,
  GetAndDeleteFacebookPostDataResult,
  GetFacebookPostIdResult,
  SimpleResult,
} from "@/types/server-responses";
import { versionOf } from "@/utils/format-utils";
import { cache } from "react";

export const addCar = async (
  car: Omit<Masina, "facebook_posts">,
  noOfimages: number,
): Promise<AddCarResult> => {
  try {
    const supabase = await createClient();

    const carId = await insertCarRecord(supabase, car);

    await insertCarImagesPaths(supabase, noOfimages, carId);

    return {
      success: true,
      carId: carId,
    };
  } catch (error) {
    return handleServerError("adăugarea anunțului", error);
  }
};

export const updateCar = async (
  car: MasinaRecord,
  noOfImages: number,
): Promise<SimpleResult> => {
  try {
    const supabase = await createClient();

    const { car_images, facebook_posts, ...carRows } = car;

    if (noOfImages !== 0) {
      const version = versionOf(car_images[0].path) + 1;

      const replaceImagePaths = async () => {
        await deleteCarImagesPaths(supabase, car.id);
        await insertCarImagesPaths(supabase, noOfImages, car.id, version);
      };

      await Promise.all([
        removeCarImages(supabase, car_images),
        replaceImagePaths(),
        updateCarRecord(supabase, carRows),
      ]);
    } else await updateCarRecord(supabase, carRows);

    return { success: true };
  } catch (error) {
    return handleServerError("modificarea anunțului", error);
  }
};

export const deleteCar = async (
  carId: number,
  car_images: MasinaRecord["car_images"],
): Promise<SimpleResult> => {
  try {
    const supabase = await createClient();

    await Promise.all([
      removeCarImages(supabase, car_images),
      deleteCarRecord(supabase, carId),
    ]);

    return { success: true };
  } catch (error) {
    return handleServerError("ștergerea anunțului", error);
  }
};

export const addFacebookPostData = async (
  carId: number,
  postId: string,
  mediaIds: string[],
  postLink?: string,
): Promise<SimpleResult> => {
  try {
    const supabase = await createClient();

    const fbPostRecordId = await insertFbPostRecord(
      supabase,
      carId,
      postId,
      postLink,
    );

    await Promise.all(
      mediaIds.map((mediaId) =>
        insertMediaId(supabase, fbPostRecordId, mediaId),
      ),
    );

    return { success: true };
  } catch (error) {
    return handleServerError(
      "adăugarea datelor postării de pe Facebook",
      error,
    );
  }
};

//RETRIEVE

export const getThenDeleteFacebookPostData = async (
  carId: number,
): Promise<GetAndDeleteFacebookPostDataResult> => {
  try {
    const supabase = await createClient();

    const { data, error: selectError } = await supabase
      .from("facebook_posts")
      .select("id, facebook_media (id)")
      .eq("car_id", carId)
      .single();

    if (selectError) {
      console.error("Error retrieving facebook data", selectError);
      throw selectError;
    }

    const { error: deleteError } = await supabase
      .from("facebook_posts")
      .delete()
      .eq("car_id", carId);

    if (deleteError) {
      console.error("Error deleting facebook data", deleteError);
      throw deleteError;
    }

    return {
      success: true,
      postId: data.id as string,
      mediaIds: data.facebook_media.map((m) => m.id as string),
    };
  } catch (error) {
    return handleServerError(
      "obținerea/ștergerea datelor postării de pe Facebook",
      error,
    );
  }
};

export const getFacebookPostId = async (
  carId: number,
): Promise<GetFacebookPostIdResult> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("facebook_posts")
      .select("id")
      .eq("car_id", carId)
      .single();

    if (error) {
      console.error("Error retrieving facebook data", error);
      throw error;
    }

    return {
      success: true,
      postId: data.id as string,
    };
  } catch (error) {
    return handleServerError("obținerea postării de pe Facebook", error);
  }
};

export const getCars = async (filters: {
  [key: string]: string | undefined;
}) => {
  const supabase = await createClientNoAuth();

  let query = supabase.from("cars").select(`
    *,
    car_images (path),
    facebook_posts (id)
  `);

  if (filters?.tip) {
    query = query.eq("tip", filters.tip);

    if (filters.tip === "vanzare") {
      if (filters.pret_min) query = query.gte("pret", Number(filters.pret_min));
      if (filters.pret_max) query = query.lte("pret", Number(filters.pret_max));
    }
  }

  if (filters?.marca) query = query.eq("marca", filters.marca);

  const { data: cars } = (await query) as { data: MasinaRecord[] };

  return cars;
};

export const getCarById = async (id: number) => {
  const supabase = await createClientNoAuth();

  const { data: car } = (await supabase
    .from("cars")
    .select(
      `
      *,
      car_images (path),
      facebook_posts (id, link)
    `,
    )
    .eq("id", id)
    .single()) as { data: MasinaRecord | null };

  return car;
};

export const getCarBrands = async () => {
  const supabase = await createClientNoAuth();

  const { data } = await supabase.rpc("get_distinct_marci");

  return data;
};

// REVALIDATE
export async function revalidateCarsPath() {
  revalidatePath("/masini");
}

// GET USER

export const getUser = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
