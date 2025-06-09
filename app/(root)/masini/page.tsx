import { getCarBrands, getCars } from "@/lib/actions/app/actions";
import { unstable_cache } from "next/cache";
import Car from "@/components/car/Car";
import FacebookOauth from "@/components/facebook/FacebookOauthAlert";
import CarFilters from "@/components/car/CarFilters";
import CarDialog from "@/components/CarDialog";
import ForAdmin from "@/components/ForAdmin";
import { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  // const cars = await unstable_cache(async () => await getCars())();

  const [differentBrands, filters] = await Promise.all([
    getCarBrands(),
    searchParams,
  ]);

  const cars = await getCars(filters);

  return (
    <>
      {/* <FacebookOauth /> */}
      <CarFilters brands={differentBrands} />
      <Suspense>
        <ForAdmin>
          <CarDialog />
        </ForAdmin>
      </Suspense>

      {cars?.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {cars.map((car) => (
            <Car car={car} key={car.id} />
          ))}
        </div>
      ) : (
        <p>Nicio mașină găsită</p>
      )}
    </>
  );
};

export default Page;
