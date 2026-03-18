'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import PageTransition from '@/components/PageTransition';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <PageTransition>
        <main className="h-screen">
          {children}
        </main>
      </PageTransition>
    );
  }

  return (
    <>
      <Analytics />
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 lg:pt-28">
          {children}
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}