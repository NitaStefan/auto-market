import { signOutAction } from "@/lib/actions/supabase-actions"
import React from "react"
import { Button } from "../ui/button"

const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant={"outline"}>
        Sign out
      </Button>
    </form>
  )
}

export default SignOutButton
