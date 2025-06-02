"use client";

import { normalizeBrand } from "@/utils/format-utils";
import Image from "next/image";
import React from "react";

const Brand = ({ brand }: { brand: string }) => {
  return (
    <Image
      src={`/logos/cars/${normalizeBrand(brand)}.svg`}
      width={28}
      height={28}
      alt={brand}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/logos/cars/default.svg";
      }}
    />
  );
};

export default Brand;
