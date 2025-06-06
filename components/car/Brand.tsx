"use client";

import Image from "next/image";
import React from "react";

const Brand = ({
  brand,
  large = false,
}: {
  brand: string;
  large?: boolean;
}) => {
  // todo: show nothing if brand not found

  return (
    <Image
      src={`/logos/cars/${brand}.svg`}
      width={large ? 32 : 25}
      height={large ? 32 : 25}
      alt={brand}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/logos/cars/default.svg";
      }}
      className="-mr-1 translate-y-px"
    />
  );
};

export default Brand;
