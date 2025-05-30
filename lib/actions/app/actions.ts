"use server";

import { Masina, MasinaRecord } from "@/types/app-types";
import { createClient, createClientNoAuth } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
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
} from "./action-steps";
import { handleServerError } from "@/utils/utils";
import {
  AddCarResult,
  GetAndDeleteFacebookPostDataResult,
  GetFacebookPostIdResult,
  SimpleResult,
} from "@/types/server-responses";
import { versionOf } from "@/utils/format-utils";

export const addCar = async (
  car: Omit<Masina, "facebook_posts">,
  images: File[],
): Promise<AddCarResult> => {
  try {
    const supabase = await createClient();

    const carId = await insertCarRecord(supabase, car);

    await Promise.all([
      uploadCarImages(supabase, images, carId),
      insertCarImagesPaths(supabase, images.length, carId),
    ]);

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
  images: File[],
): Promise<SimpleResult> => {
  try {
    const supabase = await createClient();

    const { car_images, facebook_posts, ...carRows } = car;

    if (images.length !== 0) {
      const version = versionOf(car_images[0].path) + 1;

      const replaceImagePaths = async () => {
        await deleteCarImagesPaths(supabase, car.id);
        await insertCarImagesPaths(supabase, images.length, car.id, version);
      };

      await Promise.all([
        removeCarImages(supabase, car_images),
        uploadCarImages(supabase, images, car.id, version),
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
): Promise<SimpleResult> => {
  try {
    const supabase = await createClient();

    const fbPostRecordId = await insertFbPostRecord(supabase, carId, postId);

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

export const getCars = async () => {
  const supabase = await createClientNoAuth();

  const { data: cars } = (await supabase.from("cars").select(`
    *,
    car_images (path),
    facebook_posts (id)
  `)) as { data: MasinaRecord[] };

  return cars;
};

// REVALIDATE
export async function revalidateCarsPath() {
  revalidatePath("/masini");
}
