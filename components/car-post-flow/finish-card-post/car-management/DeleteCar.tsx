import { cn } from "@/lib/utils"
import LabeledCheckbox from "./LabeledCheckbox"
import { CheckedState } from "@radix-ui/react-checkbox"

const DeleteCar = ({
  disable,
  deleteRecord,
  handleOnRecordDeleteChange,
  isOnFb,
  deleteFbPost,
  handleOnPostDeleteChange,
}: {
  disable: boolean
  deleteRecord: boolean
  handleOnRecordDeleteChange: (checked: CheckedState) => void
  isOnFb: boolean
  deleteFbPost: boolean
  handleOnPostDeleteChange: (checked: CheckedState) => void
}) => {
  return (
    <>
      <div
        className={cn(
          "flex gap-3",
          disable && "pointer-events-none opacity-50"
        )}
      >
        <LabeledCheckbox
          label="Șterge"
          labelFor="delete-record"
          checked={deleteRecord}
          onChange={handleOnRecordDeleteChange}
        />
        {isOnFb && (
          <LabeledCheckbox
            label="Șterge"
            labelFor="delete-fb-post"
            checked={deleteFbPost}
            onChange={handleOnPostDeleteChange}
            icon="facebook"
          />
        )}
      </div>
      {isOnFb && (
        <p className="text-xs text-gray-400">
          * dacă ștergi de pe platformă, trebuie să ștergi și de pe Facebook
        </p>
      )}
    </>
  )
}

export default DeleteCar
