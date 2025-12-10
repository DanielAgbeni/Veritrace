"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, Upload, X, CheckCircle, AlertCircle } from "lucide-react";

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

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }

      const result = await html5QrCodeRef.current.scanFile(file, false);
      setProductCode(result);
      verifyProduct(result);
    } catch (err) {
      setCameraError("No QR code found in image. Please try another image.");
      console.error("File scan error:", err);
    }
  };

  const verifyProduct = (code: string) => {
    // Simulate API verification
    setTimeout(() => {
      const isValid = code.length > 5; // Simple validation
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Scan Product</h1>
          <p className="text-gray-600">
            Scan QR code or enter product code to verify authenticity
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Camera/Scanner View */}
          <div className="relative">
            <div
              id="qr-reader"
              className={`w-full aspect-square rounded-lg overflow-hidden ${
                scanning ? "block" : "hidden"
              }`}
            />

            {!scanning && (
              <div className="aspect-square w-full bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 relative">
                <Camera className="w-16 h-16 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 font-medium mb-4">
                  Ready to Scan
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Start Camera
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </button>
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
              <button
                onClick={stopScanning}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {cameraError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {cameraError}
            </div>
          )}

          {/* Manual Input */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Or enter product code manually"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            <button
              onClick={handleManualVerify}
              disabled={!productCode.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              Verify Product
            </button>
          </div>

          {/* Result Display */}
          {scanResult && (
            <div
              className={`p-4 rounded-lg border-2 ${
                scanResult.success
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                {scanResult.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3
                    className={`font-semibold mb-1 ${
                      scanResult.success ? "text-green-900" : "text-red-900"
                    }`}
                  >
                    {scanResult.success ? "Verified!" : "Not Found"}
                  </h3>
                  <p
                    className={`text-sm ${
                      scanResult.success ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {scanResult.message}
                  </p>
                  <p className="text-xs mt-2 font-mono text-gray-600">
                    Code: {scanResult.code}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}