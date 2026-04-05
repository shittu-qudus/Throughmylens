// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://throughmylens.vercel.app'),
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
  ],
  authors: [{ name: 'Through My Lens' }],
  creator: 'Through My Lens',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://throughmylens.vercel.app',
    siteName: 'Through My Lens',
    title: 'Through My Lens | Luxury Photography London & UK',
    description:
      'Award-winning photography studio specialising in weddings, maternity, graduation and portrait sessions across London and throughout the UK.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Through My Lens — Luxury Photography London',
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
  alternates: {
    canonical: 'https://throughmylens.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Through My Lens',
              url: 'https://throughmylens.vercel.app',
              description:
                'Award-winning photography studio in London specialising in weddings, maternity, graduation and portrait sessions.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'London',
                addressCountry: 'GB',
              },
              priceRange: '££',
              telephone: '+442079460958',
              image: 'https://throughmylens.vercel.app/og-image.jpg',
              sameAs: [],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}