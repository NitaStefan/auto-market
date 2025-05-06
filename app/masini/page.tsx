"use client"

import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { archivo } from "../fonts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import CarSpecification from "@/components/CarSpecification"
import { Masina } from "@/types"
import FinishCarPost from "@/components/FinishCarPost"

const Page = () => {
  const [car, setCar] = useState<Partial<Masina>>({})
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSettingSpecifications, setIsSettingSpecifications] =
    useState<boolean>(true)

  useEffect(() => {
    return () => imagePreviews.forEach(url => URL.revokeObjectURL(url))
  }, [imagePreviews])

  const handleCarSpecification = (car: Masina) => {
    setCar(car)
    setIsSettingSpecifications(false)
  }

  const handleImagePreview = (imageFiles: File[]) => {
    const urls = imageFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(urls)
  }

  const handleSetDetails = (detalii: string) =>
    setCar(prev => ({ ...prev, detalii }))

  const goToSpecifications = () => setIsSettingSpecifications(true)

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
              imagePreviews={imagePreviews}
              handleCarSpecification={handleCarSpecification}
              handleImagePreview={handleImagePreview}
            />
          ) : (
            <FinishCarPost
              car={car as Masina}
              imagePreviews={imagePreviews}
              handleSetDetails={handleSetDetails}
              goToSpecifications={goToSpecifications}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default Page
