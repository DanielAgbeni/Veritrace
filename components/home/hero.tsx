import React from 'react';

const HeroComponent = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">Real-time Tracking</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Complete Supply Chain
              <span className="block text-primary">Tracebility</span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Track every product from origin to destination. Build trust with transparent, verifiable supply chain data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-slate-900">99.9%</div>
                <div className="text-sm text-slate-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">500K+</div>
                <div className="text-sm text-slate-600">Products Tracked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-600">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Right Visual - Supply Chain Flow */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Main vertical flow line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2"></div>
            
            {/* Step 1 - Origin */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-200 whitespace-nowrap">
                  <div className="text-xs text-slate-500">Step 1</div>
                  <div className="font-semibold text-slate-900">Origin</div>
                </div>
              </div>
            </div>

            {/* Step 2 - Processing */}
            <div className="absolute top-1/3 left-0 right-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-200 whitespace-nowrap">
                  <div className="text-xs text-slate-500">Step 2</div>
                  <div className="font-semibold text-slate-900">Processing</div>
                </div>
              </div>
            </div>

            {/* Step 3 - Transit */}
            <div className="absolute top-2/3 left-0 right-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-200 whitespace-nowrap">
                  <div className="text-xs text-slate-500">Step 3</div>
                  <div className="font-semibold text-slate-900">In Transit</div>
                </div>
              </div>
            </div>

            {/* Step 4 - Delivery */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-violet-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md border border-slate-200 whitespace-nowrap">
                  <div className="text-xs text-slate-500">Step 4</div>
                  <div className="font-semibold text-slate-900">Delivered</div>
                </div>
              </div>
            </div>

            {/* Floating info cards */}
            <div className="absolute top-10 right-0 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="text-xs text-slate-500">Live Tracking</div>
                  <div className="font-medium text-slate-900">Shipment #TR-4821</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 right-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <div>
                  <div className="text-xs text-slate-500">Quality Check</div>
                  <div className="font-medium text-slate-900">Verified ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-20"></div>
    </div>
  );
};

export default HeroComponent;