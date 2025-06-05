import React from "react";
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

const CarFilters = () => {
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
        <Select defaultValue="toate">
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
        <Select defaultValue="toate">
          <SelectTrigger
            size="sm"
            className="w-full bg-white sm:w-full md:w-42 lg:w-48"
          >
            <SelectValue defaultValue="toate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toate">Toate</SelectItem>
            <SelectItem value="bmw">BMW</SelectItem>
            <SelectItem value="citroen">Citroën</SelectItem>
            <SelectItem value="volkswagen">Volkswagen</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative flex flex-row items-center gap-2 md:flex-col md:items-start md:justify-end md:gap-1">
        <Label htmlFor="de-la" className="font-light whitespace-nowrap">
          De la
        </Label>
        <Input
          type="number"
          id="de-la"
          className="mb-0 grow pl-9 sm:w-30"
          placeholder="oricât"
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
          className="mb-0 grow pl-9 sm:w-30"
          placeholder="oricât"
        />
        <span className="absolute left-15.5 border-r-2 pr-2 leading-none text-gray-600 md:bottom-2 md:left-2">
          €
        </span>
      </div>
    </div>
  );
};

export default CarFilters;
