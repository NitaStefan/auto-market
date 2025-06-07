"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { generateWhatsAppLink } from "@/utils/format-utils";
import { CAR_BRANDS, CarBrandKey } from "@/utils/constants";
import Image from "next/image";
import { Phone } from "lucide-react";
import { MasinaRecord } from "@/types/app-types";
import { cn } from "@/lib/utils";

const ContactButtons = ({
  car,
  fixed,
}: {
  car: MasinaRecord;
  fixed?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    handleResize();

    window.addEventListener("resize", handleResize);

    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isSmallScreen && !isVisible && !fixed) return null;

  return (
    <div
      className={cn(
        "bg-secondary-800 fixed bottom-0 left-1/2 z-10 flex w-[min(640px,100vw)] -translate-x-1/2 items-center gap-4 p-2 px-4 sm:rounded-t-md lg:static lg:w-full lg:translate-x-0 lg:bg-transparent lg:p-0 lg:pb-10",
        fixed && "absolute bottom-0 z-5 lg:hidden",
      )}
    >
      <Button
        asChild
        className="bg-secondary-400 hover:bg-secondary-400/90 flex flex-1 items-center"
      >
        <a
          href={generateWhatsAppLink(
            `${CAR_BRANDS[car.marca as CarBrandKey]} ${car.model}${car.an ? ` (anul ${car.an})` : ""}`,
            car.tip,
            car.id,
          )}
          target="_blank"
        >
          Trimite un mesaj
          <Image
            src="/logos/whatsapp.svg"
            width={18}
            height={18}
            alt="message icon"
          />
        </a>
      </Button>
      <span className="text-txt-secondary-300">sau</span>
      <Button
        asChild
        className="bg-secondary-400 hover:bg-secondary-400/90 flex-1"
      >
        <a href="tel:0744227641">
          Sună la <Phone /> 0744 227 641
        </a>
      </Button>
    </div>
  );
};

export default ContactButtons;
