"use client";

import {
  setFacebookPageAccessToken,
  setDummyPageAccessToken,
} from "@/lib/actions/facebook/actions";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const GettingAccessToken = ({
  code,
  oauthUrl,
}: {
  code?: string;
  oauthUrl: string;
}) => {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const getToken = async () => {
      if (!code) {
        setStatus("error");
        return;
      }

      const res = await setFacebookPageAccessToken(code);
      if (!res.success) {
        setStatus("error");
        return;
      }

      // await setDummyPageAccessToken();

      setStatus("success");
    };

    getToken();
  }, []);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border-2 border-gray-300 p-4 text-xl font-medium text-gray-500",
          status === "error" && "border-red-600 text-red-600",
          status === "success" && "border-primary text-primary",
        )}
      >
        {status === "pending" && "Se încarcă..."}
        {status === "error" && (
          <>
            <span>A apărut o eroare neașteptată.</span>
            <a
              href={oauthUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-2 text-blue-700 underline"
            >
              încearcă din nou.
            </a>
          </>
        )}

        {status === "success" &&
          "Succes! Acum poți interacționa cu pagina ta de Facebook"}
      </div>
    </>
  );
};

export default GettingAccessToken;
