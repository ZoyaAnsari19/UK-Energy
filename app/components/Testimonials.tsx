'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, X, Send } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  feedback: string;
  date: string;
  avatar: string;
  role: string;
}

const TestimonialsComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // permanently visible, animation removed
  const [showModal, setShowModal] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Feedback Form States
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');

 const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'London, UK',
    rating: 5,
    feedback: 'UK Energy transformed our home with solar panels. The installation was seamless, and we\'ve already seen a 70% reduction in electricity bills!',
    date: 'November 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'Homeowner'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi, India',
    rating: 5,
    feedback: 'Attended the Solar Installation Workshop - absolutely brilliant! The instructors were knowledgeable, and the hands-on experience was invaluable.',
    date: 'October 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    role: 'Workshop Participant'
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    rating: 5,
    feedback: 'The energy analytics platform has helped our business optimize consumption. We\'ve cut costs by 40% and reduced our carbon footprint significantly.',
    date: 'November 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
    role: 'Business Owner'
  },
  {
    id: 4,
    name: 'Emma Thompson',
    location: 'Manchester, UK',
    rating: 5,
    feedback: 'The maintenance team is exceptional. Quick response times and professional service. Our solar system has been running flawlessly for 2 years!',
    date: 'September 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    role: 'Residential Client'
  },
  {
    id: 5,
    name: 'Carlos Rodriguez',
    location: 'Barcelona, Spain',
    rating: 5,
    feedback: 'The Smart Grid Solutions course exceeded expectations. Now implementing these technologies in our renewable energy projects across Europe.',
    date: 'October 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    role: 'Energy Engineer'
  },
  {
    id: 6,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    feedback: 'UK Energy\'s EV charging setup for our office building was professional and efficient. The smart integration is fantastic!',
    date: 'November 2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    role: 'Corporate Manager'
  },
];


  useEffect(() => {
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    startAutoScroll();

    // Force video to play
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    }

    return () => {
      window.removeEventListener('resize', updateCardsPerView);
      stopAutoScroll();
    };
  }, []);

  const updateCardsPerView = () => {
    if (window.innerWidth >= 1024) setCardsPerView(3);
    else if (window.innerWidth >= 768) setCardsPerView(2);
    else setCardsPerView(1);
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - cardsPerView;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - cardsPerView;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    stopAutoScroll();
    direction === 'next' ? nextSlide() : prevSlide();
    startAutoScroll();
  };

  const handleSubmit = () => {
    if (!name || !location || !feedback || rating === 0) {
      alert('Please fill all fields and select a rating.');
      return;
    }
    alert('Thank you for your feedback! It has been submitted successfully.');
    setShowModal(false);
    // Reset form
    setRating(0);
    setName('');
    setLocation('');
    setFeedback('');
  };

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] overflow-hidden py-20 px-4 md:px-12" id='feedback'>
      {/* Only background video, no overlays or particles */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none', opacity: 0.5 }}
      >
        <source
          src="/video/v4.mp4"
          type="video/mp4"
        />
      </video>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 rounded-full px-6 py-2 border border-[#00FFD1]/30">
              <MessageSquare className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-sm font-semibold text-[#00FFD1]">Testimonials</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#FFD93D] bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Real feedback from our customers and training participants
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleNavigation('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-[#00FFD1]/30 flex items-center justify-center hover:bg-[#00FFD1]/20 hover:border-[#00FFD1] hover:shadow-[0_0_20px_rgba(0,255,209,0.4)]"
          >
            <ChevronLeft className="w-6 h-6 text-[#00FFD1]" />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-[#00FFD1]/30 flex items-center justify-center hover:bg-[#00FFD1]/20 hover:border-[#00FFD1] hover:shadow-[0_0_20px_rgba(0,255,209,0.4)]"
          >
            <ChevronRight className="w-6 h-6 text-[#00FFD1]" />
          </button>
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className={`group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8`}>
                    <div className="relative z-10">
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-[#FFD93D] text-[#FFD93D]' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      {/* Feedback */}
                      <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                        "{testimonial.feedback}"
                      </p>
                      {/* User Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full border-2 border-[#00FFD1]/30"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-400">{testimonial.role}</p>
                          <p className="text-xs text-[#00FFD1]">{testimonial.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{testimonial.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots Indicator */}
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {(testimonials.length - cardsPerView + 1 > 0 ? [...Array(testimonials.length - cardsPerView + 1)] : [0]).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopAutoScroll();
                  setCurrentIndex(i);
                  startAutoScroll();
                }}
                className={`h-2 rounded-full ${currentIndex === i ? 'w-8 bg-[#00FFD1]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
        {/* Write Feedback Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00B7FF] via-[#00FFD1] to-[#00B7FF] font-bold text-lg hover:shadow-[0_0_40px_rgba(0,255,209,0.6)] flex items-center gap-3 mx-auto"
          >
            <MessageSquare className="w-5 h-5" />
            Write Your Feedback
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl backdrop-blur-md bg-gradient-to-br from-[#0F1624] to-[#0A0F1C] border border-[#00FFD1]/30 rounded-3xl p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00B7FF] to-[#00FFD1] bg-clip-text text-transparent">
              Share Your Experience
            </h3>
            <p className="text-gray-400 mb-6">Help others learn about UK Energy</p>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-white">Your Rating</label>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="w-10 h-10 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]"
                  >
                    <Star className={`w-6 h-6 ${rating > i ? 'text-[#FFD93D] fill-[#FFD93D]' : 'text-gray-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-white">Your Name</label>
              <input
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 focus:border-[#00FFD1] focus:outline-none text-white placeholder:text-gray-500"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-white">Location</label>
              <input
                type="text"
                placeholder="London, UK"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 focus:border-[#00FFD1] focus:outline-none text-white placeholder:text-gray-500"
              />
            </div>

            {/* Feedback */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">Your Feedback</label>
              <textarea
                rows={4}
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 focus:border-[#00FFD1] focus:outline-none resize-none text-white placeholder:text-gray-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00B7FF] to-[#00FFD1] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,209,0.5)] flex items-center justify-center gap-2">
              Submit Feedback
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* No animation styles */}
      {/* <style jsx>{`...`}</style> */}
    </div>
  );
};

export default TestimonialsComponent;
