"use client";

import { setFacebookPageAccessToken } from "@/lib/actions/facebook/actions";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const GettingAccessToken = ({
  code,
  oauthUrl,
}: {
  code?: string;
  oauthUrl: string;
}) => {
  const [status, setStatus] = useState("success");

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
          status === "success" && "border-green-500 text-black",
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

        {status === "success" && (
          <>
            <span className="mr-2 rounded-md border border-green-500 bg-green-100/80 px-3 py-2 text-green-500">
              Succes!
            </span>
            <span>Acum poți interacționa cu pagina ta de Facebook</span>
          </>
        )}
      </div>
    </>
  );
};

export default GettingAccessToken;
