import { Analytics } from '@vercel/analytics/react';

import Footer from '@/components/Footer';
import { Navbar } from '@/components/global/navbar';
import StickySocial from '@/components/StickySocial';
import { Container } from '@/components/ui/container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Container className="flex flex-col">
        <StickySocial />
        {children}
        <Footer />
        <Analytics />
      </Container>
    </>
  );
}
