import { MasinaRecord } from "@/types/app-types";
import ImageCarousel from "./ImageCarousel";

const Car = ({ car }: { car: MasinaRecord }) => {
  return (
    <div className="group rounded-md bg-white">
      <ImageCarousel
        carImages={car.car_images}
        alt={`${car.marca} ${car.model}`}
      />
      {car.model}
    </div>
  );
};

export default Car;
