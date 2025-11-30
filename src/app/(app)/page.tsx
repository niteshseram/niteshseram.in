import { ContactSection } from '@/components/global/contact-section';
import Blog from '@/components/home/Blog';
import Hero from '@/components/home/Hero';
import { Container } from '@/components/ui/container';
import { HeadingLevelIncrease } from '@/components/ui/heading';

export default function Home() {
  return (
    <main className="mt-10 flex flex-col">
      <Container className="flex flex-col gap-20">
        <Hero />
        <Blog />
      </Container>
      <HeadingLevelIncrease>
        <ContactSection />
      </HeadingLevelIncrease>
    </main>
  );
}
