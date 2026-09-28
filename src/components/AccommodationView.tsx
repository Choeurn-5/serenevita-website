import React, { useState } from 'react';
import { AccommodationPageData, RoomItem } from '../types';
import { DIRECT_BOOKING_URL } from '../api';
import { Users, Maximize, Bed, CheckCircle2, ChevronRight, X, Sparkles } from 'lucide-react';

interface AccommodationViewProps {
  data: AccommodationPageData;
  rooms: RoomItem[];
  onOpenBookingForRoom: (roomTitle: string) => void;
}

export const AccommodationView: React.FC<AccommodationViewProps> = ({
  data,
  rooms,
  onOpenBookingForRoom,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);

  return (
    <div className="space-y-20 pb-24">
      {/* Header Banner */}
      <section className="relative pt-36 sm:pt-44 pb-24 sm:pb-28 text-center px-4 overflow-hidden bg-[#24211d] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={data.accomHeroImageUrl}
            alt="Villas and Suites"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
            {data.accomHeroTagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            {data.accomHeroTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#d8d2c7] font-light max-w-2xl mx-auto leading-relaxed">
            {data.accomHeroDesc}
          </p>
        </div>
      </section>

      {/* Complimentary Inclusions Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f0e9df] p-8 sm:p-10 rounded-2xl border border-[#e1d9cc]">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#886944]" />
            <h3 className="font-serif text-2xl text-[#24211d]">
              Every Stay Inclusions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-[#524c43]">
            {data.includedPerks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#886944] shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Listing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {rooms.map((room, index) => {
          const isReversed = index % 2 === 1;
          const featuresList = (room.fields.roomFeatures || '')
            .split('\n')
            .map((f) => f.trim())
            .filter(Boolean);

          return (
            <div
              key={room.id}
              className="bg-[#faf7f2] rounded-2xl overflow-hidden border border-[#e4ded3] shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Photo Area */}
              <div
                className={`lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] overflow-hidden ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <img
                  src={room.featuredImageUrl}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1f1d19]/85 text-white backdrop-blur-sm px-4 py-1.5 rounded text-xs tracking-wider font-light">
                  From ${room.fields.roomPricePerNight} / night
                </div>
              </div>

              {/* Details Area */}
              <div
                className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-[#7d7568]">
                    <span className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-[#886944]" />
                      {room.fields.roomSize}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-[#886944]" />
                      {room.fields.roomBedType}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#886944]" />
                      Up to {room.fields.roomMaxGuests}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#24211d]">
                    {room.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5f584e] leading-relaxed">
                    {room.fields.roomDescriptionShort}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#886944] font-semibold">
                      Villa Features:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6e675b]">
                      {featuresList.slice(0, 4).map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#886944]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#e9e3d8] flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="text-xs uppercase tracking-wider text-[#886944] hover:text-[#5e482f] font-semibold transition"
                  >
                    View Gallery & Details
                  </button>
                  <a
                    href={DIRECT_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition shadow-sm"
                  >
                    Book Suite
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Room Detail Modal with Gallery */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#faf7f2] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative border border-[#dfd7c8] shadow-2xl">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#ece5d9] hover:bg-[#dfd7c8] text-[#332f29] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#886944]">
                Suite Overview
              </span>
              <h3 className="font-serif text-3xl text-[#24211d] mt-1">
                {selectedRoom.title}
              </h3>
            </div>

            {/* Gallery images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 aspect-[16/9] rounded-xl overflow-hidden">
                <img
                  src={selectedRoom.featuredImageUrl}
                  alt={selectedRoom.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedRoom.fields.roomGalleryPhotos?.map((photo, pIdx) => (
                <div key={pIdx} className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={photo}
                    alt={`Detail ${pIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#5f584e] leading-relaxed">
              <p>{selectedRoom.fields.roomDescriptionShort}</p>
              <div className="p-4 bg-[#f1ece2] rounded-xl space-y-2">
                <h4 className="font-serif text-base text-[#24211d]">
                  Complete Suite Amenities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#524c43]">
                  {(selectedRoom.fields.roomFeatures || '')
                    .split('\n')
                    .map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#886944]" />
                        <span>{f}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2dbce] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7e7669]">Nightly Rate</span>
                <p className="font-serif text-2xl text-[#24211d]">
                  ${selectedRoom.fields.roomPricePerNight}{' '}
                  <span className="text-xs font-sans text-[#7e7669]">/ night</span>
                </p>
              </div>
              <a
                href={DIRECT_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition"
              >
                Book Suite Online
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
