import { Masina, MasinaRecord } from "@/types"
import { Button } from "../../ui/button"
import ImagePreviews from "../../ImagePreviews"
import DetailsTextarea from "./DetailsTextarea"
import AddCar from "./car-management/AddCar"
import DeleteCar from "./car-management/DeleteCar"
import UpdateCar from "./car-management/UpdateCar"

const FinishCarPost = ({
  car,
  handleSetDetails,
  imageFiles,
  goToSpecifications,
}: {
  car: Masina
  handleSetDetails: (detalii: string) => void
  imageFiles: File[]
  goToSpecifications: () => void
}) => {
  return (
    <div>
      <Button variant="outline" onClick={goToSpecifications}>
        Intoarce-te la specificatii
      </Button>
      <h1 className="text-2xl">Finalizeaza postarea</h1>

      <ImagePreviews imageFiles={imageFiles} imageUrls={car?.car_images} />

      <p className="px-2 bg-blue-100 text-blue-700">
        {car.post_id ? "Postat pe fb" : "Nepostat pe fb"}
      </p>
      <DetailsTextarea
        detalii={car.detalii}
        handleSetDetails={handleSetDetails}
      />

      <div>
        {car.id ? (
          <div>
            <div className="h-2 bg-gray-200 my-2"></div>
            <DeleteCar car={car as MasinaRecord} />
            <UpdateCar car={car as MasinaRecord} imageFiles={imageFiles} />
          </div>
        ) : (
          <AddCar car={car} imageFiles={imageFiles} />
        )}
      </div>

      <pre className="text-sm">{JSON.stringify(car, null, 2)}</pre>
    </div>
  )
}

export default FinishCarPost
