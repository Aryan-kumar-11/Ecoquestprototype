"use client"

import { BarChart3, Users, Target, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/teacher/dashboard", icon: BarChart3, label: "Dashboard" },
  { href: "/teacher/analytics", icon: Users, label: "Analytics" },
  { href: "/teacher/quests", icon: Target, label: "Quests" },
  { href: "/teacher/settings", icon: Settings, label: "Settings" },
]

export function TeacherNav() {
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
