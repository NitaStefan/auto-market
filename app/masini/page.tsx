import { Button } from "@/components/ui/button"
import React from "react"
import { archivo } from "../fonts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CarForm from "@/components/CarForm"

const Page = () => {
  return (
    <Dialog>
      <Button className={`${archivo.className}`} asChild>
        <DialogTrigger>Adaugă un anunț nou</DialogTrigger>
      </Button>
      <DialogContent className={`${archivo.className}`}>
        <DialogHeader>
          <DialogTitle>Adaugă un anunț nou</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CarForm />
      </DialogContent>
    </Dialog>
  )
}

export default Page
