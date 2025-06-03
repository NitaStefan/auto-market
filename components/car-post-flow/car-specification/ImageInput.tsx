import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const ImageInput = ({
  handleImageFiles,
}: {
  handleImageFiles: (imageFiles: File[]) => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="poze">
        Pozele <span className="text-red-300">*</span>
      </Label>
      <Input
        id="poze"
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          handleImageFiles(files);
        }}
        className="hidden"
      />
      <Button asChild variant="outline" className="grow">
        <Label htmlFor="poze">Alege imagini</Label>
      </Button>
    </div>
  );
};

export default ImageInput;
