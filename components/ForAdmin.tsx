import { getUser } from "@/lib/actions/app/actions";
import React from "react";

const ForAdmin = async ({
  children,
  not = false,
}: {
  children: React.ReactNode;
  not?: boolean;
}) => {
  const user = await getUser();

  const notForAdmin = not;
  const visitor = !user;

  if (notForAdmin)
    // Show children only if user is NOT logged in
    return visitor ? children : null;

  // Show children only if user IS logged in
  return user ? children : null;
};

export default ForAdmin;
