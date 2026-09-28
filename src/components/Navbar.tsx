import React, { useState } from 'react';
import { SiteSettings } from '../types';
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
    <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e7e1d7] transition-all">
      {/* Top micro bar for direct contact & location */}
      <div className="hidden md:flex justify-between items-center px-6 lg:px-12 py-1.5 text-xs text-[#6e685f] border-b border-[#ece6dc]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#886944]" />
            {settings.brandAddress}
          </span>
          <span className="text-[#a49d92]">|</span>
          <span>{settings.brandCheckinCheckout}</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={`tel:${settings.brandPhonePrimary.replace(/\s+/g, '')}`}
            className="flex items-center gap-1 hover:text-[#886944] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#886944]" />
            {settings.brandPhonePrimary}
          </a>
          <a
            href={settings.brandTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#2272a8] hover:underline"
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
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          {settings.brandLogoUrl ? (
            <img
              src={settings.brandLogoUrl}
              alt="Serene Vita Retreat"
              className="h-12 w-auto object-contain max-w-[170px]"
            />
          ) : (
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-wider text-[#24211d]">
                SERENE VITA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#886944]">
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
                className={`text-sm tracking-wide transition-colors relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-[#886944] font-medium'
                    : 'text-[#4a453e] hover:text-[#886944]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#886944] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#886944] hover:bg-[#745736] text-[#faf7f2] text-xs uppercase tracking-widest font-medium rounded transition shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Your Stay
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-1.5 bg-[#886944] text-[#faf7f2] text-xs uppercase tracking-wider font-medium rounded"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4a453e] hover:text-[#24211d] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf7f2] border-b border-[#e7e1d7] px-6 py-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base py-1.5 tracking-wide focus:outline-none ${
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
