"use client";

import { normalizeBrand } from "@/utils/format-utils";
import Image from "next/image";
import React from "react";

const Brand = ({
  brand,
  large = false,
}: {
  brand: string;
  large?: boolean;
}) => {
  return (
    <Image
      src={`/logos/cars/${normalizeBrand(brand)}.svg`}
      width={large ? 26 : 20}
      height={large ? 26 : 20}
      alt={brand}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/logos/cars/default.svg";
      }}
      className="translate-y-px"
    />
  );
};

export default Brand;
