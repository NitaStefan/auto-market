import FbAssociationChecker from "@/components/facebook/FbAssociationChecker";
import ForAdmin from "@/components/ForAdmin";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense>
        <ForAdmin>
          <FbAssociationChecker />
        </ForAdmin>
      </Suspense>
      {children}
    </>
  );
};

export default Layout;
