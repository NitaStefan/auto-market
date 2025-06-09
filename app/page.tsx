import FacebookOauth from "@/components/facebook/FacebookOauthAlert";
import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect("/masini");

  return (
    <>
      <main className="flex flex-1 flex-col gap-6 px-4">Home Page</main>
    </>
  );
}
