import { imagePathFormat } from "@/utils/format-utils";
import { createClient } from "@/utils/supabase/client";

export const uploadCarImages = async (
  images: File[],
  carId: number,
  version = 0,
) => {
  const supabase = createClient();

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
