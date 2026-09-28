import React from 'react';
import { WellnessPageData } from '../types';
import { Sparkles, Clock, Heart, Calendar } from 'lucide-react';

interface WellnessViewProps {
  data: WellnessPageData;
  onOpenBooking: () => void;
}

export const WellnessView: React.FC<WellnessViewProps> = ({ data, onOpenBooking }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Header */}
      <section className="relative py-28 text-center px-4 overflow-hidden bg-[#24211d] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={data.wellnessHeroImageUrl}
            alt="Wellness & Spa"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
            {data.wellnessHeroTagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            {data.wellnessHeroTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#d8d2c7] font-light max-w-2xl mx-auto leading-relaxed">
            {data.wellnessHeroDesc}
          </p>
        </div>
      </section>

      {/* Spa Treatments Menu */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
            Ancient Khmer Botanicals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
            Signature Spa Rituals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.treatments.map((treatment, idx) => (
            <div
              key={idx}
              className="bg-[#faf7f2] p-8 rounded-2xl border border-[#e4ded3] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#886944]/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#f0e9df] flex items-center justify-center text-[#886944]">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#24211d] font-normal leading-snug">
                    {treatment.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#886944] font-medium mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{treatment.duration}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#635c51] leading-relaxed">
                  {treatment.desc}
                </p>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 bg-[#f0e9df] hover:bg-[#886944] text-[#4d463b] hover:text-white text-xs uppercase tracking-wider font-medium rounded transition"
              >
                Inquire & Book Ritual
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Yoga & Meditation Deck */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0e9df] rounded-2xl overflow-hidden border border-[#e1d9cc] grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-14 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
              Daily Mindfulness
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
              {data.yogaTitle}
            </h2>
            <div className="inline-block px-4 py-2 bg-[#faf7f2] rounded-lg border border-[#ded5c6] text-xs text-[#886944] font-medium">
              <span className="font-semibold uppercase tracking-wider block text-[10px] text-[#71695c]">
                Schedule:
              </span>
              {data.yogaSchedule}
            </div>
            <p className="text-xs sm:text-sm text-[#5d564c] leading-relaxed">
              {data.yogaDesc}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition"
              >
                <Calendar className="w-4 h-4" />
                Reserve Yoga Mat
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 h-80 sm:h-96 lg:h-full min-h-[380px] relative overflow-hidden">
            <img
              src={data.yogaImageUrl}
              alt="Yoga deck in Kep"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
