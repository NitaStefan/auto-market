import { MasinaRecord, Specs } from "@/types/app-types";
import { formatLabel } from "@/utils/format-utils";
import React from "react";
import SpecificationIcon from "./SpecificationIcon";

const ShortSpecification = ({ car }: { car: MasinaRecord }) => {
  const fieldMap: [Specs, string | undefined][] = [
    ["an", car.an?.toString()],
    ["motorizare", car.motorizare],
    ["tip_combustibil", car.tip_combustibil],
    ["kilometraj", car.kilometraj?.toLocaleString()],
    ["cutie_viteze", car.cutie_viteze],
    ["cai_putere", car.cai_putere?.toString()],
    ["euro_poluant", car.euro_poluant],
  ];

  const displayedFields = fieldMap.filter(([, value]) => !!value).slice(0, 4);

  return (
    <div className="grid grid-cols-2 gap-1 py-4 sm:py-5">
      {displayedFields.map(([label, value]) => (
        <div key={label} className="flex items-center gap-1 px-2">
          <SpecificationIcon spec={label} />
          <span className="text-txt-secondary-600 text-sm sm:text-base">
            {formatLabel(value)} {label === "cai_putere" && "CP"}
            {label === "kilometraj" && "km"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ShortSpecification;
