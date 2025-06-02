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

const ImageCarousel = ({
  carImages,
  alt,
}: {
  carImages: { path: string }[];
  alt: string;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  return (
    <Carousel className="group" setApi={setApi}>
      <CarouselContent className="ml-0">
        {carImages.map((image) => (
          <CarouselItem key={image.path} className="relative h-60 w-full pl-0">
            <Image
              src={CAR_IMAGES_BUCKET_URL + image.path}
              fill
              alt={alt}
              className="rounded-t-md object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className={`absolute bottom-1 left-1 rounded-lg bg-black/20 px-1.5 py-0.5 text-xs font-medium text-white ${oswald.className}`}
      >
        {current} / {count}
      </div>
      <CarouselPrevious className="left-1 hidden group-hover:inline-flex" />
      <CarouselNext className="right-1 hidden group-hover:inline-flex" />
    </Carousel>
  );
};

export default ImageCarousel;
