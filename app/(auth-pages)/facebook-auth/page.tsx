import React from "react";
import GettingAccessToken from "@/components/facebook/GettingAccessToken";
import { SCOPES } from "@/utils/constants";
import ForAdmin from "@/components/ForAdmin";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  //Also check if is admin
  const { code } = await searchParams;

  const oauthUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/facebook-auth&scope=${SCOPES}&response_type=code`;

  return (
    <ForAdmin>
      <GettingAccessToken code={code} oauthUrl={oauthUrl} />
    </ForAdmin>
  );
};

export default Page;
