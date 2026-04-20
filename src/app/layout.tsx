// src/app/layout.tsx
import './globals.css';

import type { Metadata, Viewport } from 'next';

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  // Optional: themeColor for mobile browsers
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.throughmylens.uk/'),
  
  // Title configuration
  title: {
    default: 'Through My Lens | Luxury Photography London & UK',
    template: '%s | Through My Lens',
  },
  
  description:
    'Award-winning photography studio specialising in weddings, maternity, graduation, portrait and lifestyle sessions across London and throughout the UK. Book your session today.',
  
  keywords: [
    'photographer London',
    'wedding photographer London',
    'maternity photographer London',
    'graduation photographer London',
    'portrait photographer UK',
    'lifestyle photographer London',
    'luxury photography London',
    'throughmylens',
    'professional photographer',
    'London photography studio',
  ],
  
  authors: [{ name: 'Through My Lens', url: 'https://www.throughmylens.uk/' }],
  creator: 'Through My Lens',
  publisher: 'Through My Lens',
  
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.throughmylens.uk/',
    siteName: 'Through My Lens',
    title: 'Through My Lens | Luxury Photography London & UK',
    description:
      'Award-winning photography studio specialising in weddings, maternity, graduation and portrait sessions across London and throughout the UK.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Through My Lens — Luxury Photography London & UK',
        type: 'image/jpeg',
      },
    ],
    emails: ['bookings@throughmylens.uk'],
    phoneNumbers: ['+447511725288'], 
  },
  
  // Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'Through My Lens | Luxury Photography London & UK',
    description:
      'Award-winning photography studio specialising in weddings, maternity, graduation and portrait sessions across London and throughout the UK.',
    images: ['/og-image.jpg'],
    // Add your Twitter handle if you have one
    // site: '@throughmylens',
    // creator: '@throughmylens',
  },
  
  // Icons (favicon, apple touch, etc.)
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/images/logo.png'],
  },
  
  // Manifest for PWA
  manifest: '/site.webmanifest',
  
  // Robots.txt configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://www.throughmylens.uk/',
    // Add language alternatives if needed
    // languages: {
    //   'en-GB': 'https://www.throughmylens.uk/',
    //   'en-US': 'https://www.throughmylens.us/',
    // },
  },
  
  // Verification codes (add when you have them)
  verification: {
    google: 'google-site-verification=CkHKQdFqNxdwzO_1Y5zy3zWMFS8-u3MqoTGuhAhIva4',
    // yandex: 'your-yandex-code',
    // other: {
    //   'facebook-domain-verification': 'your-facebook-code',
    // },
  },
  
  // Category for SEO
  category: 'photography',
  
  // App links (optional)
  // appLinks: {
  //   ios: {
  //     url: 'https://apps.apple.com/app/id...',
  //     appStoreId: '...',
  //   },
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Structured Data / JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              '@id': 'https://www.throughmylens.uk/#organization',
              name: 'Through My Lens',
              url: 'https://www.throughmylens.uk/',
              logo: 'https://www.throughmylens.uk/images/logo.png',
              image: 'https://www.throughmylens.uk/og-image.jpg',
              description:
                'Award-winning photography studio in London specialising in weddings, maternity, graduation and portrait sessions.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'London',
                addressCountry: 'GB',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 51.5074,  // Update with your actual coordinates
                longitude: -0.1278, // Update with your actual coordinates
              },
              priceRange: '££',
              telephone: '+447511725288',
              email: 'bookings@throughmylens.uk', // Add your email
              openingHours: ['Mon-Fri 09:00-18:00', 'Sat 10:00-16:00'],
              sameAs: [
                'https://www.instagram.com/_throughmylens.uk?igsh=MXF1aTJrNnRleWRtcg==',
               'https://www.tiktok.com/@throughmylens.uk?_r=1&_t=ZN-95SRBeVvFMU'
                // 'https://www.pinterest.com/throughmylens',
                // 'https://www.linkedin.com/company/throughmylens',
              ],
              areaServed: {
                '@type': 'City',
                name: 'London',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Photography Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Wedding Photography',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Maternity Photography',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Graduation Photography',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Portrait Photography',
                    },
                  },
                ],
              },
            }),
          }}
        />
        
        {/* Optional: Add Google Analytics */}
        {/* 
        <GoogleAnalytics gaId="G-XXXXXXXXXX" /> 
        */}
        
        {children}
      </body>
    </html>
  );
}