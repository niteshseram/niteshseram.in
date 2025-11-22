import FadeDown from '@/components/animations/FadeDown';
import FadeUp from '@/components/animations/FadeUp';
import Blog from '@/components/home/Blog';
import Contact from '@/components/home/Contact';
import Hero from '@/components/home/Hero';

export default function Home() {
  return (
    <main className="my-10 flex flex-col gap-20">
      <FadeDown duration={0.4} delay={0}>
        <Hero />
      </FadeDown>
      <FadeUp duration={0.4} delay={0}>
        <Blog />
      </FadeUp>
      <Contact />
    </main>
  );
}
