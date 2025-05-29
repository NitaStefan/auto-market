import { NGROK_BASE_URL, SCOPES } from "@/utils/constants"

const FacebookOauth = () => {
  const oauthUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${NGROK_BASE_URL}facebook-auth&scope=${SCOPES}&response_type=code`

  return (
    <div>
      <a
        href={oauthUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
      >
        Login with Facebook
      </a>
    </div>
  )
}

export default FacebookOauth
