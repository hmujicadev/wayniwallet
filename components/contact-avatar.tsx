"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Contact } from "@/lib/types"

interface ContactAvatarProps {
  contact: Contact
  onClick?: () => void
  size?: "sm" | "md" | "lg"
}

export function ContactAvatar({ contact, onClick }: ContactAvatarProps) {

  const initials = `${contact.name.first[0]}${contact.name.last[0]}`.toUpperCase()

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-[16px] transition-transform hover:scale-105 active:scale-95"
    >
      <Avatar className='h-[65px] w-[65px]'>
        <AvatarImage
          src={contact.picture.medium || "/placeholder.svg"}
          alt={`${contact.name.first} ${contact.name.last}`}
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="text-small text-foreground max-w-[70px] truncate">{contact.name.first}</span>
    </button>
  )
}
