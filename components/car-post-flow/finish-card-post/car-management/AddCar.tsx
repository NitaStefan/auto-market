import { Button } from "@/components/ui/button"
import { addCar, addFacebookPostData } from "@/lib/actions/app/actions"
import { makeFacebookPost } from "@/lib/actions/facebook/actions"
import { useDialog } from "@/lib/hooks/useDialog"
import { Masina } from "@/types/app-types"
import { getAddCarButtonLabel } from "@/utils/utils"
import { LoaderCircle } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import LabeledCheckbox from "./LabeledCheckbox"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const { closeDialog } = useDialog()
  const [loadingState, setLoadingState] = useState<
    "idle" | "addingCar" | "postingFb" | "savingFbData"
  >("idle")
  const [isPostCarChecked, setIsPostCarChecked] = useState(false)

  const handleAddCar = async () => {
    setLoadingState("addingCar")
    const res = await addCar(car, imageFiles, !isPostCarChecked)

    if (!res.success) throw new Error(res.message)

    return res.carId
  }

  const handleFacebookPost = async (carId: number) => {
    setLoadingState("postingFb")

    const postMessage = `${car.marca}, ${car.model} - ${car.tip}`

    //TODO: change logic of error handling
    const { success, message, postId, mediaIds } = await makeFacebookPost(
      postMessage,
      carId,
      imageFiles.length
    )

    if (!success || !postId || !mediaIds)
      throw new Error(message || "Eroare la postare pe facebook")

    return { postId, mediaIds }
  }

  const handleAddFacebookPostData = async (
    carId: number,
    postId: string,
    mediaIds: string[]
  ) => {
    setLoadingState("savingFbData")
    const res = await addFacebookPostData(carId, postId, mediaIds)

    if (!res.success) throw new Error(res.message)
  }

  //TODO: maybe combine all here
  const handleSubmit = async () => {
    try {
      const carId = await handleAddCar()

      if (isPostCarChecked) {
        const { postId, mediaIds } = await handleFacebookPost(carId)
        await handleAddFacebookPostData(carId, postId, mediaIds)
      }

      toast.success("Anunț adăugat cu succes")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "A apărut o eroare necunoscută"
      )
    } finally {
      closeDialog()
    }
  }

  return (
    <>
      <LabeledCheckbox
        labelFor="facebook-post"
        checked={isPostCarChecked}
        onChange={checked => setIsPostCarChecked(checked === true)}
        label="Postează și pe facebook"
      />
      <Button
        onClick={handleSubmit}
        className="mt-8 w-full"
        disabled={loadingState !== "idle"}
      >
        {loadingState !== "idle" && (
          <LoaderCircle className="mr-2 animate-spin" />
        )}
        {getAddCarButtonLabel(loadingState, isPostCarChecked)}
      </Button>
    </>
  )
}

export default AddCar
