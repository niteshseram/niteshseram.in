import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { getPostIndex } from '@/lib/writing';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getPostIndex();

  return (
    <>
      <Navbar posts={posts} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
