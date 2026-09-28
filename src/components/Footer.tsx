import React from 'react';
import { SiteSettings } from '../types';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1f1d19] text-[#d6cec2] pt-16 pb-12 border-t border-[#38332c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            {settings.brandLogoUrl ? (
              <img
                src={settings.brandLogoUrl}
                alt="Serene Vita Retreat"
                className="h-12 w-auto object-contain brightness-110"
              />
            ) : (
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light tracking-widest text-[#f5efe6]">
                  SERENE VITA
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89569]">
                  Retreat &bull; Kep
                </span>
              </div>
            )}
            <p className="text-xs text-[#a39c90] leading-relaxed">
              {settings.brandTagline}. An exclusive boutique eco-wellness haven overlooking the Gulf of Thailand and the misty slopes of Krong Kaeb.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={settings.brandInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2d2923] hover:bg-[#886944] text-[#e0d7cb] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.brandFacebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2d2923] hover:bg-[#886944] text-[#e0d7cb] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.brandTelegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2d2923] hover:bg-[#886944] text-[#e0d7cb] flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-base text-[#f5efe6] tracking-wide mb-4">
              Explore Serene Vita
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b8b0a3]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accommodation')}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Villas & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wellness')}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Holistic Spa & Yoga Deck
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Artisan Dining & Rooftop Bar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('activity')}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Kep Excursions & Nature
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Visual Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="font-serif text-base text-[#f5efe6] tracking-wide mb-4">
              Reservations & Concierge
            </h4>
            <ul className="space-y-3 text-xs text-[#b8b0a3]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#b89569] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>{settings.brandPhonePrimary}</span>
                  <span className="text-[#847d72]">{settings.brandPhoneSecondary}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#b89569] shrink-0" />
                <a
                  href={`mailto:${settings.brandEmail}`}
                  className="hover:text-[#e8b982] transition-colors"
                >
                  {settings.brandEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-[#b89569] shrink-0" />
                <a
                  href={settings.brandTelegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e8b982] transition-colors"
                >
                  Chat with Concierge on Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Times */}
          <div>
            <h4 className="font-serif text-base text-[#f5efe6] tracking-wide mb-4">
              Location & Arrival
            </h4>
            <div className="space-y-3 text-xs text-[#b8b0a3]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#b89569] shrink-0 mt-0.5" />
                <span>{settings.brandAddress}</span>
              </p>
              <div className="pt-2 pb-1 border-t border-[#312c26]">
                <p className="text-[11px] text-[#938c80] uppercase tracking-wider mb-1">
                  Arrival Schedule
                </p>
                <p className="text-xs text-[#ded8cd]">{settings.brandCheckinCheckout}</p>
              </div>
              <p className="text-[11px] text-[#868074]">
                Private airport and capital city transfers available upon advance request.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-[#2e2a24] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7f786d] gap-4">
          <p>&copy; {new Date().getFullYear()} Serene Vita Retreat. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#a49a88]">Krong Kaeb, Kingdom of Cambodia</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#b89569] hover:text-[#f5efe6] transition-colors"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
