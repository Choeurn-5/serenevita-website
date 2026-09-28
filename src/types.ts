export interface SiteSettings {
  brandPhonePrimary: string;
  brandPhoneSecondary: string;
  brandEmail: string;
  brandTelegram: string;
  brandAddress: string;
  brandCheckinCheckout: string;
  brandFacebook: string;
  brandInstagram: string;
  brandTagline: string;
  brandLogoUrl?: string;
}

export interface RoomItem {
  id: string;
  databaseId?: number;
  title: string;
  slug?: string;
  featuredImageUrl?: string;
  fields: {
    roomPricePerNight?: number;
    roomSize?: string;
    roomBedType?: string;
    roomMaxGuests?: number;
    roomDescriptionShort?: string;
    roomFeatures?: string;
    roomGalleryPhotos?: string[];
  };
}

export interface HomePageData {
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  heroCtaText: string;
  heroImageUrl?: string;
  aboutTagline: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage1Url?: string;
  aboutImage2Url?: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Title: string;
  pillar4Desc: string;
  wellnessTeaserTitle: string;
  wellnessTeaserDesc: string;
  wellnessTeaserImageUrl?: string;
  diningTeaserTitle: string;
  diningTeaserDesc: string;
  diningTeaserImageUrl?: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviews: Array<{
    author: string;
    origin: string;
    rating: number;
    text: string;
  }>;
}

export interface AccommodationPageData {
  title: string;
  accomHeroTagline: string;
  accomHeroTitle: string;
  accomHeroDesc: string;
  accomHeroImageUrl?: string;
  includedPerks: string[];
}

export interface WellnessPageData {
  title: string;
  wellnessHeroTagline: string;
  wellnessHeroTitle: string;
  wellnessHeroDesc: string;
  wellnessHeroImageUrl?: string;
  treatments: Array<{
    name: string;
    duration: string;
    desc: string;
  }>;
  yogaTitle: string;
  yogaSchedule: string;
  yogaDesc: string;
  yogaImageUrl?: string;
}

export interface ActivityPageData {
  title: string;
  activityHeroTagline: string;
  activityHeroTitle: string;
  activityHeroDesc: string;
  activityHeroImageUrl?: string;
  activities: Array<{
    title: string;
    badge: string;
    desc: string;
    imageUrl?: string;
  }>;
}

export interface GalleryPageData {
  title: string;
  galleryHeroTagline: string;
  galleryHeroTitle: string;
  galleryHeroDesc: string;
  photos: string[];
}

export interface ContactPageData {
  title: string;
  contactHeroTagline: string;
  contactHeroTitle: string;
  contactHeroDesc: string;
  contactHeroImageUrl?: string;
  contactDirectionsTitle: string;
  contactDirectionsText: string;
}
