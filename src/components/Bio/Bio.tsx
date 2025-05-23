import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Bio() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Bio</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  )
}
