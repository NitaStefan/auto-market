import { Masina, MasinaRecord } from "@/types/app-types";
import DetailsTextarea from "./DetailsTextarea";
import AddCar from "./car-management/AddCar";
import ModifyPost from "./car-management/ModifyPost";
import { ArrowLeft } from "lucide-react";
import ImageCarousel from "@/components/car/ImageCarousel";
import Specification from "@/components/car/Specification";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CarTitle from "@/components/car/CarTitle";

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
  const isOnFb = Boolean(car.facebook_posts?.id);

  return (
    <div className="pr-3.5 pl-1">
      <div className="flex items-end justify-between pr-1">
        <button
          onClick={goToSpecifications}
          className="text-txt-secondary-600 flex cursor-pointer items-center px-0 pb-2 text-sm underline hover:text-black"
        >
          <ArrowLeft size={16} /> <span className="pl-1">la specificații</span>
        </button>
        <div
          className={cn(
            "flex gap-1 rounded-t-lg border-2 border-b-0 px-1.5 text-sm",
            !isOnFb && "opacity-70",
          )}
        >
          <Image
            src={`/logos/facebook${isOnFb ? "" : "-black"}.svg`}
            width={16}
            height={16}
            alt="facebook"
          />
          <p className="rounded-lg italic">{isOnFb ? "postat" : "nepostat"}</p>
        </div>
      </div>

      <ImageCarousel
        carImages={car.car_images ?? []}
        alt={`${car.marca} ${car.model}`}
        imageFiles={imageFiles}
        roundedAll
      />

      {/* CAR TITLE */}
      <div className="pt-1.5">
        <CarTitle
          marca={car.marca}
          model={car.model}
          pret={car.pret}
          tip={car.tip}
          negociabil={car.negociabil}
          noGapY
        />
      </div>

      <Specification car={car} detailed compact />

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
