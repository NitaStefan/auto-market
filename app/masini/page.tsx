import CarDialog from "@/components/CarDialog";
import { CAR_IMAGES_BUCKET_URL } from "@/utils/constants";
import { getCars } from "@/lib/actions/app/actions";
import { unstable_cache } from "next/cache";

const Page = async () => {
  // const cars = await unstable_cache(async () => await getCars())();
  const cars = await getCars();

  return (
    <>
      <CarDialog />
      <div>
        <h1 className="text-2xl underline">Toate masinile din baza de date</h1>

        {cars.map((car) => (
          <div key={car.id} className="mb-8">
            <p>
              {car.marca} {car.model} - id:{car.id}
              {car.facebook_posts?.id && (
                <span className="pl-2 text-lg font-medium text-blue-800">
                  (fb)
                </span>
              )}
            </p>
            <CarDialog dbCar={car} />

            <div className="flex flex-wrap gap-4">
              {car.car_images.map((image, index) => (
                <img
                  key={index}
                  src={CAR_IMAGES_BUCKET_URL + image.path}
                  alt={`${car.marca} ${car.model}`}
                  className="h-32 w-48 rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        ))}

        <pre className="overflow-x-hidden">{JSON.stringify(cars, null, 2)}</pre>
      </div>
    </>
  );
};

export default Page;
