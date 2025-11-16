'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Home, Calendar, Zap, Mail, ChevronRight, MessageCircle, Phone } from 'lucide-react';

const FooterSection: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

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

  const navLinks = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Sun, label: 'About', href: '#about' },
    { icon: Calendar, label: 'Events', href: '#events' },
    { icon: Zap, label: 'Solar Services', href: '#services' },
    { icon: Mail, label: 'Contact', href: '#contact' }
  ];

  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    window.open('https://wa.me/442079460958', '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0F1C] via-[#0F1624] to-[#0A0F1C] text-white overflow-hidden" id="contact">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#00FFD1] rounded-full opacity-40 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B7FF] rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FFD1] rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Main Footer Content */}
        <div
          className={`grid md:grid-cols-3 gap-12 mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Section - Logo & Tagline */}
          <div className="space-y-6">
            <div className="relative inline-block group">
              {/* Holographic glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00B7FF]/30 via-[#00FFD1]/30 to-[#00B7FF]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <Sun className="w-12 h-12 text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.8)] animate-spin-slow" />
                  <div className="absolute inset-0 bg-[#FFD93D] rounded-full blur-xl opacity-50 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#FFD93D] bg-clip-text text-transparent">
                    UK Energy
                  </h2>
                  <div className="h-px w-full bg-gradient-to-r from-[#00B7FF] to-transparent mt-1" />
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-lg font-light tracking-wide">
              Powering a Sustainable Future
            </p>

            {/* Energy Lines Decoration */}
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-px bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent animate-pulse"
                  style={{ animationDelay: `${i * 0.5}s`, width: `${100 - i * 20}%` }}
                />
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {['linkedin', 'twitter', 'facebook'].map((social, index) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-lg backdrop-blur-sm bg-white/5 border border-[#00FFD1]/30 flex items-center justify-center hover:bg-[#00FFD1]/20 hover:border-[#00FFD1] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all duration-300 group"
                >
                  <span className="text-[#00FFD1] text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Middle Section - Navigation */}
          <div className="md:pl-12">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#00B7FF] to-[#00FFD1] rounded-full" />
            </h3>
            
            <nav className="space-y-3">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-[#00FFD1] transition-all duration-300 group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00FFD1]/20 group-hover:border-[#00FFD1] group-hover:shadow-[0_0_15px_rgba(0,255,209,0.3)] transition-all duration-300">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section - WhatsApp Contact */}
          <div className="relative">
            {/* Floating particles around WhatsApp card */}
            <div className="absolute -inset-8 pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-[#25D366] rounded-full opacity-40 animate-orbit"
                  style={{
                    top: `${25 + i * 25}%`,
                    left: `${25 + i * 25}%`,
                    animationDelay: `${i * 0.8}s`
                  }}
                />
              ))}
            </div>

            <div className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-[#25D366]/30 rounded-2xl p-6 shadow-2xl hover:border-[#25D366] hover:shadow-[0_0_30px_rgba(37,211,102,0.2)] transition-all duration-500 group">
              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-[#25D366]/50 to-[#128C7E]/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative space-y-4">
                {/* WhatsApp Icon with Glow */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-[#25D366] rounded-xl blur-md opacity-50 animate-pulse" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white">Chat with us</h4>
                    <p className="text-sm text-gray-400">on WhatsApp</p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-center gap-2 text-sm text-gray-400 backdrop-blur-sm bg-white/5 rounded-lg p-3 border border-white/10">
                  <Phone className="w-4 h-4 text-[#00FFD1]" />
                  <span>+44 20 7946 0958</span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Start Chat
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* QR Code Alternative */}
                <div className="pt-2 text-center">
                  <p className="text-xs text-gray-500">Available 24/7 • Instant Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glowing Divider */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FFD1]/50 to-transparent" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#00B7FF] blur-sm animate-pulse" />
        </div>

        {/* Bottom Bar */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-500 text-sm">
            © 2025 UK Energy. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#privacy" className="hover:text-[#00FFD1] transition-colors duration-300">
              Privacy Policy
            </a>
            <span className="text-gray-700">•</span>
            <a href="#terms" className="hover:text-[#00FFD1] transition-colors duration-300">
              Terms of Service
            </a>
            <span className="text-gray-700">•</span>
            <a href="#cookies" className="hover:text-[#00FFD1] transition-colors duration-300">
              Cookie Policy
            </a>
          </div>

          {/* Energy Badge */}
          <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 rounded-full px-4 py-2 border border-[#00FFD1]/30">
            <Zap className="w-4 h-4 text-[#FFD93D] animate-pulse" />
            <span className="text-xs font-semibold text-gray-400">Powered by Clean Energy</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 10s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default FooterSection;