import React, { useState } from "react";
import DeleteCar from "./DeleteCar";
import UpdateCar from "./UpdateCar";
import { MasinaRecord, ModifyLoadingState } from "@/types/app-types";
import { Button } from "@/components/ui/button";
import {
  addFacebookPostData,
  deleteCar,
  getFacebookPostId,
  getThenDeleteFacebookPostData,
  revalidateCarsPath,
  updateCar,
} from "@/lib/actions/app/actions";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  deleteFacebookPost,
  makeFacebookPost,
  updateFacebookPost,
} from "@/lib/actions/facebook/actions";
import { useDialog } from "@/lib/hooks/useDialog";
import { toast } from "sonner";
import { getModifyCarButtonLabel } from "@/utils/utils";
import { LoaderCircle } from "lucide-react";
import { formatFbMessage, versionOf } from "@/utils/format-utils";
import ActionDivider from "./ActionDivider";
import { useRouter } from "next/navigation";

const ModifyPost = ({
  car,
  imageFiles,
}: {
  car: MasinaRecord;
  imageFiles: File[];
}) => {
  const { closeDialog } = useDialog();
  const { push } = useRouter();
  const [loadingState, setLoadingState] = useState<ModifyLoadingState>("idle");

  const [actions, setActions] = useState({
    deleteRecord: false,
    deleteFbPost: false,
    updateRecord: false,
    addFbPost: false,
    updatePost: false,
    repost: false,
  });

  const isOnFacebook = !!car.facebook_posts?.id;

  const disableUpdate = actions.deleteRecord || actions.deleteFbPost;
  const disableDelete = actions.updateRecord;

  const handleCheckboxChange = (
    name: keyof typeof actions,
    checked: CheckedState,
  ) => {
    const isChecked = checked === true;

    setActions((prev) => {
      const updated = { ...prev, [name]: isChecked };

      if (name === "deleteRecord" && isChecked && isOnFacebook)
        updated.deleteFbPost = true;

      if (name === "deleteFbPost" && !isChecked) updated.deleteRecord = false;

      if (["addFbPost", "repost", "updatePost"].includes(name) && isChecked)
        updated.updateRecord = true;

      if (name === "updateRecord" && !isChecked)
        Object.assign(updated, {
          addFbPost: false,
          updatePost: false,
          repost: false,
        });

      return updated;
    });
  };

  // Call actions
  const handleUpdate = async () => {
    try {
      if (actions.updateRecord) {
        setLoadingState("updating-record");
        const updateCarRes = await updateCar(car, imageFiles);
        if (!updateCarRes.success) throw new Error(updateCarRes.message);
      }

      const newV = imageFiles.length > 0 ? 1 : 0;
      const imagesLength = imageFiles.length || car.car_images.length;

      // POST ON FB IF NOT THERE
      if (actions.addFbPost) {
        setLoadingState("posting-fb");

        const fbPostRes = await makeFacebookPost(
          formatFbMessage(car),
          car.id,
          imagesLength,
          versionOf(car.car_images[0].path) + newV,
        );
        if (!fbPostRes.success) throw new Error(fbPostRes.message);

        const fbDataRes = await addFacebookPostData(
          car.id,
          fbPostRes.postId,
          fbPostRes.mediaIds,
          fbPostRes.postLink,
        );
        if (!fbDataRes.success) throw new Error(fbDataRes.message);
      }

      if (actions.updatePost) {
        setLoadingState("updating-post");
        const postIdRes = await getFacebookPostId(car.id);
        if (!postIdRes.success) throw new Error(postIdRes.message);

        const updatePostRes = await updateFacebookPost(
          postIdRes.postId,
          formatFbMessage(car),
        );
        if (!updatePostRes.success) throw new Error(updatePostRes.message);
      }

      if (actions.repost) {
        setLoadingState("reposting-fb");

        const deleteFbPostPromise = async () => {
          const fbPostData = await getThenDeleteFacebookPostData(car.id);
          if (!fbPostData.success) throw new Error(fbPostData.message);

          const delFbPostRes = await deleteFacebookPost(
            fbPostData.postId,
            fbPostData.mediaIds,
          );
          if (!delFbPostRes.success) throw new Error(delFbPostRes.message);
        };

        const postOnFbPromise = async () => {
          const addFbPostRes = await makeFacebookPost(
            formatFbMessage(car),
            car.id,
            imagesLength,
            versionOf(car.car_images[0].path) + newV,
          );
          if (!addFbPostRes.success) throw new Error(addFbPostRes.message);

          const postDataRes = await addFacebookPostData(
            car.id,
            addFbPostRes.postId,
            addFbPostRes.mediaIds,
            addFbPostRes.postLink,
          );
          if (!postDataRes.success) throw new Error(postDataRes.message);
        };

        await Promise.all([deleteFbPostPromise(), postOnFbPromise()]);
      }

      toast.success(
        `${actions.repost ? "Repostarea" : "Modificarea"} anunțului a avut succes`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "A apărut o eroare necunoscută",
      );
    } finally {
      closeDialog();
      await revalidateCarsPath();
    }
  };

  const handleDelete = async () => {
    try {
      const promises: Promise<any>[] = [];

      if (actions.deleteFbPost) {
        promises.push(
          (async () => {
            if (!actions.deleteRecord) setLoadingState("deleting-fb-post");

            const fbPostData = await getThenDeleteFacebookPostData(car.id);
            if (!fbPostData.success) throw new Error(fbPostData.message);

            const delFbPostRes = await deleteFacebookPost(
              fbPostData.postId,
              fbPostData.mediaIds,
            );
            if (!delFbPostRes.success) throw new Error(delFbPostRes.message);
          })(),
        );
      }

      if (actions.deleteRecord) {
        promises.push(
          (async () => {
            //since deleting record is faster, first show its message
            setLoadingState("deleting-record");

            const res = await deleteCar(car.id, car.car_images);
            if (!res.success) throw new Error(res.message);
            if (actions.deleteFbPost) setLoadingState("deleting-fb-post");
          })(),
        );
      }

      await Promise.all(promises);

      toast.success("Anunțul a fost șters cu succes");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "A apărut o eroare necunoscută",
      );
    } finally {
      closeDialog();

      if (actions.deleteRecord) push("/masini");
      else await revalidateCarsPath();
    }
  };

  const handleSubmit = async () => {
    if (!disableDelete) await handleDelete();
    if (!disableUpdate) await handleUpdate();
  };

  return (
    <>
      <DeleteCar
        disable={disableDelete}
        deleteRecord={actions.deleteRecord}
        handleOnRecordDeleteChange={(checked) =>
          handleCheckboxChange("deleteRecord", checked)
        }
        isOnFb={isOnFacebook}
        deleteFbPost={actions.deleteFbPost}
        handleOnPostDeleteChange={(checked) =>
          handleCheckboxChange("deleteFbPost", checked)
        }
      />
      <ActionDivider />
      <UpdateCar
        disable={disableUpdate}
        disableUpdatePost={imageFiles.length !== 0}
        isOnFb={isOnFacebook}
        updateRecord={actions.updateRecord}
        handleOnRecordUpdateChange={(checked) =>
          handleCheckboxChange("updateRecord", checked)
        }
        addFbPost={actions.addFbPost}
        handleOnPostAddChange={(checked) =>
          handleCheckboxChange("addFbPost", checked)
        }
        repost={actions.repost}
        handleOnRepostChange={(checked) =>
          handleCheckboxChange("repost", checked)
        }
        updatePost={actions.updatePost}
        handleOnPostUpdateChange={(checked) =>
          handleCheckboxChange("updatePost", checked)
        }
      />
      <Button
        onClick={handleSubmit}
        className="mt-5 w-full font-semibold"
        disabled={loadingState !== "idle" || (!disableUpdate && !disableDelete)}
      >
        {loadingState !== "idle" && (
          <LoaderCircle className="mr-2 animate-spin" />
        )}
        {getModifyCarButtonLabel(loadingState)}
      </Button>
    </>
  );
};

export default ModifyPost;
