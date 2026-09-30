import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  
    baseURL: "https://gympilot-client.vercel.app"
})

export const { signIn, signUp, signOut,useSession } = createAuthClient()