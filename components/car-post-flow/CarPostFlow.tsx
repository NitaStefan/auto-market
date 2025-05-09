import { Masina, MasinaRecord } from "@/types"
import React, { useState } from "react"
import CarSpecification from "./car-specification/CarSpecification"
import FinishCarPost from "./finish-card-post/FinishCarPost"

const CarPostFlow = ({ dbCar }: { dbCar?: MasinaRecord }) => {
  const [car, setCar] = useState<Masina | undefined>(dbCar)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSettingSpecifications, setIsSettingSpecifications] = useState(true)

  const handleCarSpecification = (carData: Masina) => {
    setCar(carData)
    setIsSettingSpecifications(false)
  }

  return isSettingSpecifications || !car ? (
    <CarSpecification
      initCar={car}
      imageFiles={imageFiles}
      handleCarSpecification={handleCarSpecification}
      handleImageFiles={(files: File[]) => setImageFiles(files)}
    />
  ) : (
    <FinishCarPost
      car={car}
      imageFiles={imageFiles}
      handleSetDetails={(detalii: string) =>
        setCar(prev => (prev ? { ...prev, detalii } : undefined))
      }
      goToSpecifications={() => setIsSettingSpecifications(true)}
    />
  )
}

export default CarPostFlow
