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
import CarPostFlow from "./car-post-flow/CarPostFlow"
import { MasinaRecord } from "@/types/app-types"
import { useState } from "react"
import { DialogContext } from "@/lib/hooks/useDialog"

const CarDialog = ({ dbCar }: { dbCar?: MasinaRecord }) => {
  const [open, setOpen] = useState(false)
  const closeDialog = () => setOpen(false)

  const addNewCar = !dbCar

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild>
        <DialogTrigger>
          {addNewCar ? "Adaugă un anunț nou" : "Modifică postarea"}
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {addNewCar ? "Adaugă un anunț nou" : "Modifică postarea"}
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
  )
}

export default CarDialog
