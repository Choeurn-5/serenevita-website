import React, { useState } from 'react';
import { GalleryPageData } from '../types';
import { Maximize2, X } from 'lucide-react';

interface GalleryViewProps {
  data: GalleryPageData;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ data }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Header */}
      <section className="relative pt-36 sm:pt-44 pb-24 sm:pb-28 text-center px-4 overflow-hidden bg-[#24211d] text-white">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af82] font-semibold">
            {data.galleryHeroTagline}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            {data.galleryHeroTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#d8d2c7] font-light max-w-2xl mx-auto leading-relaxed">
            {data.galleryHeroDesc}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={photo}
                alt={`Retreat Moment ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Enlarged view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
