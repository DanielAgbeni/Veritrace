"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signinUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/useStore";
import { setHeaderAuthorization } from "@/api";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { setUser } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signin Data:", formData);
    
    const payload = new FormData();
    payload.append("companyMail", formData.email);
    payload.append("password", formData.password);

    try {
      const res = await signinUser(payload);
      const { token } = res;

      if (token) {
        localStorage.setItem("accessToken", token);
        setHeaderAuthorization(token);
        
        const decoded = parseJwt(token);
        const user = {
            id: decoded.companyId,
            companyName: decoded.companyName,
            email: formData.email,
            logo: "",
            address: "",
            productDescription: "",
        };

        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
        console.log("User signed in successfully", user);
        
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Signin failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default SigninForm;
