'use client'
import React, { useRef, useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CLIENT_BASE_URL } from '@/config/http'
import { toast, ToastContainer } from 'react-toastify'



type LoginFormProps = {
} & React.ComponentPropsWithoutRef<"form">;

function LoginForm({
    className,
    ...props
  }: LoginFormProps) {

    const userEmail = useRef('');
    const userPass = useRef('');
    const router = useRouter();

    const [err, setErr] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const res = await signIn('credentials', {
          redirect: false,
          email: userEmail.current,
          password: userPass.current,
          callbackUrl: `${CLIENT_BASE_URL}/home`
        });
    
        if (res && !res?.error) {
          router.push(res.url || `${CLIENT_BASE_URL}/home`);
        } else {
          toast.error('Oops! Something went wrong. Please try again later', {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setErr('Invalid username or password')
        }
    
      } catch {}
    }
    

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <ToastContainer />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => userEmail.current = e.target.value} />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required onChange={(e) => userPass.current = e.target.value } />
        </div>
        {err && <p className='text-red-500'>{err}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4" prefetch={false}>
          Sign up
        </Link>
      </div>
    </form>
  )
}

export default LoginForm