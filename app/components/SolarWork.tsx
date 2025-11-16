'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Battery, Zap, Cpu, Home, Globe, ArrowRight, DollarSign, LeafyGreen, Shield, Clock, Cloud, TrendingUp } from 'lucide-react';

const HowSolarWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const solarSteps = [
    {
      id: 1,
      icon: Sun,
      title: 'Sunlight Hits Solar Panels',
      description: 'Solar panels made of photovoltaic cells absorb sunlight. These cells convert photons into electrical energy.',
      color: '#FFD93D',
      gradient: 'from-[#FFD93D] to-[#FFA500]'
    },
    {
      id: 2,
      icon: Zap,
      title: 'DC Electricity Generated',
      description: 'Photovoltaic cells generate DC (Direct Current) electricity as electrons flow through the semiconductor material.',
      color: '#00B7FF',
      gradient: 'from-[#00B7FF] to-[#0096FF]'
    },
    {
      id: 3,
      icon: Cpu,
      title: 'Inverter Converts DC to AC',
      description: 'Solar inverter converts DC to AC (Alternating Current). AC is the usable electricity for home appliances.',
      color: '#00FF9C',
      gradient: 'from-[#00FF9C] to-[#00D97E]'
    },
    {
      id: 4,
      icon: Home,
      title: 'Power Your Home + Excess to Grid',
      description: 'Home appliances run on AC power. Extra electricity is sent to the grid via UK Smart Export Guarantee.',
      color: '#9D4EDD',
      gradient: 'from-[#9D4EDD] to-[#7B2CBF]'
    }
  ];

  const benefits = [
    { icon: DollarSign, title: 'Low Bills', description: 'Solar reduces electricity bills by 60–90%', color: '#FFD93D' },
    { icon: LeafyGreen, title: 'Clean Energy', description: 'Zero carbon emissions, completely renewable', color: '#00FF9C' },
    { icon: Shield, title: 'Energy Independence', description: 'No dependency on traditional power grid', color: '#00B7FF' },
    { icon: Clock, title: 'Long Lifespan', description: '25–30 years of reliable power generation', color: '#9D4EDD' },
    { icon: Cloud, title: 'Works in Cloudy Weather', description: 'Modern PV panels generate power even in low sunlight', color: '#7C3AED' },
    { icon: TrendingUp, title: 'Earn Money', description: 'Sell excess electricity with UK Smart Export Guarantee', color: '#F59E0B' }
  ];

  return (
    <div className="bg-black py-20 px-4 md:px-12 overflow-hidden" id='process'>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] bg-clip-text text-transparent">
            How Solar Energy Works
          </h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
            A simple visual explanation of how sunlight becomes electricity
          </p>
        </div>

        {/* Solar Process Steps */}
        <div className="mb-16">
          {/* Desktop */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            {solarSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`relative backdrop-blur-md bg-gray-900/80 border-2 rounded-3xl p-8 transition-all duration-500 ${
                      activeStep === index 
                        ? 'border-transparent shadow-2xl scale-105' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={activeStep === index ? { boxShadow: `0 0 40px ${step.color}40` } : {}}
                  >
                    <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.id}
                    </div>

                    <div className={`mb-6 transition-all duration-500 ${activeStep === index ? 'scale-110' : ''}`}>
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto relative"
                        style={{ backgroundImage: `linear-gradient(to bottom right, ${step.color}20, ${step.color}10)` }}
                      >
                        <step.icon className="w-10 h-10" style={{ color: step.color }} />
                        {activeStep === index && (
                          <div className="absolute inset-0 rounded-2xl animate-ping" style={{ backgroundColor: `${step.color}30` }} />
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 min-h-[56px]">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>

                    {activeStep === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r animate-shimmer"
                        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${step.color}, transparent)`, backgroundSize: '200% 100%' }}
                      />
                    )}
                  </div>
                </div>

                {index < solarSteps.length - 1 && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center" style={{ left: `${(index + 1) * 25 - 3}%` }}>
                    <ArrowRight className={`w-8 h-8 transition-all duration-500 ${activeStep === index ? 'text-[#00B7FF] scale-125' : 'text-gray-500'}`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-6">
            {solarSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className={`backdrop-blur-md bg-gray-900/80 border-2 rounded-3xl p-6 transition-all duration-500 ${activeStep === index ? 'shadow-2xl' : ''}`}
                    style={activeStep === index ? { boxShadow: `0 0 30px ${step.color}40` } : {}}>
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center relative ${activeStep === index ? 'scale-110' : ''} transition-transform duration-500`}
                        style={{ backgroundImage: `linear-gradient(to bottom right, ${step.color}20, ${step.color}10)` }}>
                        <step.icon className="w-8 h-8" style={{ color: step.color }} />
                        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-lg"
                          style={{ backgroundImage: `linear-gradient(to bottom right, ${step.color}, ${step.color}DD)` }}>
                          {step.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {index < solarSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className={`w-1 h-12 rounded-full transition-all duration-500 ${activeStep === index ? 'bg-gradient-to-b from-[#00B7FF] to-[#00FF9C]' : 'bg-gray-700'}`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Video Card - DARK */}
        <div className="mb-24">
          <div className="backdrop-blur-md bg-gray-900/80 border border-white/20 rounded-3xl p-4 md:p-8 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
              Watch How Solar Works in Action
            </h3>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/video/v3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Energy Flow Diagram - DARK */}
        <div className="mb-24">
          <div className="backdrop-blur-md bg-gray-900/80 border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
              Energy Flow Visualization
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {[
                { icon: Sun, label: 'Sunlight', color: '#FFD93D' },
                { icon: Battery, label: 'Solar Panel', color: '#00B7FF' },
                { icon: Cpu, label: 'Inverter', color: '#00FF9C' },
                { icon: Home, label: 'Your Home', color: '#9D4EDD' },
                { icon: Globe, label: 'Power Grid', color: '#10B981' }
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg"
                      style={{ backgroundImage: `linear-gradient(to bottom right, ${item.color}20, ${item.color}10)` }}>
                      <item.icon className="w-10 h-10" style={{ color: item.color }} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-300">{item.label}</p>
                  </div>
                  {i < 4 && (
                    <>
                      <ArrowRight className="w-8 h-8 text-gray-500 hidden md:block" />
                      <div className="w-1 h-8 bg-gray-700 md:hidden" />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits - DARK */}
        <div className="mb-24">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            System Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`backdrop-blur-md bg-gray-900/80 border border-white/20 rounded-2xl p-6 hover:border-transparent hover:shadow-2xl transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 30px ${benefit.color}40`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${benefit.color}20` }}>
                  <benefit.icon className="w-7 h-7" style={{ color: benefit.color }} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - DARK */}
        <div className="text-center">
          <div className="backdrop-blur-md bg-gray-900/80 border border-white/20 rounded-3xl p-12 text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to power your home with clean solar energy?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of homeowners saving money and helping the planet
            </p>
            <button className="px-10 py-5 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FFA500] to-[#FFD93D] font-bold text-gray-900 text-lg hover:shadow-[0_0_40px_rgba(255,217,61,0.8)] transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" })}>
              Get a Free Solar Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes shimmer { 
          0% { background-position: -200% center; } 
          100% { background-position: 200% center; } 
        }
        .animate-shimmer { 
          animation: shimmer 3s linear infinite; 
        }
      `}</style>
    </div>
  );
};

export default HowSolarWorks;