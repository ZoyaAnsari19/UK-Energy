'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Play, MapPin, Globe } from 'lucide-react';
import Image from 'next/image';

interface VideoItem {
  id: string;
  name: string;
  displayName: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  type: 'country' | 'city';
  flag?: string;
}

interface CityDetail {
  id: string;
  name: string;
  description: string;
  details: string;
  imageUrl: string;
}

const SolarVideo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Countries (Real Videos)
  const solarCountries = [
    { country: 'China', flag: 'CN', capacity: '580+ GW', videoUrl: '/video/countries/china.mp4', id: 'china' },
    { country: 'USA', flag: 'US', capacity: '180+ GW', videoUrl: '/video/countries/USA.mp4', id: 'usa' },
    { country: 'Japan', flag: 'JP', capacity: '85 GW', videoUrl: '/video/countries/japan.mp4', id: 'japan' },
    { country: 'Germany', flag: 'DE', capacity: '82 GW', videoUrl: '/video/countries/german.mp4', id: 'germany' },
    { country: 'India', flag: 'IN', capacity: '85+ GW', videoUrl: '/video/countries/ind.mp4', id: 'india' },
    { country: 'UK', flag: 'GB', capacity: '15+ GW', videoUrl: '/video/countries/uk.mp4', id: 'uk' }
  ];

  // Cities (Static Images + Details)
  // const solarCities = [
  //   { name: 'Los Angeles', desc: "World's largest urban solar", imageUrl: '/img/img1.jpg', id: 'la' },
  //   { name: 'Tokyo', desc: 'Mandatory solar for new buildings', imageUrl: '/img/img2.jpg', id: 'tokyo' },
  //   { name: 'Shanghai', desc: 'Massive solar infrastructure', imageUrl: '/img/img3.jpg', id: 'shanghai' },
  //   { name: 'Berlin', desc: 'Leading EU solar adoption', imageUrl: '/img/img4.jpg', id: 'berlin' },
  //   { name: 'Delhi', desc: 'Rapid solar expansion', imageUrl: '/img/img5.jpg', id: 'delhi' },
  //   { name: 'London', desc: 'EV + solar integration hub', imageUrl: '/img/img6.jpg', id: 'london' }
  // ];

  // Detailed Cities for Spotlight
  const cityDetails: CityDetail[] = [
    {
      id: 'la',
      name: 'Los Angeles',
      description: "World's largest urban solar",
      details: 'Over 500 MW of rooftop solar, powering 150,000+ homes annually. Home to the largest solar-powered stadium.',
      imageUrl: '/img/img1.jpg'
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      description: 'Mandatory solar for new buildings',
      details: 'From 2025, all new homes must include solar panels. Aims to install 1.3 million systems by 2030.',
      imageUrl: '/img/img2.jpg'
    },
    {
      id: 'shanghai',
      name: 'Shanghai',
      description: 'Massive solar infrastructure',
      details: 'Hosts Asia’s largest floating solar farm (150 MW). Plans to reach 2 GW urban solar by 2030.',
      imageUrl: '/img/img3.jpg'
    },
    {
      id: 'berlin',
      name: 'Berlin',
      description: 'Leading EU solar adoption',
      details: '100% renewable energy goal by 2035. Over 40,000 solar installations and growing rapidly.',
      imageUrl: '/img/img4.jpg'
    },
    {
      id: 'delhi',
      name: 'Delhi',
      description: 'Rapid solar expansion',
      details: '10 GW solar target by 2030. Over 50,000 rooftops already solar-powered under government schemes.',
      imageUrl: '/img/img5.jpg'
    },
    {
      id: 'london',
      name: 'London',
      description: 'EV + solar integration hub',
      details: 'Solar-powered EV charging stations across the city. 1 in 5 new homes built with solar panels.',
      imageUrl: '/img/img6.jpg'
    }
  ];

  // Combine all items for main slider
  const allItems: VideoItem[] = [
    ...solarCountries.map(item => ({
      id: item.id,
      name: item.country,
      displayName: item.country,
      description: `${item.capacity} solar capacity`,
      videoUrl: item.videoUrl,
      type: 'country' as const,
      flag: item.flag
    })),
    // ...solarCities.map(item => ({
    //   id: item.id,
    //   name: item.name,
    //   displayName: item.name,
    //   description: item.desc,
    //   imageUrl: item.imageUrl,
    //   type: 'city' as const
    // }))
  ];

  // Fade in + Auto-cycle for main slider
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % allItems.length;
      handleVideoChange(nextIndex);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIndex, allItems.length]);

  // Auto-cycle for City Spotlight
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCityIndex((prev) => (prev + 1) % cityDetails.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeIndex]);

  const handleVideoChange = (newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 300);
  };

  const currentItem = allItems[activeIndex];
  const isVideo = currentItem.type === 'country' && currentItem.videoUrl;
  const currentCity = cityDetails[activeCityIndex];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 px-4 md:px-12 overflow-hidden" id='videos'>
      <div className="max-w-7xl mx-auto space-y-24">

        {/* === SECTION 1: Countries + Cities Slider (Unchanged) === */}
        <div>
          {/* Title */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] bg-clip-text text-transparent">
              Solar Energy Around the World
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Countries & Cities Leading the Solar Revolution
            </p>
          </div>

          {/* Main Media Player */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />

              {isVideo ? (
                <video
                  ref={videoRef}
                  key={currentItem.id}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={currentItem.videoUrl}
                />
              ) : (
                <div className={`relative w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <Image
                    src={currentItem.imageUrl || '/images/placeholder.jpg'}
                    alt={currentItem.displayName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}

              <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-[#00B7FF]/40 via-[#FFD93D]/40 to-[#00FF9C]/40 pointer-events-none shadow-[0_0_30px_rgba(0,183,255,0.3)]" />
            </div>

            {/* Info */}
            <div className={`text-center mb-12 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                {currentItem.flag && <span className="text-5xl">{currentItem.flag}</span>}
                {currentItem.displayName}
              </h3>
              <p className="text-xl text-gray-300 relative inline-block">
                {currentItem.description}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] rounded-full shadow-[0_0_15px_rgba(0,183,255,0.6)]" />
              </p>
            </div>

            {/* Horizontal Selector */}
            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-6 px-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleVideoChange(index)}
                    className={`flex-shrink-0 snap-center transition-all duration-300 ${index === activeIndex ? 'scale-110' : 'scale-100 opacity-70 hover:opacity-100'}`}
                  >
                    <div
                      className={`relative backdrop-blur-md rounded-2xl p-5 border-2 transition-all duration-300 min-w-[180px] sm:min-w-[200px] ${index === activeIndex
                          ? 'border-[#00B7FF] bg-gradient-to-br from-[#00B7FF]/20 via-[#FFD93D]/10 to-[#00FF9C]/20 shadow-[0_0_25px_rgba(0,183,255,0.4)]'
                          : 'border-white/20 bg-white/5 hover:border-[#FFD93D]/50 hover:shadow-lg'
                        }`}
                    >
                      {index === activeIndex && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF9C] rounded-full animate-ping" />
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        {item.type === 'country' ? (
                          <Globe className={`w-5 h-5 ${index === activeIndex ? 'text-[#00B7FF]' : 'text-gray-400'}`} />
                        ) : (
                          <MapPin className={`w-5 h-5 ${index === activeIndex ? 'text-[#FFD93D]' : 'text-gray-400'}`} />
                        )}
                        <span className={`font-semibold text-sm truncate ${index === activeIndex ? 'text-white' : 'text-gray-300'}`}>
                          {item.flag ? `${item.flag} ${item.displayName}` : item.displayName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                      {index === activeIndex && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B7FF] via-[#FFD93D] to-[#00FF9C] rounded-b-2xl animate-shimmer" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
            </div>

            {/* Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8 text-gray-400">
              <div className="flex items-center gap-1">
                {isVideo ? (
                  <>
                    <div className="w-2 h-2 bg-[#00FF9C] rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Auto-playing</span>
                  </>
                ) : (
                  <span className="text-sm font-medium">Image</span>
                )}
              </div>
              <span className="text-sm">•</span>
              <span className="text-sm">{activeIndex + 1} / {allItems.length}</span>
            </div>
          </div>
        </div>

        {/* === SECTION 2: Cities Spotlight (NEW) === */}
        <div className="mt-32">
          {/* Title */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#FFD93D] via-[#00FF9C] to-[#00B7FF] bg-clip-text text-transparent">
              Solar Cities of the Future
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Urban centers leading the clean energy revolution with cutting-edge solar technology
            </p>
          </div>

          {/* Layout: Left Image + Right Text */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT: Auto-play Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              <div className="aspect-square md:aspect-video relative">
                {cityDetails.map((city, index) => (
                  <div
                    key={city.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeCityIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <Image
                      src={city.imageUrl}
                      alt={city.name}
                      fill
                      className="object-cover"
                      unoptimized
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Glowing Border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none border-4 border-transparent bg-gradient-to-r from-[#FFD93D]/40 via-[#00FF9C]/40 to-[#00B7FF]/40 shadow-[0_0_30px_rgba(255,217,61,0.4)]" />

              {/* Indicator */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-gray-800 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md">
                <div className="w-2 h-2 bg-[#00FF9C] rounded-full animate-pulse" />
                <span className="text-xs font-medium">Auto-playing</span>
              </div>
            </div>

            {/* RIGHT: City Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-7 h-7 text-[#FFD93D]" />
                <span className="text-lg font-semibold text-gray-300">Solar City Spotlight</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {currentCity.name}
              </h3>

              <p className="text-xl md:text-2xl text-[#00FF9C] font-medium">
                {currentCity.description}
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {currentCity.details}
              </p>

              {/* Progress Dots */}
              <div className="flex gap-2 mt-8">
                {cityDetails.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCityIndex(index)}
                    className={`transition-all duration-300 rounded-full ${index === activeCityIndex
                        ? 'w-10 h-2 bg-[#00FF9C] shadow-lg shadow-[#00FF9C]/50'
                        : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to city ${index + 1}`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 font-medium">
                {activeCityIndex + 1} / {cityDetails.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SolarVideo;