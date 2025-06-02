"use client";

import Image from "next/image";
import React from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { oswald } from "@/app/fonts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-background flex h-17 items-center justify-between rounded-b-sm px-6 shadow-xs">
      <div className="rounded-full border-3 p-1.5">
        <Image src="/logos/app.svg" alt="website logo" width={42} height={42} />
      </div>
      <div className={`hidden items-center gap-6 sm:flex ${oswald.className}`}>
        <NavLink to="/masini" isActive={pathname === "/masini"} />
        <NavLink to="/tractari" isActive={pathname === "/tractari"} />
      </div>
      <Sheet>
        <SheetTrigger className="cursor-pointer sm:hidden">Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
