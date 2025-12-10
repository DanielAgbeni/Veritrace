"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, Upload, X, CheckCircle, AlertCircle, Search } from "lucide-react";
import Navbar from "@/components/general/Navbar";
import MainContainer from "@/components/general/maincontainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ScanResult = {
  success: boolean;
  code: string;
  message: string;
};

export default function ScanProductPage() {
  const [productCode, setProductCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [cameraError, setCameraError] = useState("");
  
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current?.isScanning) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleScanSuccess = useCallback((decodedText: string) => {
    setProductCode(decodedText);
    stopScanning();
    verifyProduct(decodedText);
  }, []);

  const startCamera = async () => {
    try {
      setCameraError("");
      setScanResult(null);
      
      if (!html5QrCodeRef.current) {
        // Use standard verbose id
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        handleScanSuccess,
        () => {} // Error callback - ignore individual frame errors
      );

      setScanning(true);
    } catch (err) {
      setCameraError("Unable to access camera. Please check permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopScanning = async () => {
    if (html5QrCodeRef.current?.isScanning) {
      await html5QrCodeRef.current.stop();
    }
    setScanning(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCameraError("");
      setScanResult(null);

      // We need a fresh instance or existing one can scan file
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }

      const result = await html5QrCodeRef.current.scanFile(file, true);
      setProductCode(result);
      verifyProduct(result);
    } catch (err) {
      setCameraError("No QR code found in image. Please try another image.");
      console.error("File scan error:", err);
    }
  };

  const verifyProduct = (code: string) => {
    // Simulate API verification for now, user can connect real API later
    // In real app, this would call verify-product API
    
    // Simulate valid/invalid based on length for demo
    setTimeout(() => {
      const isValid = code.length > 5; 
      setScanResult({
        success: isValid,
        code,
        message: isValid
          ? "Product verified! This is an authentic item."
          : "Product not found. Please check the code.",
      });
    }, 1000);
  };

  const handleManualVerify = () => {
    if (!productCode.trim()) return;
    verifyProduct(productCode);
  };

  return (
    <MainContainer>
        <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
              Scan Product
            </h1>
            <p className="text-muted-foreground">
              Enter the product code or scan the QR code to verify authenticity.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border border-border space-y-6">
            {/* Camera/Scanner View */}
            <div className="relative">
              {/* The QR Reader div must always exist for Html5Qrcode to bind to, even if hidden */}
               <div id="qr-reader" className={`w-full overflow-hidden rounded-lg ${!scanning && 'hidden'}`}></div>

              {!scanning && (
                <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 relative">
                  <Camera className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 font-medium mb-4">
                    Ready to Scan
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full px-6">
                    <Button
                      onClick={startCamera}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Scan
                    </Button>
                    
                    <Button
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {scanning && (
                <Button
                  onClick={stopScanning}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {cameraError && (
               <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                 {cameraError}
               </div>
            )}

            {/* Manual Input */}
            <div className="space-y-3">
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
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg"
                onClick={handleManualVerify}
                disabled={!productCode.trim()}
              >
                Verify Product
              </Button>
            </div>

             {/* Result Display */}
             {scanResult && (
                <div
                  className={`p-4 rounded-lg border flex items-start gap-4 text-left ${
                    scanResult.success
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  {scanResult.success ? (
                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${
                        scanResult.success ? "text-green-900" : "text-red-900"
                    }`}>
                        {scanResult.success ? "Verified!" : "Not Found"}
                    </h3>
                    <p className={`text-sm mt-1 ${
                        scanResult.success ? "text-green-800" : "text-red-800"
                    }`}>
                        {scanResult.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                        Code: {scanResult.code}
                    </p>
                  </div>
                </div>
             )}

          </div>
        </div>
      </div>
    </MainContainer>
  );
}
