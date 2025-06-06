"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { CAR_BRANDS, CarBrandKey } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CarFilters = ({ brands }: { brands: { marca: CarBrandKey }[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [tip, setTip] = useState(searchParams.get("tip") || "toate");

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "toate" || value === "") params.delete(key);
    else params.set(key, value);

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    updateSearchParam("tip", tip);
  }, [tip]);

  //debounce
  let debounceTimer: NodeJS.Timeout;

  const debouncedUpdate = (key: string, value: string) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      updateSearchParam(key, value);
    }, 400);
  };

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:flex md:gap-4">
      <div className="hidden flex-col items-center pt-2 md:flex">
        <Filter />
        <span className="-mt-0.5 text-sm">Filtre</span>
      </div>
      <div>
        <Label className="font-light whitespace-nowrap">
          De vânzare / Dezmembrări
        </Label>
        <Select value={tip} onValueChange={setTip}>
          <SelectTrigger
            size="sm"
            className="w-full bg-white sm:w-full md:w-42 lg:w-48"
          >
            <SelectValue defaultValue="toate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toate">Toate</SelectItem>
            <SelectItem value="vanzare">De vânzare</SelectItem>
            <SelectItem value="dezmembrari">Dezmembrări</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="font-light">Marca</Label>
        <Select
          defaultValue={searchParams.get("marca") || "toate"}
          onValueChange={(value) => updateSearchParam("marca", value)}
        >
          <SelectTrigger
            size="sm"
            className="w-full bg-white sm:w-full md:w-42 lg:w-48"
          >
            <SelectValue defaultValue="toate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toate">Toate</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.marca} value={brand.marca}>
                {CAR_BRANDS[brand.marca]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {tip === "vanzare" && (
        <>
          <div className="relative flex flex-row items-center gap-2 md:flex-col md:items-start md:justify-end md:gap-1">
            <Label htmlFor="de-la" className="font-light whitespace-nowrap">
              De la
            </Label>
            <Input
              type="number"
              id="de-la"
              className="mb-0 grow pl-9 sm:w-30 md:grow-0"
              placeholder="oricât"
              defaultValue={searchParams.get("pret_min") || ""}
              onChange={(e) => debouncedUpdate("pret_min", e.target.value)}
            />
            <span className="absolute left-12.5 border-r-2 pr-2 leading-none text-gray-600 md:bottom-2 md:left-2">
              €
            </span>
          </div>
          <div className="relative flex flex-row items-center gap-2 md:flex-col md:items-start md:justify-end md:gap-1">
            <Label htmlFor="pana-la" className="font-light whitespace-nowrap">
              Până la
            </Label>
            <Input
              id="pana-la"
              type="number"
              className="mb-0 grow pl-9 sm:w-30 md:grow-0"
              placeholder="oricât"
              defaultValue={searchParams.get("pret_max") || ""}
              onChange={(e) => debouncedUpdate("pret_max", e.target.value)}
            />
            <span className="absolute left-15.5 border-r-2 pr-2 leading-none text-gray-600 md:bottom-2 md:left-2">
              €
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CarFilters;
