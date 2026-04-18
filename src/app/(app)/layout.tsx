import { Navbar } from '@/components/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[calc(200vh-52px)]">{children}</main>
    </>
  );
}
