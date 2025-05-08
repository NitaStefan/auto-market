import CarDialog from "@/components/CarDialog"
import { CAR_IMAGES_BUCKET_URL } from "@/lib/constants"
import { MasinaRecord } from "@/types"
import { createClient } from "@/utils/supabase/server"

const Page = async () => {
  const supabase = await createClient()

  const { data: cars } = (await supabase.from("cars").select(`
    *,
    car_images (path)
  `)) as { data: MasinaRecord[] }

  console.log(cars)

  return (
    <>
      <CarDialog />
      <div>
        <h1 className="text-2xl underline">Toate masinile din baza de date</h1>

        {cars.map(car => (
          <div key={car.id} className="mb-8">
            <CarDialog dbCar={car} />

            <div className="flex flex-wrap gap-4">
              {car.car_images.map((image, index) => (
                <img
                  key={index}
                  src={CAR_IMAGES_BUCKET_URL + image.path}
                  alt={`${car.marca} ${car.model}`}
                  className="w-48 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        ))}

        <pre>{JSON.stringify(cars, null, 2)}</pre>
      </div>
    </>
  )
}

export default Page
