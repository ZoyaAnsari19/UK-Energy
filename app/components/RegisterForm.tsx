'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Award, Zap, CheckCircle2, Sun, Battery, Sparkles, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  spotsRemaining: number;
  category: string;
}

interface FormData {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  experienceLevel: string;
}

interface FormErrors {
  [key: string]: string;
}

interface EventRegistrationFormProps {
  events?: Event[];
  onSubmit?: (data: FormData) => Promise<void>;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ 
  events: propEvents,
  onSubmit 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    eventId: '',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    experienceLevel: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const defaultEvents: Event[] = [
    {
      id: '1',
      title: 'Solar Installation Workshop',
      date: '2025-11-25',
      time: '10:00 AM - 4:00 PM',
      location: 'London Training Centre',
      instructor: 'James Mitchell',
      spotsRemaining: 12,
      category: 'Workshop'
    },
    {
      id: '2',
      title: 'Renewable Energy Masterclass',
      date: '2025-11-28',
      time: '2:00 PM - 5:00 PM',
      location: 'Online via Zoom',
      instructor: 'Dr. Sarah Chen',
      spotsRemaining: 8,
      category: 'Webinar'
    },
    {
      id: '3',
      title: 'PV System Design Certification',
      date: '2025-12-02',
      time: '9:00 AM - 5:00 PM',
      location: 'Manchester Campus',
      instructor: 'Prof. David Williams',
      spotsRemaining: 5,
      category: 'Certification'
    }
  ];

