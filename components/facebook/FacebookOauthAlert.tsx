import { SCOPES } from "@/utils/constants";
import { AlertCircle } from "lucide-react";
import Image from "next/image";

const FacebookOauthAlert = () => {
  const oauthUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.BASE_URL}facebook-auth&scope=${SCOPES}&response_type=code`;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-5 rounded-lg border-2 border-amber-600 bg-amber-100/40 p-2 px-3 font-medium text-amber-600">
      <div className="w-full sm:w-80">
        <div className="flex items-center gap-2">
          <AlertCircle strokeWidth={2.25} size={16} /> Permisiunile Facebook au
          expirat
        </div>
        <p className="text-sm text-black/40">
          Nu poți interacționa cu pagina de Facebook până nu reautorizezi
          accesul.
        </p>
      </div>
      <a
        href={oauthUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-1.5 rounded border border-blue-700 bg-blue-100 px-4 py-2 text-black hover:bg-blue-200 sm:w-fit"
      >
        <Image
          src={`/logos/facebook.svg`}
          width={18}
          height={18}
          alt="facebook"
        />
        Permite acces
      </a>
    </div>
  );
};

export default FacebookOauthAlert;
