import { getUser } from "@/lib/actions/app/actions";
import React from "react";

const ForAdmin = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) return null;

  return children;
};

export default ForAdmin;
