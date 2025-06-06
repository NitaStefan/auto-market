import React from "react";
import Brand from "./Brand";
import { CAR_BRANDS, CarBrandKey } from "@/utils/constants";
import { archivo, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";

const CarTitle = ({
  marca,
  model,
  pret,
  negociabil,
  tip,
  noGapY = false,
}: {
  marca: string;
  model: string;
  pret?: number;
  tip: string;
  negociabil?: boolean;
  noGapY?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-between gap-x-3 gap-y-1",
        noGapY && "gap-y-0",
      )}
    >
      <div
        className={`flex items-center gap-2 text-xl md:text-2xl ${oswald.className}`}
      >
        <Brand brand={marca} large />
        <span>{CAR_BRANDS[marca as CarBrandKey]}</span>
        <span className="font-medium">{model}</span>
      </div>
      <div className={`text-primary text-xl md:text-2xl ${oswald.className}`}>
        {tip === "vanzare" ? (
          <p className="flex items-center">
            <span>€ {pret?.toLocaleString("ro-RO")}</span>
            {negociabil && (
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
  );
};

export default CarTitle;
