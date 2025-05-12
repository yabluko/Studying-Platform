import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoTemplate from "../../components/Logo/Logo";
import { JSX } from "react";
import Link from "next/link";

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

function Signup ({
  heading = "Signup",
  subheading = "Create a new account",
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
}: Props) {





  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href="http://localhost:3000">
              <LogoTemplate/>
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>
          <div className="flex w-full flex-col gap-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-white"
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

export default Signup ;
