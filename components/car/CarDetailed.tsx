import { MasinaRecord } from "@/types/app-types";
import React, { Suspense } from "react";
import ImageCarousel from "./ImageCarousel";
import { archivo, oswald } from "@/app/fonts";
import { ChevronLeft } from "lucide-react";
import Specification from "./Specification";
import Link from "next/link";
import CarTitle from "./CarTitle";
import ContactButtons from "./ContactButtons";
import CarDialog from "../CarDialog";
import ForAdmin from "../ForAdmin";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CarDetailed = ({ car }: { car: MasinaRecord }) => {
  const isOnFb = Boolean(car.facebook_posts?.id);

  return (
    <>
      <div className="translate-y-12">
        <Suspense>
          <ForAdmin>
            <CarDialog dbCar={car} />
          </ForAdmin>
        </Suspense>
      </div>
      <div className="relative mt-10 mb-20 flex flex-col rounded-md bg-white shadow-md lg:flex-row">
        <div className="w-full shrink-0 lg:w-150">
          <ImageCarousel
            carImages={car.car_images}
            alt={`${car.marca} ${car.model}`}
            forDetailedView
          />
          <div className="relative flex flex-col gap-8 px-4 pt-10 md:px-10 lg:px-6">
            <Suspense>
              <ForAdmin>
                <div
                  className={cn(
                    "absolute top-0 flex gap-1 rounded-b-lg border-2 border-t-0 px-1.5 text-sm",
                    !isOnFb && "opacity-70",
                  )}
                >
                  <Image
                    src={`/logos/facebook${isOnFb ? "" : "-black"}.svg`}
                    width={16}
                    height={16}
                    alt="facebook"
                  />
                  <p className="rounded-lg italic">
                    {isOnFb ? "postat" : "nepostat"}
                  </p>
                </div>
              </ForAdmin>
            </Suspense>

            <CarTitle
              marca={car.marca}
              model={car.model}
              pret={car.pret}
              tip={car.tip}
              negociabil={car.negociabil}
            />
            <div className="bg-txt-secondary-300 mx-3 hidden h-px lg:block" />
            <ContactButtons car={car} />
          </div>
        </div>
        {/* SECOND PART */}
        <div className={`grow px-6 md:px-14 lg:px-6 ${oswald.className}`}>
          <Specification car={car} detailed />
          {car.detalii && (
            <div className={`pb-10 whitespace-pre-line ${archivo.className}`}>
              {car.detalii}
            </div>
          )}
        </div>
        {/* GO BACK */}
      </div>
      <ContactButtons fixed car={car} />
      <Link
        href="/masini"
        className="text-txt-secondary-600 absolute top-8 flex items-center hover:text-black"
      >
        <ChevronLeft /> Toate mașinile
      </Link>
    </>
  );
};

export default CarDetailed;
