import AddCarDialog from "@/components/AddCarDialog"
import { createClient } from "@/utils/supabase/server"

const Page = async () => {
  const supabase = await createClient()

  const { data: cars } = await supabase.from("cars").select()

  return (
    <>
      <AddCarDialog />
      <div>
        <h1 className="text-2xl underline">Toate masinile din baza de date</h1>
        <pre>{JSON.stringify(cars, null, 2)}</pre>
      </div>
    </>
  )
}

export default Page
