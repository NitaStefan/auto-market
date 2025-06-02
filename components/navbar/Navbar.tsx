"use client";

import Image from "next/image";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { oswald } from "@/app/fonts";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-background flex h-17 items-center justify-between rounded-b-sm px-6 shadow-xs">
      <div className="rounded-full border-3 p-1.5">
        <Image src="/logos/app.svg" alt="website logo" width={42} height={42} />
      </div>
      <div className={`hidden items-center gap-6 sm:flex ${oswald.className}`}>
        <NavLink to="/masini" isActive={pathname === "/masini"} />
        <NavLink to="/tractari" isActive={pathname === "/tractari"} />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="absolute bottom-1 left-1/2"></div>
        </PopoverAnchor>
        <PopoverTrigger className="cursor-pointer sm:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </PopoverTrigger>
        <PopoverContent
          onClick={() => setOpen(false)}
          className="flex w-screen flex-col gap-4 rounded-t-none px-0"
        >
          <NavLink to="/masini" isMobile isActive={pathname === "/masini"} />
          <NavLink
            to="/tractari"
            isMobile
            isActive={pathname === "/tractari"}
          />
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Navbar;
