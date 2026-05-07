import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SITE_NAME = "BEE TEE Automobile";
const BASE_URL = "https://www.beeteeautomobile.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/logo.png`;

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = "website",
  keywords,
  structuredData,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullCanonical = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;
  const fullOgImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@beeteeautos" />

      {/* Geo Meta */}
      <meta name="geo.region" content="NG-FC" />
      <meta name="geo.placename" content="Abuja" />
      <meta name="geo.position" content="9.0765;7.4986" />
      <meta name="ICBM" content="9.0765, 7.4986" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// ── Pre-built structured data generators ──

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "BEE TEE Automobile",
    "alternateName": "BEE TEE Automobiles Ltd",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "image": `${BASE_URL}/slide_1.jpg`,
    "description":
      "Nigeria's premier luxury and electric car dealership in Abuja. We sell brand new, foreign used, and electric vehicles including Tesla, Lexus, Toyota Land Cruiser, Range Rover, BYD, XPeng, and Avatr. We also provide expert car repair, servicing, painting, and detailing.",
    "telephone": ["+2349077777211", "+2349162228881"],
    "email": "beeteeautomobile@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 36, Wole Soyinka Way, Cadastral Zone B15, Jahi",
      "addressLocality": "Abuja",
      "addressRegion": "FCT",
      "addressCountry": "NG",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.0765,
      "longitude": 7.4986,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        "opens": "08:00",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00",
      },
    ],
    "priceRange": "₦₦₦",
    "currenciesAccepted": "NGN",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": [
      { "@type": "City", "name": "Abuja" },
      { "@type": "Country", "name": "Nigeria" },
    ],
    "sameAs": [
      "https://www.instagram.com/beeteeautos",
      "https://x.com/beeteeautos",
      "https://www.facebook.com/share/1DNqQr1V5u/",
      "https://www.tiktok.com/@beeteeautomobile",
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury & Electric Vehicles",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Electric Vehicles",
          "itemListElement": [
            "Tesla Model S",
            "Tesla Model 3",
            "Tesla Model Y",
            "Tesla Cybertruck",
            "BYD Atto 3",
            "XPeng G9",
            "Avatr 12",
          ],
        },
        {
          "@type": "OfferCatalog",
          "name": "Luxury SUVs",
          "itemListElement": [
            "Range Rover Autobiography",
            "Toyota Land Cruiser LC300",
            "Lexus LX 600",
            "Lexus GX 550",
            "Mercedes-Benz GLE 350d",
          ],
        },
      ],
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BEE TEE Automobile",
    "legalName": "BEE TEE Automobiles Ltd",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Alh. Muhammed Isyaku Lawan",
        "jobTitle": "Chairman and Chief Executive Officer",
      },
    ],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50,
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2349077777211",
      "contactType": "sales",
      "areaServed": "NG",
      "availableLanguage": ["English"],
    },
    "sameAs": [
      "https://www.instagram.com/beeteeautos",
      "https://x.com/beeteeautos",
      "https://www.facebook.com/share/1DNqQr1V5u/",
      "https://www.tiktok.com/@beeteeautomobile",
    ],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BEE TEE Automobile",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/inventory?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
