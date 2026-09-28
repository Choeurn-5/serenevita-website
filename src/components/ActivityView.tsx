import React from 'react';
import { ActivityPageData } from '../types';
import { Compass, MapPin } from 'lucide-react';

interface ActivityViewProps {
  data: ActivityPageData;
  onOpenBooking: () => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ data, onOpenBooking }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Header */}
      <section className="relative py-28 text-center px-4 overflow-hidden bg-[#24211d] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={data.activityHeroImageUrl}
            alt="Kep Excursions"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
            {data.activityHeroTagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            {data.activityHeroTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#d8d2c7] font-light max-w-2xl mx-auto leading-relaxed">
            {data.activityHeroDesc}
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.activities.map((act, i) => (
            <div
              key={i}
              className="group bg-[#faf7f2] rounded-2xl overflow-hidden border border-[#e4ded3] shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={act.imageUrl}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#1f1d19]/80 backdrop-blur-sm text-white px-3.5 py-1 rounded text-xs uppercase tracking-wider font-light">
                  {act.badge}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#886944]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kep & Surrounding Coast</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#24211d] font-normal leading-snug">
                    {act.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5d564c] leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ebe4d7] flex items-center justify-between">
                  <button
                    onClick={onOpenBooking}
                    className="text-xs uppercase tracking-wider text-[#886944] hover:text-[#5e482f] font-semibold transition"
                  >
                    Inquire Concierge Excursion
                  </button>
                  <Compass className="w-5 h-5 text-[#886944]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
