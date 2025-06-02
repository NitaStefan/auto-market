import React from "react";

const CarNotFound = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">Mașina nu a fost găsită</h1>
      <p className="pt-2 text-gray-500">
        Anunțul nu mai este disponibil. Este posibil să fi fost șters de către
        administrator.
      </p>
    </div>
  );
};

export default CarNotFound;
