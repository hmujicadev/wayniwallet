import type { User } from "./types"

const RANDOMUSER_API = "https://randomuser.me/api/"

export async function fetchUsers(count = 10): Promise<User[]> {
  try {
    const response = await fetch(`${RANDOMUSER_API}?results=${count}&nat=us`)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const users = await fetchUsers(1)
    return users[0] || null

  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}
