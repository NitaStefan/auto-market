import React, { useState } from "react"
import DeleteCar from "./DeleteCar"
import UpdateCar from "./UpdateCar"
import { MasinaRecord, ModifyLoadingState } from "@/types/app-types"
import { Button } from "@/components/ui/button"
import {
  addFacebookPostData,
  deleteCar,
  getFacebookPostId,
  getThenDeleteFacebookPostData,
  revalidateCarsPath,
  updateCar,
} from "@/lib/actions/app/actions"
import { CheckedState } from "@radix-ui/react-checkbox"
import {
  deleteFacebookPost,
  makeFacebookPost,
  updateFacebookPost,
} from "@/lib/actions/facebook/actions"
import { useDialog } from "@/lib/hooks/useDialog"
import { toast } from "sonner"
import { getModifyCarButtonLabel } from "@/utils/utils"
import { LoaderCircle } from "lucide-react"
import { formatFbMessage } from "@/utils/format-utils"

const ModifyPost = ({
  car,
  imageFiles,
}: {
  car: MasinaRecord
  imageFiles: File[]
}) => {
  const { closeDialog } = useDialog()
  const [loadingState, setLoadingState] = useState<ModifyLoadingState>("idle")
  const [deleteRecord, setDeleteRecord] = useState(false)
  const [deleteFbPost, setDeleteFbPost] = useState(false)
  const [updateRecord, setUpdateRecord] = useState(false)
  const [addFbPost, setAddFbPost] = useState(false)
  const [updatePost, setUpdatePost] = useState(false)
  const [repost, setRepost] = useState(false)

  const isOnFacebook = !!car.facebook_posts?.id

  const disableUpdate = deleteRecord || deleteFbPost
  const disableDelete = updateRecord || addFbPost || repost || updatePost

  // Delete onChange handlers
  const handleOnRecordDeleteChange = (checked: CheckedState) => {
    const isChecked = checked === true
    setDeleteRecord(isChecked)
    if (isChecked && isOnFacebook) setDeleteFbPost(true)
  }

  const handleOnPostDeleteChange = (checked: CheckedState) => {
    const isChecked = checked === true
    setDeleteFbPost(isChecked)
    if (!isChecked) setDeleteRecord(false)
  }

  // Update onChange handlers
  const handleOnRecordUpdateChange = (checked: CheckedState) => {
    setUpdateRecord(checked === true)
  }

  const handleOnPostAddChange = (checked: CheckedState) => {
    setAddFbPost(checked === true)
  }

  const handleOnRepostChange = (checked: CheckedState) => {
    setRepost(checked === true)
  }

  const handleOnPostUpdateChange = (checked: CheckedState) => {
    setUpdatePost(checked === true)
  }

  // Call actions
  const handleUpdate = async () => {
    try {
      if (updateRecord) {
        setLoadingState("updating-record")
        const updateCarRes = await updateCar(car, imageFiles)
        if (!updateCarRes.success) throw new Error(updateCarRes.message)
      }

      if (addFbPost) {
        setLoadingState("posting-fb")
        const fbPostRes = await makeFacebookPost(
          formatFbMessage(car),
          car.id,
          car.car_images.length
        )
        if (!fbPostRes.success) throw new Error(fbPostRes.message)

        const fbDataRes = await addFacebookPostData(
          car.id,
          fbPostRes.postId,
          fbPostRes.mediaIds
        )
        if (!fbDataRes.success) throw new Error(fbDataRes.message)
      }

      if (updatePost) {
        setLoadingState("updating-post")
        const postIdRes = await getFacebookPostId(car.id)
        if (!postIdRes.success) throw new Error(postIdRes.message)

        const updatePostRes = await updateFacebookPost(
          postIdRes.postId,
          formatFbMessage(car)
        )
        if (!updatePostRes.success) throw new Error(updatePostRes.message)
      }

      if (repost) {
        setLoadingState("reposting-fb")

        const fbPostData = await getThenDeleteFacebookPostData(car.id)
        if (!fbPostData.success) throw new Error(fbPostData.message)

        const delFbPostRes = await deleteFacebookPost(
          fbPostData.postId,
          fbPostData.mediaIds
        )
        if (!delFbPostRes.success) throw new Error(delFbPostRes.message)

        const addFbPostRes = await makeFacebookPost(
          formatFbMessage(car),
          car.id,
          imageFiles.length || car.car_images.length
        )
        if (!addFbPostRes.success) throw new Error(addFbPostRes.message)

        const postDataRes = await addFacebookPostData(
          car.id,
          addFbPostRes.postId,
          addFbPostRes.mediaIds
        )
        if (!postDataRes.success) throw new Error(postDataRes.message)
      }

      await revalidateCarsPath()
      toast.success("Modificarea anunțului a avut succes")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "A apărut o eroare necunoscută"
      )
    } finally {
      closeDialog()
    }
  }

  const handleDelete = async () => {
    try {
      const promises: Promise<any>[] = []

      if (deleteFbPost) {
        promises.push(
          (async () => {
            if (!deleteRecord) setLoadingState("deleting-fb-post")

            const fbPostData = await getThenDeleteFacebookPostData(car.id)
            if (!fbPostData.success) throw new Error(fbPostData.message)

            const delFbPostRes = await deleteFacebookPost(
              fbPostData.postId,
              fbPostData.mediaIds
            )
            if (!delFbPostRes.success) throw new Error(delFbPostRes.message)
          })()
        )
      }

      if (deleteRecord) {
        promises.push(
          (async () => {
            //since deleting record is faster, first show its message
            setLoadingState("deleting-record")

            const res = await deleteCar(car.id, car.car_images)
            if (!res.success) throw new Error(res.message)
            if (deleteFbPost) setLoadingState("deleting-fb-post")
          })()
        )
      }

      await Promise.all(promises)

      await revalidateCarsPath()
      toast.success("Anunțul a fost șters cu succes")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "A apărut o eroare necunoscută"
      )
    } finally {
      closeDialog()
    }
  }

  const handleSubmit = async () => {
    if (!disableDelete) await handleDelete()
    if (!disableUpdate) await handleUpdate()
  }

  return (
    <div>
      <div className="h-2 bg-gray-200 my-2"></div>
      <DeleteCar
        disable={disableDelete}
        deleteRecord={deleteRecord}
        handleOnRecordDeleteChange={handleOnRecordDeleteChange}
        isOnFb={isOnFacebook}
        deleteFbPost={deleteFbPost}
        handleOnPostDeleteChange={handleOnPostDeleteChange}
      />
      {/* TODO: disable modify current post if there are new images  */}
      <UpdateCar
        disable={disableUpdate}
        disableUpdatePost={imageFiles.length !== 0}
        isOnFb={isOnFacebook}
        updateRecord={updateRecord}
        handleOnRecordUpdateChange={handleOnRecordUpdateChange}
        addFbPost={addFbPost}
        handleOnPostAddChange={handleOnPostAddChange}
        repost={repost}
        handleOnRepostChange={handleOnRepostChange}
        updatePost={updatePost}
        handleOnPostUpdateChange={handleOnPostUpdateChange}
      />
      <Button
        onClick={handleSubmit}
        className="mt-5 w-full"
        disabled={loadingState !== "idle" || (!disableUpdate && !disableDelete)}
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
