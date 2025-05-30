import { Pencil, RefreshCcw, Send, Trash2 } from "lucide-react"
import React from "react"

const ActionIcon = ({ iconFor }: { iconFor: string }) => {
  if (iconFor.startsWith("update"))
    return <Pencil className="text-txt-secondary-600" size={13} />

  if (iconFor.startsWith("delete"))
    return <Trash2 className="text-txt-secondary-600" size={13} />

  if (iconFor.startsWith("post"))
    return <Send className="text-txt-secondary-600" size={13} />

  if (iconFor.startsWith("repost"))
    return <RefreshCcw className="text-txt-secondary-600" size={13} />
}

export default ActionIcon
