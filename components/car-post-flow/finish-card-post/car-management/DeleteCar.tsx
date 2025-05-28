import LabeledCheckbox from "./LabeledCheckbox"
import { CheckedState } from "@radix-ui/react-checkbox"

const DeleteCar = ({
  deleteRecord,
  handleOnRecordDeleteChange,
  isOnFb,
  deleteFbPost,
  handleOnFbPostDeleteChange,
}: {
  deleteRecord: boolean
  handleOnRecordDeleteChange: (checked: CheckedState) => void
  isOnFb: boolean
  deleteFbPost: boolean
  handleOnFbPostDeleteChange: (checked: CheckedState) => void
}) => {
  return (
    <>
      <div className="flex gap-1">
        <LabeledCheckbox
          label="Sterge de pe platforma"
          labelFor="delete-record"
          checked={deleteRecord}
          onChange={handleOnRecordDeleteChange}
        />
        {isOnFb && (
          <LabeledCheckbox
            label="Sterge de pe facebook"
            labelFor="delete-fb-post"
            checked={deleteFbPost}
            onChange={handleOnFbPostDeleteChange}
          />
        )}
      </div>
      <p className="text-xs text-gray-400">
        * daca stergi de pe platforma, trebuie sa stergi si de pe facebook
      </p>
    </>
  )
}

export default DeleteCar
