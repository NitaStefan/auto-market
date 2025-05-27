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

const ModifyPost = ({
  car,
  imageFiles,
}: {
  car: MasinaRecord
  imageFiles: File[]
}) => {
  const { closeDialog } = useDialog()
  const [deleteRecord, setDeleteRecord] = useState(false)
  const [deleteFbPost, setDeleteFbPost] = useState(false)

  const handleOnRecordDeleteChange = (checked: CheckedState) => {
    const isChecked = checked === true
    setDeleteRecord(isChecked)
    if (isChecked) setDeleteFbPost(true)
  }

  const handleOnFbPostDeleteChange = (checked: CheckedState) => {
    const isChecked = checked === true
    setDeleteFbPost(isChecked)
    if (!isChecked) setDeleteRecord(false)
  }

  // Call actions
  //TODO: follow AddCar component error handling
  const handleSubmit = async () => {
    //   if (deleteFbPost) {
    //     const fbPostData = await getThenDeleteFacebookPostData(car.id)
    //     if (fbPostData.postId && fbPostData.mediaIds)
    //       await deleteFacebookPost(
    //         fbPostData.postId,
    //         fbPostData.mediaIds,
    //         !deleteRecord
    //       )
    //   }
    //   if (deleteRecord) {
    //     const { success, message } = await deleteCar(car.id, car.car_images)
    //   }
    //   closeDialog()
  }

  return (
    <div>
      <div className="h-2 bg-gray-200 my-2"></div>
      <DeleteCar
        deleteRecord={deleteRecord}
        handleOnRecordDeleteChange={handleOnRecordDeleteChange}
        deleteFbPost={deleteFbPost}
        handleOnFbPostDeleteChange={handleOnFbPostDeleteChange}
      />
      {/* <UpdateCar car={car} imageFiles={imageFiles} /> */}
      <Button onClick={handleSubmit} className="mt-5">
        Finalizeaza
      </Button>
    </div>
  )
}

export default ModifyPost
