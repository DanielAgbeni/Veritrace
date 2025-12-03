"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyMail: "",
    password: "",
    productDescription: "",
    addressStr: "",
    country: "",
    coordinates: null as [number, number] | null,
    logo: null as File | null,
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files && files[0]) {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          coordinates: [position.coords.longitude, position.coords.latitude],
        }));
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.companyName ||
      !formData.companyMail ||
      !formData.password ||
      !formData.productDescription ||
      !formData.addressStr ||
      !formData.country
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      companyName: formData.companyName,
      companyMail: formData.companyMail,
      password: formData.password,
      productDescription: formData.productDescription,
      companyAddress: {
        addressStr: formData.addressStr,
        country: formData.country,
        ...(formData.coordinates && { location: { coordinates: formData.coordinates } }),
      },
      ...(formData.logo && { logo: formData.logo }),
    };

    console.log("Signup Payload:", payload);
    // Add registration logic here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label htmlFor="companyName" className="text-sm font-medium">
          Company Name
        </label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Enter company name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="companyMail" className="text-sm font-medium">
          Company Email
        </label>
        <Input
          id="companyMail"
          name="companyMail"
          type="email"
          placeholder="Enter company email"
          value={formData.companyMail}
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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="productDescription" className="text-sm font-medium">
          Product Description
        </label>
        <Input
          id="productDescription"
          name="productDescription"
          placeholder="Describe your product"
          value={formData.productDescription}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="addressStr" className="text-sm font-medium">
            Address
          </label>
          <Input
            id="addressStr"
            name="addressStr"
            placeholder="Street Address"
            value={formData.addressStr}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <Input
            id="country"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
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
              : formData.coordinates
              ? "Location Captured"
              : "Get Current Location"}
          </Button>
        </div>
        {formData.coordinates && (
          <p className="text-xs text-muted-foreground">
            Lat: {formData.coordinates[1].toFixed(4)}, Long:{" "}
            {formData.coordinates[0].toFixed(4)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="logo" className="text-sm font-medium">
          Company Logo (Optional)
        </label>
        <Input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="cursor-pointer"
        />
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
