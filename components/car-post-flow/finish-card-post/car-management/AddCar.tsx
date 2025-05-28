import { Button } from "@/components/ui/button"
import {
  addCar,
  addFacebookPostData,
  revalidateCarsPath,
} from "@/lib/actions/app/actions"
import { makeFacebookPost } from "@/lib/actions/facebook/actions"
import { useDialog } from "@/lib/hooks/useDialog"
import { Masina } from "@/types/app-types"
import { getAddCarButtonLabel } from "@/utils/utils"
import { LoaderCircle } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import LabeledCheckbox from "./LabeledCheckbox"
import { formatFbMessage } from "@/utils/format-utils"

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const { closeDialog } = useDialog()
  const [loadingState, setLoadingState] = useState<
    "idle" | "adding-car" | "posting-fb" | "saving-fb-data"
  >("idle")
  const [isPostCarChecked, setIsPostCarChecked] = useState(false)

  const handleAddCar = async () => {
    setLoadingState("adding-car")
    const { facebook_posts, ...carRows } = car
    const res = await addCar(carRows, imageFiles)

    if (!res.success) throw new Error(res.message)

    return res.carId
  }

  const handleFacebookPost = async (carId: number) => {
    setLoadingState("posting-fb")
    const postMessage = formatFbMessage(car)

    //TODO: file names of the images must be unique
    const res = await makeFacebookPost(postMessage, carId, imageFiles.length)

    if (!res.success) throw new Error(res.message)

    return { postId: res.postId, mediaIds: res.mediaIds }
  }

  const handleAddFacebookPostData = async (
    carId: number,
    postId: string,
    mediaIds: string[]
  ) => {
    setLoadingState("saving-fb-data")
    const res = await addFacebookPostData(carId, postId, mediaIds)

    if (!res.success) throw new Error(res.message)
  }

  const handleSubmit = async () => {
    try {
      const carId = await handleAddCar()

      if (isPostCarChecked) {
        const { postId, mediaIds } = await handleFacebookPost(carId)
        await handleAddFacebookPostData(carId, postId, mediaIds)
      }

      await revalidateCarsPath()
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
        label="Postează și pe Facebook"
        icon="facebook"
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
