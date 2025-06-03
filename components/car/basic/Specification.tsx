import { MasinaRecord, Specs } from "@/types/app-types";
import { formatLabel, formatSpecName } from "@/utils/format-utils";
import React from "react";
import SpecificationIcon from "./SpecificationIcon";
import { cn } from "@/lib/utils";
import { convertCpToKw } from "@/utils/utils";

const Specification = ({
  car,
  detailed = false,
}: {
  car: MasinaRecord;
  detailed?: boolean;
}) => {
  const fieldMap: [Specs, string | undefined][] = [
    ["an", car.an?.toString()],
    ["motorizare", car.motorizare],
    ["tip_combustibil", car.tip_combustibil],
    ["kilometraj", car.kilometraj?.toLocaleString()],
    ["cutie_viteze", car.cutie_viteze],
    ["cai_putere", car.cai_putere?.toString()],
    ["euro_poluant", car.euro_poluant],
  ];

  const displayedFields = fieldMap
    .filter(([, value]) => !!value)
    .slice(0, detailed ? undefined : 4);

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-1 py-4 sm:py-5",
        detailed && "gap-5 py-10 sm:py-10",
      )}
    >
      {displayedFields.map(([label, value]) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-x-1 px-2",
            detailed && "flex-col items-start",
          )}
        >
          <div className="flex items-center gap-1">
            <SpecificationIcon spec={label} lg={detailed} />
            {detailed && (
              <span className="text-txt-secondary-300 text-sm sm:text-base">
                {formatSpecName(label)}
              </span>
            )}
          </div>

          <span
            className={cn(
              "text-txt-secondary-600 text-sm sm:text-base",
              detailed && "text-base text-black sm:text-lg",
            )}
          >
            {formatLabel(value)} {label === "cai_putere" && "CP"}
            {label === "kilometraj" && "km"}
            {label === "cai_putere" && detailed ? (
              <span className="pl-1 text-sm sm:text-base">
                ({convertCpToKw(Number(value))} kW)
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Specification;
