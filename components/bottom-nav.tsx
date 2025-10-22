"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ArrowLeftRight, CircleUserRound } from "lucide-react"

import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/transfers", icon: ArrowLeftRight, label: "Transfers" },
    { href: "/profile", icon: CircleUserRound, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-20 px-6">
        {links.map((link) => {
          {console.log("Comparing:", pathname, "with", link.href)}
          const isActive = pathname === link.href
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-foreground text-[#662AB2]" : "text-muted-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
