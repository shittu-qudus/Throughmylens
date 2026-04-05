import type { Metadata } from 'next';
import FeedbackPage from './page';
export const metadata: Metadata = {
  title: 'Leave Feedback',
  description: 'Share your experience with Through My Lens photography studio.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FeedbackPage />;
}