import React from "react"
import GettingAccessToken from "@/components/facebook/GettingAccessToken"

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  //Also check if is admin
  const { code } = await searchParams

  return (
    <div>
      <p>FACEBOOK AUTH</p>
      <GettingAccessToken code={code} />
    </div>
  )
}

export default Page
