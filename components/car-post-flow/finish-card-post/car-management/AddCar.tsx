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
  const [isAddCarChecked, setIsAddCarChecked] = useState(false)
  const [isPostCarChecked, setIsPostCarChecked] = useState(false)

  const handleAddCar = async (updatedCar: Masina) => {
    setIsAddingCar(true)
    const { success, message } = await addCar(updatedCar, imageFiles)

    if (success) toast.success(message)
    else toast.error(message || "Eroare la adăugare anunț")

    setIsAddingCar(false)
  }

  const handleFacebookPost = async () => {
    const postMessage = `${car.marca}, ${car.model} - ${car.tip}`
    setIsPostingOnFb(true)

    const { success, message, postId } = await makeFacebookPost(postMessage)
    if (success) toast.success(message)
    else toast.error(message || "Eroare la postare")

    setIsPostingOnFb(false)
    return postId
  }

  const handleSubmit = async () => {
    // todo: insert car, post on fb, then update the car to have the post id and car images to have the media files
    let updatedCar = car

    if (isPostCarChecked) {
      const postId = await handleFacebookPost()
      updatedCar = { ...car, post_id: postId }
    }

    if (isAddCarChecked) await handleAddCar(updatedCar)
  }

  return (
    <>
      <div className="flex">
        <div className="flex items-center">
          <Label
            htmlFor="platforma"
            className="cursor-pointer border-3 py-2 pl-4 pr-10 rounded-md"
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
                checked={isAddCarChecked}
                onCheckedChange={checked =>
                  setIsAddCarChecked(checked === true)
                }
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
      <Button
        onClick={handleSubmit}
        disabled={!isAddCarChecked && !isPostCarChecked}
        className="mt-8 w-full"
      >
        Aplica si finalizeaza
      </Button>
    </>
  )
}

export default AddCar
