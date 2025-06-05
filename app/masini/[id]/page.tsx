import CarDetailed from "@/components/car/CarDetailed";
import CarNotFound from "@/components/car/CarNotFound";
import CarDialog from "@/components/CarDialog";
import { getCarById } from "@/lib/actions/app/actions";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const car = await getCarById(Number(id));

  if (!car) return <CarNotFound />;

  return (
    <>
      <CarDialog dbCar={car} />
      <CarDetailed car={car} />
    </>
  );
};

export default Page;
