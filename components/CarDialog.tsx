"use client";

import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CarPostFlow from "./car-post-flow/CarPostFlow";
import { MasinaRecord } from "@/types/app-types";
import { useEffect, useState } from "react";
import { DialogContext } from "@/lib/hooks/useDialog";
import { CirclePlus, Pen } from "lucide-react";

const CarDialog = ({ dbCar }: { dbCar?: MasinaRecord }) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    if (open)
      document.body.style.overflow = "hidden"; // Disable background scroll
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const addNewCar = !dbCar;

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <Button asChild>
        <DialogTrigger className="mb-5">
          {addNewCar ? <CirclePlus /> : <Pen />}
          {addNewCar ? "Adaugă un anunț nou" : "Modifică anunțul"}
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {addNewCar ? "Adaugă un anunț nou" : "Modifică anunțul"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-200px)]">
          <DialogContext.Provider value={{ closeDialog }}>
            <CarPostFlow dbCar={dbCar} />
          </DialogContext.Provider>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CarDialog;
