/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgendaItem, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', icon: 'Home', href: 'home' },
  { label: 'Agenda', icon: 'Calendar', href: 'agenda' },
  { label: 'Speakers', icon: 'Users', href: 'speakers' },
  { label: 'Venue', icon: 'MapPin', href: 'venue' },
  { label: 'FAQs', icon: 'HelpCircle', href: 'faqs' },
  { label: 'Feedback', icon: 'MessageSquare', href: 'feedback' },
  { label: 'Event Photos', icon: 'Camera', href: 'event-photos' },
  { label: 'Contact', icon: 'Mail', href: 'contact' },
  { label: 'About', icon: 'Info', href: 'about' },
];

export const AGENDA_DATA: AgendaItem[] = [
  {
    id: '1',
    day: 1,
    time: '07:00 AM',
    title: 'Arrival, Registration & Breakfast',
    location: 'Registration Desk / Foyer',
    description: 'Welcome and check-in for all delegates. Morning coffee and breakfast served.',
    type: 'networking',
  },
  {
    id: '2',
    day: 1,
    time: '08:15 AM',
    title: 'Opening Remarks & Keynote Address',
    speaker: 'Cabinet Secretary, National Treasury',
    location: 'Main Ballroom',
    description: 'Prayers, National/EAC Anthem. Opening remarks by PPPD DG, Keninvest CEO, KEPSA CEO, and IFC Regional Manager. Keynote Address by the Cabinet Secretary.',
    type: 'keynote',
  },
  {
    id: '3',
    day: 1,
    time: '09:00 AM',
    title: 'PPP Priorities Presentation',
    speaker: 'Director General, PPPD',
    location: 'Main Ballroom',
    description: 'Key Highlights of Kenya’s PPP Priorities & Pipeline (8 project teasers): Roads and Transport, Energy, Agriculture, Water and Irrigation.',
    type: 'keynote',
  },
  {
    id: '4',
    day: 1,
    time: '10:15 AM',
    title: 'Panel 1: Commercial Attractiveness',
    speaker: 'Muneer Ferozie (Moderator)',
    location: 'Main Ballroom',
    description: 'What Does Commercial Attractiveness Mean to the Private Sector and Structuring PPPs to Attract Credible Bidders?',
    type: 'workshop',
  },
  {
    id: '5',
    day: 1,
    time: '11:15 AM',
    title: 'Health Break',
    location: 'Foyer',
    description: 'Short transition and networking break.',
    type: 'break',
  },
  {
    id: '6',
    day: 1,
    time: '11:30 AM',
    title: 'Panel 2: Bankability & Credit Enhancement',
    speaker: 'Nathan Tuimising (Moderator)',
    location: 'Main Ballroom',
    description: 'What Does Bankability Mean to the Private Sector? Government Support Mechanisms and Credit Enhancement Tools.',
    type: 'workshop',
  },
  {
    id: '7',
    day: 1,
    time: '12:45 PM',
    title: 'Morning Session Call to Action',
    speaker: 'Director General, PPPD',
    location: 'Main Ballroom',
    description: 'Directive for session outcomes and summary of morning proceedings.',
    type: 'keynote',
  },
  {
    id: '8',
    day: 1,
    time: '01:00 PM',
    title: 'Lunch Networking',
    location: 'Dining Area',
    description: 'Full lunch service and structured networking.',
    type: 'break',
  },
  {
    id: '9',
    day: 1,
    time: '02:00 PM',
    title: 'Panel 3: From Policy to Projects',
    speaker: 'Ms. Christine Ng’ang’a (Moderator)',
    location: 'Main Ballroom',
    description: 'Discussion session with policy makers and private sector to solve challenges to financial close.',
    type: 'workshop',
  },
  {
    id: '10',
    day: 1,
    time: '03:30 PM',
    title: 'Health Break',
    location: 'Foyer',
    description: 'Final transition break.',
    type: 'break',
  },
  {
    id: '11',
    day: 1,
    time: '04:00 PM',
    title: 'End of Day Break',
    location: 'Main Ballroom',
    description: 'Conclusion of the Symposium proceedings.',
    type: 'break',
  },
];

export const EVENT_INFO = {
  title: 'Kenya Private Sector Focused PPP Symposium',
  tagline: 'Private Sector Focused PPP Symposium',
  date: 'May 12, 2026',
  location: 'Villa Rosa Kempinski, Nairobi',
  description: 'The Private Sector Focused PPP Symposium brings together leaders from government, finance, and infrastructure to accelerate Public-Private Partnerships in Kenya. Hosted by The National Treasury.',
  bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
};

export const SPONSORS = [
  { name: 'IBRD', logo: '/images/ibrd-logo-png-transparent.png' },
  { name: 'ICSID', logo: '/images/icsd.png' },
  { name: 'IDA', logo: '/images/ida.jpg.jpeg' },
  { name: 'MIGA', logo: '/images/multilateral-investment.png' },
  { name: 'IFC', logo: '/images/GovernmentPPP.jpeg' },
  { name: 'ICSID Global', logo: '/images/wb.jpeg' },
];
