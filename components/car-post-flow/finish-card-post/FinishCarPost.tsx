import { Masina, MasinaRecord } from "@/types/app-types"
import { Button } from "../../ui/button"
import ImagePreviews from "../../ImagePreviews"
import DetailsTextarea from "./DetailsTextarea"
import AddCar from "./car-management/AddCar"
import ModifyPost from "./car-management/ModifyPost"
import { ArrowLeft } from "lucide-react"

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
      <button
        onClick={goToSpecifications}
        className="underline hover:text-black text-txt-secondary-600 px-0 text-sm flex items-center cursor-pointer"
      >
        <ArrowLeft size={16} /> <span className="pl-1">la specificații</span>
      </button>
      <h1 className="text-2xl">Finalizeaza postarea</h1>

      <ImagePreviews imageFiles={imageFiles} imageUrls={car?.car_images} />

      <p className="px-2 bg-blue-100 text-blue-700">
        {car.facebook_posts?.id ? "Postat pe fb" : "Nepostat pe fb"}
      </p>
      <DetailsTextarea
        detalii={car.detalii}
        handleSetDetails={handleSetDetails}
      />

      {car.id ? (
        <ModifyPost car={car as MasinaRecord} imageFiles={imageFiles} />
      ) : (
        <AddCar car={car} imageFiles={imageFiles} />
      )}
    </div>
  )
}

export default FinishCarPost
