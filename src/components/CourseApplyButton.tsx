'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CourseApplicationForm from '@/components/CourseApplicationForm';

interface CourseApplyButtonProps {
  courseId: string;
  courseName: string;
}

export default function CourseApplyButton({ courseId, courseName }: CourseApplyButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>Apply Now</span>
        <ArrowRight className="h-4 w-4" />
      </button>

      <CourseApplicationForm 
        courseId={courseId}
        courseName={courseName}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="apply"
      />
    </>
  );
}
