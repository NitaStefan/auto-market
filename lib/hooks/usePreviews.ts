import { useEffect, useState } from "react";

export function useImagePreviews(imageFiles: File[]): string[] {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  return previews;
}
