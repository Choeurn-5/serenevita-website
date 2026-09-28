import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';
import { DIRECT_BOOKING_URL } from '../api';
import { Menu, X, Phone, Send, Calendar, MapPin } from 'lucide-react';

interface NavbarProps {
  settings: SiteSettings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeTab,
  setActiveTab,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'accommodation', label: 'Accommodations' },
    { id: 'wellness', label: 'Wellness & Spa' },
    { id: 'dining', label: 'Dining' },
    { id: 'activity', label: 'Excursions' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e7e1d7] shadow-sm'
          : 'bg-gradient-to-b from-black/80 via-black/45 to-transparent border-b border-white/10'
      }`}
    >
      {/* Top micro bar for direct contact & location */}
      <div
        className={`hidden md:flex justify-between items-center px-6 lg:px-12 py-1.5 text-xs transition-colors duration-300 ${
          isScrolled
            ? 'text-[#6e685f] border-b border-[#ece6dc]'
            : 'text-white/85 border-b border-white/15'
        }`}
      >
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className={`w-3.5 h-3.5 ${isScrolled ? 'text-[#886944]' : 'text-[#e3bf96]'}`} />
            {settings.brandAddress}
          </span>
          <span className={isScrolled ? 'text-[#a49d92]' : 'text-white/40'}>|</span>
          <span>{settings.brandCheckinCheckout}</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={`tel:${settings.brandPhonePrimary.replace(/\s+/g, '')}`}
            className={`flex items-center gap-1 transition-colors ${
              isScrolled ? 'hover:text-[#886944]' : 'hover:text-[#e3bf96] text-white/90'
            }`}
          >
            <Phone className={`w-3 h-3 ${isScrolled ? 'text-[#886944]' : 'text-[#e3bf96]'}`} />
            {settings.brandPhonePrimary}
          </a>
          <a
            href={settings.brandTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 hover:underline ${
              isScrolled ? 'text-[#2272a8]' : 'text-[#82cfff]'
            }`}
          >
            <Send className="w-3 h-3" />
            Telegram
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          {settings.brandLogoUrl ? (
            <img
              src={settings.brandLogoUrl}
              alt="Serene Vita Retreat"
              className={`h-11 sm:h-12 w-auto object-contain max-w-[170px] transition-all duration-300 ${
                isScrolled ? '' : 'brightness-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
              }`}
            />
          ) : (
            <div className="flex flex-col">
              <span
                className={`font-serif text-2xl font-semibold tracking-wider transition-colors duration-300 ${
                  isScrolled ? 'text-[#24211d]' : 'text-white drop-shadow-md'
                }`}
              >
                SERENE VITA
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  isScrolled ? 'text-[#886944]' : 'text-[#e3bf96]'
                }`}
              >
                Retreat &bull; Kep
              </span>
            </div>
          )}
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm tracking-wide transition-colors relative py-1 focus:outline-none cursor-pointer ${
                  isActive
                    ? isScrolled
                      ? 'text-[#886944] font-medium'
                      : 'text-[#e3bf96] font-medium drop-shadow-sm'
                    : isScrolled
                    ? 'text-[#4a453e] hover:text-[#886944]'
                    : 'text-white/85 hover:text-white drop-shadow-sm'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                      isScrolled ? 'bg-[#886944]' : 'bg-[#e3bf96]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={DIRECT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#886944] hover:bg-[#745736] text-[#faf7f2] text-xs uppercase tracking-widest font-medium rounded transition shadow-md hover:shadow-lg"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Your Stay
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <a
            href={DIRECT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-[#886944] hover:bg-[#745736] text-[#faf7f2] text-xs uppercase tracking-wider font-medium rounded shadow-sm"
          >
            Book
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors focus:outline-none cursor-pointer ${
              isScrolled ? 'text-[#4a453e] hover:text-[#24211d]' : 'text-white hover:text-white/80'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf7f2] border-b border-[#e7e1d7] px-6 py-6 space-y-4 shadow-xl animate-in fade-in duration-200 text-[#24211d]">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base py-1.5 tracking-wide focus:outline-none cursor-pointer ${
                  activeTab === link.id
                    ? 'text-[#886944] font-medium'
                    : 'text-[#4a453e] hover:text-[#886944]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#e2dcce] space-y-2 text-xs text-[#6e685f]">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#886944]" />
              {settings.brandPhonePrimary}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#886944]" />
              {settings.brandAddress}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
