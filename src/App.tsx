/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone,
  Camera,
  MessageSquare,
  Home, 
  Calendar, 
  Users, 
  Award, 
  MapPin, 
  UserPlus, 
  HelpCircle, 
  Mail, 
  Info,
  ChevronRight,
  Clock,
  ArrowRight,
  Globe
} from 'lucide-react';
import { NAV_ITEMS, AGENDA_DATA, EVENT_INFO, SPONSORS } from './constants';
import { AgendaItem } from './types';

const logoWB = '/images/WorldBank.png';
const logoPPPD = '/images/GovernmentPPP.jpeg';

// --- Icons Mapping ---
const IconMap: Record<string, any> = {
  Home, Calendar, Users, Award, MapPin, UserPlus, HelpCircle, Mail, Info, MessageSquare, Camera
};

// --- Components ---

const Sidebar = ({ isOpen, onClose, activeSection, onSelect }: { 
  isOpen: boolean; 
  onClose: () => void; 
  activeSection: string;
  onSelect: (section: string) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-[300px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center" onClick={() => { onSelect('home'); onClose(); }}>
                <img src={logoWB} alt="World Bank Group" className="h-8 object-contain" />
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 pt-3 pb-6 no-scrollbar">
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = IconMap[item.icon];
                  const isActive = activeSection === item.href;
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        onSelect(item.href);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                        isActive 
                        ? 'bg-brand/5 text-brand font-medium' 
                        : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                      <span className="text-[14px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="p-8 border-t border-slate-50 text-slate-300 text-[10px] uppercase tracking-widest font-bold">
              Kenya PPP Symposium 2026
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface AgendaCardProps {
  item: AgendaItem;
  key?: string;
}

const AgendaCard = ({ item }: AgendaCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const typeColors = {
    keynote: 'bg-purple-100 text-purple-700',
    workshop: 'bg-blue-100 text-blue-700',
    break: 'bg-orange-100 text-orange-700',
    networking: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <motion.div 
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${typeColors[item.type]}`}>
              {item.type}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
              <Clock size={12} />
              {item.time}
            </div>
          </div>
          <h3 className="font-display font-semibold text-lg leading-tight text-slate-900">{item.title}</h3>
          {item.speaker && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 rounded-full bg-slate-200" />
              <span className="text-sm text-slate-600 font-medium">{item.speaker}</span>
            </div>
          )}
        </div>
        <ChevronRight 
          size={20} 
          className={`text-slate-300 transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-90' : ''}`} 
        />
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-slate-50 space-y-4">
              <p className="text-slate-600 text-[14px] leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                <MapPin size={14} />
                <span>{item.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isDarkBackdropSection = activeSection === 'home';

  // Scroll to top when changing section
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8 pb-12">
            {/* Hero Section */}
            <section className="relative h-[320px] overflow-hidden">
              <img 
                src="/images/homepageimage.jpeg" 
                alt="Event Banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute bottom-8 left-6 right-6">
                <h1 className="text-white font-display font-bold text-[22px] leading-tight mb-3 md:text-3xl max-w-[90%]">{EVENT_INFO.title}</h1>
                <div className="flex flex-wrap gap-4 text-white/90 text-[13px] font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {EVENT_INFO.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {EVENT_INFO.location}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Overview */}
            <section className="px-6">
              <p className="text-slate-600 leading-relaxed text-[15px]">
                {EVENT_INFO.description}
              </p>
              <div className="mt-6">
                <button 
                  onClick={() => setActiveSection('agenda')}
                  className="w-full bg-brand text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-brand/20 active:scale-95 transition-transform"
                >
                  View Full Agenda
                </button>
              </div>
            </section>

            {/* Featured Agenda Preview */}
            <section className="px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">Featured Sessions</h2>
                <button 
                  onClick={() => setActiveSection('agenda')}
                  className="text-brand text-sm font-bold flex items-center gap-1"
                >
                  See all <ChevronRight size={16} />
                </button>
              </div>
              <div>
                {AGENDA_DATA.slice(1, 3).map(item => (
                  <AgendaCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Speaker Placeholder */}
            <section className="px-6">
              <h2 className="font-display font-bold text-xl mb-4">Featured Speakers</h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-200 mb-3" />
                    <div className="w-20 h-2 bg-slate-200 rounded-full mb-2" />
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-400 text-xs mt-4 italic">
                The speaker lineup will be announced soon.
              </p>
            </section>

            {/* Sponsor Section */}
            <section className="px-6 pb-20">
              <h2 className="font-display font-bold text-xl mb-6">Partners & Sponsors</h2>
              <div className="grid grid-cols-3 gap-6 items-center">
                {SPONSORS.map((sponsor) => (
                  <div key={sponsor.name} className="flex items-center justify-center p-2 bg-white rounded-xl shadow-sm border border-slate-50 h-16">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center text-slate-400 text-[10px] uppercase tracking-widest mt-6 font-bold">
                Supported by International Organizations
              </p>
            </section>
          </div>
        );

      case 'agenda':
        return (
          <div className="px-6 pt-24 pb-12">
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl mb-2">Symposium Agenda</h1>
              <p className="text-slate-500">One-day intensive focused on Private Sector Engagement.</p>
            </div>
            
            <div className="sticky top-20 z-10 bg-slate-50/80 backdrop-blur-md py-3 mb-6 border-b border-slate-200">
               <div className="flex gap-4">
                  <div className="bg-brand text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md">
                    Monday, May 12
                  </div>
               </div>
            </div>

            <div className="relative pl-6">
              {/* Timeline Line */}
              <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-slate-200 ml-1" />
              
              <div className="space-y-8">
                {AGENDA_DATA.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Circle Anchor */}
                    <div className="absolute -left-6 top-6 w-3 h-3 rounded-full bg-white border-2 border-brand z-10" />
                    <AgendaCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="px-6 pt-24 pb-12 space-y-10">
            <section>
              <h1 className="font-display font-bold text-2xl mb-4 text-brand">{EVENT_INFO.title}</h1>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-6">About the Symposium</p>
              
              <div className="prose prose-slate">
                <p className="text-slate-600 leading-relaxed text-[15px] mb-4 font-medium">
                  The Private Sector Focused PPP Symposium is the premier global event for Public-Private Partnerships in Kenya.
                </p>
                <p className="text-slate-600 leading-relaxed text-[15px] mb-4">
                  Hosted by <strong>The National Treasury</strong>, this symposium brings together leaders from government, finance, and infrastructure to accelerate PPP implementations.
                </p>
                <p className="text-slate-600 leading-relaxed text-[15px] mb-4">
                  The event focuses on creating a robust pipeline of bankable projects and strengthening the collaboration between the public and private sectors to deliver high-quality infrastructure for the people of Kenya.
                </p>
              </div>
            </section>

            <section className="bg-brand/5 rounded-3xl p-6 border border-brand/10">
              <h2 className="font-display font-bold text-xl mb-4 text-brand">Symposium Pillars</h2>
              <ul className="space-y-4">
                {[
                  { title: 'Investment Growth', desc: 'Lowering barriers to entry for private capital in public infrastructure.' },
                  { title: 'Structural Integrity', desc: 'Structuring PPPs that are commercially attractive and risk-mitigated.' },
                  { title: 'Project Pipeline', desc: 'Showcasing key priority projects in Energy, Roads, and Water sectors.' }
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-[15px]">{obj.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{obj.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl mb-4 text-brand">Host Authority</h2>
              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
                  <img src={logoPPPD} alt="PPPD" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">Public Private Partnerships Directorate (PPPD)</h4>
                  <p className="text-slate-500 text-xs mt-1">The National Treasury of Kenya</p>
                </div>
              </div>
            </section>
          </div>
        );

      case 'faqs':
        return (
          <div className="px-6 pt-24 pb-16">
            <div className="mb-8">
              <h1 className="font-display font-bold text-3xl mb-2">Frequently Asked Questions</h1>
              <p className="text-slate-500 text-sm">Everything you need to know before attending the PPP Symposium.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'When and where will the PPP Symposium take place?',
                  answer: 'The PPP Symposium will take place on 12 May 2026 at Villa Rosa Kempinski, Nairobi.',
                },
                {
                  question: 'What time should attendees arrive?',
                  answer: 'Arrival, registration, and breakfast will begin from 7:00 AM to 8:15 AM.',
                },
                {
                  question: 'What is the focus of the symposium?',
                  answer: 'The symposium will focus on Kenya\'s PPP priorities, investment pipeline, commercial attractiveness, bankability, government support mechanisms, and pathways to financial close.',
                },
                {
                  question: 'Who should attend the symposium?',
                  answer: 'The event is designed for private sector investors, financiers, developers, government stakeholders, development partners, policymakers, and PPP practitioners.',
                },
                {
                  question: 'What sectors will be highlighted?',
                  answer: 'The programme will highlight PPP opportunities in roads and transport, energy, agriculture, water, and irrigation.',
                },
                {
                  question: 'Will there be networking opportunities?',
                  answer: 'Yes. The programme includes breakfast registration, health breaks, and a dedicated lunch networking session from 1:00 PM to 2:00 PM.',
                },
                {
                  question: 'What key discussions should attendees expect?',
                  answer: 'Attendees can expect discussions on commercial attractiveness, structuring PPPs to attract credible bidders, bankability, credit enhancement tools, government support mechanisms, tax policy, land acquisition, and financial close.',
                },
                {
                  question: 'Will meals be provided?',
                  answer: 'Yes. The programme includes breakfast during registration, health breaks, and lunch networking.',
                },
                {
                  question: 'What time does the event end?',
                  answer: 'The draft programme indicates the event will close at around 4:00 PM.',
                },
                {
                  question: 'Who can I contact for questions?',
                  answer: 'For any questions, please contact: ppp-symposium@stawiexperiences.com',
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-bold flex items-center justify-center mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 text-[17px] leading-snug mb-2">{faq.question}</h3>
                      <p className="text-slate-600 text-[14px] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'venue':
        return (
          <div className="px-6 pt-24 pb-16 space-y-8">
            <section>
              <h1 className="font-display font-bold text-3xl mb-2">Venue</h1>
              <p className="text-slate-500 text-sm">Event location and on-site details for attendees.</p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-900">{EVENT_INFO.location}</h2>
                  <p className="text-slate-500 text-sm mt-1">Official symposium venue</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-1">Date</p>
                  <p className="font-semibold text-slate-800">{EVENT_INFO.date}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-1">Arrival Window</p>
                  <p className="font-semibold text-slate-800">7:00 AM - 8:15 AM</p>
                </div>
              </div>
            </section>

            <section className="bg-brand/5 rounded-3xl border border-brand/10 p-6">
              <h3 className="font-display font-bold text-lg text-brand mb-3">Arrival Notes</h3>
              <ul className="space-y-3">
                {[
                  'Please arrive within the registration window for smooth check-in.',
                  'Breakfast is served during registration before opening sessions.',
                  'Carry a valid ID and confirmation details for verification at the venue desk.',
                ].map((note) => (
                  <li key={note} className="flex items-start gap-3 text-slate-600 text-[14px] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 flex-shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        );

      case 'contact':
        return (
          <div className="px-6 pt-24 pb-16 space-y-6">
            <section>
              <h1 className="font-display font-bold text-3xl mb-2">Emergency Contacts</h1>
              <p className="text-slate-500 text-sm">Tap any phone button below to call directly.</p>
            </section>

            <section className="sticky top-24 z-20">
              <div className="bg-red-600 rounded-3xl border border-red-700 shadow-lg shadow-red-200/70 p-5 text-white">
                <p className="text-[10px] uppercase tracking-widest font-bold text-red-100 mb-2">Priority Hotline</p>
                <h2 className="font-display font-bold text-lg mb-1">Kempinski Hotline</h2>
                <p className="text-red-100 text-sm mb-4">reservations.nairobi@kempinski.com</p>
                <a
                  href="tel:+254703049000"
                  className="inline-flex items-center gap-2 bg-white text-red-700 px-4 py-2.5 rounded-xl font-bold text-sm"
                >
                  <Phone size={16} />
                  Call 0703 049000
                </a>
              </div>
            </section>

            <section className="space-y-4">
              {[
                {
                  name: 'Abigael Ndanu',
                  email: 'abigael@stawiexperiences.com',
                  phone: '+254 729 017311',
                  dial: '+254729017311',
                },
                {
                  name: 'Winfred Marubu',
                  email: 'projectmanager1@stawiexperiences.com',
                  phone: '+254 716 320612',
                  dial: '+254716320612',
                },
              ].map((contact) => (
                <div key={contact.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-1">{contact.name}</h3>
                  <a href={`mailto:${contact.email}`} className="block text-slate-500 text-sm mb-4 hover:text-brand transition-colors">
                    {contact.email}
                  </a>
                  <a
                    href={`tel:${contact.dial}`}
                    className="inline-flex items-center gap-2 bg-brand text-white px-4 py-2.5 rounded-xl font-bold text-sm"
                  >
                    <Phone size={16} />
                    Call {contact.phone}
                  </a>
                </div>
              ))}
            </section>
          </div>
        );

      case 'feedback':
        return (
          <div className="px-6 pt-24 pb-16 space-y-6">
            <section>
              <h1 className="font-display font-bold text-3xl mb-2">Feedback</h1>
              <p className="text-slate-500 text-sm">Share your feedback about the PPP Symposium through the embedded form below.</p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-3 sm:p-4 overflow-hidden">
              <iframe
                title="PPP Symposium Feedback Form"
                src="https://pppsymposium.typeform.com/to/tImRWdwe"
                className="w-full h-[70vh] min-h-[560px] rounded-2xl border border-slate-100"
                allow="camera; microphone; autoplay; encrypted-media;"
              />
            </section>
          </div>
        );

      case 'event-photos':
        return (
          <div className="px-6 pt-24 pb-16 space-y-6">
            <section>
              <h1 className="font-display font-bold text-3xl mb-2">Event Photos</h1>
              <p className="text-slate-500 text-sm">Official event photos will be posted on Pixieset.</p>
            </section>

            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="rounded-2xl bg-brand/5 border border-brand/10 p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                  <Camera size={26} />
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900 mb-2">View Photo Gallery</h2>
                <p className="text-slate-600 text-sm mb-6">Tap the button below to open the Pixieset gallery for this event.</p>
                <a
                  href="https://pixieset.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand/20"
                >
                  <Camera size={16} />
                  Open Pixieset Gallery
                </a>
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div className="px-6 pt-32 pb-12 text-center h-[80vh] flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Info className="text-slate-300" size={40} />
            </div>
            <h1 className="font-display font-bold text-2xl mb-2 capitalize">{activeSection}</h1>
            <p className="text-slate-500 mb-8 max-w-[280px]">
              This section is currently under development. Please check back later for updates.
            </p>
            <button 
              onClick={() => setActiveSection('home')}
              className="flex items-center gap-2 text-accent font-bold"
            >
              Back to Home <ArrowRight size={18} />
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed top-5 left-5 z-30 w-14 h-14 rounded-full backdrop-blur-xl shadow-lg flex items-center justify-center active:scale-95 transition-transform ${
          isDarkBackdropSection
            ? 'bg-white/20 border border-white/35 shadow-black/20'
            : 'bg-white/80 border border-slate-200/80 shadow-slate-300/40'
        }`}
        aria-label="Open navigation menu"
      >
        <Menu
          size={24}
          className={isDarkBackdropSection ? 'text-white' : 'text-brand'}
        />
      </button>

      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeSection={activeSection}
        onSelect={setActiveSection}
      />

      {/* Main Content Areas */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Quick Action) */}
      {activeSection === 'home' && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <button 
            onClick={() => setActiveSection('agenda')}
            className="bg-brand text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-[15px] whitespace-nowrap active:scale-95 transition-transform"
          >
            <Calendar size={18} />
            Explore Full Agenda
          </button>
        </motion.div>
      )}
    </div>
  );
}
