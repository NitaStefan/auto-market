import React, { useState } from "react"
import DeleteCar from "./DeleteCar"
import UpdateCar from "./UpdateCar"
import { MasinaRecord } from "@/types/app-types"
import { Button } from "@/components/ui/button"
import {
  deleteCar,
  getThenDeleteFacebookPostData,
} from "@/lib/actions/app/actions"
import { CheckedState } from "@radix-ui/react-checkbox"
import { deleteFacebookPost } from "@/lib/actions/facebook/actions"
import { useDialog } from "@/lib/hooks/useDialog"
import { toast } from "sonner"
import { getModifyCarButtonLabel } from "@/utils/utils"
import { LoaderCircle } from "lucide-react"

const ModifyPost = ({
  car,
  imageFiles,
}: {
  car: MasinaRecord
  imageFiles: File[]
}) => {
  const { closeDialog } = useDialog()
  const [loadingState, setLoadingState] = useState<
    "idle" | "deleting-fb-post" | "deleting-record"
  >("idle")
  const [deleteRecord, setDeleteRecord] = useState(false)
  const [deleteFbPost, setDeleteFbPost] = useState(false)

  const isOnFacebook = !!car.facebook_posts?.id

  const handleOnRecordDeleteChange = (checked: CheckedState) => {
    const isChecked = checked === true
    setDeleteRecord(isChecked)
    if (isChecked && isOnFacebook) setDeleteFbPost(true)
  }

  const handleOnFbPostDeleteChange = (checked: CheckedState) => {
    const isChecked = checked === true
    setDeleteFbPost(isChecked)
    if (!isChecked) setDeleteRecord(false)
  }

  // Call actions
  const handleSubmit = async () => {
    try {
      if (deleteFbPost) {
        setLoadingState("deleting-fb-post")
        const fbPostData = await getThenDeleteFacebookPostData(car.id)
        if (!fbPostData.success) throw new Error(fbPostData.message)

        const delFbPostRes = await deleteFacebookPost(
          fbPostData.postId,
          fbPostData.mediaIds,
          !deleteRecord
        )
        if (!delFbPostRes.success) throw new Error(delFbPostRes.message)
      }
      if (deleteRecord) {
        setLoadingState("deleting-record")
        const res = await deleteCar(car.id, car.car_images)
        if (!res.success) throw new Error(res.message)
      }

      toast.success("Anunțul a fost șters cu succes")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "A apărut o eroare necunoscută"
      )
    } finally {
      closeDialog()
    }
  }

  return (
    <div>
      <div className="h-2 bg-gray-200 my-2"></div>
      <DeleteCar
        deleteRecord={deleteRecord}
        handleOnRecordDeleteChange={handleOnRecordDeleteChange}
        isOnFb={isOnFacebook}
        deleteFbPost={deleteFbPost}
        handleOnFbPostDeleteChange={handleOnFbPostDeleteChange}
      />
      {/* <UpdateCar car={car} imageFiles={imageFiles} /> */}
      <Button
        onClick={handleSubmit}
        className="mt-5"
        disabled={loadingState !== "idle"}
      >
        {loadingState !== "idle" && (
          <LoaderCircle className="mr-2 animate-spin" />
        )}
        {getModifyCarButtonLabel(loadingState)}
      </Button>
    </div>
  )
}

export default ModifyPost
