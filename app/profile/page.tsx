"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useWalletStore } from "@/lib/store"
import { useCurrentUser } from "@/hooks/use-users"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser: storedUser } = useWalletStore()
  const { data: currentUser, isLoading } = useCurrentUser()

  const displayUser = storedUser || currentUser

  if (isLoading || !displayUser) {
    return (
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6 rounded-b-[2rem]">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => router.push("/")} className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
              <ArrowLeft className="h-7 w-7" />
            </button>
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Profile Content Skeleton */}
        <div className="px-6 mt-6">
          <Card className="p-8">
            <div className="flex flex-col items-center mb-8">
              <Skeleton className="h-32 w-32 rounded-full mb-4" />
              <Skeleton className="h-7 w-40" />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>

              <div className="border-t border-border" />

              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>

              <div className="border-t border-border" />

              <div className="py-2">
                <Skeleton className="h-4 w-8 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </Card>
        </div>

        <BottomNav />
      </div>
    )
  }

  const fullName = `${displayUser.name.first} ${displayUser.name.last}`
  const initials = `${displayUser.name.first[0]}${displayUser.name.last[0]}`.toUpperCase()
  const streetAddress = `${displayUser.location.street.name} ${displayUser.location.street.number}`

  return (
    <div className="min-h-screen bg-background pb-22">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-main pt-12 pb-[60px]">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-7 w-7" />
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-main card-top-rounded">
          {/* Profile Picture and Name */}
          <div className="flex flex-col items-center mb-[53.5px] pt-[24.5px] ">
            <Avatar className="h-[237px] w-[237px] mb-[16px]">
              <AvatarImage src={displayUser.picture.large || "/placeholder.svg"} alt={fullName} />
              <AvatarFallback className="text-4xl text-bold">{initials}</AvatarFallback>
            </Avatar>
            <h2 className="text-h1 font-bold">{fullName}</h2>
          </div>

          {/* Profile Information */}
          <div className="space-y-3">
            {/* Location Section */}
            
              <div className="flex justify-between items-center">
                <span className="text-body text-grayWayli">City</span>
                <span className="text-body font-bold text-right">{displayUser.location.city}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body text-grayWayli">State</span>
                <span className="text-body font-bold text-right">{displayUser.location.state}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body text-grayWayli">Street</span>
                <span className="text-body font-bold text-right">{streetAddress}</span>
              </div>
   

 

            {/* Contact Section */}
     
              <div className="flex justify-between items-center">
                <span className="text-body text-grayWayli">Email</span>
                <span className="text-body font-bold text-right break-all">{displayUser.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body text-grayWayli">Phone</span>
                <span className="text-body font-bold text-right">{displayUser.phone}</span>
              </div>
          </div>
                {/* ID Section */}
            <div className="fixed bottom-[9px] left-0 flex items-center justify-between w-full px-main">
              <span className="text-body text-grayWayli mb-2">ID</span>
              <span className="text-body font-mono text-grayWayli break-all">{displayUser.login.uuid}</span>
            </div>
      </div>
    </div>
  )
}
