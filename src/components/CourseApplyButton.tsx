'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CourseApplicationForm from '@/components/CourseApplicationForm';

interface CourseApplyButtonProps {
  courseId: string;
  courseName: string;
  className?: string;
  label?: string;
  type?: 'apply' | 'enquiry';
}

export default function CourseApplyButton({ 
  courseId, 
  courseName, 
  className = "bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 text-center shadow-[0_0_30px_rgba(37,99,235,0.3)] uppercase tracking-widest text-xs flex items-center justify-center",
  label = "Apply Now",
  type = "apply"
}: CourseApplyButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={className}
      >
        <span>{label}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <CourseApplicationForm 
        courseId={courseId}
        courseName={courseName}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={type}
      />
    </>
  );
}
