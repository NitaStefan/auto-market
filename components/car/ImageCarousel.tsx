"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { CAR_IMAGES_BUCKET_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import { oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";
import { useImagePreviews } from "@/lib/hooks/usePreviews";

const ImageCarousel = ({
  carImages,
  alt,
  forDetailedView = false,
  imageFiles = [],
  roundedAll = false,
}: {
  carImages: { path: string }[];
  alt: string;
  forDetailedView?: boolean;
  imageFiles?: File[];
  roundedAll?: boolean;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const previews = useImagePreviews(imageFiles);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carImagesToUse =
    previews.length > 0
      ? previews
      : carImages.map((image) => CAR_IMAGES_BUCKET_URL + image.path);

  return (
    <Carousel className="group" setApi={setApi}>
      <CarouselContent className="ml-0">
        {carImagesToUse.map((image) => (
          <CarouselItem
            key={image}
            className={cn(
              "relative h-60 w-full pl-0",
              forDetailedView && "h-[55vw] lg:h-100",
            )}
          >
            <Image
              src={image}
              fill
              alt={alt}
              className={cn(
                "rounded-t-md object-cover",
                forDetailedView && "lg:rounded-tr-none lg:rounded-br-md",
                roundedAll && "rounded-md",
              )}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {forDetailedView ? (
        <div className="text-txt-secondary-300 absolute left-1/2 flex -translate-x-1/2 items-center gap-1 pt-2 text-sm sm:text-base">
          <ImageIcon size={16} />
          <span>
            {current} din {count}{" "}
          </span>
        </div>
      ) : (
        <div
          className={`absolute bottom-1 left-1 rounded-lg bg-black/20 px-1.5 py-0.5 text-xs font-medium text-white ${oswald.className}`}
        >
          {current} / {count}
        </div>
      )}

      {count > 1 && (
        <>
          <CarouselPrevious
            className={cn(
              "left-1 bg-gray-800 text-white",
              !forDetailedView && "hidden group-hover:inline-flex",
            )}
          />
          <CarouselNext
            className={cn(
              "right-1 bg-gray-800 text-white",
              !forDetailedView && "hidden group-hover:inline-flex",
            )}
          />
        </>
      )}
    </Carousel>
  );
};

export default ImageCarousel;
