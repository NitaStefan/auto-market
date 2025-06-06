import { MasinaRecord } from "@/types/app-types";
import React from "react";
import ImageCarousel from "./ImageCarousel";
import Brand from "./Brand";
import { archivo, oswald } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, Phone } from "lucide-react";
import Specification from "./Specification";
import Link from "next/link";
import { generateWhatsAppLink } from "@/utils/format-utils";
import { CAR_BRANDS, CarBrandKey } from "@/utils/constants";

const CarDetailed = ({ car }: { car: MasinaRecord }) => {
  return (
    <div className="relative mt-10 mb-20 flex flex-col rounded-md bg-white shadow-md lg:flex-row">
      <div className="w-full shrink-0 lg:w-150">
        <ImageCarousel
          carImages={car.car_images}
          alt={`${car.marca} ${car.model}`}
          forDetailedView
        />
        <div className="flex flex-col gap-8 px-4 pt-10 md:px-10 lg:px-6">
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <div
              className={`flex items-center gap-2 text-xl md:text-2xl ${oswald.className}`}
            >
              <Brand brand={car.marca} large />
              <span>{CAR_BRANDS[car.marca as CarBrandKey]}</span>
              <span className="font-medium">{car.model}</span>
            </div>
            <div
              className={`text-primary text-xl md:text-2xl ${oswald.className}`}
            >
              {car.tip === "vanzare" ? (
                <p className="flex items-center">
                  <span>€ {car.pret?.toLocaleString("ro-RO")}</span>
                  {car.negociabil && (
                    <span
                      className={`text-txt-secondary-300 ml-1 text-sm md:ml-1.5 md:text-base ${archivo.className}`}
                    >
                      • negociabil
                    </span>
                  )}
                </p>
              ) : (
                <span>Dezmembrare pe piese</span>
              )}
            </div>
          </div>
          <div className="bg-txt-secondary-300 mx-3 hidden h-px lg:block" />
          <div className="bg-secondary-800 fixed bottom-0 left-1/2 flex w-[min(640px,100vw)] -translate-x-1/2 items-center gap-4 p-2 px-4 sm:rounded-t-md lg:static lg:w-full lg:translate-x-0 lg:bg-transparent lg:p-0 lg:pb-10">
            <Button
              asChild
              className="bg-secondary-400 hover:bg-secondary-400/90 flex flex-1 items-center"
            >
              <a
                href={generateWhatsAppLink(
                  `${CAR_BRANDS[car.marca as CarBrandKey]} ${car.model}${car.an ? ` (anul ${car.an})` : ""}`,
                  car.tip,
                  car.id,
                )}
                target="_blank"
              >
                Trimite un mesaj
                <Image
                  src="/logos/whatsapp.svg"
                  width={18}
                  height={18}
                  alt="message icon"
                />
              </a>
            </Button>
            <span className="text-txt-secondary-300">sau</span>
            <Button
              asChild
              className="bg-secondary-400 hover:bg-secondary-400/90 flex-1"
            >
              <a href="tel:0744227641">
                Sună la <Phone /> 0744 227 641
              </a>
            </Button>
          </div>
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
  );
};

export default CarDetailed;
