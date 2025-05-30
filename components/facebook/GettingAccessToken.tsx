"use client"

import {
  getFacebookPageAccessToken,
  setDummyPageAccessToken,
} from "@/lib/actions/facebook/actions"
import React, { useEffect, useState } from "react"

const GettingAccessToken = ({ code }: { code?: string }) => {
  const [status, setStatus] = useState("pending")

  useEffect(() => {
    const getToken = async () => {
      if (!code) return
      // await getFacebookPageAccessToken(code)
      // await setDummyPageAccessToken()

      setStatus("success")
    }

    getToken()
  }, [])

  return <div>Status: {status}</div>
}

export default GettingAccessToken
