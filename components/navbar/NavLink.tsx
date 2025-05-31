import { cn } from "@/lib/utils";
import { Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavLink = ({
  to,
  isActive,
}: {
  to: "/masini" | "/tractari";
  isActive: boolean;
}) => {
  return (
    <Link
      href={to}
      className={cn(
        "flex items-center gap-1.5 rounded-md border px-4 py-2",
        isActive && "bg-primary/8 text-primary border-none",
      )}
    >
      {to === "/masini" ? (
        <>
          <Car size={20} />
          <span>
            Mașini second-hand <span className="text-txt-secondary-300">/</span>{" "}
            dezmembrări
          </span>
        </>
      ) : (
        <>
          {isActive ? (
            <Image
              src="/icons/tractari-active.svg"
              alt="tractari icon"
              width={18}
              height={18}
            />
          ) : (
            <Image
              src="/icons/tractari.svg"
              alt="tractari icon"
              width={14}
              height={14}
            />
          )}

          <span>Tractări auto</span>
        </>
      )}
    </Link>
  );
};

export default NavLink;
