import { useQuery } from "@tanstack/react-query"
import { fetchUsers, fetchCurrentUser } from "@/lib/api"

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => fetchUsers(15),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
