// components/SettingsSidebar.tsx
'use client'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const settingsOptions = [
  "View public profile",
  "Profile",
  "Photo",
]

export function NavigationMenuWithActiveItem({
  active,
  setActive,
}: {
  active: string,
  setActive: (item: string) => void
}) {
  const router = useRouter();
  const {data : session} = useSession();
  return (
    <div>
      <Card className="w-64">
        <CardContent className="py-4">
          <ul className="flex flex-col gap-2">
            {settingsOptions.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                      if(option === settingsOptions[0]){
                        router.push(`/user/${session?.user.id}`);
                      }else{
                        setActive(option)
                      }
                    }
                  }
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
