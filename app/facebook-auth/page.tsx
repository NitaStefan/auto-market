import { NGROK_BASE_URL } from "@/utils/constants"
import React from "react"
import GettingAccessToken from "@/components/facebook/GettingAccessToken"
import { getFacebookPageAccessToken } from "@/lib/actions/facebook/actions"

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  //Also check if is admin
  const { code } = await searchParams
  const client_id = process.env.FACEBOOK_APP_ID
  const client_secret = process.env.FACEBOOK_APP_SECRET
  const userAccessTokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${client_id}&redirect_uri=${NGROK_BASE_URL}facebook-auth&client_secret=${client_secret}&code=${code}`

  return (
    <div>
      <p>FACEBOOK AUTH</p>
      <GettingAccessToken />
    </div>
  )
}

export default Page
