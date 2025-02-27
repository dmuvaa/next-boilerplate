import { createClient } from "../../../utils/supabase/server"

export async function getUser() {
  const supabase = createClient()
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}