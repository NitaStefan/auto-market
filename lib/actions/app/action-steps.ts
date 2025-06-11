import { Masina, MasinaRecord } from "@/types/app-types";
import { SupabaseClient } from "@supabase/supabase-js";
import { imagePathFormat } from "../../../utils/format-utils";
import { normalizeCar } from "@/utils/utils";

export const insertCarRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  car: Omit<Masina, "facebook_posts">,
) => {
  const { data: dbCar, error } = await supabase
    .from("cars")
    .insert(car)
    .select()
    .single();

  if (error) {
    console.error("Error inserting car record: ", error);
    throw error;
  }

  return dbCar.id as number;
};

export const updateCarRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  car: Omit<MasinaRecord, "car_images" | "facebook_posts">,
) => {
  const { error } = await supabase
    .from("cars")
    .update(normalizeCar(car))
    .eq("id", car.id);

  if (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

export const uploadCarImages = async (
  supabase: SupabaseClient<any, "public", any>,
  images: File[],
  carId: number,
  version = 0,
) => {
  const uploadedPaths = await Promise.all(
    images.map(async (file, index) => {
      const { data, error } = await supabase.storage
        .from("car-images")
        .upload(imagePathFormat(carId, index, version), file);

      if (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        throw error;
      }

      return data.path;
    }),
  );

  return uploadedPaths;
};

export const insertCarImagesPaths = async (
  supabase: SupabaseClient<any, "public", any>,
  numberOfImages: number,
  carId: number,
  version = 0,
) => {
  const { error } = await supabase.from("car_images").insert(
    Array.from({ length: numberOfImages }, (_, index) => ({
      car_id: carId,
      path: imagePathFormat(carId, index, version),
    })),
  );

  if (error) {
    console.error("Error inserting image paths:", error);
    throw error;
  }
};

export const removeCarImages = async (
  supabase: SupabaseClient<any, "public", any>,
  car_images: MasinaRecord["car_images"],
) => {
  const pathsToDelete = car_images.map((image) => image.path);

  const { error } = await supabase.storage
    .from("car-images")
    .remove(pathsToDelete);

  if (error) {
    console.error("Error deleting folder contents:", error);
    throw error;
  }
};

export const deleteCarImagesPaths = async (
  supabase: SupabaseClient<any, "public", any>,
  carId: number,
) => {
  const { error } = await supabase
    .from("car_images")
    .delete()
    .eq("car_id", carId);

  if (error) {
    console.error("Error deleting image paths:", error);
    throw error;
  }
};

export const deleteCarRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  carId: number,
) => {
  const { error } = await supabase.from("cars").delete().eq("id", carId);

  if (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

// facebook

export const insertFbPostRecord = async (
  supabase: SupabaseClient<any, "public", any>,
  carId: number,
  postId: string,
  postLink?: string,
) => {
  const { data: fbPostRecord, error } = await supabase
    .from("facebook_posts")
    .insert({ id: postId, car_id: carId, link: postLink })
    .select()
    .single();

  if (error) {
    console.error("Error inserting facebook post id:", error);
    throw error;
  }

  return fbPostRecord.id as string;
};

export const insertMediaId = async (
  supabase: SupabaseClient<any, "public", any>,
  fbPostRecordId: string,
  mediaId: string,
) => {
  const { error } = await supabase
    .from("facebook_media")
    .insert({ id: mediaId, fb_post_id: fbPostRecordId });

  if (error) {
    console.error("Error inserting facebook media:", error);
    throw error;
  }
};
