'use client'

import React, { useState, useEffect } from 'react';
import { Sun, Battery, Globe, TrendingUp, CheckCircle, MapPin, Zap, LeafyGreen, Home, DollarSign, Shield, Sparkles } from 'lucide-react';

const SolarInfoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const solarCountries = [
    { country: '🇨🇳 China', capacity: '580+ GW', position: 'top-1/3 left-[75%]' },
    { country: '🇺🇸 USA', capacity: '180+ GW', position: 'top-1/3 left-[15%]' },
    { country: '🇯🇵 Japan', capacity: '85 GW', position: 'top-1/4 left-[80%]' },
    { country: '🇩🇪 Germany', capacity: '82 GW', position: 'top-1/4 left-[48%]' },
    { country: '🇮🇳 India', capacity: '85+ GW', position: 'top-1/2 left-[65%]' },
    { country: '🇬🇧 UK', capacity: '15+ GW', position: 'top-1/4 left-[45%]' }
  ];

  const solarCities = [
    { name: 'Los Angeles', desc: "World's largest urban solar" },
    { name: 'Tokyo', desc: 'Mandatory solar for new buildings' },
    { name: 'Shanghai', desc: 'Massive solar infrastructure' },
    { name: 'Berlin', desc: 'Leading EU solar adoption' },
    { name: 'Delhi', desc: 'Rapid solar expansion' },
    { name: 'London', desc: 'EV + solar integration hub' }
  ];

  const benefits = [
    { icon: DollarSign, title: '70-90% Lower Bills', desc: 'Massive savings on electricity costs' },
    { icon: Home, title: 'Property Value Boost', desc: 'Increases home resale value' },
    { icon: LeafyGreen, title: 'Zero Emissions', desc: 'Complete carbon neutrality' },
    { icon: Battery, title: 'Battery Backup', desc: 'Energy storage for 24/7 power' },
    { icon: Shield, title: 'Energy Independence', desc: 'No grid dependency' },
    { icon: Sparkles, title: 'UK Tax Credits', desc: 'Smart Export Guarantee benefits' }
  ];

  const whySolarPoints = [
    'Reduces electricity bills by 60–90%',
    'Renewable & unlimited energy source',
    'Zero carbon emissions',
    'Works even in low-sunlight countries like UK',
    'Minimal maintenance, 25–30 years lifetime',
    'Solar is now the cheapest electricity source (IEA 2024)'
  ];

  const futureTimeline = [
    { year: '2025', event: 'Solar becomes primary residential choice', progress: 100 },
    { year: '2030', event: 'Solar + battery dominates new homes', progress: 85 },
    { year: '2035', event: '1/3 of world electricity from solar', progress: 70 },
    { year: '2040', event: 'Solar #1 global power source', progress: 55 },
    { year: '2050', event: 'Every home has solar + storage', progress: 40 }
  ];

  return (
    <div className="bg-gradient-to-b from-[#0A0F1C] via-[#0F1624] to-[#0A0F1C] text-white overflow-hidden" id="detail">
        <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-a-field-under-a-blue-sky-4899-large.mp4"
            type="video/mp4"
          />
          Your browser does not support video.
        </video>
        <div className="absolute inset-0 bg-white/70" />
      </div>
      {/* Section 1: Why Use Solar Energy */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] bg-clip-text text-transparent">
            Why Use Solar Energy?
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">The smartest investment for your home and planet</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {whySolarPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.8)] group-hover:shadow-[0_0_25px_rgba(0,255,156,1)]" />
                  <p className="text-gray-300 text-lg leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            
        {/* Right: Video Instead of Sun */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="/video/v2.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>
      {/* Section 2: Why We Need Solar in the Future */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD93D] via-[#00FF9C] to-[#00B7FF] bg-clip-text text-transparent">
          Why Solar is Our Future
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">The energy revolution is happening now</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-white/5 border border-[#00B7FF]/30 rounded-2xl p-8 hover:border-[#00B7FF] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,183,255,0.3)]">
            <TrendingUp className="w-12 h-12 text-[#00FF9C] mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-[#FFD93D]">Rising Energy Demand</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Global electricity demand will increase <span className="text-[#00FF9C] font-bold">62% by 2050</span>. 
              Traditional sources cannot keep up with growth. Solar offers unlimited, scalable power.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-[#FFD93D]/30 rounded-2xl p-8 hover:border-[#FFD93D] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,217,61,0.3)]">
            <LeafyGreen className="w-12 h-12 text-[#00B7FF] mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-[#00B7FF]">Climate Solution</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Fossil fuels running out by <span className="text-[#FFD93D] font-bold">2070-2100</span>. 
              Solar is key to stopping climate change and achieving carbon neutrality worldwide.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          {futureTimeline.map((item, idx) => (
            <div key={idx} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00FF9C] transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-[#00FF9C]">{item.year}</span>
                  <p className="text-gray-300 mt-1">{item.event}</p>
                </div>
                <span className="text-[#FFD93D] font-bold text-xl">{item.progress}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00B7FF] via-[#00FF9C] to-[#FFD93D] rounded-full transition-all duration-1000 group-hover:animate-pulse"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Global Solar Usage */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#00FF9C] via-[#00B7FF] to-[#FFD93D] bg-clip-text text-transparent">
          Global Solar Leaders
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Countries and cities leading the solar revolution</p>

        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00B7FF]/30 via-transparent to-[#FFD93D]/30" />
          </div>
          
          <h3 className="text-2xl font-bold mb-8 text-center text-[#00B7FF]">Top Solar Countries 2024</h3>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {solarCountries.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveCountry(item.country)}
                onMouseLeave={() => setActiveCountry(null)}
                className={`backdrop-blur-sm bg-white/10 border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  activeCountry === item.country
                    ? 'border-[#00FF9C] shadow-[0_0_30px_rgba(0,255,156,0.4)] scale-105'
                    : 'border-white/20 hover:border-[#FFD93D]'
                }`}
              >
                <Globe className="w-8 h-8 text-[#00FF9C] mb-3" />
                <h4 className="text-xl font-bold mb-2">{item.country}</h4>
                <p className="text-[#FFD93D] text-2xl font-bold">{item.capacity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {solarCities.map((city, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00B7FF] hover:shadow-[0_0_20px_rgba(0,183,255,0.3)] transition-all duration-300 group"
            >
              <MapPin className="w-8 h-8 text-[#FFD93D] mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold mb-2 text-white">{city.name}</h4>
              <p className="text-gray-400">{city.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Future Prediction 2050 */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD93D] to-[#00FF9C] bg-clip-text text-transparent">
          The 2050 Vision
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">A glimpse into the solar-powered future</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sun, title: 'Solar #1', desc: 'Primary global power source' },
            { icon: TrendingUp, title: 'Costs Down', desc: 'Panels cheaper every year' },
            { icon: Battery, title: 'Solar + Storage', desc: 'Every home powered 24/7' },
            { icon: Zap, title: 'City Power', desc: 'Solar farms power entire cities' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:scale-105 hover:border-[#00FF9C] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00B7FF]/20 rounded-full blur-2xl group-hover:bg-[#00FF9C]/30 transition-colors" />
              <item.icon className="w-12 h-12 text-[#00FF9C] mb-4 relative z-10 group-hover:rotate-12 transition-transform" />
              <h4 className="text-xl font-bold mb-2 relative z-10">{item.title}</h4>
              <p className="text-gray-400 relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 backdrop-blur-md bg-gradient-to-r from-[#00B7FF]/10 via-[#FFD93D]/10 to-[#00FF9C]/10 border border-[#00FF9C]/30 rounded-3xl p-12 text-center">
          <Sparkles className="w-16 h-16 text-[#FFD93D] mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold mb-4">Every Home. Clean Energy. Zero Emissions.</h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            By 2050, solar + EV + battery storage will be the standard. The clean energy future is inevitable, and it starts with your decision today.
          </p>
        </div>
      </section>

      {/* Section 5: Benefits of Switching */}
      <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#00B7FF] to-[#FFD93D] bg-clip-text text-transparent">
          Benefits of Going Solar
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Transform your energy, transform your life</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#00FF9C] hover:shadow-[0_0_30px_rgba(0,255,156,0.2)] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00B7FF] to-[#00FF9C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,156,0.4)]">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-white">{benefit.title}</h4>
              <p className="text-gray-400 text-lg">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-20 px-4 md:px-12 max-w-5xl mx-auto">
        <div className="backdrop-blur-md bg-gradient-to-br from-[#00B7FF]/20 via-[#FFD93D]/20 to-[#00FF9C]/20 border border-[#00FF9C]/50 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00B7FF] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD93D] rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Take Control of Your Energy Future
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of UK homeowners who've made the switch to clean, affordable solar energy
            </p>

            <button className="px-12 py-5 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FFA500] to-[#FFD93D] font-bold text-gray-900 text-xl hover:shadow-[0_0_40px_rgba(255,217,61,0.8)] transition-all duration-300 transform hover:scale-105 animate-pulse-glow mb-6"
            onClick={() => document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" })}>
              Get Your Solar Estimate
            </button>

            <div className="flex items-center justify-center space-x-3 text-[#00FF9C]">
              <Zap className="w-6 h-6" />
              <span className="text-lg font-semibold">Call Today: +44 20 7946 0958</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 217, 61, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 217, 61, 0.8);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default SolarInfoSection;