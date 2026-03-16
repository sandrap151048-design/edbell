'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import CourseApplicationForm from '@/components/CourseApplicationForm';

interface CourseEnrollmentSectionProps {
  courseId: string;
  courseName: string;
}

export default function CourseEnrollmentSection({ courseId, courseName }: CourseEnrollmentSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'apply' | 'enquiry'>('apply');

  const openModal = (type: 'apply' | 'enquiry') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={() => openModal('apply')}
          className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-black py-4 px-8 rounded-2xl transition-all duration-300 text-sm uppercase tracking-widest shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1"
        >
          Apply Now
        </button>
        <button 
          onClick={() => openModal('enquiry')}
          className="bg-white/10 hover:bg-white/20 text-white font-black py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center text-sm uppercase tracking-widest border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1"
        >
          Enquire Now
        </button>
      </div>

      <CourseApplicationForm 
        courseId={courseId} 
        courseName={courseName}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </>
  );
}
