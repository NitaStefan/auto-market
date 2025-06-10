import { oswald } from "@/app/fonts";
import { Image, Phone } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="bg-primary mx-auto max-w-4xl rounded-md p-6 text-white shadow-md">
      <h1 className={`text-3xl ${oswald.className}`}>
        <span className="whitespace-nowrap">Servicii Profesionale</span>{" "}
        <span className="whitespace-nowrap">de Tractări Auto</span>
      </h1>
      <div className="flex justify-between gap-10 pt-10">
        <div>
          <p className="max-w-120 font-medium">
            Servicii de tractare rapidă, fiabile și accesibile pentru toate
            tipurile de vehicule. Suntem la doar un apel telefonic distanță
            atunci când aveți nevoie de asistență.
          </p>
          {/* CONTACT */}
          <a
            href="tel:0744227641"
            className="mt-10 flex w-fit items-center gap-4 rounded-2xl bg-black/20 px-8 py-5"
          >
            <Phone size={32} strokeWidth={2} />
            <div className="pr-2.5">
              <p className="text-sm text-gray-300">Sună acum la</p>
              <p className="text-lg font-medium">0744 227 641</p>
            </div>
          </a>
        </div>

        <Image
          strokeWidth={0.25}
          className="hidden shrink-0 rounded-lg border md:block"
          size={300}
        />
      </div>
    </div>
  );
};

export default Page;
