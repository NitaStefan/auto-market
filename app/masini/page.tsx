import CarDialog from "@/components/CarDialog";
import { getCars } from "@/lib/actions/app/actions";
import { unstable_cache } from "next/cache";
import Car from "@/components/car/Car";

const Page = async () => {
  // const cars = await unstable_cache(async () => await getCars())();
  const cars = await getCars();

  return (
    <>
      <CarDialog />
      <div>
        <h1 className="text-2xl underline">Toate masinile din baza de date</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Car car={car} key={car.id} />
          ))}
        </div>
        <pre className="overflow-x-hidden">{JSON.stringify(cars, null, 2)}</pre>
      </div>
    </>
  );
};

export default Page;
