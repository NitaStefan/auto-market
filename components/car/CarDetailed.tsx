import { MasinaRecord } from "@/types/app-types";
import React from "react";
import ImageCarousel from "./ImageCarousel";
import { archivo, oswald } from "@/app/fonts";
import { ChevronLeft, Phone } from "lucide-react";
import Specification from "./Specification";
import Link from "next/link";
import CarTitle from "./CarTitle";
import ContactButtons from "./ContactButtons";

const CarDetailed = ({ car }: { car: MasinaRecord }) => {
  return (
    <>
      <div className="relative mt-10 mb-20 flex flex-col rounded-md bg-white shadow-md lg:flex-row">
        <div className="w-full shrink-0 lg:w-150">
          <ImageCarousel
            carImages={car.car_images}
            alt={`${car.marca} ${car.model}`}
            forDetailedView
          />
          <div className="flex flex-col gap-8 px-4 pt-10 md:px-10 lg:px-6">
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
        <Link
          href="/masini"
          className="text-txt-secondary-600 absolute -top-8 flex items-center hover:text-black"
        >
          <ChevronLeft /> Toate mașinile
        </Link>
      </div>
      <ContactButtons fixed car={car} />
    </>
  );
};

export default CarDetailed;
