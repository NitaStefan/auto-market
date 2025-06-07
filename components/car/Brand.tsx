"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Brand = ({
  brand,
  large = false,
}: {
  brand: string;
  large?: boolean;
}) => {
  const [isValid, setIsValid] = useState(false);

  const path = `/logos/cars/${brand}.svg`;

  useEffect(() => {
    const img = new window.Image();
    img.src = path;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, []);

  if (!isValid) return null;

  return (
    <Image
      src={path}
      width={large ? 32 : 25}
      height={large ? 32 : 25}
      alt={brand}
      className="-mr-1 translate-y-px"
    />
  );
};

export default Brand;
