import { Metadata } from 'next';
import CoursesClient from './CoursesClient';

export const metadata: Metadata = {
  title: 'Online Degree Courses | UGC Approved Programs | EDBELL EDUSOLUTIONS',
  description: 'Explore UGC-approved online degree courses including BA, B.Com, BBA, MA, M.Com, MBA from top NAAC A++ universities. Flexible learning, affordable fees, and career support. Enroll now!',
  keywords: [
    'online courses',
    'degree programs',
    'UGC approved courses',
    'BA online',
    'B.Com online',
    'BBA online',
    'MA online',
    'M.Com online',
    'MBA online',
    'distance education',
    'online university',
    'higher education',
    'career courses',
    'professional courses',
    'NAAC A++ universities',
    'flexible learning',
    'affordable education'
  ],
  openGraph: {
    title: 'Online Degree Courses | UGC Approved Programs',
    description: 'Explore UGC-approved online degree courses from top universities. BA, B.Com, BBA, MA, M.Com, MBA programs with flexible learning and career support.',
    type: 'website',
    url: 'https://edbelledusolutions.com/courses',
    images: [
      {
        url: '/og-courses-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Online Degree Courses - EDBELL EDUSOLUTIONS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Degree Courses | UGC Approved Programs',
    description: 'Explore UGC-approved online degree courses from top universities.',
    images: ['/og-courses-image.jpg'],
  },
  alternates: {
    canonical: 'https://edbelledusolutions.com/courses',
  },
};

export default function Courses() {
  return <CoursesClient />;
}
