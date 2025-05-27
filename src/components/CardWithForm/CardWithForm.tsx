import * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { toast, ToastContainer } from "react-toastify"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

function CardWithForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [headline, setHeadline] = useState("")
  const [bio, setBio] = useState("")
  const [loading, setLoading] = useState(false)
  const [website, setWebsite] = useState("")
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [userRole, setUserRole] = useState("")
  const [initialRole, setInitialRole] = useState("")

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/user/profile")
        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setName(data.name || "")
          setUserRole(data.userRole || "")
          setInitialRole(data.userRole || "")
          setSurname(data.surname || "")
          setEmail(data.email || "")
          setHeadline(data.headline || "")
          setBio(data.bio || "")
          setWebsite(data.socialLinks.website || "")
          setFacebook(data.socialLinks.facebook || "")
          setInstagram(data.socialLinks.instagram || "")
          setLinkedin(data.socialLinks.linkedin || "")
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userRole, email, headline, bio, surname, website, facebook, instagram, linkedin }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Profile updated successfully!")
        // Check if role was changed
        if (initialRole !== userRole) {
          toast.info("Role updated. Logging out...")
          // Wait for 2 seconds to show the message
          setTimeout(async () => {
            await signOut({ redirect: false })
            router.push('/auth/signin')
          }, 2000)
        }
      } else {
        toast.error("Failed to update profile.")
      }
    } catch (err) {
      toast.error("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <ToastContainer />
      <Card className="w-[760px] justify-between">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="surname">Last Name</Label>
                <Input id="surname" value={surname} onChange={e => setSurname(e.target.value)} placeholder="Your last name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="headline">Headline</Label>
                <Input id="headline" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Headline" />
              </div>
              <p className="text-sm text-muted-foreground">Add a professional headline like, "Instructor at Udemy" or "Architect."</p>
              <div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message-2">Bio</Label>
                  <Textarea placeholder="Type your message here." id="message-2" value={bio} onChange={e => setBio(e.target.value)} />
                  <p className="text-sm text-muted-foreground">
                    Your message will be copied to the support team.
                  </p>
                </div>
              </div>
              <div>
                <Label className="font-semibold mb-2 block">Links:</Label>
                <Input
                  className="mb-4"
                  placeholder="Website (http(s)://..)"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                />

                <div className="flex mb-2">
                  <span className="bg-muted px-4 flex items-center rounded-l border border-r-0 border-input text-gray-500">facebook.com/</span>
                  <Input
                    className="rounded-l-none"
                    placeholder="Username"
                    value={facebook}
                    onChange={e => setFacebook(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-6 ml-1">Input your Facebook username (e.g. johnsmith).</p>

                <div className="flex mb-2">
                  <span className="bg-muted px-4 flex items-center rounded-l border border-r-0 border-input text-gray-500">instagram.com/</span>
                  <Input
                    className="rounded-l-none"
                    placeholder="Username"
                    value={instagram}
                    onChange={e => setInstagram(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-6 ml-1">Input your Instagram username (e.g. johnsmith).</p>

                <div className="flex mb-7">
                  <span className="bg-muted px-4 flex items-center rounded-l border border-r-0 border-input text-gray-500">linkedin.com/</span>
                  <Input
                    className="rounded-l-none"
                    placeholder="Public Profile URL"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground ml-1 mb-4">Input your LinkedIn public profile URL (e.g. in/johnsmith, company/udemy).</p>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-8">
              <Button variant="outline" type="button" onClick={() => { setName(""); setEmail(""); setHeadline(""); setBio(""); setSurname(""); setWebsite(""); setFacebook(""); setInstagram(""); setLinkedin(""); setUserRole(""); }}>Cancel</Button>
              <Button type="submit" disabled={loading}>{"Update Profile"}</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardWithForm