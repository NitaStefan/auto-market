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

const SpecificationIcon = ({
  spec,
  lg = false,
}: {
  spec: Specs;
  lg?: boolean;
}) => {
  if (spec === "an")
    return <Calendar size={lg ? 18 : 16} className="text-txt-secondary-300" />;
  if (spec === "motorizare")
    return <Cog size={lg ? 18 : 16} className="text-txt-secondary-300" />;
  if (spec === "tip_combustibil")
    return <Fuel size={lg ? 18 : 16} className="text-txt-secondary-300" />;
  if (spec === "kilometraj")
    return <Gauge size={lg ? 18 : 16} className="text-txt-secondary-300" />;
  if (spec === "cutie_viteze")
    return (
      <SlidersVertical size={lg ? 18 : 16} className="text-txt-secondary-300" />
    );
  if (spec === "cai_putere")
    return (
      <CircleGauge size={lg ? 18 : 16} className="text-txt-secondary-300" />
    );
  if (spec === "euro_poluant")
    return <Leaf size={lg ? 18 : 16} className="text-txt-secondary-300" />;
};

export default SpecificationIcon;
