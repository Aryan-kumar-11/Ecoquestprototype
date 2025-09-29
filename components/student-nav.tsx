"use client"

import { Home, Target, BookOpen, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/student/dashboard", icon: Home, label: "Dashboard" },
  { href: "/student/quests", icon: Target, label: "Quests" },
  { href: "/student/learn", icon: BookOpen, label: "Learn" },
  { href: "/student/profile", icon: User, label: "Profile" },
]

export function StudentNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
              pathname === href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
