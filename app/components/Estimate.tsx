'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Home, Zap, TrendingUp, Leaf, DollarSign, Clock, Compass, Calculator, Sparkles, ChevronDown } from 'lucide-react';

interface FormData {
  location: string;
  homeType: string;
  monthlyBill: string;
  roofSize: string;
  roofDirection: string;
  sunlightHours: string;
}

interface EstimateResult {
  systemSize: number;
  installationCost: number;
  monthlySavings: number;
  annualSavings: number;
  roiYears: number;
  co2Reduction: number;
}

const SolarEstimateCalculator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: '',
    homeType: '',
    monthlyBill: '',
    roofSize: '',
    roofDirection: '',
    sunlightHours: '4.5'
  });
  const [results, setResults] = useState<EstimateResult | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setIsVisible(true);

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEstimate = () => {
    setIsCalculating(true);

    // Simulate calculation
    setTimeout(() => {
      const monthlyBill = parseFloat(formData.monthlyBill) || 0;
      const roofSizeMultiplier = formData.roofSize === 'small' ? 0.7 : formData.roofSize === 'large' ? 1.3 : 1;
      const homeTypeMultiplier = formData.homeType === 'commercial' ? 2 : formData.homeType === 'apartment' ? 0.6 : 1;

      const systemSize = Math.round((monthlyBill / 30) * roofSizeMultiplier * homeTypeMultiplier * 10) / 10;
      const installationCost = Math.round(systemSize * 1200);
      const monthlySavings = Math.round(monthlyBill * 0.75);
      const annualSavings = monthlySavings * 12;
      const roiYears = Math.round((installationCost / annualSavings) * 10) / 10;
      const co2Reduction = Math.round(systemSize * 1.2 * 1000);

      setResults({
        systemSize,
        installationCost,
        monthlySavings,
        annualSavings,
        roiYears,
        co2Reduction
      });

      setShowResults(true);
      setIsCalculating(false);
    }, 1500);
  };

  const isFormValid = formData.location && formData.homeType && formData.monthlyBill && formData.roofSize && formData.roofDirection;

  return (
    <div className="relative bg-black overflow-hidden py-20 px-4 md:px-12" id="estimate">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 rounded-full px-6 py-2 border border-[#00FFD1]/30">
              <Calculator className="w-4 h-4 text-[#00FFD1] animate-pulse" />
              <span className="text-sm font-semibold text-[#00B7FF]">Solar Calculator</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#FFD93D] bg-clip-text text-transparent">
              Get Your Solar Estimate
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent rounded-full blur-sm animate-pulse" />
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Calculate your recommended system size, cost, and yearly savings in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form Card - Dark Mode */}
          <div
            className={`backdrop-blur-md bg-gray-900/90 border border-gray-800 rounded-3xl p-8 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B7FF] to-[#00FFD1] flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Your Details</h3>
            </div>

            <div className="space-y-5">
              {/* Location */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Location / City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., London, Manchester"
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/20 bg-white/5 text-white placeholder-gray-500 focus:border-[#00FFD1] focus:outline-none transition-all duration-300 shadow-sm"
                  />
                  <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Home Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Home Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['house', 'apartment', 'commercial'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('homeType', type)}
                      className={`py-3 rounded-xl font-semibold transition-all duration-300 ${formData.homeType === type
                          ? 'bg-gradient-to-r from-[#00B7FF] to-[#00FFD1] text-white shadow-lg shadow-[#00B7FF]/40'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Bill */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Monthly Electricity Bill (£)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.monthlyBill}
                    onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
                    placeholder="e.g., 150"
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/20 bg-white/5 text-white placeholder-gray-500 focus:border-[#00FFD1] focus:outline-none transition-all duration-300 shadow-sm"
                  />
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Roof Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Roof Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleInputChange('roofSize', size)}
                      className={`py-3 rounded-xl font-semibold transition-all duration-300 ${formData.roofSize === size
                          ? 'bg-gradient-to-r from-[#00B7FF] to-[#00FFD1] text-white shadow-lg shadow-[#00B7FF]/40'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        }`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roof Direction */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Roof Direction
                </label>
                <div className="relative">
                  <select
                    value={formData.roofDirection}
                    onChange={(e) => handleInputChange('roofDirection', e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/20 bg-white/5 text-white focus:border-[#00FFD1] focus:outline-none transition-all duration-300 appearance-none shadow-sm"
                  >
                    <option value="" className="bg-gray-900">Select direction...</option>
                    <option value="south" className="bg-gray-900">South (Best)</option>
                    <option value="east" className="bg-gray-900">East</option>
                    <option value="west" className="bg-gray-900">West</option>
                    <option value="north" className="bg-gray-900">North</option>
                  </select>
                  <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Sunlight Hours */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Average Sunlight Hours (Auto-filled)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={`${formData.sunlightHours} hours/day`}
                    readOnly
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/20 bg-white/5 text-gray-400 shadow-sm"
                  />
                  <Sun className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFD93D]" />
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateEstimate}
                disabled={!isFormValid || isCalculating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#00B7FF] text-white font-bold text-lg hover:shadow-[0_0_60px_rgba(0,255,209,0.8),0_0_100px_rgba(0,183,255,0.6)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group shadow-[0_0_30px_rgba(0,255,209,0.5)]"
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Calculate Estimate
                    <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Card - Dark Mode */}
          <div
            className={`backdrop-blur-md bg-gray-900/90 border border-gray-800 rounded-3xl p-8 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00B7FF]/20 to-[#00FFD1]/20 flex items-center justify-center">
                    <Calculator className="w-16 h-16 text-[#00B7FF]" />
                  </div>
                  <div className="absolute inset-0 bg-[#00FFD1] rounded-full blur-2xl opacity-30 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Calculate</h3>
                <p className="text-gray-400 max-w-sm">
                  Fill in your details on the left and click "Calculate Estimate" to see your personalized solar energy savings
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FFD1] to-[#00B7FF] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Your Estimate</h3>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                    <Zap className="w-8 h-8 text-[#FFD93D] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">System Size</p>
                    <p className="text-3xl font-bold text-white">{results?.systemSize} kW</p>
                  </div>

                  <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                    <DollarSign className="w-8 h-8 text-[#00FF9C] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Installation Cost</p>
                    <p className="text-3xl font-bold text-white">£{results?.installationCost.toLocaleString()}</p>
                  </div>

                  <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                    <TrendingUp className="w-8 h-8 text-[#00B7FF] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Monthly Savings</p>
                    <p className="text-3xl font-bold text-white">£{results?.monthlySavings}</p>
                  </div>

                  <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                    <DollarSign className="w-8 h-8 text-[#9D4EDD] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Annual Savings</p>
                    <p className="text-3xl font-bold text-white">£{results?.annualSavings.toLocaleString()}</p>
                  </div>
                </div>

                {/* ROI & CO2 */}
                <div className="space-y-4">
                  <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-[#00B7FF]" />
                        <div>
                          <p className="text-sm text-gray-400">Return on Investment</p>
                          <p className="text-2xl font-bold text-white">{results?.roiYears} years</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Leaf className="w-6 h-6 text-[#00FF9C]" />
                        <div>
                          <p className="text-sm text-gray-400">CO₂ Reduction (Annual)</p>
                          <p className="text-2xl font-bold text-white">{results?.co2Reduction} kg</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Chart Visualization */}
                <div className="backdrop-blur-sm bg-gray-800/80 rounded-2xl p-5 border border-gray-700">
                  <p className="text-sm font-semibold text-gray-300 mb-4">Energy Production Curve</p>
                  <div className="relative h-32">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00FFD1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00FFD1" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 80 Q 75 20, 150 30 T 300 80"
                        fill="url(#gradient-dark)"
                        stroke="#00FFD1"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                      <span>6am</span>
                      <span>12pm</span>
                      <span>6pm</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setFormData({
                      location: '',
                      homeType: '',
                      monthlyBill: '',
                      roofSize: '',
                      roofDirection: '',
                      sunlightHours: '4.5'
                    });
                    setResults(null);
                    setShowResults(false);
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00FF9C] to-[#00B7FF] text-black font-bold text-lg hover:shadow-[0_0_50px_rgba(0,255,156,0.8),0_0_80px_rgba(0,183,255,0.6)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(0,255,156,0.5)]"
                >
                  Clear
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.6;
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SolarEstimateCalculator;