import { CheckedState } from "@radix-ui/react-checkbox";
import LabeledCheckbox from "./LabeledCheckbox";
import { cn } from "@/lib/utils";

const UpdateCar = ({
  disable,
  disableUpdatePost,
  isOnFb,
  updateRecord,
  handleOnRecordUpdateChange,
  addFbPost,
  handleOnPostAddChange,
  repost,
  handleOnRepostChange,
  updatePost,
  handleOnPostUpdateChange,
}: {
  disable: boolean;
  disableUpdatePost: boolean;
  isOnFb: boolean;
  updateRecord: boolean;
  handleOnRecordUpdateChange: (checked: CheckedState) => void;
  addFbPost: boolean;
  handleOnPostAddChange: (checked: CheckedState) => void;
  repost: boolean;
  handleOnRepostChange: (checked: CheckedState) => void;
  updatePost: boolean;
  handleOnPostUpdateChange: (checked: CheckedState) => void;
}) => {
  return (
    <div
      className={cn("flex gap-3", disable && "pointer-events-none opacity-50")}
    >
      <LabeledCheckbox
        label="Modifică"
        labelFor="update-record"
        checked={updateRecord}
        onChange={handleOnRecordUpdateChange}
        isOnFb={isOnFb}
      />
      {!isOnFb ? (
        <LabeledCheckbox
          label="Postează"
          labelFor="post-facebook"
          checked={addFbPost}
          onChange={handleOnPostAddChange}
          icon="facebook"
        />
      ) : (
        <div className="flex flex-1 flex-col gap-3">
          <LabeledCheckbox
            label="Modifică"
            labelFor="update-post"
            checked={updatePost}
            onChange={handleOnPostUpdateChange}
            icon="facebook"
            disable={repost || disableUpdatePost}
          />
          <LabeledCheckbox
            label="Repostează"
            labelFor="repost"
            checked={repost}
            onChange={handleOnRepostChange}
            icon="facebook"
            disable={updatePost}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateCar;
