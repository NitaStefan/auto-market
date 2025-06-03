import { MasinaRecord } from "@/types/app-types";
import React from "react";
import ImageCarousel from "../ImageCarousel";
import Brand from "../Brand";
import { archivo, oswald } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Phone } from "lucide-react";
import Specification from "../basic/Specification";

const CarDetailed = ({ car }: { car: MasinaRecord }) => {
  return (
    <div className="mb-20 flex flex-col rounded-md bg-white pb-10 shadow-md lg:flex-row">
      <div className="w-full shrink-0 lg:w-150">
        <ImageCarousel
          carImages={car.car_images}
          alt={`${car.marca} ${car.model}`}
          forDetailedView
        />
        <div className="flex flex-col gap-8 px-6 pt-10 md:px-10 lg:px-6">
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <div
              className={`flex items-center gap-2 text-xl md:text-2xl ${oswald.className}`}
            >
              <Brand brand={car.marca} large />
              <span>{car.marca}</span>
              <span className="font-medium">{car.model}</span>
            </div>
            <div
              className={`text-primary text-xl font-medium md:text-2xl ${oswald.className}`}
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
          <div className="bg-secondary-800 fixed bottom-0 left-1/2 flex w-[min(640px,100vw)] -translate-x-1/2 items-center gap-4 p-2 px-4 sm:rounded-t-md lg:static lg:w-full lg:translate-x-0 lg:bg-transparent lg:p-0">
            <Button className="bg-secondary-400 hover:bg-secondary-400/90 flex flex-1 items-center">
              Trimite un mesaj
              <Image
                src="/logos/whatsapp.svg"
                width={18}
                height={18}
                alt="message icon"
              />
            </Button>
            <span className="text-txt-secondary-300">sau</span>
            <Button className="bg-secondary-400 hover:bg-secondary-400/90 flex-1">
              Sună la <Phone /> 0744 227 641
            </Button>
          </div>
        </div>
      </div>
      {/* SECOND PART */}
      <div className={`grow px-6 md:px-14 lg:px-6 ${oswald.className}`}>
        <Specification car={car} detailed />
        <div className={`pt-2 whitespace-pre-line ${archivo.className}`}>
          {car.detalii}
        </div>
      </div>
    </div>
  );
};

export default CarDetailed;
