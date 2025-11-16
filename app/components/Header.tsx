'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Details', href: '#detail' },
    { label: 'Work Process', href: '#process' },
    { label: 'Live', href: '#videos' },
    { label: 'Services', href: '#services' },
    { label: 'FeedBack', href: '#feedback' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-md bg-white/10 shadow-lg shadow-black/10'
            : 'backdrop-blur-sm bg-white/5'
        } border-b border-white/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer animate-fadeIn">
              <div className="relative">
                <Sun className="w-10 h-10 text-[#FFD93D] drop-shadow-[0_0_12px_rgba(255,217,61,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(255,217,61,0.8)] transition-all duration-300 group-hover:rotate-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B7FF] to-[#00FF9C] opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] bg-clip-text text-transparent">
                  UK Energy
                </h1>
                <p className="text-xs text-gray-300/80 font-light tracking-wider">Solar Solutions</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="relative text-white/90 hover:text-white font-medium text-sm group transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00B7FF] to-[#FFD93D] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Right Side - Contact Info & Button */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/80">
                <Phone className="w-4 h-4 text-[#00FF9C]" />
                <div>
                  <p className="text-xs text-gray-400 font-light">Call Today</p>
                  <p className="text-sm font-bold">+44 20 7946 0958</p>
                </div>
              </div>
              
              <button className="relative group px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FFA500] font-semibold text-gray-900 hover:shadow-[0_0_25px_rgba(255,217,61,0.6)] transition-all duration-300 overflow-hidden"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Contact Us</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FFD93D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Gradient overlay below header */}
        <div className="absolute -bottom-20 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="self-end text-white/80 hover:text-white p-2 mb-8"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col space-y-6 flex-1">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-xl font-medium hover:text-[#00FF9C] transition-colors duration-300 border-b border-white/10 pb-4"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3 text-white/80 bg-white/5 p-4 rounded-lg">
                <Phone className="w-5 h-5 text-[#00FF9C]" />
                <div>
                  <p className="text-xs text-gray-400">Call Today</p>
                  <p className="text-sm font-bold">+44 20 7946 0958</p>
                </div>
              </div>
              <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FFA500] font-bold text-gray-900 hover:shadow-[0_0_25px_rgba(255,217,61,0.6)] transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Background Video */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Replace with your actual video URL */}
          <source src="/video/v1.mp4" type="video/mp4" />
          
          {/* Fallback */}
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay + Gradient Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/60 to-gray-900/80" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B7FF] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD93D] rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeIn">
              Power Your Future with
              <span className="block bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] bg-clip-text text-transparent">
                Clean Solar Energy
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-fadeIn">
              Join thousands of UK homes making the switch to sustainable, cost-effective solar solutions
            </p>
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00FF9C] to-[#00B7FF] font-bold text-gray-900 hover:shadow-[0_0_30px_rgba(0,255,156,0.6)] transition-all duration-300 animate-fadeIn"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Get Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default Header;