import CarNotFound from "@/components/car/basic/CarNotFound";
import CarDetailed from "@/components/car/detailed/CarDetailed";
import CarDialog from "@/components/CarDialog";
import { getCarById } from "@/lib/actions/app/actions";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const car = await getCarById(Number(id));

  if (!car) return <CarNotFound />;

  return (
    <div>
      <CarDialog dbCar={car} />
      <CarDetailed car={car} />
    </div>
  );
};

export default Page;
