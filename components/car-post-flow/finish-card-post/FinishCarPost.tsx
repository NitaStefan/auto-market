import { Masina, MasinaRecord } from "@/types"
import { Button } from "../../ui/button"
import ImagePreviews from "../../ImagePreviews"
import DetailsTextarea from "./DetailsTextarea"
import AddCar from "./car-management/AddCar"
import DeleteCar from "./car-management/DeleteCar"

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
    <div className="px-1">
      <Button variant="outline" onClick={goToSpecifications}>
        Intoarce-te la specificatii
      </Button>
      <h1 className="text-2xl">Finalizeaza postarea</h1>

      <ImagePreviews imageFiles={imageFiles} />

      <DetailsTextarea
        detalii={car.detalii}
        handleSetDetails={handleSetDetails}
      />

      <div>
        {car.id ? (
          <div>
            <p>Modifica sau sterge Masina</p>
            <DeleteCar car={car as MasinaRecord} />
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
