'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Wind, BarChart3, Wrench, Grid3x3, Zap, ArrowRight, Sparkles, CheckCircle2, ArrowDown } from 'lucide-react';

interface Service {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  process: string[];
  color: string;
  gradient: string;
}

const ServicesComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services: Service[] = [
    {
      id: 1,
      icon: Sun,
      title: 'Solar Panel Installation',
      description: 'Our certified engineers install high-efficiency solar panels at your home or office',
      process: [
        'Free site survey & energy audit',
        'Custom system design (rooftop/off-grid)',
        'Premium panels + inverter installation',
        'Grid connection & net metering setup',
        '25-year performance warranty'
      ],
      color: '#FFD93D',
      gradient: 'from-[#FFD93D] to-[#FFA500]'
    },
    {
      id: 2,
      icon: Wind,
      title: 'Wind Turbine Setup',
      description: 'Small and medium wind turbines for residential and commercial spaces',
      process: [
        'Wind speed & location analysis',
        'Turbine selection (1kW - 50kW)',
        'Foundation & tower installation',
        'Battery backup integration',
        'Annual maintenance contract'
      ],
      color: '#00B7FF',
      gradient: 'from-[#00B7FF] to-[#0096FF]'
    },
    {
      id: 3,
      icon: BarChart3,
      title: 'Energy Monitoring System',
      description: 'Real-time app to track how much electricity is generated and savings achieved',
      process: [
        'Smart meter installation',
        'Mobile app setup (iOS/Android)',
        'Daily/weekly/monthly reports',
        'Alert on low production',
        'Remote system health check'
      ],
      color: '#00FF9C',
      gradient: 'from-[#00FF9C] to-[#00D97E]'
    },
    {
      id: 4,
      icon: Wrench,
      title: 'Maintenance & Cleaning',
      description: 'Regular cleaning and check-ups ensure your system runs for 25+ years',
      process: [
        'Bi-annual panel cleaning',
        'Inverter & wiring inspection',
        'Performance optimization',
        'Instant repair support',
        'Free replacement under warranty'
      ],
      color: '#9D4EDD',
      gradient: 'from-[#9D4EDD] to-[#7B2CBF]'
    },
    {
      id: 5,
      icon: Grid3x3,
      title: 'Smart Grid Integration',
      description: 'Connect to the grid and sell excess power (net metering)',
      process: [
        'DISCOM approval assistance',
        'Bi-directional meter installation',
        'Monthly bill credit setup',
        'Excess energy sale support',
        'Government subsidy guidance'
      ],
      color: '#00FFD1',
      gradient: 'from-[#00FFD1] to-[#00B7A8]'
    },
    {
      id: 6,
      icon: Zap,
      title: 'EV Charging Station',
      description: 'Install fast EV chargers at home or office – charge with solar',
      process: [
        'Load calculation & wiring',
        'Level 2 charger installation',
        'Solar + grid hybrid charging',
        'App-controlled scheduling',
        'Commercial charging setup'
      ],
      color: '#FF6B6B',
      gradient: 'from-[#FF6B6B] to-[#EE5A6F]'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#0A0F1C] via-[#0F1624] to-[#0A0F1C] text-white py-20 px-4 md:px-12" id='services'>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 rounded-full px-6 py-2 border border-[#00FFD1]/30">
              <Sparkles className="w-4 h-4 text-[#00FFD1] animate-pulse" />
              <span className="text-sm font-semibold text-[#00FFD1]">Our Services</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#FFD93D] bg-clip-text text-transparent">
              How We Deliver
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Complete solar solution for your home or business – from survey to setup, we handle everything
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                hoveredCard === service.id 
                  ? 'transform -translate-y-2 shadow-2xl border-[#FFD93D]/50' 
                  : 'hover:transform hover:-translate-y-1'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                boxShadow: hoveredCard === service.id 
                  ? `0 0 40px ${service.color}40`
                  : '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div 
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Process Steps */}
              <div className="space-y-2">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF9C] flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Hover Arrow */}
              <div className={`mt-6 flex justify-end transition-all duration-300 ${
                hoveredCard === service.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#00B7FF] flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-md bg-white/5 border border-[#00FFD1]/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Solar Journey Today
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              Free consultation • No upfront cost • Pay from savings
            </p>

            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#00FFD1] font-bold text-lg text-black hover:shadow-[0_0_40px_rgba(255,217,61,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Book Free Site Survey
              <ArrowDown className="w-5 h-5" />
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF9C]" />
                <span>MNRE Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF9C]" />
                <span>10,000+ Installations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF9C]" />
                <span>25-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;