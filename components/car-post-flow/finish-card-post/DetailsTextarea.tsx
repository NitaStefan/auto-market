import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ListCheck, ListEnd, ListPlus } from "lucide-react";
import React, { FormEvent, useState } from "react";

const DetailsTextarea = ({
  handleSetDetails,
  detalii,
}: {
  handleSetDetails: (detalii: string) => void;
  detalii?: string;
}) => {
  const [isAddingDetails, setIsAddingDetails] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    handleSetDetails((formData.get("detalii") as string).trim());
    setIsAddingDetails(false);
  };

  return isAddingDetails ? (
    <form onSubmit={onSubmit}>
      <Textarea
        className="px-1.5 py-1 text-sm sm:!text-base"
        placeholder="ex: Mașină în stare foarte bună, recent schimbate consumabilele."
        name="detalii"
        defaultValue={detalii ?? ""}
      />
      <Button
        size="sm"
        type="submit"
        variant="secondary"
        className="bg-primary hover:bg-primary/90 mt-2 mb-6 w-full"
      >
        <ListCheck size={15} className="mr-1 text-white" />
        <span className="text-white">Salvează mesajul</span>
      </Button>
    </form>
  ) : (
    <div>
      <p className="border-y border-transparent px-1.5 py-1 text-sm whitespace-pre-line sm:text-base">
        {detalii}
      </p>
      <Button
        variant="secondary"
        size="sm"
        className="border-txt-secondary-300 mt-2 mb-6 w-full border-2"
        onClick={() => setIsAddingDetails((prev) => !prev)}
      >
        {detalii ? (
          <ListEnd size={15} className="text-txt-secondary-600 mr-1" />
        ) : (
          <ListPlus size={15} className="text-txt-secondary-600 mr-1" />
        )}
        {detalii ? "Modifică detaliile" : "Adaugă detalii"}
      </Button>
    </div>
  );
};

export default DetailsTextarea;
