"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import CarSpecification from "@/components/CarSpecification"
import { Masina } from "@/types"
import FinishCarPost from "@/components/FinishCarPost"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { archivo } from "@/app/fonts"

const AddCarDialog = () => {
  const [car, setCar] = useState<Partial<Masina>>({})
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSettingSpecifications, setIsSettingSpecifications] =
    useState<boolean>(true)

  const handleCarSpecification = (carData: Masina) => {
    setCar(carData)
    setIsSettingSpecifications(false)
  }

  return (
    <Dialog>
      <Button className={archivo.className} asChild>
        <DialogTrigger>Adaugă un anunț nou</DialogTrigger>
      </Button>
      <DialogContent className={`${archivo.className}`}>
        <DialogHeader>
          <DialogTitle>Adaugă un anunț nou</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-200px)]">
          {isSettingSpecifications ? (
            <CarSpecification
              initCar={car}
              imageFiles={imageFiles}
              handleCarSpecification={handleCarSpecification}
              handleImageFiles={(files: File[]) => setImageFiles(files)}
            />
          ) : (
            <FinishCarPost
              car={car as Masina}
              imageFiles={imageFiles}
              handleSetDetails={(detalii: string) =>
                setCar(prev => ({ ...prev, detalii }))
              }
              goToSpecifications={() => setIsSettingSpecifications(true)}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default AddCarDialog
