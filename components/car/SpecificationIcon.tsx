import { Specs } from "@/types/app-types";
import {
  Calendar,
  CircleGauge,
  Cog,
  Fuel,
  Gauge,
  Leaf,
  SlidersVertical,
} from "lucide-react";
import React from "react";

const SpecificationIcon = ({ spec }: { spec: Specs }) => {
  if (spec === "an")
    return <Calendar size={16} className="text-txt-secondary-300" />;
  if (spec === "motorizare")
    return <Cog size={16} className="text-txt-secondary-300" />;
  if (spec === "tip_combustibil")
    return <Fuel size={16} className="text-txt-secondary-300" />;
  if (spec === "kilometraj")
    return <Gauge size={16} className="text-txt-secondary-300" />;
  if (spec === "cutie_viteze")
    return <SlidersVertical size={16} className="text-txt-secondary-300" />;
  if (spec === "cai_putere")
    return <CircleGauge size={16} className="text-txt-secondary-300" />;
  if (spec === "euro_poluant")
    return <Leaf size={16} className="text-txt-secondary-300" />;
};

export default SpecificationIcon;
