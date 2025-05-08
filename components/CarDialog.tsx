"use client"

import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { archivo } from "@/app/fonts"
import CarPostFlow from "./car-post-flow/CarPostFlow"
import { MasinaRecord } from "@/types"

const CarDialog = ({ dbCar }: { dbCar?: MasinaRecord }) => {
  const addNewCar = !dbCar

  return (
    <Dialog>
      <Button className={archivo.className} asChild>
        <DialogTrigger>
          {addNewCar ? "Adaugă un anunț nou" : "Modifică postarea"}
        </DialogTrigger>
      </Button>
      {/* To be deleted */}
      {!addNewCar && (
        <p>
          {dbCar.marca} {dbCar.model} - id:{dbCar.id}
        </p>
      )}
      <DialogContent className={`${archivo.className}`}>
        <DialogHeader>
          <DialogTitle>
            {addNewCar ? "Adaugă un anunț nou" : "Modifică postarea"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-200px)]">
          <CarPostFlow dbCar={dbCar} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CarDialog
