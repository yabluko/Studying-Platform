'use client'
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoTemplate from "../../../components/Logo/Logo";
import { JSX, useRef } from "react";
import Link from "next/link";
import { signup } from "@/actions/auth";
import { toast, ToastContainer } from 'react-toastify'
import { redirect } from "next/navigation";


interface Props {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: JSX.Element;
    alt: string;
    title: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

function Signup({
  heading = "Signup",
  subheading = "Create a new account",
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
}: Props) {

  const userName = useRef('');
  const userEmail = useRef('');
  const userPass = useRef('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email: userEmail.current,
      name: userName.current,
      password: userPass.current,
    }

    const res = await signup(formData);
    if (!res) {
      toast.error('Oops! Something went wrong. Please try again later', {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,

      });
      return
    }
    toast.success('Successfully created account', {
      position: 'top-right',
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      onClose: () => redirect('/login'),
    });
  }

  return (
    <section className="h-screen bg-muted">
      <ToastContainer />

      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
                <LogoTemplate />
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>
          <div className="flex w-full flex-col gap-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="bg-white"
                    onChange={(e) => userName.current = e.target.value}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-white"
                    onChange={(e) => userEmail.current = e.target.value}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="bg-white"
                    onChange={(e) => userPass.current = e.target.value}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="mt-2 w-full">
                    {signupText}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FcGoogle className="mr-2 size-5" />
                    {googleText}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <Link href="/login" className="font-medium text-primary hover:underline" prefetch={false}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
