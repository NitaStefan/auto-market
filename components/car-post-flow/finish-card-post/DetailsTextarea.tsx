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
    <form onSubmit={onSubmit} className="mb-6">
      <Label htmlFor="detalii">Alte detalii</Label>
      <Textarea
        className="mb-3 text-sm"
        placeholder="ex: Mașină în stare foarte bună, recent schimbate consumabilele."
        id="detalii"
        name="detalii"
        defaultValue={detalii ?? ""}
      />
      <Button size="sm" type="submit" variant="secondary">
        <ListCheck size={15} className="text-txt-secondary-600 mr-1" />
        Salvează mesajul
      </Button>
    </form>
  ) : (
    <div>
      <p className="text-sm whitespace-pre-line">{detalii}</p>
      <Button
        variant="secondary"
        size="sm"
        className="mb-6"
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