  const events = propEvents || defaultEvents;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const totalFields = Object.keys(formData).length;
    setFormProgress((filledFields / totalFields) * 100);
  }, [formData]);

  const selectedEvent = events.find(e => e.id === formData.eventId);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.eventId) newErrors.eventId = 'Please select an event';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select experience level';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const features = [
    { icon: Zap, text: 'Live workshops with hands-on experience' },
    { icon: Users, text: 'Learn from certified industry experts' },
    { icon: Award, text: 'Receive industry-recognized certifications' },
    { icon: Sparkles, text: 'Limited seats - register early!' }
  ];

  if (showSuccess) {
    return (
      <div className="bg-black py-20 px-4 md:px-12 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-gray-900/80 border border-[#00FF9C]/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00FF9C] rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00B7FF] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00FF9C] to-[#00B7FF] flex items-center justify-center mx-auto mb-6 animate-scale-in shadow-lg shadow-[#00FF9C]/50">
                <CheckCircle2 className="w-12 h-12 text-white animate-check" />
              </div>

              <h2 className="text-4xl font-bold text-white mb-4">
                Registration Successful!
              </h2>
              <p className="text-xl text-gray-300 mb-2">
                Thank you for registering, {formData.fullName}!
              </p>
              <p className="text-gray-400 mb-8">
                UK Energy will contact you soon at {formData.email}
              </p>

              {selectedEvent && (
                <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-lg mb-2 text-white">{selectedEvent.title}</h3>
                  <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#00B7FF]" />
                      {formatDate(selectedEvent.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#00FF9C]" />
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({
                    eventId: '',
                    fullName: '',
                    email: '',
                    phone: '',
                    city: '',
                    country: '',
                    experienceLevel: ''
                  });
                }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00B7FF] to-[#00FF9C] text-white font-semibold hover:shadow-lg hover:shadow-[#00B7FF]/50 transition-all duration-300"
              >
                Register Another Person
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black py-20 px-4 md:px-12 overflow-hidden" id='register'>
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
            <div 
              className="h-full bg-gradient-to-r from-[#00B7FF] via-[#00FF9C] to-[#FFD93D] transition-all duration-500 ease-out shadow-lg shadow-[#00B7FF]/30"
              style={{ width: `${formProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2 text-center">
            {Math.round(formProgress)}% Complete
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Features + Image BELOW */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <Sun className="w-10 h-10 text-[#FFD93D] animate-spin-slow" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Register for an Event
                </h1>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join UK Energy's certified workshops, webinars, and masterclasses. 
                Learn from industry experts and advance your solar energy career.
              </p>

              {/* Feature Cards */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                      <feature.icon className="w-6 h-6 text-[#00B7FF]" />
                    </div>
                    <p className="text-gray-300 leading-relaxed pt-2">{feature.text}</p>
                  </div>
                ))}
              </div>

              {/* IMAGE CARD UNDER FEATURES */}
              <div
                className={`backdrop-blur-md bg-gray-900/60 border border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: '400ms' }}
              >
                <div className="relative h-64 md:h-80">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('/img/eventImg.png')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-1">
                      Hands-on Training in Progress
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Real-world solar installation workshops with certified experts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form ONLY */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Form Card */}
            <div className="backdrop-blur-md bg-gray-900/80 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Select Event *
                  </label>
                  <select
                    value={formData.eventId}
                    onChange={(e) => handleChange('eventId', e.target.value)}
                    onFocus={() => setFocusedField('eventId')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                      focusedField === 'eventId'
                        ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                        : errors.eventId
                        ? 'border-red-500'
                        : 'border-white/20'
                    } focus:outline-none`}
                  >
                    <option value="">Choose an event...</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {formatDate(event.date)}
                      </option>
                    ))}
                  </select>
                  {errors.eventId && (
                    <p className="mt-1 text-sm text-red-400 animate-shake">{errors.eventId}</p>
                  )}
                </div>

                {/* Event Preview */}
                {selectedEvent && (
                  <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 animate-slide-down">
                    <h3 className="font-bold text-lg mb-3 text-white">{selectedEvent.title}</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00B7FF]" />
                        {formatDate(selectedEvent.date)} • {selectedEvent.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#00FF9C]" />
                        {selectedEvent.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#FFD93D]" />
                        Instructor: {selectedEvent.instructor}
                      </div>
                      {selectedEvent.spotsRemaining <= 10 && (
                        <div className="flex items-center gap-2 text-orange-400 font-semibold animate-pulse">
                          <Clock className="w-4 h-4" />
                          Only {selectedEvent.spotsRemaining} spots remaining!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Smith"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                        focusedField === 'fullName'
                          ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                          : errors.fullName
                          ? 'border-red-500'
                          : 'border-white/20'
                      } focus:outline-none`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-400 animate-shake">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                        focusedField === 'email'
                          ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                          : errors.email
                          ? 'border-red-500'
                          : 'border-white/20'
                      } focus:outline-none`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400 animate-shake">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+44 20 1234 5678"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                        focusedField === 'phone'
                          ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                          : errors.phone
                          ? 'border-red-500'
                          : 'border-white/20'
                      } focus:outline-none`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400 animate-shake">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="London"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                        focusedField === 'city'
                          ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                          : errors.city
                          ? 'border-red-500'
                          : 'border-white/20'
                      } focus:outline-none`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-400 animate-shake">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    onFocus={() => setFocusedField('country')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="United Kingdom"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                      focusedField === 'country'
                        ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                        : errors.country
                        ? 'border-red-500'
                        : 'border-white/20'
                    } focus:outline-none`}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-400 animate-shake">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => handleChange('experienceLevel', e.target.value)}
                    onFocus={() => setFocusedField('experienceLevel')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-500 backdrop-blur-md ${
                      focusedField === 'experienceLevel'
                        ? 'border-[#00B7FF] shadow-[0_0_20px_rgba(0,183,255,0.4)]'
                        : errors.experienceLevel
                        ? 'border-red-500'
                        : 'border-white/20'
                    } focus:outline-none`}
                  >
                    <option value="">Select your level...</option>
                    <option value="beginner">Beginner - New to solar energy</option>
                    <option value="intermediate">Intermediate - Some experience</option>
                    <option value="expert">Expert - Industry professional</option>
                  </select>
                  {errors.experienceLevel && (
                    <p className="mt-1 text-sm text-red-400 animate-shake">{errors.experienceLevel}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00B7FF] via-[#00FF9C] to-[#FFD93D] text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(0,183,255,0.6)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <Battery className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
            {/* IMAGE CARD UNDER FORM REMOVED */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes check { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }

        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-check { stroke-dasharray: 100; animation: check 0.6s ease-out 0.3s forwards; }
      `}</style>
    </div>
  );
};

export default EventRegistrationForm;