import React from 'react';
import { HomePageData, RoomItem } from '../types';
import { DIRECT_BOOKING_URL } from '../api';
import { Star, ArrowRight, ShieldCheck, Wind, Coffee, Sparkles, Droplets } from 'lucide-react';

interface HomePageProps {
  data: HomePageData;
  rooms: RoomItem[];
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  rooms,
  onNavigate,
  onOpenBooking,
}) => {
  const pillarIcons = [
    <Droplets className="w-5 h-5 text-[#886944]" />,
    <Sparkles className="w-5 h-5 text-[#886944]" />,
    <Coffee className="w-5 h-5 text-[#886944]" />,
    <Wind className="w-5 h-5 text-[#886944]" />,
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image with warm dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImageUrl}
            alt="Serene Vita Retreat Kep"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#181613]/55 via-[#181613]/40 to-[#181613]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-[#faf7f2]">
          <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#e3bf96] mb-4 font-medium px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-sm border border-white/10">
            {data.heroTagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.1]">
            {data.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-[#ded8ce] max-w-2xl mx-auto font-light leading-relaxed mb-10">
            {data.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('accommodation')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition shadow-lg hover:shadow-xl cursor-pointer"
            >
              {data.heroCtaText}
            </button>
            <a
              href={DIRECT_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-medium rounded backdrop-blur-md border border-white/30 transition cursor-pointer text-center"
            >
              Reserve a Villa
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & PHILOSOPHY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photos composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] max-w-lg mx-auto">
              <img
                src={data.aboutImage1Url}
                alt="Retreat Grounds"
                className="w-full h-full object-cover"
              />
            </div>
            {data.aboutImage2Url && (
              <div className="hidden sm:block absolute -bottom-10 -right-6 w-3/5 rounded-xl overflow-hidden shadow-2xl border-4 border-[#faf7f2] aspect-[4/3]">
                <img
                  src={data.aboutImage2Url}
                  alt="Retreat Atmosphere"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Story content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
              {data.aboutTagline}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#24211d] leading-tight">
              {data.aboutTitle}
            </h2>
            <p className="text-[#595349] leading-relaxed text-sm sm:text-base font-light">
              {data.aboutText}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-6 border-t border-[#e8e2d7]">
              <div>
                <span className="block font-serif text-3xl font-normal text-[#886944]">
                  100%
                </span>
                <span className="text-xs uppercase tracking-wider text-[#6a6459]">
                  Natural Surroundings
                </span>
              </div>
              <div className="hidden sm:block w-px bg-[#e4ded3]" />
              <div>
                <span className="block font-serif text-3xl font-normal text-[#886944]">
                  Private
                </span>
                <span className="text-xs uppercase tracking-wider text-[#6a6459]">
                  Eco-Luxury Sanctuary
                </span>
              </div>
              <div className="hidden sm:block w-px bg-[#e4ded3]" />
              <div>
                <span className="block font-serif text-3xl font-normal text-[#886944]">
                  Kep
                </span>
                <span className="text-xs uppercase tracking-wider text-[#6a6459]">
                  Cambodia's Seaside Jewel
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS / HIGHLIGHTS */}
      <section className="bg-[#f2ece3] py-20 border-y border-[#e6decb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#886944] font-semibold">
              The Serene Vita Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
              Carefully Crafted for Your Well-being
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: data.pillar1Title, desc: data.pillar1Desc, idx: 0 },
              { title: data.pillar2Title, desc: data.pillar2Desc, idx: 1 },
              { title: data.pillar3Title, desc: data.pillar3Desc, idx: 2 },
              { title: data.pillar4Title, desc: data.pillar4Desc, idx: 3 },
            ].map((pillar) => (
              <div
                key={pillar.idx}
                className="bg-[#faf7f2] p-8 rounded-xl border border-[#e4ded3] shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-12 h-12 rounded-lg bg-[#ede5d8] flex items-center justify-center mb-4">
                  {pillarIcons[pillar.idx]}
                </div>
                <h3 className="font-serif text-xl font-medium text-[#24211d]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#5f584e] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ROOMS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#24211d] mt-1">
              Private Suites & Pool Villas
            </h2>
          </div>
          <button
            onClick={() => onNavigate('accommodation')}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#886944] hover:text-[#5e482f] font-semibold transition"
          >
            View All Suites
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.slice(0, 3).map((room) => (
            <div
              key={room.id}
              className="group bg-[#f7f3ec] rounded-xl overflow-hidden border border-[#e8e2d7] flex flex-col hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.featuredImageUrl}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#1f1d19]/85 backdrop-blur-sm text-white px-3 py-1 rounded text-xs tracking-wider">
                  From ${room.fields.roomPricePerNight} / night
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#24211d] mb-2 group-hover:text-[#886944] transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-xs text-[#676054] line-clamp-2 leading-relaxed">
                    {room.fields.roomDescriptionShort}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ebe4d7] flex items-center justify-between text-xs text-[#787164]">
                  <span>{room.fields.roomSize} &bull; {room.fields.roomBedType}</span>
                  <a
                    href={DIRECT_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#886944] hover:text-[#5e482f] font-semibold uppercase tracking-wider text-[11px] inline-flex items-center gap-1"
                  >
                    Book Now &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WELLNESS & DINING TEASERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Wellness Teaser */}
        <div className="bg-[#f0e9df] rounded-2xl overflow-hidden border border-[#e1d9cc] grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
              Holistic Renewal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
              {data.wellnessTeaserTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5d564c] leading-relaxed">
              {data.wellnessTeaserDesc}
            </p>
            <button
              onClick={() => onNavigate('wellness')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#886944] hover:bg-[#745736] text-[#faf7f2] text-xs uppercase tracking-widest font-medium rounded transition"
            >
              Discover Spa & Yoga
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden">
            <img
              src={data.wellnessTeaserImageUrl}
              alt="Spa and Wellness"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Dining Teaser */}
        <div className="bg-[#f0e9df] rounded-2xl overflow-hidden border border-[#e1d9cc] grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="order-2 lg:order-1 lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden">
            <img
              src={data.diningTeaserImageUrl}
              alt="Artisan Dining"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
              Coastal Gastronomy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
              {data.diningTeaserTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5d564c] leading-relaxed">
              {data.diningTeaserDesc}
            </p>
            <button
              onClick={() => onNavigate('dining')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#886944] hover:bg-[#745736] text-[#faf7f2] text-xs uppercase tracking-widest font-medium rounded transition"
            >
              Explore Our Menus
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. GUEST REVIEWS */}
      <section className="bg-[#24211d] text-[#faf7f2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              {data.reviewsTitle}
            </h2>
            <p className="text-xs text-[#a69e92]">{data.reviewsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.reviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#2e2a25] p-8 rounded-xl border border-[#423c34] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 fill-[#d4af82] text-[#d4af82]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#ded8ce] leading-relaxed italic font-light">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#423c34] flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-medium text-white">
                      {review.author}
                    </span>
                    <span className="text-[#968f83]">{review.origin}</span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#d4af82]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
