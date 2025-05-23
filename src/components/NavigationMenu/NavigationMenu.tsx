// components/SettingsSidebar.tsx
'use client'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

const settingsOptions = [
  "Profile",
  "Account",
  "Appearance",
  "Notifications",
  "Display",
]

export function NavigationMenuWithActiveItem() {
  const [active, setActive] = useState("Profile")

  return (
    <div>
        <Card className="w-64">
        <CardContent className="py-4">
            <ul className="flex flex-col gap-2">
            {settingsOptions.map((option) => (
                <li key={option}>
                <button
                    onClick={() => setActive(option)}
                    className={cn(
                    "w-full text-left px-4 py-2 rounded-md text-sm transition-colors",
                    active === option
                        ? "bg-muted font-medium"
                        : "hover:bg-muted/50"
                    )}
                >
                    {option}
                </button>
                </li>
            ))}
            </ul>
        </CardContent>
        </Card>
    </div>
  )
}
