'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Video,
  Users,
  Award,
  ChevronDown,
  Filter,
  CheckCircle2,
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'online' | 'offline';
  category: 'workshop' | 'webinar' | 'certification';
  image: string;
  spots?: number;
  instructor?: string;
}

interface TrainingEventsProps {
  events?: Event[];
  /** id of the element that contains the Register component */
  registerSectionId?: string;
}

const TrainingEvents: React.FC<TrainingEventsProps> = ({
  events: propEvents,
  registerSectionId = 'register',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const defaultEvents: Event[] = [
    {
      id: '1',
      title: 'Solar Installation Fundamentals Workshop',
      description:
        'Hands-on technical training covering residential PV installation, wiring, mounting structures, safety standards (IEC/BS EN), and system performance testing.',
      date: '2025-11-25',
      time: '10:00 AM - 4:00 PM',
      location: 'London Renewable Energy Training Centre',
      locationType: 'offline',
      category: 'workshop',
      image: '/img/EV1.jpg',
      spots: 12,
      instructor: 'James Mitchell, MCS-Certified Solar Installer',
    },
    {
      id: '2',
      title: 'Global Renewable Energy Masterclass',
      description:
        'An in-depth session covering modern solar PV technologies, wind integration, grid stability, and battery energy storage systems. Ideal for professionals transitioning to clean energy.',
      date: '2025-11-28',
      time: '2:00 PM - 5:00 PM',
      location: 'Online (Zoom)',
      locationType: 'online',
      category: 'webinar',
      image: '/img/EV2.jpg',
      spots: 50,
      instructor: 'Dr. Sarah Chen, Energy Systems Research Specialist',
    },
    {
      id: '3',
      title: 'Professional PV System Design Certification',
      description:
        'A certification-level program covering PV array sizing, energy yield calculations, inverter selection, shading analysis, and UK planning regulations.',
      date: '2025-12-02',
      time: '9:00 AM - 5:00 PM',
      location: 'Manchester Renewable Energy Campus',
      locationType: 'offline',
      category: 'certification',
      image: '/img/EV3.jpg',
      spots: 20,
      instructor: 'Prof. David Williams, Solar PV Design Expert',
    },
    {
      id: '4',
      title: 'Smart Grid & Solar Integration Webinar',
      description:
        'Learn how distributed solar PV interacts with smart grids, smart meters, home automation systems, and real-time energy management platforms.',
      date: '2025-12-05',
      time: '6:00 PM - 7:30 PM',
      location: 'Online (Microsoft Teams)',
      locationType: 'online',
      category: 'webinar',
      image: 'img/EV4.jpg',
      spots: 100,
      instructor: 'Emma Thompson, Smart Grid Systems Engineer',
    },
    {
      id: '5',
      title: 'Advanced Battery Storage & Inverter Systems',
      description:
        'Technical deep dive into lithium-ion batteries, BMS architecture, hybrid inverters, off-grid/backup configurations, and safety protocols.',
      date: '2025-12-10',
      time: '10:00 AM - 3:00 PM',
      location: 'Birmingham Energy Training Hub',
      locationType: 'offline',
      category: 'workshop',
      image: '/img/EV5.jpg',
      spots: 15,
      instructor: 'Michael Roberts, Battery Storage Technician',
    },
    {
      id: '6',
      title: 'Solar Business Growth & Market Strategy',
      description:
        'A practical session on building and scaling a solar installation business—covering lead generation, customer acquisition, MCS certification, and project management.',
      date: '2025-12-15',
      time: '1:00 PM - 4:00 PM',
      location: 'Online (Zoom)',
      locationType: 'online',
      category: 'webinar',
      image: '/img/EV6.jpg',
      spots: 75,
      instructor: 'Lisa Anderson, Renewable Energy Business Consultant',
    },
  ];

  const events = propEvents || defaultEvents;

  const categories = [
    { id: 'all', label: 'All Events', icon: Filter },
    { id: 'workshop', label: 'Workshops', icon: Users },
    { id: 'webinar', label: 'Webinars', icon: Video },
    { id: 'certification', label: 'Certifications', icon: Award },
  ];

  const filteredEvents = activeCategory === 'all'
    ? events
    : events.filter((e) => e.category === activeCategory);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  /** Simulate API call & scroll to Register component */
  // const handleRegister = async (event: Event) => {
  //   setRegisteringId(event.id);

  //   // ---- fake API delay ----
  //   await new Promise((res) => setTimeout(res, 1500));

  //   setRegisteringId(null);
  //   setShowSuccess(event.id);

  //   // ---- scroll to Register component after success ----
  //   setTimeout(() => {
  //     const el = document.getElementById('contact');
  //     if (el) {
  //       el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     }
  //     setShowSuccess(null);
  //   }, 2500); // give user a moment to see the success message
  // };

  return (
    <div className="bg-black py-20 px-4 md:px-12 overflow-hidden" id="event">
      <div className="max-w-7xl mx-auto">
        {/* Header ---------------------------------------------------- */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 relative inline-block">
            Training & Events
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00B7FF] via-[#00FF9C] to-[#FFD93D] rounded-full shadow-[0_0_15px_rgba(0,183,255,0.5)]" />
          </h2>
          <p className="text-xl text-gray-400 mt-6 font-light max-w-2xl mx-auto">
            Learn, participate, and grow with the future of solar energy
          </p>
        </div>

        {/* Category Filters ------------------------------------------ */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 backdrop-blur-md ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#00B7FF] to-[#00FF9C] text-white shadow-lg shadow-[#00B7FF]/40'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Events Grid ----------------------------------------------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, idx) => (
            <div
              key={event.id}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative backdrop-blur-md bg-gray-900/80 border border-white/20 rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100 + 400}ms` }}
            >
              {/* Hover glow */}
              {hoveredCard === event.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B7FF] via-[#00FF9C] to-[#FFD93D] opacity-30 blur-xl -z-10" />
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md text-white ${
                      event.category === 'workshop'
                        ? 'bg-[#00B7FF]/90'
                        : event.category === 'webinar'
                        ? 'bg-[#00FF9C]/90'
                        : 'bg-[#FFD93D]/90 text-gray-900'
                    }`}
                  >
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1 text-white ${
                      event.locationType === 'online' ? 'bg-purple-600/90' : 'bg-green-600/90'
                    }`}
                  >
                    {event.locationType === 'online' ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                    {event.locationType === 'online' ? 'Online' : 'In-Person'}
                  </span>
                </div>

                {event.spots && (
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 text-white border border-white/30">
                      {event.spots} spots left
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00B7FF] transition-colors">
                  {event.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 text-[#00B7FF]" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-[#00FF9C]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-[#FFD93D]" />
                    <span>{event.location}</span>
                  </div>
                  {event.instructor && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>by {event.instructor}</span>
                    </div>
                  )}
                </div>

                {/* Register Button – functional */}
                <button
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                  disabled={registeringId === event.id || showSuccess === event.id}
                  className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform ${
                    showSuccess === event.id
                      ? 'bg-gradient-to-r from-[#00FF9C] to-[#00B7FF] text-white'
                      : registeringId === event.id
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#00B7FF] to-[#00FF9C] text-white hover:shadow-lg hover:shadow-[#00B7FF]/50 hover:scale-105'
                  }`}
                >
                  {showSuccess === event.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Registered!
                    </>
                  ) : registeringId === event.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Register Now
                      <ChevronDown className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Hover border glow */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 pointer-events-none ${
                  hoveredCard === event.id
                    ? 'border-[#00B7FF] shadow-[0_0_30px_rgba(0,183,255,0.4)]'
                    : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Calendar className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-400">
              Check back soon for upcoming {activeCategory} events!
            </p>
          </div>
        )}

        {/* Bottom CTA (unchanged) */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00B7FF] rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00FF9C] rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Contact us for custom training programs tailored to your team's needs
              </p>

              <button className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FFA500] font-bold text-gray-900 text-lg hover:shadow-[0_0_30px_rgba(255,217,61,0.7)] transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}>
                Request Custom Training
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS helpers */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default TrainingEvents;