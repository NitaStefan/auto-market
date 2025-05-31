import { Masina, MasinaRecord } from "@/types/app-types";
import { Button } from "../../ui/button";
import ImagePreviews from "../../ImagePreviews";
import DetailsTextarea from "./DetailsTextarea";
import AddCar from "./car-management/AddCar";
import ModifyPost from "./car-management/ModifyPost";
import { ArrowLeft } from "lucide-react";

const FinishCarPost = ({
  car,
  handleSetDetails,
  imageFiles,
  goToSpecifications,
}: {
  car: Masina;
  handleSetDetails: (detalii: string) => void;
  imageFiles: File[];
  goToSpecifications: () => void;
}) => {
  return (
    <div className="pr-3.5 pl-1">
      <button
        onClick={goToSpecifications}
        className="text-txt-secondary-600 flex cursor-pointer items-center px-0 text-sm underline hover:text-black"
      >
        <ArrowLeft size={16} /> <span className="pl-1">la specificații</span>
      </button>

      <ImagePreviews imageFiles={imageFiles} imageUrls={car?.car_images} />

      <p className="bg-blue-100 px-2 text-blue-700">
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
  );
};

export default FinishCarPost;
