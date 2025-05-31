import React from "react";

const DisplayErrors = ({ errors }: { errors: string[] }) => {
  return (
    errors.length > 0 && (
      <div className="flex flex-col gap-2 pb-2">
        {errors.map((error) => (
          <p
            key={error}
            className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-500"
          >
            {error}
          </p>
        ))}
      </div>
    )
  );
};

export default DisplayErrors;
