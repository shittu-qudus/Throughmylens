// src/app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.throughmylens.uk'),

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
  ],

  authors: [{ name: 'Through My Lens' }],
  creator: 'Through My Lens',
  publisher: 'Through My Lens',

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.throughmylens.uk',
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
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Through My Lens | Luxury Photography London & UK',
    description:
      'Award-winning photography studio specialising in weddings, maternity, graduation and portrait sessions across London and throughout the UK.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png', // Keep commented as in your original
  },

  manifest: '/site.webmanifest',

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://www.throughmylens.uk',
  },

  verification: {
    google: 'google-site-verification=CkHKQdFqNxdwzO_1Y5zy3zWMFS8-u3MqoTGuhAhIva4',
  },

  category: 'photography',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Through My Lens',
              url: 'https://www.throughmylens.uk',
              logo: 'https://www.throughmylens.uk/favicon.ico', 
              image: 'https://www.throughmylens.uk/og-image.jpg',
              description:
                'Award-winning photography studio in London specialising in weddings, maternity, graduation and portrait sessions.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'London',
                addressCountry: 'GB',
              },
              telephone: '+447511725288',
              email: 'bookings@throughmylens.uk',
              priceRange: '££',
              sameAs: [
                'https://www.instagram.com/_throughmylens.uk',
                'https://www.tiktok.com/@throughmylens.uk',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}