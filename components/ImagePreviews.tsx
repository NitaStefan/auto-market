import { CAR_IMAGES_BUCKET_URL } from "@/utils/constants";
import { MasinaRecord } from "@/types/app-types";
import React, { useEffect, useState } from "react";

const ImagePreviews = ({
  imageFiles,
  imageUrls,
}: {
  imageFiles: File[];
  imageUrls?: MasinaRecord["car_images"];
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [imageFiles]);

  return (
    <div className="my-1 grid grid-cols-3 gap-x-2">
      {previews.length > 0
        ? previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="my-1 aspect-square w-full rounded border object-cover"
            />
          ))
        : imageUrls?.map((image, index) => (
            <img
              key={index}
              src={CAR_IMAGES_BUCKET_URL + image.path}
              alt={`preview-${index}`}
              className="aspect-square w-full rounded border object-cover"
            />
          ))}
    </div>
  );
};

export default ImagePreviews;
