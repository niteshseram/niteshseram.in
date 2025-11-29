import { Analytics } from '@vercel/analytics/react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StickySocial from '@/components/StickySocial';
import { Container } from '@/components/ui/container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container className="pt-10">
        <StickySocial />
        {children}
        <Footer />
        <Analytics />
      </Container>
    </>
  );
}
