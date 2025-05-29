import FacebookOauth from "@/components/facebook/FacebookOauth"

export default async function HomePage() {
  return (
    <>
      <FacebookOauth />
      <main className="flex-1 flex flex-col gap-6 px-4">Home Page</main>
    </>
  )
}
