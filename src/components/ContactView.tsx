import React, { useState } from 'react';
import { ContactPageData, SiteSettings } from '../types';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  data: ContactPageData;
  settings: SiteSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ data, settings }) => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate inquiry dispatch
    setFormSent(true);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Header */}
      <section className="relative pt-36 sm:pt-44 pb-24 sm:pb-28 text-center px-4 overflow-hidden bg-[#24211d] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={data.contactHeroImageUrl}
            alt="Contact Serene Vita"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
            {data.contactHeroTagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            {data.contactHeroTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#d8d2c7] font-light max-w-2xl mx-auto leading-relaxed">
            {data.contactHeroDesc}
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#886944] font-semibold">
                Direct Channels
              </span>
              <h2 className="font-serif text-3xl text-[#24211d] mt-1">
                Concierge & Reservations
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-[#faf7f2] rounded-xl border border-[#e4ded3] flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#886944] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#635c51]">
                    Phone / WhatsApp
                  </h4>
                  <p className="text-base text-[#24211d] font-medium mt-0.5">
                    {settings.brandPhonePrimary}
                  </p>
                  <p className="text-xs text-[#80776a] mt-0.5">
                    Alternate: {settings.brandPhoneSecondary}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#faf7f2] rounded-xl border border-[#e4ded3] flex items-start gap-4">
                <Send className="w-5 h-5 text-[#886944] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#635c51]">
                    Instant Chat (Telegram)
                  </h4>
                  <a
                    href={settings.brandTelegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#2272a8] hover:underline font-medium block mt-0.5"
                  >
                    Open @serenevita Telegram
                  </a>
                  <p className="text-xs text-[#80776a] mt-0.5">
                    Fastest response for availability & bookings
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#faf7f2] rounded-xl border border-[#e4ded3] flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#886944] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#635c51]">
                    Email Inquiries
                  </h4>
                  <p className="text-sm text-[#24211d] font-medium mt-0.5">
                    {settings.brandEmail}
                  </p>
                  <p className="text-xs text-[#80776a] mt-0.5">
                    We reply within 12 hours
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#faf7f2] rounded-xl border border-[#e4ded3] flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#886944] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#635c51]">
                    Location
                  </h4>
                  <p className="text-sm text-[#24211d] font-medium mt-0.5">
                    {settings.brandAddress}
                  </p>
                  <p className="text-xs text-[#80776a] mt-0.5">
                    {settings.brandCheckinCheckout}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7 bg-[#faf7f2] p-8 sm:p-12 rounded-2xl border border-[#e4ded3] shadow-sm">
            {formSent ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e8f2e9] text-[#2d6a36] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#24211d]">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-[#665e53] max-w-md mx-auto">
                  Thank you for reaching out to Serene Vita Retreat. Our reservations team will respond to {formData.email} shortly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-6 py-2.5 bg-[#886944] text-white text-xs uppercase tracking-wider rounded font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#886944] font-semibold">
                    Send a Message
                  </span>
                  <h3 className="font-serif text-2xl text-[#24211d] mt-1">
                    How May We Assist You?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#4a443b]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#4a443b]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#4a443b]">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+855 ..."
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#4a443b]">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                    >
                      <option value="Villa Reservations">Villa Reservations</option>
                      <option value="Wellness & Spa Inquiries">Wellness & Spa Inquiries</option>
                      <option value="Private Dining & Events">Private Dining & Events</option>
                      <option value="Airport Transfer & Concierge">Airport Transfer & Concierge</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#4a443b]">
                    Your Message / Desired Dates *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your planned arrival dates, number of guests, or special requirements..."
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#d9d2c5] text-xs text-[#24211d] focus:outline-none focus:border-[#886944]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition shadow-md"
                >
                  Send Inquiry to Reservations Team
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Getting Here Guide Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f0e9df] p-8 sm:p-12 rounded-2xl border border-[#ded5c6] space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#886944]" />
            <h3 className="font-serif text-2xl text-[#24211d]">
              {data.contactDirectionsTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5d564c] leading-relaxed">
            {data.contactDirectionsText}
          </p>
        </div>
      </section>
    </div>
  );
};
