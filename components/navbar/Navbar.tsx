"use client";

import Image from "next/image";
import React from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { oswald } from "@/app/fonts";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-background flex h-17 items-center justify-between rounded-b-sm px-6 shadow-xs">
      <div className="rounded-full border-3 p-1.5">
        <Image src="/logos/app.svg" alt="website logo" width={42} height={42} />
      </div>
      <div className={`flex items-center gap-6 ${oswald.className}`}>
        <NavLink to="/masini" isActive={pathname === "/masini"} />
        <NavLink to="/tractari" isActive={pathname === "/tractari"} />
      </div>
    </nav>
  );
};

export default Navbar;
