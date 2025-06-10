import { MasinaRecord } from "@/types/app-types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { archivo, oswald } from "@/app/fonts";
import ImageCarousel from "./ImageCarousel";
import Brand from "./Brand";
import Engagement from "./Engagement";
import Specification from "./Specification";
import { Button } from "../ui/button";
import { CAR_BRANDS, CarBrandKey } from "@/utils/constants";
import ForAdmin from "../ForAdmin";
import { Suspense } from "react";

const Car = ({ car }: { car: MasinaRecord }) => {
  const isOnFb = car.facebook_posts?.id ? true : false;

  return (
    <div className="relative rounded-md bg-white shadow-sm">
      <ImageCarousel
        carImages={car.car_images}
        alt={`${car.marca} ${car.model}`}
      />
      <div className={`px-5 pt-2 pb-13 sm:pb-14 ${oswald.className}`}>
        {/* Title */}
        <div className="relative flex items-center gap-2 text-xl">
          <Brand brand={car.marca} />
          <span className="truncate font-light whitespace-nowrap">
            {CAR_BRANDS[car.marca as CarBrandKey]}
          </span>{" "}
          <span className="whitespace-nowrap">{car.model}</span>
          {/* Show if posted on fb */}
          <Suspense>
            <ForAdmin>
              <Image
                src={`/logos/facebook${isOnFb ? "" : "-black"}.svg`}
                width={22}
                height={22}
                alt="facebook"
                className={cn("-mr-2 ml-auto", !isOnFb && "opacity-50")}
              />
              {isOnFb && <Engagement postId={car.facebook_posts?.id} />}
            </ForAdmin>
          </Suspense>
        </div>
        {/* vanzare / dezmembrari */}
        <div className="text-primary pt-1 text-lg">
          {car.tip === "vanzare" ? (
            <p className="flex items-center">
              <span>€ {car.pret?.toLocaleString("ro-RO")}</span>
              {car.negociabil && (
                <span
                  className={`text-txt-secondary-300 ml-2 text-sm ${archivo.className}`}
                >
                  • negociabil
                </span>
              )}
            </p>
          ) : (
            <span>Dezmembrare pe piese</span>
          )}
        </div>

        <Specification car={car} />

        <Button
          asChild
          className={`absolute bottom-4 w-[calc(100%-2.5rem)] text-[15px] sm:bottom-5 ${archivo.className}`}
        >
          <Link href={`/masini/${car.id}`}>Vezi detalii</Link>
        </Button>
      </div>
    </div>
  );
};

export default Car;
