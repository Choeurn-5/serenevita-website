import React, { useState, useEffect } from 'react';
import {
  SiteSettings,
  RoomItem,
  HomePageData,
  AccommodationPageData,
  WellnessPageData,
  ActivityPageData,
  GalleryPageData,
  ContactPageData,
} from './types';
import {
  getSiteSettings,
  getRooms,
  getHomePageData,
  getAccommodationPageData,
  getWellnessPageData,
  getActivityPageData,
  getGalleryPageData,
  getContactPageData,
} from './api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AccommodationView } from './components/AccommodationView';
import { WellnessView } from './components/WellnessView';
import { DiningView } from './components/DiningView';
import { ActivityView } from './components/ActivityView';
import { GalleryView } from './components/GalleryView';
import { ContactView } from './components/ContactView';
import { BookingModal } from './components/BookingModal';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedRoom, setPreSelectedRoom] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // WordPress CMS state
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [accomData, setAccomData] = useState<AccommodationPageData | null>(null);
  const [wellnessData, setWellnessData] = useState<WellnessPageData | null>(null);
  const [activityData, setActivityData] = useState<ActivityPageData | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryPageData | null>(null);
  const [contactData, setContactData] = useState<ContactPageData | null>(null);

  useEffect(() => {
    async function loadCMS() {
      setLoading(true);
      try {
        const [
          sSettings,
          sRooms,
          sHome,
          sAccom,
          sWellness,
          sActivity,
          sGallery,
          sContact,
        ] = await Promise.all([
          getSiteSettings(),
          getRooms(),
          getHomePageData(),
          getAccommodationPageData(),
          getWellnessPageData(),
          getActivityPageData(),
          getGalleryPageData(),
          getContactPageData(),
        ]);

        setSettings(sSettings);
        setRooms(sRooms);
        setHomeData(sHome);
        setAccomData(sAccom);
        setWellnessData(sWellness);
        setActivityData(sActivity);
        setGalleryData(sGallery);
        setContactData(sContact);
      } catch (err) {
        console.error('Error fetching CMS data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCMS();
  }, []);

  const handleOpenBooking = () => {
    setPreSelectedRoom(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForRoom = (roomTitle: string) => {
    setPreSelectedRoom(roomTitle);
    setIsBookingOpen(true);
  };

  if (loading || !settings || !homeData || !accomData || !wellnessData || !activityData || !galleryData || !contactData) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#886944] animate-spin" />
        <p className="font-serif text-xl tracking-wider text-[#3d3830]">
          SERENE VITA RETREAT
        </p>
        <span className="text-xs uppercase tracking-[0.25em] text-[#886944]">
          Loading Sanctuary...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2b2823] flex flex-col selection:bg-[#886944] selection:text-white">
      {/* Header & Navigation */}
      <Navbar
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            data={homeData}
            rooms={rooms}
            onNavigate={setActiveTab}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'accommodation' && (
          <AccommodationView
            data={accomData}
            rooms={rooms}
            onOpenBookingForRoom={handleOpenBookingForRoom}
          />
        )}

        {activeTab === 'wellness' && (
          <WellnessView
            data={wellnessData}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'dining' && (
          <DiningView onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'activity' && (
          <ActivityView
            data={activityData}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView data={galleryData} />
        )}

        {activeTab === 'contact' && (
          <ContactView
            data={contactData}
            settings={settings}
          />
        )}
      </main>

      {/* Footer */}
      <Footer settings={settings} onNavigate={setActiveTab} />

      {/* Direct Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        rooms={rooms}
        settings={settings}
        preSelectedRoom={preSelectedRoom}
      />
    </div>
  );
}
