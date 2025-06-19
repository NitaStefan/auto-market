import CarDetailed from "@/components/car/CarDetailed";
import CarNotFound from "@/components/car/CarNotFound";
import { getCarById } from "@/lib/actions/app/actions";
import {
  CAR_BRANDS,
  CAR_IMAGES_BUCKET_URL,
  CarBrandKey,
} from "@/utils/constants";
import { formatLabel } from "@/utils/format-utils";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(Number(id));

  // Handle case when car is not found
  if (!car) {
    return {
      title: "Mașina nu există",
      description: "Mașina căutată nu a fost găsită.",
    };
  }

  const forSale = car.tip === "vanzare";

  const ogTitle = `${forSale ? "" : "Dezmembrez "}${CAR_BRANDS[car.marca as CarBrandKey]} ${car.model}, ${car.an}${forSale ? ` - €${car.pret}${car.negociabil ? " (negociabil)" : ""}` : ""} | autodac.ro`;
  const ogDescription = [
    car.motorizare,
    car.tip_combustibil ? formatLabel(car.tip_combustibil) : undefined,
    car.kilometraj ? `${car.kilometraj} km` : undefined,
    car.cutie_viteze
      ? `Cutie ${car.cutie_viteze === "automata" ? "automată" : "manuală"}`
      : undefined,
    car.cai_putere ? `${car.cai_putere} CP` : undefined,
    car.euro_poluant ? `${formatLabel(car.euro_poluant)}` : undefined,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: `${CAR_BRANDS[car.marca as CarBrandKey]} ${car.model}, ${car.an}`,
    description: "Descriereaaa",
    keywords: [car.marca, car.model, "mașină"],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: CAR_IMAGES_BUCKET_URL + car.car_images[0].path,
          alt: `${car.marca} ${car.model} ${car.an}`,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/masini/${id}`,
      type: "website",
      siteName: "AutoDac",
    },
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const car = await getCarById(Number(id));

  if (!car) return <CarNotFound />;

  return <CarDetailed car={car} />;
};

export default Page;
