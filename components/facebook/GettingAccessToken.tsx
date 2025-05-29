"use client"

import { getFacebookPageAccessToken } from "@/lib/actions/facebook/actions"
import React, { useEffect, useState } from "react"

const GettingAccessToken = () => {
  const [status, setStatus] = useState("pending")

  useEffect(() => {
    const getToken = async () => {
      await getFacebookPageAccessToken()
      setStatus("success")
    }

    getToken()
  }, [])

  return <div>Status: {status}</div>
}

export default GettingAccessToken
