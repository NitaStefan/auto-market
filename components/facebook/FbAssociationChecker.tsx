import { cookies } from "next/headers";
import FacebookOauthAlert from "./FacebookOauthAlert";

const FbAssociationChecker = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("page_access_token");

  if (!token) return <FacebookOauthAlert />;

  const debugRes = await fetch(
    `https://graph.facebook.com/debug_token?input_token=${token.value}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
  );
  const debugJson = await debugRes.json();
  const { is_valid } = debugJson.data;

  if (is_valid) return null;

  return <FacebookOauthAlert />;
};

export default FbAssociationChecker;
