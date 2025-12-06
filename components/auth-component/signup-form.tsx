"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MapPin, Eye, EyeOff } from "lucide-react";
import { signupUser } from "@/lib/auth";

interface SignupFormData {
  companyName: string;
  companyMail: string;
  password: string;
  productDescription: string;
  addressStr: string;
  streetNo: string;
  state: string;
  country: string;
  logo: FileList | null;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    mode: "onChange",
    defaultValues: {
      companyName: "",
      companyMail: "",
      password: "",
      productDescription: "",
      addressStr: "",
      streetNo: "",
      state: "",
      country: "",
      logo: null,
    },
  });

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates([position.coords.longitude, position.coords.latitude]);
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      }
    );
  };

  const onSubmit = async (data: SignupFormData) => {
    const payload = new FormData();
    
    payload.append("password", data.password);
    payload.append("companyMail", data.companyMail);
    payload.append("productDescription", data.productDescription);
    payload.append("companyAddress[streetNo]", data.streetNo);
    payload.append("companyAddress[addressStr]", data.addressStr);
    payload.append("companyAddress[state]", data.state);
    payload.append("companyAddress[country]", data.country);

    if (data.logo && data.logo[0]) {
      payload.append("logo", data.logo[0]);
    }

    if (coordinates) {
      payload.append("companyAddress[location][coordinates][0]", coordinates[0].toString());
      payload.append("companyAddress[location][coordinates][1]", coordinates[1].toString());
    }

    console.log("Signup Payload:", payload);
    try {
      const res = await signupUser(payload)
    } catch (error) {
      
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(value)) return "Password must contain at least one special character (!@#$%^&*)";
    return true;
  };

  const getPasswordStrength = (value: string) => {
    if (!value) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[!@#$%^&*]/.test(value)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 4) return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label htmlFor="companyName" className="text-sm font-medium">
          Company Name
        </label>
        <Input
          id="companyName"
          placeholder="Enter company name"
          {...register("companyName", {
            required: "Company name is required",
            minLength: {
              value: 2,
              message: "Company name must be at least 2 characters",
            },
          })}
          className={errors.companyName ? "border-red-500" : ""}
        />
        {errors.companyName && (
          <p className="text-sm text-red-500">{errors.companyName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="companyMail" className="text-sm font-medium">
          Company Email
        </label>
        <Input
          id="companyMail"
          type="email"
          placeholder="Enter company email"
          {...register("companyMail", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className={errors.companyMail ? "border-red-500" : ""}
        />
        {errors.companyMail && (
          <p className="text-sm text-red-500">{errors.companyMail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              validate: validatePassword,
            })}
            className={errors.password ? "border-red-500 pr-10" : "pr-10"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {password && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded ${
                    i < passwordStrength.strength ? passwordStrength.color : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs ${passwordStrength.color.replace('bg-', 'text-')}`}>
              {passwordStrength.label}
            </p>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="productDescription" className="text-sm font-medium">
          Product Description
        </label>
        <Input
          id="productDescription"
          placeholder="Describe your product"
          {...register("productDescription", {
            required: "Product description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          className={errors.productDescription ? "border-red-500" : ""}
        />
        {errors.productDescription && (
          <p className="text-sm text-red-500">{errors.productDescription.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="streetNo" className="text-sm font-medium">
            Street No
          </label>
          <Input
            id="streetNo"
            placeholder="22A"
            {...register("streetNo", {
              required: "Street number is required",
            })}
            className={errors.streetNo ? "border-red-500" : ""}
          />
          {errors.streetNo && (
            <p className="text-sm text-red-500">{errors.streetNo.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="addressStr" className="text-sm font-medium">
            Street Address
          </label>
          <Input
            id="addressStr"
            placeholder="Animat Street"
            {...register("addressStr", {
              required: "Street address is required",
            })}
            className={errors.addressStr ? "border-red-500" : ""}
          />
          {errors.addressStr && (
            <p className="text-sm text-red-500">{errors.addressStr.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State
          </label>
          <Input
            id="state"
            placeholder="Lagos"
            {...register("state", {
              required: "State is required",
            })}
            className={errors.state ? "border-red-500" : ""}
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <Input
            id="country"
            placeholder="Nigeria"
            {...register("country", {
              required: "Country is required",
            })}
            className={errors.country ? "border-red-500" : ""}
          />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location (Optional)</label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleGetLocation}
            disabled={loadingLocation}
            className="w-full"
          >
            <MapPin className="mr-2 h-4 w-4" />
            {loadingLocation
              ? "Getting Location..."
              : coordinates
              ? "Location Captured"
              : "Get Current Location"}
          </Button>
        </div>
        {coordinates && (
          <p className="text-xs text-muted-foreground">
            Lat: {coordinates[1].toFixed(4)}, Long: {coordinates[0].toFixed(4)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="logo" className="text-sm font-medium">
          Company Logo (Optional)
        </label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          {...register("logo")}
          className="cursor-pointer"
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        className="w-full cursor-pointer"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Creating Account..." : "Sign Up"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;