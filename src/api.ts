import {
  SiteSettings,
  RoomItem,
  HomePageData,
  AccommodationPageData,
  WellnessPageData,
  ActivityPageData,
  GalleryPageData,
  ContactPageData,
} from './types';

export const WP_GRAPHQL_ENDPOINT = 'https://cms.serenevita.asia/graphql';

async function fetchGraphQL<T>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
  try {
    const res = await fetch(WP_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      console.warn(`GraphQL network error: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (json.errors && json.errors.length > 0) {
      console.warn('GraphQL returned errors:', json.errors);
    }
    return json.data as T;
  } catch (err) {
    console.warn('Failed to fetch from WordPress GraphQL:', err);
    return null;
  }
}

// Local fallback images organized by page (served from /public/images/)
export const FALLBACK_ASSETS = {
  // Home Page: /public/images/home/
  hero: '/images/home/hero.jpg',
  about: '/images/home/about-1.jpg',
  aboutSecondary: '/images/home/about-2.jpg',
  wellnessTeaser: '/images/home/wellness-teaser.jpg',
  diningTeaser: '/images/home/dining-teaser.jpg',

  // Accommodation Page: /public/images/accommodation/
  retreatPool: '/images/accommodation/hero.jpg',
  accomHero: '/images/accommodation/hero.jpg',

  // Wellness & Spa Page: /public/images/wellness/
  wellness: '/images/wellness/hero.jpg',
  wellnessHero: '/images/wellness/hero.jpg',
  yoga: '/images/wellness/yoga.jpg',

  // Dining Page: /public/images/dining/
  dining: '/images/dining/hero.jpg',
  diningFood: '/images/dining/concept.jpg',

  // Activities Page: /public/images/activities/
  activityHero: '/images/activities/hero.jpg',
  crabMarket: '/images/activities/crab-market.jpg',
  pepperFarm: '/images/activities/pepper-farm.jpg',
  jungleTrek: '/images/activities/jungle-trek.jpg',
  rabbitIsland: '/images/activities/rabbit-island.jpg',

  // Gallery Page: /public/images/gallery/
  gallery: [
    '/images/gallery/gallery-1.jpg',
    '/images/gallery/gallery-2.jpg',
    '/images/gallery/gallery-3.jpg',
    '/images/gallery/gallery-4.jpg',
    '/images/gallery/gallery-5.jpg',
    '/images/gallery/gallery-6.jpg',
  ],

  // Contact Page: /public/images/contact/
  contactHero: '/images/contact/hero.jpg',

  // Common: /public/images/common/
  logo: '/images/common/logo.webp',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `
    query GetSiteSettings {
      siteSettings {
        siteSettingsData {
          brandPhonePrimary
          brandPhoneSecondary
          brandEmail
          brandTelegram
          brandAddress
          brandCheckinCheckout
          brandFacebook
          brandInstagram
          brandTagline
          brandLogo {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.siteSettings?.siteSettingsData;

  return {
    brandPhonePrimary: raw?.brandPhonePrimary || '+855 15 255 529',
    brandPhoneSecondary: raw?.brandPhoneSecondary || '+855 78 595 988',
    brandEmail: raw?.brandEmail || 'info@serenevita.asia',
    brandTelegram: raw?.brandTelegram || 'https://t.me/serenevita',
    brandAddress: raw?.brandAddress || 'Phum Kep, Sangkat Kep, Krong Kaeb, Cambodia',
    brandCheckinCheckout: raw?.brandCheckinCheckout || 'Check-in: 2:00 PM | Check-out: 12:00 PM',
    brandFacebook: raw?.brandFacebook || 'https://facebook.com/serenevitaretreat',
    brandInstagram: raw?.brandInstagram || 'https://instagram.com/serenevitaretreat',
    brandTagline: raw?.brandTagline || 'A Sanctuary for the Senses in Kep',
    brandLogoUrl: raw?.brandLogo?.node?.sourceUrl || 'https://cms.serenevita.asia/wp-content/uploads/2026/02/cropped-Untitled-2-1.webp',
  };
}

function cleanHtml(html?: string | null): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\[&hellip;\]/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractImagesFromHtml(html?: string | null): string[] {
  if (!html) return [];
  const matches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
  const urls: string[] = [];
  for (const m of matches) {
    if (m[1]) urls.push(m[1]);
  }
  return urls;
}

export async function getRooms(): Promise<RoomItem[]> {
  const query = `
    query GetRooms {
      rooms(first: 100, where: { orderby: { field: DATE, order: ASC } }) {
        nodes {
          id
          databaseId
          title
          slug
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          roomDetails {
            pricePerNight
            roomSize
            bedType
            maxGuests
            roomDescription
            roomAmenities
            roomImage1 {
              node {
                sourceUrl
              }
            }
            roomImage2 {
              node {
                sourceUrl
              }
            }
            roomImage3 {
              node {
                sourceUrl
              }
            }
            roomImage4 {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const nodes = data?.rooms?.nodes || [];

  if (nodes.length > 0) {
    return nodes.map((n: any, idx: number) => {
      const details = n.roomDetails || {};
      const gallery: string[] = [];
      if (details.roomImage1?.node?.sourceUrl) gallery.push(details.roomImage1.node.sourceUrl);
      if (details.roomImage2?.node?.sourceUrl) gallery.push(details.roomImage2.node.sourceUrl);
      if (details.roomImage3?.node?.sourceUrl) gallery.push(details.roomImage3.node.sourceUrl);
      if (details.roomImage4?.node?.sourceUrl) gallery.push(details.roomImage4.node.sourceUrl);

      // Also include any images embedded in post content
      const embeddedImages = extractImagesFromHtml(n.content);
      embeddedImages.forEach((img) => {
        if (!gallery.includes(img)) gallery.push(img);
      });

      // If WordPress image is not yet assigned, use local accommodation fallback
      const defaultMediaImage = '/images/accommodation/hero.jpg';

      // Determine main image: featuredImage -> roomImage1 -> roomImage2 -> gallery -> WordPress upload -> fallback
      const primaryImage =
        n.featuredImage?.node?.sourceUrl ||
        details.roomImage1?.node?.sourceUrl ||
        details.roomImage2?.node?.sourceUrl ||
        gallery[0] ||
        defaultMediaImage ||
        FALLBACK_ASSETS.gallery[idx % FALLBACK_ASSETS.gallery.length];

      // If gallery is empty, populate with primaryImage
      if (gallery.length === 0 && primaryImage) {
        gallery.push(primaryImage);
      }

      // Check if roomDescription is unique, or fallback to clean post content
      const cleanContent = cleanHtml(n.content);
      const isDefaultTemplateDesc =
        !details.roomDescription ||
        details.roomDescription.includes('A sanctuary of restorative calm featuring panoramic views');

      const roomDescriptionFinal =
        !isDefaultTemplateDesc && details.roomDescription
          ? details.roomDescription
          : cleanContent || details.roomDescription || 'A sanctuary of restorative calm in Kep.';

      // Normalize line breaks in room amenities
      const normalizedAmenities = (details.roomAmenities || '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim();

      return {
        id: n.id || String(n.databaseId || idx),
        databaseId: n.databaseId,
        title: n.title,
        slug: n.slug,
        featuredImageUrl: primaryImage,
        fields: {
          roomPricePerNight: Number(details.pricePerNight) || 95,
          roomSize: details.roomSize || '45 m²',
          roomBedType: details.bedType || '1 King Bed',
          roomMaxGuests: Number(details.maxGuests) || 2,
          roomDescriptionShort: roomDescriptionFinal,
          roomFeatures:
            normalizedAmenities ||
            'Private Balcony with Sea & Hill View\nEco Rain Shower & Freestanding Tub\nArtisan Tea & Espresso Machine\nHigh-Speed Wi-Fi\nOrganic Botanical Toiletries\nTurndown Aromatherapy Service',
          roomGalleryPhotos: gallery.length > 0 ? gallery : [primaryImage],
        },
      };
    });
  }

  // Graceful fallback if rooms haven't been added yet
  return [
    {
      id: 'room-1',
      title: 'Deluxe Hillside Sanctuary Suite',
      featuredImageUrl: '/images/accommodation/hero.jpg',
      fields: {
        roomPricePerNight: 120,
        roomSize: '45 m²',
        roomBedType: '1 King Bed',
        roomMaxGuests: 2,
        roomDescriptionShort: 'Surrounded by tropical hillside greenery, featuring an expansive wooden veranda and an open-concept stone rain shower.',
        roomFeatures: 'Veranda with Garden View\nEco Rain Shower\nComplimentary Organic Breakfast\nArtisan Tea Selection\nHigh-Speed Wi-Fi',
      },
    },
    {
      id: 'room-2',
      title: 'Panoramic Ocean View Villa',
      featuredImageUrl: '/images/home/about-1.jpg',
      fields: {
        roomPricePerNight: 185,
        roomSize: '65 m²',
        roomBedType: '1 King Bed + Daybed',
        roomMaxGuests: 3,
        roomDescriptionShort: 'Elevated villa offering unhindered sunset panoramas across the Gulf of Thailand with a freestanding deep-soaking bathtub.',
        roomFeatures: 'Sunset Ocean Panorama\nFreestanding Terrazzo Bathtub\nPrivate Sun Deck\nEspresso Machine & Daily Seasonal Fruit\nTurndown Aromatherapy',
      },
    },
    {
      id: 'room-3',
      title: 'Serene Private Pool Residence',
      featuredImageUrl: '/images/home/hero.jpg',
      fields: {
        roomPricePerNight: 275,
        roomSize: '110 m²',
        roomBedType: '1 Master King + 1 Queen',
        roomMaxGuests: 4,
        roomDescriptionShort: 'The retreat’s crown accommodation: a private plunge pool, secluded bamboo garden courtyard, and dedicated personal butler assistance.',
        roomFeatures: 'Private Freshwater Plunge Pool\nPrivate Courtyard & Outdoor Dining\nPersonal Concierge Assistance\nComplimentary Evening Cocktails\nUnlimited Wellness Spa Pass',
      },
    },
  ];
}

export async function getHomePageData(): Promise<HomePageData> {
  const query = `
    query GetHomePage {
      page(id: "home", idType: URI) {
        title
        homePageFields {
          heroTagline
          heroTitle
          heroDescription
          heroCtaText
          heroImage {
            node {
              sourceUrl
            }
          }
          aboutTagline
          aboutTitle
          aboutText
          aboutImage1 {
            node {
              sourceUrl
            }
          }
          aboutImage2 {
            node {
              sourceUrl
            }
          }
          pillar1Title
          pillar1Desc
          pillar2Title
          pillar2Desc
          pillar3Title
          pillar3Desc
          pillar4Title
          pillar4Desc
          wellnessTeaserTitle
          wellnessTeaserDesc
          wellnessTeaserImage {
            node {
              sourceUrl
            }
          }
          diningTeaserTitle
          diningTeaserDesc
          diningTeaserImage {
            node {
              sourceUrl
            }
          }
          reviewsTitle
          reviewsSubtitle
          review1Author
          review1Origin
          review1Rating
          review1Text
          review2Author
          review2Origin
          review2Rating
          review2Text
          review3Author
          review3Origin
          review3Rating
          review3Text
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.page?.homePageFields || {};

  return {
    heroTagline: raw.heroTagline || 'Welcome to Kep, Cambodia',
    heroTitle: raw.heroTitle || 'A Sanctuary for the Senses in Kep',
    heroDescription: raw.heroDescription || 'Nestled between lush green hills and tranquil coastal waters, Serene Vita invites you to slow down, rejuvenate, and experience luxury wellness in harmony with nature.',
    heroCtaText: raw.heroCtaText || 'Explore Accommodations',
    heroImageUrl: raw.heroImage?.node?.sourceUrl || FALLBACK_ASSETS.hero,
    aboutTagline: raw.aboutTagline || 'Our Philosophy',
    aboutTitle: raw.aboutTitle || 'Restorative Tranquility Amidst Coastal Nature',
    aboutText: raw.aboutText || 'Serene Vita Retreat was born from the desire to create a serene sanctuary away from the hustle of modern life. Located in picturesque Kep, our boutique resort combines modern architectural elegance with the restorative peace of Cambodia\'s southern coast.',
    aboutImage1Url: raw.aboutImage1?.node?.sourceUrl || FALLBACK_ASSETS.about,
    aboutImage2Url: raw.aboutImage2?.node?.sourceUrl || FALLBACK_ASSETS.aboutSecondary,
    pillar1Title: raw.pillar1Title || 'Rooftop Infinity Pool',
    pillar1Desc: raw.pillar1Desc || 'Panoramic views of the Kep hills and sunsets with signature refreshing cocktails.',
    pillar2Title: raw.pillar2Title || 'Holistic Spa & Yoga',
    pillar2Desc: raw.pillar2Desc || 'Traditional Khmer herbal therapies, aromatherapy, and daily ocean-breeze yoga sessions.',
    pillar3Title: raw.pillar3Title || 'Farm-to-Table Cuisine',
    pillar3Desc: raw.pillar3Desc || 'French-Khmer fusion crafted with fresh local Kep pepper and organic ingredients.',
    pillar4Title: raw.pillar4Title || 'Boutique Eco-Luxury',
    pillar4Desc: raw.pillar4Desc || 'Private pool villas and suites designed for deep comfort, relaxation, and privacy.',
    wellnessTeaserTitle: raw.wellnessTeaserTitle || 'Restore Mind, Body & Spirit',
    wellnessTeaserDesc: raw.wellnessTeaserDesc || 'Immerse in holistic treatments inspired by ancient Cambodian wellness traditions and botanicals.',
    wellnessTeaserImageUrl: raw.wellnessTeaserImage?.node?.sourceUrl || FALLBACK_ASSETS.wellness,
    diningTeaserTitle: raw.diningTeaserTitle || 'Artisan Culinary Journeys',
    diningTeaserDesc: raw.diningTeaserDesc || 'Savor authentic regional flavors celebrated with fresh catches from Kep crab market and fragrant Kampot peppers.',
    diningTeaserImageUrl: raw.diningTeaserImage?.node?.sourceUrl || FALLBACK_ASSETS.diningFood,
    reviewsTitle: raw.reviewsTitle || 'Words From Our Guests',
    reviewsSubtitle: raw.reviewsSubtitle || 'Rated 4.5/5 on Booking & TripAdvisor',
    reviews: [
      {
        author: raw.review1Author || 'Sophie Laurent',
        origin: raw.review1Origin || 'France',
        rating: raw.review1Rating || 5,
        text: raw.review1Text || 'An absolute haven of peace. The private pool suite was exquisite, and waking up to the gentle breeze and birdsong made us forget the hectic world outside.',
      },
      {
        author: raw.review2Author || 'Marcus & Elena',
        origin: raw.review2Origin || 'Singapore',
        rating: raw.review2Rating || 5,
        text: raw.review2Text || 'The food with fresh Kampot pepper was delicious, and the rooftop sunset view over Kep is unforgettable. Truly attentive hospitality.',
      },
      {
        author: raw.review3Author || 'David Tan',
        origin: raw.review3Origin || 'Malaysia',
        rating: raw.review3Rating || 5,
        text: raw.review3Text || 'The herbal spa massage was one of the best I\'ve ever experienced in Southeast Asia. We cannot wait to return to Serene Vita.',
      },
    ],
  };
}

export async function getAccommodationPageData(): Promise<AccommodationPageData> {
  const query = `
    query GetAccomPage {
      page(id: "2042", idType: DATABASE_ID) {
        title
        accommodationPageFields {
          accomHeroTagline
          accomHeroTitle
          accomHeroDesc
          accomHeroImage {
            node {
              sourceUrl
            }
          }
          accomIncludedPerks
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.page?.accommodationPageFields || {};
  const perksText = raw.accomIncludedPerks || `Daily Artisan A La Carte Breakfast\nWelcome Tropical Drink & Cold Towel\nComplimentary High-Speed Wi-Fi\nUnlimited Bottled Spring Water\nDaily Housekeeping & Turndown Service\nAccess to Rooftop Infinity Pool`;

  return {
    title: data?.page?.title || 'Accommodation',
    accomHeroTagline: raw.accomHeroTagline || 'Private Sanctuaries',
    accomHeroTitle: raw.accomHeroTitle || 'Villas & Suites Crafted for Restful Slumber',
    accomHeroDesc: raw.accomHeroDesc || 'Designed to embrace the natural topography of Kep, our rooms blend sustainable architecture with premium comforts, expansive terraces, and soothing sea and mountain panoramas.',
    accomHeroImageUrl: raw.accomHeroImage?.node?.sourceUrl || FALLBACK_ASSETS.retreatPool,
    includedPerks: perksText.split('\n').map((s: string) => s.trim()).filter(Boolean),
  };
}

export async function getWellnessPageData(): Promise<WellnessPageData> {
  const query = `
    query GetWellnessPage {
      page(id: "2046", idType: DATABASE_ID) {
        title
        wellnessPageFields {
          wellnessHeroTagline
          wellnessHeroTitle
          wellnessHeroDesc
          wellnessHeroImage {
            node {
              sourceUrl
            }
          }
          treatment1Name
          treatment1Duration
          treatment1Desc
          treatment2Name
          treatment2Duration
          treatment2Desc
          treatment3Name
          treatment3Duration
          treatment3Desc
          yogaTitle
          yogaSchedule
          yogaDesc
          yogaImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.page?.wellnessPageFields || {};

  return {
    title: data?.page?.title || 'Wellness & Spa',
    wellnessHeroTagline: raw.wellnessHeroTagline || 'Holistic Healing & Renewal',
    wellnessHeroTitle: raw.wellnessHeroTitle || 'Restore Harmony to Body, Mind & Spirit',
    wellnessHeroDesc: raw.wellnessHeroDesc || 'Drawing inspiration from centuries-old Khmer botanical healing, our spa treatments and yoga journeys guide you into deep relaxation amidst lush hillside serenity.',
    wellnessHeroImageUrl: raw.wellnessHeroImage?.node?.sourceUrl || FALLBACK_ASSETS.wellness,
    treatments: [
      {
        name: raw.treatment1Name || 'Traditional Khmer Herbal Compress Massage',
        duration: raw.treatment1Duration || '75 mins / $45',
        desc: raw.treatment1Desc || 'Warm steamed muslin parcels filled with lemongrass, praing herbs, and turmeric to relieve deep tension and improve blood circulation.',
      },
      {
        name: raw.treatment2Name || 'Kep Sea Salt & Kampot Pepper Body Scrub',
        duration: raw.treatment2Duration || '60 mins / $38',
        desc: raw.treatment2Desc || 'Gentle mineral exfoliation using natural solar sea salt from Kep salt pans and antioxidant-rich black peppercorns to revitalize dull skin.',
      },
      {
        name: raw.treatment3Name || 'Deep Restorative Aromatherapy',
        duration: raw.treatment3Duration || '90 mins / $55',
        desc: raw.treatment3Desc || 'Flowing rhythmic strokes infused with pure essential oils of ylang-ylang, bergamot, and sweet orange for total mental calm.',
      },
    ],
    yogaTitle: raw.yogaTitle || 'Sunrise & Sunset Hillside Yoga',
    yogaSchedule: raw.yogaSchedule || 'Morning Flow: 7:00 AM | Sunset Yin: 5:30 PM',
    yogaDesc: raw.yogaDesc || 'Our open-air wooden deck overlooks the Kep foothills. Guided by experienced instructors, all skill levels are welcomed to practice mindful breathing and movement in the cool morning breeze.',
    yogaImageUrl: raw.yogaImage?.node?.sourceUrl || FALLBACK_ASSETS.yoga,
  };
}

export async function getActivityPageData(): Promise<ActivityPageData> {
  const query = `
    query GetActivityPage {
      page(id: "2048", idType: DATABASE_ID) {
        title
        activityPageFields {
          activityHeroTagline
          activityHeroTitle
          activityHeroDesc
          activityHeroImage {
            node {
              sourceUrl
            }
          }
          act1Title
          act1Badge
          act1Desc
          act1Image {
            node {
              sourceUrl
            }
          }
          act2Title
          act2Badge
          act2Desc
          act2Image {
            node {
              sourceUrl
            }
          }
          act3Title
          act3Badge
          act3Desc
          act3Image {
            node {
              sourceUrl
            }
          }
          act4Title
          act4Badge
          act4Desc
          act4Image {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.page?.activityPageFields || {};

  return {
    title: data?.page?.title || 'Activities & Excursions',
    activityHeroTagline: raw.activityHeroTagline || 'Discover Kep & Beyond',
    activityHeroTitle: raw.activityHeroTitle || 'Curated Experiences & Coastal Adventures',
    activityHeroDesc: raw.activityHeroDesc || 'From the legendary Kep crab market and organic pepper estates to hidden jungle trails and serene sunset cruises, let us craft your memorable excursions.',
    activityHeroImageUrl: raw.activityHeroImage?.node?.sourceUrl || FALLBACK_ASSETS.rabbitIsland,
    activities: [
      {
        title: raw.act1Title || 'Kep Crab Market & Local Seafood Tasting',
        badge: raw.act1Badge || 'Culinary Culture',
        desc: raw.act1Desc || 'Witness local fisherwomen hauling wooden traps straight from the sea and taste fresh steamed crab with spicy lime pepper dip right on the pier.',
        imageUrl: raw.act1Image?.node?.sourceUrl || FALLBACK_ASSETS.crabMarket,
      },
      {
        title: raw.act2Title || 'Organic Kampot Pepper Plantation Tour',
        badge: raw.act2Badge || 'Farm & Agro-Tour',
        desc: raw.act2Desc || 'Explore scenic family-owned pepper farms, learn how black, red, and white peppercorns are hand-harvested, and indulge in a guided tasting session.',
        imageUrl: raw.act2Image?.node?.sourceUrl || FALLBACK_ASSETS.pepperFarm,
      },
      {
        title: raw.act3Title || 'Kep National Park Jungle Trekking',
        badge: raw.act3Badge || 'Nature & Hiking',
        desc: raw.act3Desc || 'An 8-kilometer circular trail offering scenic forest canopies, tropical wildlife spotting (monkeys and hornbills), and breathtaking coastal viewpoints.',
        imageUrl: raw.act3Image?.node?.sourceUrl || FALLBACK_ASSETS.jungleTrek,
      },
      {
        title: raw.act4Title || 'Rabbit Island (Koh Tonsay) Day Escape',
        badge: raw.act4Badge || 'Island Boat Trip',
        desc: raw.act4Desc || 'Take a 20-minute local wooden longtail boat to Rabbit Island for peaceful hammock lounging, coconut palms, and crystal-clear warm waters.',
        imageUrl: raw.act4Image?.node?.sourceUrl || FALLBACK_ASSETS.rabbitIsland,
      },
    ],
  };
}

export async function getGalleryPageData(): Promise<GalleryPageData> {
  const query = `
    query GetGalleryPage {
      page(id: "2050", idType: DATABASE_ID) {
        title
        galleryPageFields {
          galleryHeroTagline
          galleryHeroTitle
          galleryHeroDesc
          galleryImg1 { node { sourceUrl } }
          galleryImg2 { node { sourceUrl } }
          galleryImg3 { node { sourceUrl } }
          galleryImg4 { node { sourceUrl } }
          galleryImg5 { node { sourceUrl } }
          galleryImg6 { node { sourceUrl } }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.page?.galleryPageFields || {};

  const photos: string[] = [];
  [raw.galleryImg1, raw.galleryImg2, raw.galleryImg3, raw.galleryImg4, raw.galleryImg5, raw.galleryImg6].forEach((img, idx) => {
    if (img?.node?.sourceUrl) {
      photos.push(img.node.sourceUrl);
    } else {
      photos.push(FALLBACK_ASSETS.gallery[idx % FALLBACK_ASSETS.gallery.length]);
    }
  });

  return {
    title: data?.page?.title || 'Visual Gallery',
    galleryHeroTagline: raw.galleryHeroTagline || 'Visual Journey',
    galleryHeroTitle: raw.galleryHeroTitle || 'Moments of Calm & Coastal Serenity',
    galleryHeroDesc: raw.galleryHeroDesc || 'Take a glimpse into life at Serene Vita Retreat — from sun-drenched pool decks to artisan dining and mindful wellness rituals.',
    photos: photos.length > 0 ? photos : FALLBACK_ASSETS.gallery,
  };
}

export async function getContactPageData(): Promise<ContactPageData> {
  const query = `
    query GetContactPage {
      page(id: "2163", idType: DATABASE_ID) {
        title
        contactPageFields {
          contactHeroTagline
          contactHeroTitle
          contactHeroDesc
          contactHeroImage {
            node {
              sourceUrl
            }
          }
          contactDirectionsTitle
          contactDirectionsText
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const raw = data?.page?.contactPageFields || {};

  return {
    title: data?.page?.title || 'Contact Us',
    contactHeroTagline: raw.contactHeroTagline || 'Connect With Us',
    contactHeroTitle: raw.contactHeroTitle || 'Plan Your Escape to Kep',
    contactHeroDesc: raw.contactHeroDesc || 'Whether inquiring about villa reservations, wellness retreats, private dining, or transportation from Phnom Penh or Sihanoukville, our reservations team is at your service.',
    contactHeroImageUrl: raw.contactHeroImage?.node?.sourceUrl || FALLBACK_ASSETS.retreatPool,
    contactDirectionsTitle: raw.contactDirectionsTitle || 'Getting to Serene Vita Retreat',
    contactDirectionsText: raw.contactDirectionsText || 'We are located in Krong Kaeb, approximately 2.5 hours by express highway from Phnom Penh and 35 minutes from Kampot town. Private chauffeured transfers can be organized directly with our concierge upon reservation.',
  };
}
