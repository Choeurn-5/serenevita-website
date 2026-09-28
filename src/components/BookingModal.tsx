import React, { useState } from 'react';
import { RoomItem, SiteSettings } from '../types';
import { X, Calendar, Phone, Send, CheckCircle2, User, Mail, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: RoomItem[];
  settings: SiteSettings;
  preSelectedRoom?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  settings,
  preSelectedRoom,
}) => {
  const [selectedRoom, setSelectedRoom] = useState(preSelectedRoom || (rooms[0]?.title || ''));
  const [dates, setDates] = useState({ checkIn: '', checkOut: '', guests: '2' });
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '', specialRequest: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const telegramBookingUrl = `${settings.brandTelegram}?text=${encodeURIComponent(
    `Hello Serene Vita Retreat, I would like to inquire about reserving: ${selectedRoom || 'a suite'} for ${dates.guests} guests.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#faf7f2] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative border border-[#dfd7c8] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#ece5d9] hover:bg-[#dfd7c8] text-[#332f29] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
            Direct Reservation
          </span>
          <h2 className="font-serif text-3xl text-[#24211d] mt-1">
            Reserve Your Haven
          </h2>
          <p className="text-xs text-[#736c60] mt-1">
            Best rate guarantee when booking directly with our reservations team.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#e8f2e9] text-[#2d6a36] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-[#24211d]">
              Reservation Request Sent!
            </h3>
            <p className="text-xs text-[#635c51] max-w-sm mx-auto leading-relaxed">
              We have received your booking inquiry for <strong>{selectedRoom}</strong>. Our reservations desk will confirm availability and rates with you at <strong>{guestInfo.email}</strong> within 6 hours.
            </p>

            <div className="pt-4 flex flex-col gap-2">
              <a
                href={telegramBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#2272a8] hover:bg-[#1a5b87] text-white text-xs uppercase tracking-wider font-medium rounded transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Fast-Track on Telegram Concierge
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#ece5d9] text-[#423d35] text-xs uppercase tracking-wider rounded font-medium"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Room selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4a443b]">
                Select Suite or Villa
              </label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title} — from ${r.fields.roomPricePerNight}/night
                  </option>
                ))}
              </select>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#4a443b]">
                  Check-in Date
                </label>
                <input
                  type="date"
                  required
                  value={dates.checkIn}
                  onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#4a443b]">
                  Check-out Date
                </label>
                <input
                  type="date"
                  required
                  value={dates.checkOut}
                  onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#4a443b]">
                  Guests
                </label>
                <select
                  value={dates.guests}
                  onChange={(e) => setDates({ ...dates, guests: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults / Family</option>
                </select>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#4a443b]">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marie Dupont"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#4a443b]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marie@domain.com"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#4a443b]">
                WhatsApp / Phone (Optional for quick confirmations)
              </label>
              <input
                type="text"
                placeholder="+855 ..."
                value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#4a443b]">
                Special Requests (e.g. Airport Transfer, Dietary Needs)
              </label>
              <textarea
                rows={2}
                placeholder="Let us know if you need pickup from Phnom Penh or dietary preferences..."
                value={guestInfo.specialRequest}
                onChange={(e) => setGuestInfo({ ...guestInfo, specialRequest: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
              />
            </div>

            <div className="pt-3 space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition shadow-md"
              >
                Submit Booking Request
              </button>

              <div className="text-center">
                <span className="text-[11px] text-[#8c8477]">or instant booking via</span>
                <a
                  href={telegramBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center justify-center gap-1.5 text-xs text-[#2272a8] hover:underline font-medium"
                >
                  <Send className="w-3.5 h-3.5" />
                  Chat Directly with Concierge on Telegram
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
