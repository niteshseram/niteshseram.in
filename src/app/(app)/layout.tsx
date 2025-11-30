import { Analytics } from '@vercel/analytics/react';

import { Footer } from '@/components/global/footer';
import { Navbar } from '@/components/global/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Analytics />
    </>
  );
}
