import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { addCar } from "@/lib/actions/app-actions"
import { makeFacebookPost } from "@/lib/actions/facebook-actions"
import { Masina } from "@/types"
import React, { useState } from "react"
import { toast } from "sonner"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const [isAddingCar, setIsAddingCar] = useState(false)
  const [isPostingOnFb, setIsPostingOnFb] = useState(false)
  const [isPostCarChecked, setIsPostCarChecked] = useState(false)

  const handleAddCar = async (updatedCar: Masina) => {
    setIsAddingCar(true)
    const { success, message, carId } = await addCar(updatedCar, imageFiles)

    if (success) toast.success(message)
    else toast.error(message || "Eroare la adăugare anunț")

    setIsAddingCar(false)

    return carId
  }

  const handleFacebookPost = async (carId: number) => {
    const postMessage = `${car.marca}, ${car.model} - ${car.tip}`
    setIsPostingOnFb(true)
    // todo: continue from here (use postId and mediaIds)
    const { success, message, postId, mediaIds } = await makeFacebookPost(
      postMessage,
      carId,
      imageFiles.length
    )
    if (success) toast.success(message)
    else toast.error(message || "Eroare la postare")

    setIsPostingOnFb(false)
    return postId
  }

  const handleSubmit = async () => {
    //insert car, post on fb, then update the car to have the post id and car images to have the media files

    const carId = await handleAddCar(car)

    if (isPostCarChecked && carId) {
      const postId = await handleFacebookPost(carId)
      // updatedCar = { ...car, post_id: postId }
    }
  }

  return (
    <>
      <div className="flex">
        <div className="flex items-center">
          <Label
            htmlFor="platforma"
            className="border-3 py-2 pl-4 pr-10 rounded-md"
          >
            Posteaza pe platforma
          </Label>
          <div className="-translate-x-8">
            {isAddingCar ? (
              <span> ....</span>
            ) : (
              <Checkbox
                id="platforma"
                className="cursor-pointer"
                checked={true}
              />
            )}
          </div>
        </div>
        <div className="flex items-center">
          <Label
            htmlFor="facebook"
            className="cursor-pointer border-3 py-2 pl-4 pr-10 rounded-md"
          >
            Posteaza pe facebook
          </Label>
          <div className="-translate-x-8">
            {isPostingOnFb ? (
              <span>.....</span>
            ) : (
              <Checkbox
                id="facebook"
                className="cursor-pointer"
                checked={isPostCarChecked}
                onCheckedChange={checked =>
                  setIsPostCarChecked(checked === true)
                }
              />
            )}
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit} className="mt-8 w-full">
        Aplica si finalizeaza
      </Button>
    </>
  )
}

export default AddCar
