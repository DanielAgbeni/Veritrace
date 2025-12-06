"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signinUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/useStore";
import { setHeaderAuthorization } from "@/api";

interface SigninFormData {
  email: string;
  password: string;
}

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SigninFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { setUser } = useStore();

  const onSubmit = async (data: SigninFormData) => {
    const payload = new FormData();
    payload.append("companyMail", data.email);
    payload.append("password", data.password);

    try {
      const res = await signinUser(payload);
      const { token, company } = res;

      if (token && company) {
        localStorage.setItem("accessToken", token);
        setHeaderAuthorization(token);

        const user = {
          id: company._id,
          companyName: company.name,
          email: company.mail,
          logo: company.logo,
          address: company.address,
          productDescription: company.description,
        };
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Signin failed", error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        className="w-full cursor-pointer"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SigninForm;