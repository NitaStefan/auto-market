import { MasinaRecord } from "@/types/app-types";
import ImageCarousel from "../ImageCarousel";
import Brand from "../Brand";
import { archivo, oswald } from "@/app/fonts";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Specification from "../Specification";
import Engagement from "../Engagement";

const Car = ({ car }: { car: MasinaRecord }) => {
  const isOnFb = car.facebook_posts?.id ? true : false;

  return (
    <div className="relative rounded-md bg-white shadow-sm">
      <ImageCarousel
        carImages={car.car_images}
        alt={`${car.marca} ${car.model}`}
      />
      <div className={`px-5 pt-2 pb-13 sm:pb-14 ${oswald.className}`}>
        {/* Title */}
        <div className="relative flex items-center gap-2 text-xl">
          <Brand brand={car.marca} />
          <span className="font-light">{car.marca}</span> {car.model}
          {/* Show if posted on fb */}
          <Image
            src={`/logos/facebook${isOnFb ? "" : "-black"}.svg`}
            width={22}
            height={22}
            alt="facebook"
            className={cn("ml-auto", !isOnFb && "opacity-50")}
          />
          {isOnFb && <Engagement />}
        </div>
        {/* Price or dismantling */}
        <div className="text-primary pt-1 text-lg">
          {car.tip === "vanzare" ? (
            <p className="flex items-center">
              <span>€ {car.pret?.toLocaleString("ro-RO")}</span>
              {car.negociabil && (
                <span
                  className={`text-txt-secondary-300 ml-2 text-sm ${archivo.className}`}
                >
                  • negociabil
                </span>
              )}
            </p>
          ) : (
            <span>Dezmembrare pe piese</span>
          )}
        </div>

        <Specification car={car} />

        <Button
          asChild
          className={`absolute bottom-4 w-[calc(100%-2.5rem)] text-[15px] sm:bottom-5 ${archivo.className}`}
        >
          <Link href={`/masini/${car.id}`}>Vezi detalii</Link>
        </Button>
      </div>
    </div>
  );
};

export default Car;
