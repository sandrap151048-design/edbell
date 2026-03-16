import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://edbelledusolutions.com'),
  title: {
    default: 'EDBELL EDUSOLUTIONS LLP - Online Education & Career Services',
    template: '%s | EDBELL EDUSOLUTIONS'
  },
  description: 'Leading provider of UGC-approved online degree programs, career counseling, study abroad services, and test preparations in Kerala, India. Get BA, B.Com, BBA, MA, M.Com, MBA degrees from top NAAC A++ universities like IGNOU, LPU, Amity University.',
  keywords: [
    'online education',
    'degree programs',
    'career counseling',
    'study abroad',
    'Kerala',
    'India',
    'UGC approved',
    'NAAC A++',
    'BA',
    'B.Com',
    'BBA',
    'MA',
    'M.Com',
    'MBA',
    'distance education',
    'IGNOU',
    'LPU',
    'Amity University',
    'online degrees',
    'higher education',
    'university admission',
    'scholarship assistance',
    'test preparation',
    'career guidance',
    'educational services',
    'Wayanad',
    'Kozhikode',
    'online learning',
    'flexible education'
  ],
  authors: [{ name: 'EDBELL EDUSOLUTIONS LLP', url: 'https://edbelledusolutions.com' }],
  creator: 'EDBELL EDUSOLUTIONS LLP',
  publisher: 'EDBELL EDUSOLUTIONS LLP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://edbelledusolutions.com',
    siteName: 'EDBELL EDUSOLUTIONS',
    title: 'EDBELL EDUSOLUTIONS LLP - Online Education & Career Services',
    description: 'Leading provider of UGC-approved online degree programs, career counseling, study abroad services, and test preparations in Kerala, India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EDBELL EDUSOLUTIONS - Online Education Services',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EDBELL EDUSOLUTIONS LLP - Online Education & Career Services',
    description: 'Leading provider of UGC-approved online degree programs, career counseling, study abroad services, and test preparations in Kerala, India.',
    images: ['/og-image.jpg'],
    creator: '@edbelledusolutions',
  },
  alternates: {
    canonical: 'https://edbelledusolutions.com',
    languages: {
      'en-IN': 'https://edbelledusolutions.com',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
  classification: 'Educational Services',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#0066CC" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EDBELL EDUSOLUTIONS" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <link rel="icon" type="image/svg+xml" href="/edbell-logo.svg" />
        <link rel="apple-touch-icon" href="/edbell-logo.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030712]">
              <img 
                src="/edbell-logo.svg" 
                alt="EdBell Edusolutions" 
                className="h-20 lg:h-28 w-auto object-contain mx-auto md:mx-0 opacity-20"
          />
        </div>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}