import React from "react"

const DisplayErrors = ({ errors }: { errors: string[] }) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {errors.map(error => (
        <p
          key={error}
          className="text-sm font-medium rounded-md px-2 py-1 bg-red-100 text-red-500"
        >
          {error}
        </p>
      ))}
    </div>
  )
}

export default DisplayErrors
