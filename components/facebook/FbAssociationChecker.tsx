import { cookies } from "next/headers"

const FbAssociationChecker = async () => {
  const cookieStore = await cookies()

  const token = cookieStore.get("page_access_token")

  return (
    <div className="border-2 text-gray-500 w-fit">
      Do you have a Page Access Token? {token ? "✅" : "❌"}
    </div>
  )
}

export default FbAssociationChecker
