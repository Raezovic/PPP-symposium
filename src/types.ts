/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  location: string;
  description: string;
  type: 'keynote' | 'workshop' | 'break' | 'networking';
  day: number;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
}

export interface SpeakerProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  session: string;
  time: string;
  image: string;
  bio: string;
}
