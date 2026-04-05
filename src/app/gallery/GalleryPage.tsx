import type { Metadata } from 'next';
import GalleryPage from './GalleryPage';

export const metadata: Metadata = {
  title: 'Full Gallery',
  description:
    'Browse our complete portfolio of wedding, maternity, graduation, portrait and lifestyle photography sessions across London and the UK.',
};

export default function Page() {
  return <GalleryPage />;
}