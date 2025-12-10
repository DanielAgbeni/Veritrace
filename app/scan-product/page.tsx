"use client";
import React, { useState } from "react";
import MainContainer from "@/components/general/maincontainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Search } from "lucide-react";
import Navbar from "@/components/general/Navbar";

export default function ScanProductPage() {
  const [productCode, setProductCode] = useState("");

  const handleScan = () => {
    // Placeholder for scanning logic
    console.log("Scanning product:", productCode);
  };

  return (
    <MainContainer>
        <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
              Scan Product
            </h1>
            <p className="text-muted-foreground">
              Enter the product code or scan the QR code to verify authenticity.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border border-border space-y-6">
             {/* Camera Placeholder */}
            <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 relative overflow-hidden group">
               <Camera className="w-16 h-16 text-gray-400 mb-4" />
               <p className="text-sm text-gray-500 font-medium">Camera View</p>
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary/50 w-full animate-pulse transform -translate-y-1/2 group-hover:bg-primary shadow-[0_0_10px_rgba(18,168,197,0.5)]"></div>
            </div>


            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Enter Product Code"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg" // specific styles requested
                onClick={handleScan}
              >
                Verify Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
