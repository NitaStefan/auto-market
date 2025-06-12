import { Button } from "@/components/ui/button";
import {
  addCar,
  addFacebookPostData,
  revalidateCarsPath,
} from "@/lib/actions/app/actions";
import { makeFacebookPost } from "@/lib/actions/facebook/actions";
import { useDialog } from "@/lib/hooks/useDialog";
import { Masina } from "@/types/app-types";
import { getAddCarButtonLabel } from "@/utils/utils";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import LabeledCheckbox from "./LabeledCheckbox";
import { formatFbMessage } from "@/utils/format-utils";
import { uploadCarImages } from "@/lib/actions/app/client";

const AddCar = ({ car, imageFiles }: { car: Masina; imageFiles: File[] }) => {
  const { closeDialog } = useDialog();
  const [loadingState, setLoadingState] = useState<
    "idle" | "adding-car" | "posting-fb" | "saving-fb-data"
  >("idle");
  const [isPostCarChecked, setIsPostCarChecked] = useState(false);

  const handleSubmit = async () => {
    try {
      //TODO: move image storage action here, in the client
      setLoadingState("adding-car");
      const { facebook_posts, ...carRows } = car;

      const addCarRes = await addCar(carRows, imageFiles.length);
      if (!addCarRes.success) throw new Error(addCarRes.message);

      // upload images on the client avoid large payload to the server
      await uploadCarImages(imageFiles, addCarRes.carId);

      if (isPostCarChecked) {
        setLoadingState("posting-fb");
        const postMessage = formatFbMessage(car);

        const fbPostRes = await makeFacebookPost(
          postMessage,
          addCarRes.carId,
          imageFiles.length,
        );
        if (!fbPostRes.success) throw new Error(fbPostRes.message);

        setLoadingState("saving-fb-data");
        const fbDataRes = await addFacebookPostData(
          addCarRes.carId,
          fbPostRes.postId,
          fbPostRes.mediaIds,
          fbPostRes.postLink,
        );

        if (!fbDataRes.success) throw new Error(fbDataRes.message);
      }

      toast.success("Anunțul a fost adăugat cu succes");
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

  return (
    <>
      <LabeledCheckbox
        labelFor="post-facebook"
        checked={isPostCarChecked}
        onChange={(checked) => setIsPostCarChecked(checked === true)}
        label="Postează și pe Facebook"
        icon="facebook"
      />
      <Button
        onClick={handleSubmit}
        className="mt-6 w-full font-semibold"
        disabled={loadingState !== "idle"}
      >
        {loadingState !== "idle" && (
          <LoaderCircle className="mr-2 animate-spin" />
        )}
        {getAddCarButtonLabel(loadingState, isPostCarChecked)}
      </Button>
    </>
  );
};

export default AddCar;
