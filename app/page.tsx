import FacebookOauth from "@/components/facebook/FacebookOauth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect("/masini");

  return (
    <>
      <FacebookOauth />
      <main className="flex flex-1 flex-col gap-6 px-4">Home Page</main>
    </>
  );
}
