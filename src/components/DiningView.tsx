import React from 'react';
import { Utensils, Clock, Sparkles } from 'lucide-react';
import { FALLBACK_ASSETS } from '../api';

interface DiningViewProps {
  onOpenBooking: () => void;
}

export const DiningView: React.FC<DiningViewProps> = ({ onOpenBooking }) => {
  const dishes = [
    {
      name: 'Kep Green Pepper Crab',
      desc: 'Wok-fried fresh blue swimming crab with organic fresh Kampot green peppercorns and garlic glaze.',
      category: 'Signature Seafood',
    },
    {
      name: 'Coastal Seafood Amok',
      desc: 'Steamed coconut curry souffle infused with kroeung lemongrass paste, local fish, and noni leaves.',
      category: 'Khmer Classic',
    },
    {
      name: 'Grilled Gulf Squid with Lime Pepper',
      desc: 'Charcoal grilled Gulf squid served with traditional fresh lime juice and crushed black pepper.',
      category: 'Charcoal Grill',
    },
    {
      name: 'Kep Sunset Botanical Cocktail',
      desc: 'Signature botanical gin infused with kaffir lime, lemongrass syrup, fresh passionfruit, and tonic.',
      category: 'Rooftop Bar',
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Header */}
      <section className="relative pt-36 sm:pt-44 pb-24 sm:pb-28 text-center px-4 overflow-hidden bg-[#24211d] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={FALLBACK_ASSETS.dining}
            alt="Artisan Dining"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
            Culinary Journey in Kep
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            Artisan Flavors of Ocean & Soil
          </h1>
          <p className="text-sm sm:text-base text-[#d8d2c7] font-light max-w-2xl mx-auto leading-relaxed">
            Celebrating the bountiful produce of southern Cambodia, our culinary concept blends classical French elegance with vibrant, authentic Khmer coastal recipes.
          </p>
        </div>
      </section>

      {/* Culinary Concept */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={FALLBACK_ASSETS.diningFood}
              alt="Culinary Creation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
              Farm & Ocean-To-Table
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
              Fresh Catch & Kampot Pepper
            </h2>
            <p className="text-xs sm:text-sm text-[#5d564c] leading-relaxed">
              Each morning, our culinary team selects the freshest blue swimming crabs and seafood straight from Kep Crab Market, paired with aromatic, world-renowned Kampot green peppercorns and organic herbs from our garden.
            </p>

            <div className="p-4 bg-[#f0e9df] rounded-xl border border-[#ded5c6] space-y-1">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#886944]">
                <Clock className="w-3.5 h-3.5" />
                Dining Hours
              </span>
              <p className="text-xs text-[#544d42]">
                Breakfast: 7:00 - 10:30 AM &bull; Lunch & Dinner: 11:30 AM - 10:00 PM
              </p>
            </div>

            <div>
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#886944] hover:bg-[#745736] text-white text-xs uppercase tracking-widest font-medium rounded transition"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#886944] font-semibold">
            Curated Menu Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211d]">
            Signature Culinary Creations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dishes.map((dish, i) => (
            <div
              key={i}
              className="bg-[#faf7f2] p-8 rounded-2xl border border-[#e4ded3] shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#886944] font-semibold">
                  {dish.category}
                </span>
                <Utensils className="w-4 h-4 text-[#886944]" />
              </div>
              <h3 className="font-serif text-2xl text-[#24211d] font-normal">
                {dish.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#635c51] leading-relaxed">
                {dish.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
