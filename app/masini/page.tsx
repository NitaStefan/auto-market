import CarDialog from "@/components/CarDialog";
import { getCars } from "@/lib/actions/app/actions";
import { unstable_cache } from "next/cache";
import Car from "@/components/car/basic/Car";
import FacebookOauth from "@/components/facebook/FacebookOauth";

const Page = async () => {
  // const cars = await unstable_cache(async () => await getCars())();
  const cars = await getCars();

  return (
    <>
      {/* <FacebookOauth /> */}

      <CarDialog />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {cars.map((car) => (
          <Car car={car} key={car.id} />
        ))}
      </div>
      <pre className="overflow-x-hidden">{JSON.stringify(cars, null, 2)}</pre>
    </>
  );
};

export default Page;
