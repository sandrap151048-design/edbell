'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  MessageCircle,
  Filter,
  Eye,
  LogOut,
  Shield,
  Home,
  Info,
  BookOpen,
  GraduationCap,
  Briefcase,
  FileText,
  Users,
  Settings,
  BarChart3,
  Globe,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Save,
  XCircle,
  Award,
  Tag,
  CheckCircle,
  RefreshCw,
  Cpu,
  Building2,
  PhoneCall,
  Languages,
  BookOpenCheck,
  Clock,
  Building,
  Star
} from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceInterest: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id?: string;
  name: string;
  url: string;
  description: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Specialized';
  duration: string;
  fees?: string;
  eligibility?: string;
  // Enhanced course details
  curriculum?: string;
  careerOpportunities?: string;
  offeredByUniversities?: any[]; 
  createdAt?: string;
  updatedAt?: string;
}

interface CourseApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  courseId: string;
  courseName: string;
  type: 'apply' | 'enquiry';
  status: 'new' | 'contacted' | 'admitted' | 'rejected';
  createdAt: string;
}

interface University {
  _id?: string;
  name: string;
  url: string;
  description: string;
  accreditation: string;
  established: string;
  location?: string;
  website?: string;
  // Enhanced university details
  universityType?: string;
  campusSize?: string;
  totalStudents?: string;
  facultyCount?: string;
  coursesOffered?: string;
  specializations?: string;
  facilities?: string;
  admissionProcess?: string;
  feeStructure?: string;
  createdAt?: string;
  updatedAt?: string;
  rating?: string;
  studentsCount?: string;
}

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  published: boolean;
  publishDate: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GalleryImage {
  _id?: string;
  title: string;
  description: string;
  category: 'events' | 'campus' | 'graduation' | 'activities' | 'achievements';
  imageUrl: string;
  imageAlt: string;
  location?: string;
  eventDate?: string;
  uploadedBy: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Service {
  _id?: string;
  serviceId: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: {
    name: string;
    details: string;
  }[];
  stats: {
    success: string;
    speed: string;
  };
  isActive: boolean;
  order: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [courseApplications, setCourseApplications] = useState<CourseApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeSection, setActiveSection] = useState('contacts');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // CRUD states
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingGalleryImage, setEditingGalleryImage] = useState<GalleryImage | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [courseForm, setCourseForm] = useState<Course>({
    name: '',
    url: '',
    description: '',
    category: 'Undergraduate',
    duration: '',
    fees: '',
    eligibility: '',
    curriculum: '',
    careerOpportunities: '',
    offeredByUniversities: []
  });
  const [universityForm, setUniversityForm] = useState<University>({
    name: '',
    url: '',
    description: '',
    accreditation: '',
    established: '',
    location: '',
    website: '',
    universityType: '',
    campusSize: '',
    totalStudents: '',
    facultyCount: '',
    coursesOffered: '',
    specializations: '',
    facilities: '',
    admissionProcess: '',
    feeStructure: ''
  });
  const [blogForm, setBlogForm] = useState<Blog>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Education Trends',
    tags: [],
    readTime: '',
    featured: false,
    published: true,
    publishDate: new Date().toISOString().split('T')[0]
  });
  const [galleryForm, setGalleryForm] = useState<GalleryImage>({
    title: '',
    description: '',
    category: 'events',
    imageUrl: '',
    imageAlt: '',
    location: '',
    eventDate: new Date().toISOString().split('T')[0],
    uploadedBy: 'Admin',
    tags: [],
    featured: false,
    published: true
  });
  const [serviceForm, setServiceForm] = useState<Service>({
    serviceId: '',
    title: '',
    description: '',
    icon: 'Cpu',
    gradient: 'from-blue-600 to-indigo-600',
    features: [
      { name: '', details: '' },
      { name: '', details: '' },
      { name: '', details: '' },
      { name: '', details: '' }
    ],
    stats: {
      success: '95%',
      speed: 'Optimized'
    },
    isActive: true,
    order: 0
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // Hero image upload states
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [heroImageType, setHeroImageType] = useState<'home' | 'about'>('home');
  const [aboutHeroFile, setAboutHeroFile] = useState<File | null>(null);
  const [aboutHeroPreview, setAboutHeroPreview] = useState<string>('');
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [aboutUploadMessage, setAboutUploadMessage] = useState('');
  const [campusImageFile, setCampusImageFile] = useState<File | null>(null);
  const [campusImagePreview, setCampusImagePreview] = useState<string>('');
  const [uploadingCampus, setUploadingCampus] = useState(false);
  const [campusUploadMessage, setCampusUploadMessage] = useState('');

  const [servicesUploadMessage, setServicesUploadMessage] = useState('');
  const [servicesImageFile, setServicesImageFile] = useState<File | null>(null);
  const [servicesImagePreview, setServicesImagePreview] = useState<string>('');
  const [uploadingServices, setUploadingServices] = useState(false);

  // Center hero image states
  const [CenterHeroFile, setCenterHeroFile] = useState<File | null>(null);
  const [CenterHeroPreview, setCenterHeroPreview] = useState<string>('');
  const [uploadingCenterHero, setUploadingCenterHero] = useState(false);
  const [CenterHeroUploadMessage, setCenterHeroUploadMessage] = useState('');

  // Gallery hero image states
  const [galleryHeroFile, setGalleryHeroFile] = useState<File | null>(null);
  const [galleryHeroPreview, setGalleryHeroPreview] = useState<string>('');
  const [uploadingGalleryHero, setUploadingGalleryHero] = useState(false);
  const [galleryHeroUploadMessage, setGalleryHeroUploadMessage] = useState('');

  // Analytics state
  const [analyticsData, setAnalyticsData] = useState({
    totalVisitors: 0,
    contactInquiries: 0,
    coursePageViews: 0,
    newsletterSubscribers: 0,
    visitorGrowth: '+0%',
    courseViewsGrowth: '+0%',
    subscriberGrowth: '+0%'
  });
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [popularPages, setPopularPages] = useState<any[]>([]);
  const [pageViewsData, setPageViewsData] = useState<any>({});

  const navigationItems = [
    { id: 'contacts', name: 'Contact Enquiries', icon: <MessageCircle className="h-5 w-5" />, description: 'Manage inquiries and messages' },
    { id: 'applications', name: 'Course Applications', icon: <GraduationCap className="h-5 w-5" />, description: 'Track course applies & enquiries' },
    { id: 'subscribers', name: 'Newsletter Subscribers', icon: <Mail className="h-5 w-5" />, description: 'Manage newsletter subscriptions' },
    { id: 'hero-images', name: 'Hero Images', icon: <Award className="h-5 w-5" />, description: 'Manage hero section images' },
    { id: 'services', name: 'Service Management', icon: <Briefcase className="h-5 w-5" />, description: 'Manage website services' },
    { id: 'gallery', name: 'Gallery Management', icon: <Award className="h-5 w-5" />, description: 'Manage photo gallery' },
    { id: 'courses', name: 'Course Management', icon: <BookOpen className="h-5 w-5" />, description: 'Administer all curriculum modules' },
    { id: 'universities', name: 'University Management', icon: <GraduationCap className="h-5 w-5" />, description: 'Manage institutional partnerships' },
    { id: 'seo', name: 'SEO Optimization', icon: <Globe className="h-5 w-5" />, description: 'Manage meta tags and SEO' },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, description: 'Website statistics' },
    { id: 'settings', name: 'Settings', icon: <Settings className="h-5 w-5" />, description: 'System configuration' }
  ];

  useEffect(() => {
    // Check authentication status (client-side only)
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn');
      const email = localStorage.getItem('userEmail');

      if (loggedIn === 'true' && email) {
        setIsAuthenticated(true);
        setUserEmail(email);
        if (activeSection === 'contacts') {
          fetchContacts();
        } else if (activeSection === 'subscribers') {
          fetchAnalyticsData(); // This fetches subscriptions
          fetchContacts(); // Also fetch contacts for cross-reference
        } else if (activeSection === 'courses') {
          fetchCourses();
        } else if (activeSection === 'universities') {
          fetchUniversities();
        } else if (activeSection === 'services') {
          fetchServices();
        } else if (activeSection === 'gallery') {
          fetchGalleryImages();
        } else if (activeSection === 'applications') {
          fetchCourseApplications();
        } else if (activeSection === 'analytics') {
          fetchAnalyticsData();
          fetchContacts(); // Also fetch contacts for the analytics
        }

        // Always fetch analytics data for the dashboard
        if (activeSection !== 'analytics') {
          fetchAnalyticsData();
        }
      } else {
        router.push('/login');
      }
    }
  }, [router, selectedStatus, currentPage, activeSection]);

  // Auto-refresh data every 30 seconds for real-time updates
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      if (activeSection === 'contacts' || activeSection === 'subscribers') {
        fetchAnalyticsData(); // Refresh subscription data
      }
      if (activeSection === 'contacts') {
        fetchContacts(); // Refresh contact data
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, activeSection]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: selectedStatus
      });

      const response = await fetch(`/api/contact?${params}`);
      
      if (!response.ok) {
        console.error('Failed to fetch contacts:', response.status);
        setContacts([]);
        setTotalPages(1);
        return;
      }
      
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts || []);
        setTotalPages(data.pagination?.pages || 1);

        // Update analytics data with real contact count
        setAnalyticsData(prev => ({
          ...prev,
          contactInquiries: data.pagination?.total || data.contacts?.length || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus as any } : c));
        if (selectedContact?._id === id) {
          setSelectedContact({ ...selectedContact, status: newStatus });
        }
        alert('✅ Contact status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Error updating contact status. Please try again.');
    }
  };

  const deleteContactSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact enquiry? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.filter(c => c._id !== id));
        if (selectedContact?._id === id) {
          setSelectedContact(null);
        }
        alert('✅ Contact enquiry deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting contact enquiry:', error);
      alert('Error deleting contact enquiry. Please try again.');
    }
  };

  const fetchCourseApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses/apply');
      if (!response.ok) {
        console.error('Failed to fetch course applications:', response.status);
        setCourseApplications([]);
        return;
      }
      const data = await response.json();
      if (data.success) {
        setCourseApplications(data.applications);
      } else {
        setCourseApplications([]);
      }
    } catch (error) {
      console.error('Error fetching course applications:', error);
      setCourseApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      // Fetch newsletter subscriptions
      try {
        const subscriptionsResponse = await fetch('/api/subscribe');
        if (subscriptionsResponse.ok) {
          const subscriptionsData = await subscriptionsResponse.json();
          setSubscriptions(subscriptionsData.subscriptions || []);

          setAnalyticsData(prev => ({
            ...prev,
            newsletterSubscribers: subscriptionsData.pagination?.total || subscriptionsData.subscriptions?.length || 0,
            subscriberGrowth: '+5% growth'
          }));
        }
      } catch (subError) {
        console.error('Error fetching subscriptions:', subError);
      }

      // Fetch page views analytics
      try {
        const analyticsResponse = await fetch('/api/analytics');
        if (analyticsResponse.ok) {
          const analyticsDataResponse = await analyticsResponse.json();
          setPopularPages(analyticsDataResponse.popularPages || []);
          setPageViewsData(analyticsDataResponse);

          // Calculate course page views from analytics
          const courseViews = analyticsDataResponse.popularPages?.find((page: any) =>
            page.path === '/courses' || page.page.toLowerCase().includes('course')
          )?.views || 0;

          setAnalyticsData(prev => ({
            ...prev,
            totalVisitors: analyticsDataResponse.totalViews || 0,
            coursePageViews: courseViews,
            visitorGrowth: '+12% from last month',
            courseViewsGrowth: '+8% from last week'
          }));
        }
      } catch (analyticsError) {
        console.error('Error fetching analytics:', analyticsError);
      }

    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // CRUD Functions for Courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const createCourse = async () => {
    try {
      // Validate required fields on frontend
      if (!courseForm.name.trim()) {
        alert('❌ Course name is required');
        return;
      }
      if (!courseForm.description.trim() || courseForm.description.length < 10) {
        alert('❌ Description is required and must be at least 10 characters long');
        return;
      }
      if (!courseForm.duration.trim()) {
        alert('❌ Duration is required');
        return;
      }

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm)
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Error creating course: ${data.error || 'Server error'}`);
        return;
      }

      if (data.success) {
        setCourses([...courses, data.course]);
        setShowCourseModal(false);
        resetCourseForm();
        alert('✅ Course created successfully!');
      } else {
        alert(`❌ Error creating course: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('❌ Error creating course. Please check your internet connection and try again.');
    }
  };

  const updateCourse = async () => {
    try {
      // Validate required fields on frontend
      if (!courseForm.name.trim()) {
        alert('❌ Course name is required');
        return;
      }
      if (!courseForm.description.trim() || courseForm.description.length < 10) {
        alert('❌ Description is required and must be at least 10 characters long');
        return;
      }
      if (!courseForm.duration.trim()) {
        alert('❌ Duration is required');
        return;
      }

      const response = await fetch('/api/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...courseForm, _id: editingCourse?._id })
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Error updating course: ${data.error || 'Server error'}`);
        return;
      }

      if (data.success && editingCourse) {
        setCourses(courses.map(c => c._id === editingCourse._id ? { ...courseForm, _id: editingCourse._id } : c));
        setShowCourseModal(false);
        setEditingCourse(null);
        resetCourseForm();
        alert('✅ Course updated successfully!');
      } else {
        alert(`❌ Error updating course: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('❌ Error updating course. Please check your internet connection and try again.');
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? This will also delete the page file.')) return;

    try {
      const response = await fetch(`/api/courses?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setCourses(courses.filter(c => c._id !== id));
        alert('✅ Course deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course. Please try again.');
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      name: '',
      url: '',
      description: '',
      category: 'Undergraduate',
      duration: '',
      fees: '',
      eligibility: '',
      curriculum: '',
      careerOpportunities: '',
      offeredByUniversities: []
    });
  };

  // CRUD Functions for Universities
  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      const data = await response.json();
      if (data.success) {
        setUniversities(data.universities);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const createUniversity = async () => {
    try {
      // Validate required fields on frontend
      if (!universityForm.name.trim()) {
        alert('❌ University name is required');
        return;
      }
      if (!universityForm.description.trim() || universityForm.description.length < 10) {
        alert('❌ Description is required and must be at least 10 characters long');
        return;
      }
      if (!universityForm.accreditation.trim()) {
        alert('❌ Accreditation is required');
        return;
      }
      if (!universityForm.established.trim()) {
        alert('❌ Established year is required');
        return;
      }

      const response = await fetch('/api/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(universityForm)
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Error creating university: ${data.error || 'Server error'}`);
        return;
      }

      if (data.success) {
        setUniversities([...universities, data.university]);
        setShowUniversityModal(false);
        resetUniversityForm();
        alert('✅ University created successfully!');
      } else {
        alert(`❌ Error creating university: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating university:', error);
      alert('❌ Error creating university. Please check your internet connection and try again.');
    }
  };

  const updateUniversity = async () => {
    try {
      // Validate required fields on frontend
      if (!universityForm.name.trim()) {
        alert('❌ University name is required');
        return;
      }
      if (!universityForm.description.trim() || universityForm.description.length < 10) {
        alert('❌ Description is required and must be at least 10 characters long');
        return;
      }
      if (!universityForm.accreditation.trim()) {
        alert('❌ Accreditation is required');
        return;
      }
      if (!universityForm.established.trim()) {
        alert('❌ Established year is required');
        return;
      }

      const response = await fetch('/api/universities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...universityForm, _id: editingUniversity?._id })
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Error updating university: ${data.error || 'Server error'}`);
        return;
      }

      if (data.success && editingUniversity) {
        setUniversities(universities.map(u => u._id === editingUniversity._id ? { ...universityForm, _id: editingUniversity._id } : u));
        setShowUniversityModal(false);
        setEditingUniversity(null);
        resetUniversityForm();
        alert('✅ University updated successfully!');
      } else {
        alert(`❌ Error updating university: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating university:', error);
      alert('❌ Error updating university. Please check your internet connection and try again.');
    }
  };

  const deleteUniversity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university? This will also delete the page file.')) return;

    try {
      const response = await fetch(`/api/universities?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setUniversities(universities.filter(u => u._id !== id));
        alert('✅ University deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting university:', error);
      alert('Error deleting university. Please try again.');
    }
  };

  const resetUniversityForm = () => {
    setUniversityForm({
      name: '',
      url: '',
      description: '',
      accreditation: '',
      established: '',
      location: '',
      website: '',
      universityType: '',
      campusSize: '',
      totalStudents: '',
      facultyCount: '',
      coursesOffered: '',
      specializations: '',
      facilities: '',
      admissionProcess: '',
      feeStructure: ''
    });
  };

  // CRUD Functions for Blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const createBlog = async () => {
    try {
      // Validate required fields on frontend
      if (!blogForm.title.trim()) {
        alert('❌ Blog title is required');
        return;
      }
      if (!blogForm.excerpt.trim() || blogForm.excerpt.length < 20) {
        alert('❌ Excerpt is required and must be at least 20 characters long');
        return;
      }
      if (!blogForm.content.trim() || blogForm.content.length < 100) {
        alert('❌ Content is required and must be at least 100 characters long');
        return;
      }
      if (!blogForm.author.trim()) {
        alert('❌ Author name is required');
        return;
      }
      if (!blogForm.readTime.trim()) {
        alert('❌ Read time is required');
        return;
      }

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm)
      });
      const data = await response.json();

      if (data.success) {
        setBlogs([...blogs, data.blog]);
        setShowBlogModal(false);
        resetBlogForm();
        alert('✅ Blog post created successfully!');
      } else {
        alert(`❌ Error creating blog: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('❌ Error creating blog. Please check your internet connection and try again.');
    }
  };

  const updateBlog = async () => {
    try {
      // Validate required fields on frontend
      if (!blogForm.title.trim()) {
        alert('❌ Blog title is required');
        return;
      }
      if (!blogForm.excerpt.trim() || blogForm.excerpt.length < 20) {
        alert('❌ Excerpt is required and must be at least 20 characters long');
        return;
      }
      if (!blogForm.content.trim() || blogForm.content.length < 100) {
        alert('❌ Content is required and must be at least 100 characters long');
        return;
      }
      if (!blogForm.author.trim()) {
        alert('❌ Author name is required');
        return;
      }
      if (!blogForm.readTime.trim()) {
        alert('❌ Read time is required');
        return;
      }

      const response = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blogForm, _id: editingBlog?._id })
      });
      const data = await response.json();

      if (data.success && editingBlog) {
        setBlogs(blogs.map(b => b._id === editingBlog._id ? { ...blogForm, _id: editingBlog._id } : b));
        setShowBlogModal(false);
        setEditingBlog(null);
        resetBlogForm();
        alert('✅ Blog post updated successfully!');
      } else {
        alert(`❌ Error updating blog: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('❌ Error updating blog. Please check your internet connection and try again.');
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/blogs?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setBlogs(blogs.filter(b => b._id !== id));
        alert('Blog post deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Education Trends',
      tags: [],
      readTime: '',
      featured: false,
      published: true,
      publishDate: new Date().toISOString().split('T')[0]
    });
  };

  const openBlogModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        ...blog,
        publishDate: blog.publishDate.split('T')[0] // Convert to date input format
      });
    } else {
      setEditingBlog(null);
      resetBlogForm();
    }
    setShowBlogModal(true);
  };

  // CRUD Functions for Gallery
  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      if (data.success) {
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    }
  };

  const createGalleryImage = async () => {
    try {
      if (!selectedFile) {
        alert('❌ Please select an image file');
        return;
      }

      // Validate required fields
      if (!galleryForm.title.trim()) {
        alert('❌ Image title is required');
        return;
      }
      if (!galleryForm.description.trim() || galleryForm.description.length < 10) {
        alert('❌ Description is required and must be at least 10 characters long');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', galleryForm.title);
      formData.append('description', galleryForm.description);
      formData.append('category', galleryForm.category);
      formData.append('location', galleryForm.location || '');
      formData.append('eventDate', galleryForm.eventDate || '');
      formData.append('tags', galleryForm.tags.join(','));
      formData.append('featured', galleryForm.featured.toString());
      formData.append('published', galleryForm.published.toString());
      formData.append('uploadedBy', galleryForm.uploadedBy);

      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setGalleryImages([...galleryImages, data.image]);
        setShowGalleryModal(false);
        resetGalleryForm();
        setSelectedFile(null);
        alert('✅ Image uploaded successfully!');
      } else {
        alert(`❌ Error uploading image: ${data.error}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('❌ Error uploading image. Please check your internet connection and try again.');
    }
  };

  const updateGalleryImage = async () => {
    try {
      if (!galleryForm.title.trim()) {
        alert('❌ Image title is required');
        return;
      }
      if (!galleryForm.description.trim() || galleryForm.description.length < 10) {
        alert('❌ Description is required and must be at least 10 characters long');
        return;
      }

      const response = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...galleryForm, _id: editingGalleryImage?._id })
      });
      const data = await response.json();

      if (data.success && editingGalleryImage) {
        setGalleryImages(galleryImages.map(img => img._id === editingGalleryImage._id ? { ...galleryForm, _id: editingGalleryImage._id } : img));
        setShowGalleryModal(false);
        setEditingGalleryImage(null);
        resetGalleryForm();
        alert('✅ Image updated successfully!');
      } else {
        alert(`❌ Error updating image: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating image:', error);
      alert('❌ Error updating image. Please check your internet connection and try again.');
    }
  };

  const deleteGalleryImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setGalleryImages(galleryImages.filter(img => img._id !== id));
        alert('Image deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const resetGalleryForm = () => {
    setGalleryForm({
      title: '',
      description: '',
      category: 'events',
      imageUrl: '',
      imageAlt: '',
      location: '',
      eventDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Admin',
      tags: [],
      featured: false,
      published: true
    });
  };

  const openGalleryModal = (image?: GalleryImage) => {
    if (image) {
      setEditingGalleryImage(image);
      setGalleryForm({
        ...image,
        eventDate: image.eventDate ? image.eventDate.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setEditingGalleryImage(null);
      resetGalleryForm();
    }
    setShowGalleryModal(true);
  };

  const openCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      // Extract IDs from potentially populated university objects to prevent 400 errors
      const universityIds = (course.offeredByUniversities || []).map((u: any) =>
        typeof u === 'string' ? u : u._id
      );
      setCourseForm({ ...course, offeredByUniversities: universityIds });
    } else {
      setEditingCourse(null);
      resetCourseForm();
    }
    // Ensure universities are loaded for the picker
    if (universities.length === 0) {
      fetchUniversities();
    }
    setShowCourseModal(true);
  };

  const openUniversityModal = (university?: University) => {
    if (university) {
      setEditingUniversity(university);
      setUniversityForm(university);
    } else {
      setEditingUniversity(null);
      resetUniversityForm();
    }
    setShowUniversityModal(true);
  };

  const seedSampleData = async () => {
    if (!confirm('This will add sample courses and universities. Continue?')) return;

    setIsSeeding(true);
    try {
      const response = await fetch('/api/seed', {
        method: 'POST'
      });
      const data = await response.json();

      if (data.success) {
        alert(`Sample data added successfully! Added ${data.data.courses} courses and ${data.data.universities} universities.`);
        // Refresh the data
        fetchCourses();
        fetchUniversities();
      } else {
        alert('Error seeding data: ' + data.error);
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Error seeding data. Please try again.');
    } finally {
      setIsSeeding(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const createService = async () => {
    try {
      if (!serviceForm.title.trim()) {
        alert('❌ Service title is required');
        return;
      }
      if (!serviceForm.description.trim()) {
        alert('❌ Service description is required');
        return;
      }
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm)
      });
      const data = await response.json();
      if (data.success) {
        setServices([...services, data.service]);
        setShowServiceModal(false);
        resetServiceForm();
        alert('✅ Service created successfully!');
      } else {
        alert(`❌ Error creating service: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating service:', error);
      alert('❌ Error creating service. Please try again.');
    }
  };

  const updateService = async () => {
    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...serviceForm, _id: editingService?._id })
      });
      const data = await response.json();
      if (data.success) {
        setServices(services.map(s => s._id === editingService?._id ? data.service : s));
        setShowServiceModal(false);
        setEditingService(null);
        resetServiceForm();
        alert('✅ Service updated successfully!');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('❌ Error updating service');
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const response = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setServices(services.filter(s => s._id !== id));
        alert('✅ Service deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      serviceId: '',
      title: '',
      description: '',
      icon: 'Cpu',
      gradient: 'from-blue-600 to-indigo-600',
      features: [
        { name: '', details: '' },
        { name: '', details: '' },
        { name: '', details: '' },
        { name: '', details: '' }
      ],
      stats: { success: '95%', speed: 'Optimized' },
      isActive: true,
      order: services.length
    });
  };


  const openServiceModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setServiceForm(service);
    } else {
      setEditingService(null);
      resetServiceForm();
    }
    setShowServiceModal(true);
  };

  const renderServicesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Service Management</h2>
          <p className="text-gray-500 text-sm">Configure major service categories and their interactive features</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchServices}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-all"
            title="Refresh Services"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => openServiceModal()}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="h-4 w-4" />
            <span>Add Service Node</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No service records found in the database matrix.</p>
          </div>
        ) : (
          services.sort((a,b) => a.order - b.order).map((service) => (
            <div key={service._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className={`h-24 bg-gradient-to-br ${service.gradient} p-6 flex items-start justify-between`}>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openServiceModal(service)}
                    className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-500 transition-colors border border-blue-500/20"
                    title="Edit Service"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteService(service._id!)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 transition-colors border border-red-500/20"
                    title="Delete Service"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{service.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>Performance</span>
                    <span className="text-blue-600">{service.stats.success} Success</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {service.features.map((f, i) => (
                      <span key={i} className="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md uppercase tracking-tighter">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  const renderContactsSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Company Contact Information */}
      <div className="lg:col-span-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-2xl border border-blue-400/20 p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Company Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="h-6 w-6 text-blue-200" />
              <h3 className="text-lg font-semibold text-white">Address</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              15/382, Calicut Tower<br />
              Kozhikode Road<br />
              Wayanad, Kerala<br />
              India
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <Phone className="h-6 w-6 text-blue-200" />
              <h3 className="text-lg font-semibold text-white">Phone</h3>
            </div>
            <p className="text-blue-100 text-sm font-mono">+91 92413 0060</p>
            <p className="text-blue-200 text-xs mt-2">Direct Logic Support</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <Mail className="h-6 w-6 text-blue-200" />
              <h3 className="text-lg font-semibold text-white">Email</h3>
            </div>
            <p className="text-blue-100 text-sm break-all">info@edbelledusolutions.com</p>
            <p className="text-blue-200 text-xs mt-2">Secure Document Sync</p>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="lg:col-span-2">
        <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Contact Submissions</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{contacts.length} Total Contacts</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-900 border border-white/10 rounded-md px-3 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div></div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 italic">No contact submissions found</div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`p-4 hover:bg-white/[0.02] cursor-pointer transition-colors ${selectedContact?._id === contact._id ? 'bg-blue-600/10 border-l-4 border-blue-500' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium text-white">{contact.name}</h3>
                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-1">{contact.subject}</p>
                      <p className="text-xs text-slate-500">{contact.email} • {formatDate(contact.createdAt)}</p>
                    </div>
                    <Eye className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Details View */}
      <div className="lg:col-span-1">
        <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5 min-h-[400px]">
          {selectedContact ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Enquiry Details</h3>
                <button onClick={() => setSelectedContact(null)} className="text-slate-500 hover:text-white"><X className="h-5 w-5" /></button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Name</label>
                    <p className="text-sm font-bold text-white">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Phone</label>
                    <a href={`tel:${selectedContact.phone}`} className="text-sm font-bold text-blue-400 hover:underline">{selectedContact.phone}</a>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</label>
                  <p className="text-sm font-bold text-slate-300">{selectedContact.email}</p>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Message</label>
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5 mt-1">
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest text-center">Management Actions</h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex flex-col space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Update Status</label>
                       <select 
                        value={selectedContact.status}
                        onChange={(e) => updateContactStatus(selectedContact._id, e.target.value)}
                        className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => {
                          const subject = `Re: ${selectedContact.subject}`;
                          const body = `Dear ${selectedContact.name},\n\nRegarding your inquiry...`;
                          window.open(`mailto:${selectedContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                        }}
                        className="flex items-center justify-center space-x-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/20 py-2 rounded-lg transition-all"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="text-xs font-bold">Reply</span>
                      </button>
                      
                      <button
                        onClick={() => deleteContactSubmission(selectedContact._id)}
                        className="flex items-center justify-center space-x-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 py-2 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-xs font-bold">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <MessageCircle className="h-12 w-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderApplicationsSection = () => (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5">
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-900/10 to-indigo-900/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Course Applications</h2>
              <p className="text-slate-400 mt-1">Manage student enrollment requests and course enquiries</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchCourseApplications}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Submissions</p>
                  <h3 className="text-2xl font-black text-white">{courseApplications.length}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">New Applications</p>
                  <h3 className="text-2xl font-black text-white">
                    {courseApplications.filter(a => a.type === 'apply').length}
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Enquiries</p>
                  <h3 className="text-2xl font-black text-white">
                    {courseApplications.filter(a => a.type === 'enquiry').length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* List View */}
        <div className="xl:col-span-2">
           <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-white/[0.02] border-b border-white/5">
                     <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Student</th>
                     <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Course</th>
                     <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                     <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone</th>
                     <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                     <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {courseApplications.length === 0 ? (
                     <tr>
                       <td colSpan={6} className="p-12 text-center text-slate-500 font-medium italic">
                         No applications or enquiries found.
                       </td>
                     </tr>
                   ) : (
                     courseApplications.map((app) => (
                       <tr 
                         key={app._id} 
                         onClick={() => setSelectedContact(app as any)} // Reusing selectedContact for state simplicity
                         className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
                       >
                         <td className="p-4">
                           <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white">
                               {app.name.charAt(0)}
                             </div>
                             <div>
                               <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{app.name}</p>
                               <p className="text-[10px] text-slate-500 font-medium">{app.email}</p>
                             </div>
                           </div>
                         </td>
                         <td className="p-4">
                           <p className="text-xs font-bold text-slate-300 line-clamp-1">{app.courseName}</p>
                         </td>
                         <td className="p-4">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                             app.type === 'apply' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                           }`}>
                             {app.type}
                           </span>
                         </td>
                         <td className="p-4">
                            <a href={`tel:${app.phone}`} className="text-xs font-bold text-blue-400 hover:underline">{app.phone}</a>
                         </td>
                         <td className="p-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{app.status}</span>
                         </td>
                         <td className="p-4">
                            <p className="text-[10px] font-bold text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="xl:col-span-1">
           {selectedContact && (selectedContact as any).courseId ? (
             <div className="bg-[#050B14] rounded-lg shadow-2xl border border-blue-500/20 p-6 animate-fade-in sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Applicant Details</h3>
                  <button onClick={() => setSelectedContact(null)} className="text-slate-500 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                   <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Applying For</p>
                      <p className="text-sm font-black text-blue-400">{(selectedContact as any).courseName}</p>
                   </div>

                   <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Full Name</p>
                        <p className="text-sm font-bold text-white">{selectedContact.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-sm font-bold text-white">{selectedContact.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                        <p className="text-sm font-bold text-white">{selectedContact.phone || 'N/A'}</p>
                      </div>
                      {(selectedContact as any).password && (
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Chosen Password</p>
                          <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <code className="text-xs font-bold text-yellow-400 tracking-widest">{(selectedContact as any).password}</code>
                          </div>
                        </div>
                      )}
                   </div>

                   <div className="pt-6 border-t border-white/5 space-y-3">
                       <div className="flex gap-2">
                           <a href={`mailto:${selectedContact.email}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest py-3 rounded-xl flex items-center justify-center space-x-2 transition-all">
                              <Mail className="h-3 w-3" />
                              <span>Email</span>
                           </a>
                           {selectedContact.phone && (
                             <a href={`tel:${selectedContact.phone}`} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] tracking-widest py-3 rounded-xl flex items-center justify-center space-x-2 transition-all">
                                <Phone className="h-3 w-3" />
                                <span>Call</span>
                             </a>
                           )}
                       </div>
                       
                       {selectedContact.phone && (
                         <button 
                           onClick={() => {
                             const cleanPhone = selectedContact.phone?.replace(/[^\d+]/g, '');
                             const message = `Hello ${selectedContact.name}, this is EDBELL EDUSOLUTIONS regarding your ${(selectedContact as any).type} for ${(selectedContact as any).courseName}. We would like to discuss this further with you.`;
                             window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
                           }}
                           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-[10px] tracking-widest py-3 rounded-xl flex items-center justify-center space-x-2 transition-all"
                         >
                           <MessageCircle className="h-3 w-3" />
                           <span>WhatsApp</span>
                         </button>
                       )}

                       <div className="pt-4 border-t border-white/5">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Update Status</p>
                          <select 
                            value={selectedContact.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value as CourseApplication['status'];
                              try {
                                const response = await fetch(`/api/courses/apply/${selectedContact._id}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: newStatus })
                                });
                                if (response.ok) {
                                  setSelectedContact({ ...selectedContact, status: newStatus } as CourseApplication);
                                  setCourseApplications(courseApplications.map(a => 
                                    a._id === selectedContact._id ? { ...a, status: newStatus } : a
                                  ) as any);
                                  alert('✅ Status updated successfully');
                                }
                              } catch (err) {
                                console.error('Error updating status:', err);
                              }
                            }}
                            className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="admitted">Admitted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                       </div>

                       <button 
                         onClick={async () => {
                           if (!confirm('Are you sure you want to delete this application?')) return;
                           try {
                             const response = await fetch(`/api/courses/apply/${selectedContact._id}`, {
                               method: 'DELETE'
                             });
                             if (response.ok) {
                               setCourseApplications(courseApplications.filter(a => a._id !== selectedContact._id));
                               setSelectedContact(null);
                               alert('✅ Deleted successfully');
                             }
                           } catch (err) {
                             console.error('Error deleting application:', err);
                           }
                         }}
                         className="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-black uppercase text-[10px] tracking-widest py-3 rounded-xl flex items-center justify-center space-x-2 transition-all mt-4"
                       >
                         <Trash2 className="h-3 w-3" />
                         <span>Delete Application</span>
                       </button>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5 p-12 text-center">
                <GraduationCap className="h-12 w-12 text-slate-800 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-500 italic">Select an application to view details.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );

  const renderSubscribersSection = () => (
    <div className="space-y-8">
      {/* Newsletter Subscribers Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-900/20 to-indigo-900/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h2>
              <p className="text-gray-600 mt-1">Manage newsletter subscriptions and subscriber details</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    await Promise.all([
                      fetchAnalyticsData(),
                      fetchContacts()
                    ]);
                  } catch (error) {
                    console.error('Error refreshing subscriber data:', error);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                <BarChart3 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh Data'}</span>
              </button>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-blue-600">{subscriptions.length}</span>
                <p className="text-sm text-gray-600">Total Subscribers</p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-green-600">
                  {subscriptions.filter(sub => sub.isActive !== false).length}
                </span>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{subscriptions.length}</h3>
              <p className="text-gray-600">Total Subscribers</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {subscriptions.filter(sub => sub.isActive !== false).length}
              </h3>
              <p className="text-gray-600">Active Subscriptions</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {subscriptions.filter(sub => {
                  const subDate = new Date(sub.subscribedAt || sub.createdAt);
                  const today = new Date();
                  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
                  return subDate >= thirtyDaysAgo;
                }).length}
              </h3>
              <p className="text-gray-600">Last 30 Days</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {subscriptions.filter(sub => contacts.some(contact => contact.email === sub.email)).length}
              </h3>
              <p className="text-gray-600">Also Contacted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">Subscriber Details</h3>
          <p className="text-slate-400">Complete list of newsletter subscribers with contact history</p>
        </div>
        <div className="p-6">
          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No subscribers yet</h3>
              <p className="text-gray-500 mb-4">Newsletter subscriptions will appear here</p>
              <button
                onClick={() => {
                  const newsletterUrl = `${window.location.origin}/#newsletter`;
                  navigator.clipboard.writeText(newsletterUrl);
                  alert('✅ Newsletter signup link copied to clipboard');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Copy Newsletter Link
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead className="bg-[#030712]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subscriber</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subscribed Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact History</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-[#050B14] divide-y divide-white/5">
                  {subscriptions.map((subscription, index) => {
                    const hasContactHistory = contacts.some(contact => contact.email === subscription.email);
                    const contactRecord = contacts.find(contact => contact.email === subscription.email);
                    return (
                      <tr key={subscription._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {(subscription.name || subscription.email).charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {subscription.name || 'Anonymous'}
                              </div>
                              <div className="text-sm text-gray-500">
                                Newsletter Subscriber
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{subscription.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscription.subscribedAt || subscription.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscription.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {subscription.isActive !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {hasContactHistory ? (
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="h-4 w-4 text-green-500" />
                              <span className="text-xs text-green-600 font-medium">
                                Contacted ({contactRecord?.status})
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No contact history</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              const subject = 'Newsletter Update from EDBELL EDUSOLUTIONS LLP';
                              const body = `Dear ${subscription.name || 'Subscriber'},\n\nThank you for subscribing to our newsletter! We're excited to share the latest educational insights and opportunities with you.\n\nBest regards,\nEDBELL EDUSOLUTIONS LLP Team\nPhone: +91 98765 43210\nEmail: info@edbelledusolutions.com`;
                              const mailtoLink = `mailto:${subscription.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                              window.open(mailtoLink, '_blank');
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            Email
                          </button>
                          {hasContactHistory && (
                            <button
                              onClick={() => {
                                setActiveSection('contacts');
                                setSelectedContact(contactRecord || null);
                              }}
                              className="text-green-600 hover:text-green-900 transition-colors"
                            >
                              View Contact
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBlogsSection = () => (
    <div className="space-y-8">
      {/* Blog Management Header */}
      <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5">
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Blog Management</h2>
              <p className="text-slate-400 mt-1">Create and manage blog posts for your website</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => openBlogModal()}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>New Blog Post</span>
              </button>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-purple-600">{blogs.length}</span>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{blogs.filter(b => b.published).length}</h3>
              <p className="text-gray-600">Published</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{blogs.filter(b => !b.published).length}</h3>
              <p className="text-gray-600">Drafts</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{blogs.filter(b => b.featured).length}</h3>
              <p className="text-gray-600">Featured</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Tag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{[...new Set(blogs.flatMap(b => b.tags))].length}</h3>
              <p className="text-gray-600">Unique Tags</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">All Blog Posts</h3>
          <p className="text-gray-600">Manage your blog content and publication status</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                      <p className="text-gray-500 mb-4">Get started by creating your first blog post</p>
                      <button
                        onClick={() => openBlogModal()}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Create Your First Blog Post
                      </button>
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{blog.title}</div>
                            <div className="text-sm text-gray-500 truncate">{blog.slug}</div>
                            {blog.featured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                <Award className="h-3 w-3 mr-1" />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {blog.author}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${blog.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openBlogModal(blog)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors flex items-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteBlog(blog._id!)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors flex items-center space-x-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                          {blog.published && (
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs transition-colors"
                            >
                              View
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGallerySection = () => (
    <div className="space-y-8">
      {/* Gallery Management Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
              <p className="text-gray-600 mt-1">Upload and manage photo gallery for your website</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{galleryImages.length}</div>
                <div className="text-sm text-gray-500">Total Images</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{galleryImages.filter(img => img.published).length}</div>
                <div className="text-sm text-gray-500">Published</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{galleryImages.filter(img => img.featured).length}</div>
                <div className="text-sm text-gray-500">Featured</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">Gallery Images</h3>
              <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => openGalleryModal()}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Upload New Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Yet</h3>
                <p className="text-gray-600 mb-4">Upload your first image to get started with the gallery.</p>
                <button
                  onClick={() => openGalleryModal()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Upload First Image
                </button>
              </div>
            ) : (
              galleryImages.map((image) => (
                <div key={image._id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={image.imageUrl}
                      alt={image.imageAlt}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/300/200';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${image.category === 'events' ? 'bg-blue-100 text-blue-800' :
                        image.category === 'campus' ? 'bg-green-100 text-green-800' :
                          image.category === 'graduation' ? 'bg-purple-100 text-purple-800' :
                            image.category === 'activities' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                        }`}>
                        {image.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        {image.featured && (
                          <span className="text-yellow-500" title="Featured">
                            <Award className="h-3 w-3" />
                          </span>
                        )}
                        <span className={`w-2 h-2 rounded-full ${image.published ? 'bg-green-500' : 'bg-gray-400'}`} title={image.published ? 'Published' : 'Draft'}></span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{image.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(image.eventDate || image.createdAt || '').toLocaleDateString()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openGalleryModal(image)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteGalleryImage(image._id!)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPagesSection = () => (
    <div className="space-y-8">
      {/* Website Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Website Pages Overview</h2>
              <p className="text-gray-600 mt-1">Complete website structure and page management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-blue-600">8</span>
                <p className="text-sm text-gray-600">Main Pages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">8</h3>
              <p className="text-gray-600">Main Pages</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">6</h3>
              <p className="text-gray-600">Course Pages</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">4</h3>
              <p className="text-gray-600">University Pages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Website Pages */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Main Website Pages</h3>
              <p className="text-gray-600">Core navigation and essential pages</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Home', path: '/', status: 'Active', lastUpdated: '2024-01-15', description: 'Main landing page with hero section and services overview', icon: <Globe className="h-4 w-4 text-blue-600" /> },
                  { name: 'About', path: '/about', status: 'Active', lastUpdated: '2024-01-14', description: 'Company information, mission, and team details', icon: <Info className="h-4 w-4 text-blue-600" /> },
                  { name: 'Courses', path: '/courses', status: 'Active', lastUpdated: '2024-01-13', description: 'Complete course catalog with filtering and details', icon: <BookOpen className="h-4 w-4 text-blue-600" /> },
                  { name: 'Universities', path: '/universities', status: 'Active', lastUpdated: '2024-01-12', description: 'Partner university listings and information', icon: <GraduationCap className="h-4 w-4 text-blue-600" /> },
                  { name: 'Services', path: '/services', status: 'Active', lastUpdated: '2024-01-11', description: 'Educational services and offerings', icon: <Briefcase className="h-4 w-4 text-blue-600" /> },
                  { name: 'Blog', path: '/blog', status: 'Active', lastUpdated: '2024-01-10', description: 'Educational articles and insights', icon: <FileText className="h-4 w-4 text-blue-600" /> },
                  { name: 'Gallery', path: '/gallery', status: 'Active', lastUpdated: '2024-01-09', description: 'Photo gallery and visual content', icon: <Award className="h-4 w-4 text-blue-600" /> },
                  { name: 'Contact', path: '/contact', status: 'Active', lastUpdated: '2024-01-08', description: 'Contact form and company information', icon: <MessageCircle className="h-4 w-4 text-blue-600" /> }
                ].map((page, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            {page.icon}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{page.name}</div>
                          <div className="text-sm text-gray-500">{page.path}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">{page.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {page.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={page.path}
                          target="_blank"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => navigator.clipboard.writeText(`${window.location.origin}${page.path}`)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs transition-colors"
                        >
                          Copy URL
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddCourseSection = () => (
    <div className="space-y-8">
      {/* Course Management Header */}
      <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5">
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-purple-900/10 to-indigo-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">Course Management</h2>
                <p className="text-slate-400 mt-1 uppercase tracking-widest text-[10px] font-bold">Administer curriculum modules and details</p>
              </div>
            </div>
            <button
              onClick={() => openCourseModal()}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg shadow-purple-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>Add Course</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="w-full">
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
                <p className="text-slate-400 mb-4 text-sm font-mono tracking-tighter">Initialize database or add curriculum manually</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => openCourseModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Add Your First Course
                  </button>
                  <button
                    onClick={seedSampleData}
                    disabled={isSeeding}
                    className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors border border-blue-500/30"
                  >
                    {isSeeding ? 'Loading...' : 'Add Sample Data'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                  <div key={course._id || index} className="group relative h-full bg-[#050B14] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-blue-500/40 transition-all duration-500 flex flex-col overflow-hidden shadow-sm hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-xl">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full border tracking-[0.2em] uppercase backdrop-blur-xl ${course.category === 'Undergraduate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : course.category === 'Postgraduate' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                        {course.category}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1">
                      <h4 className="text-base sm:text-lg font-black text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-2">
                        {course.name}
                      </h4>
                      <p className="text-slate-400 font-light text-xs leading-relaxed mb-4 line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    <div className="relative z-10 space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 opacity-80">
                          <Clock className="h-3 w-3 text-blue-400" />
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                        </div>
                        <span className="text-xs font-bold text-slate-200">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 opacity-80">
                          <Award className="h-3 w-3 text-blue-400" />
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Investment</span>
                        </div>
                        <span className="text-xs font-bold text-blue-400">{course.fees || 'TBA'}</span>
                      </div>
                      {course.offeredByUniversities && course.offeredByUniversities.length > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 opacity-80">
                            <GraduationCap className="h-3 w-3 text-blue-400" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">University</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-200 line-clamp-1 text-right max-w-[120px]">{course.offeredByUniversities![0].name}</span>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex space-x-2 mt-auto">
                      <button
                        onClick={() => openCourseModal(course)}
                        className="flex-1 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 border border-blue-500/30 uppercase tracking-widest"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id!)}
                        className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 border border-red-600/30 uppercase tracking-widest"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddUniversitySection = () => (
    <div className="space-y-8">
      {/* University Management Header */}
      <div className="bg-[#050B14] rounded-lg shadow-2xl border border-white/5">
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-green-900/10 to-emerald-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">University Management</h2>
                <p className="text-slate-400 mt-1 uppercase tracking-widest text-[10px] font-bold">Manage institutional partnerships and details</p>
              </div>
            </div>
            <button
              onClick={() => openUniversityModal()}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg shadow-green-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>Add University</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="w-full">
            {universities.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No universities found</h3>
                <p className="text-slate-400 mb-4 text-sm font-mono tracking-tighter">Initialize database or add universities manually</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => openUniversityModal()}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Add Your First University
                  </button>
                  <button
                    onClick={seedSampleData}
                    disabled={isSeeding}
                    className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors border border-blue-500/30"
                  >
                    {isSeeding ? 'Loading...' : 'Add Sample Data'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {universities.map((university, index) => (
                  <div
                    key={university._id || index}
                    className="group relative h-full bg-[#050B14] border border-white/5 rounded-2xl overflow-hidden hover:border-green-500/40 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl p-4 sm:p-5"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                          <Building className="w-5 h-5" />
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <div className="inline-flex items-center bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest mb-1 uppercase border border-green-500/10">
                            {university.accreditation}
                          </div>
                          <div className="flex items-center justify-end text-yellow-500">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            <span className="text-xs font-bold text-slate-200">{university.rating || '4.5'}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors tracking-tight uppercase italic line-clamp-2">{university.name}</h3>
                      
                      <div className="flex items-center text-slate-400 text-[10px] mb-3 space-x-2">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-green-400/70" />
                          <span className="truncate max-w-[100px]">{university.location || 'India'}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-green-400/70" />
                          <span>Est. {university.established}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 text-xs font-light leading-relaxed mb-4 flex-grow line-clamp-3">
                        {university.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <div className="text-xs font-bold text-white">{university.totalStudents || university.studentsCount || '5K+'}</div>
                          <div className="text-[8px] text-slate-400 font-black uppercase tracking-wider">Students</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <div className="text-xs font-bold text-white">{university.coursesOffered || '50+'}</div>
                          <div className="text-[8px] text-slate-400 font-black uppercase tracking-wider">Courses</div>
                        </div>
                      </div>

                      <div className="relative z-10 flex space-x-2 mt-auto pt-3 border-t border-white/5">
                        <button
                          onClick={() => openUniversityModal(university)}
                          className="flex-1 bg-green-600/10 hover:bg-green-600 text-green-400 hover:text-white py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 border border-green-500/30 uppercase tracking-widest"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteUniversity(university._id!)}
                          className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 border border-red-600/30 uppercase tracking-widest"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSEOSection = () => (
    <div className="space-y-6">
      {/* SEO Overview */}
      <div className="bg-[#050B14] rounded-2xl shadow-2xl border border-white/5 p-6">
        <div className="flex items-center space-x-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-b border-white/5">
          <Globe className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">SEO Optimization</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Manage meta tags, descriptions, and keywords for better search engine visibility.
        </p>

        {/* SEO Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Pages Optimized</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-900">10/10</p>
            <p className="text-xs text-green-700 mt-1">100% Complete</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Meta Descriptions</span>
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900">10/10</p>
            <p className="text-xs text-blue-700 mt-1">All pages covered</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Keywords</span>
              <Tag className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900">45+</p>
            <p className="text-xs text-purple-700 mt-1">Targeted keywords</p>
          </div>
        </div>

        {/* Page-wise SEO Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Page SEO Settings</h3>

          {/* Home Page */}
          <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Home className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Home Page</h4>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Optimized
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-600">EDBELL EDUSOLUTIONS | UGC Approved Online Degrees & Career Guidance</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-600">Get UGC-approved online degrees from top universities. Expert career counseling, study abroad services, and scholarship assistance. 25,000+ successful students.</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Keywords:</span>
                <p className="text-gray-600">online degree, UGC approved, distance education, career counseling, study abroad</p>
              </div>
            </div>
          </div>

          {/* About Page */}
          <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">About Page</h4>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Optimized
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-600">About EDBELL EDUSOLUTIONS | Leading Online Education Provider</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-600">Learn about EDBELL EDUSOLUTIONS LLP - Your trusted partner in quality education since 2024. UGC-approved programs, expert guidance, and comprehensive support services.</p>
              </div>
            </div>
          </div>

          {/* Courses Page */}
          <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Courses Page</h4>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Optimized
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-600">Online Degree Courses | UGC Approved Programs | EDBELL EDUSOLUTIONS</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-600">Explore UGC-approved online degree courses including BA, B.Com, BBA, MA, M.Com, MBA from top NAAC A++ universities. Flexible learning, affordable fees.</p>
              </div>
            </div>
          </div>

          {/* Universities Page */}
          <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Universities Page</h4>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Optimized
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-600">Partner Universities | UGC-DEB Approved | EDBELL EDUSOLUTIONS</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-600">Explore 50+ partner universities offering UGC-approved online degrees. NAAC A++ graded institutions with flexible learning options.</p>
              </div>
            </div>
          </div>

          {/* Services Page */}
          <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Services Page</h4>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Optimized
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-600">Educational Services | Career Counseling | Study Abroad | EDBELL</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-600">Comprehensive educational services including career counseling, study abroad assistance, scholarship guidance, and test preparation.</p>
              </div>
            </div>
          </div>

          {/* Contact Page */}
          <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Contact Page</h4>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Optimized
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-600">Contact Us | Get Free Consultation | EDBELL EDUSOLUTIONS</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-600">Contact EDBELL EDUSOLUTIONS for free educational consultation. Expert counselors available for career guidance and admission support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Best Practices */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            SEO Best Practices Implemented
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>All pages have unique, descriptive meta titles (50-60 characters)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Meta descriptions are compelling and within 150-160 characters</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Targeted keywords included naturally in content</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Open Graph tags for social media sharing</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Structured data (JSON-LD) for rich snippets</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Mobile-friendly and responsive design</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Fast page load times with optimized images</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>XML sitemap and robots.txt configured</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>View Sitemap</span>
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>View Robots.txt</span>
          </a>
          <button
            onClick={() => setActiveSection('analytics')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>SEO Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Website Analytics</h2>
          <p className="text-gray-600">Key performance metrics and statistics</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <h3 className="text-3xl font-bold">{analyticsData.totalVisitors.toLocaleString()}</h3>
              <p className="text-blue-100">Total Visitors</p>
              <p className="text-xs text-blue-200 mt-1">{analyticsData.visitorGrowth}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <h3 className="text-3xl font-bold">{analyticsData.contactInquiries}</h3>
              <p className="text-green-100">Contact Inquiries</p>
              <p className="text-xs text-green-200 mt-1">This month</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <h3 className="text-3xl font-bold">{analyticsData.coursePageViews.toLocaleString()}</h3>
              <p className="text-yellow-100">Course Page Views</p>
              <p className="text-xs text-yellow-200 mt-1">{analyticsData.courseViewsGrowth}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white text-center">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <h3 className="text-3xl font-bold">{analyticsData.newsletterSubscribers}</h3>
              <p className="text-purple-100">Newsletter Subscribers</p>
              <p className="text-xs text-purple-200 mt-1">{analyticsData.subscriberGrowth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Pages */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Popular Pages</h2>
              <p className="text-gray-600">Most visited pages on the website</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                onChange={(e) => {
                  // Refetch analytics with different time range
                  const days = e.target.value;
                  fetch(`/api/analytics?days=${days}`)
                    .then(res => res.json())
                    .then(data => {
                      setPopularPages(data.popularPages || []);
                      setPageViewsData(data);
                    })
                    .catch(console.error);
                }}
                defaultValue="30"
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          {popularPages.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No page views yet</h3>
              <p className="text-gray-500 mb-4">Page views will appear here as visitors browse your website</p>
              <div className="text-sm text-gray-400">
                <p>Analytics tracking is active and will collect data automatically</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {popularPages.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.page}</h3>
                      <p className="text-sm text-gray-600">{item.views} views</p>
                      {item.lastVisit && (
                        <p className="text-xs text-gray-400">
                          Last visit: {new Date(item.lastVisit).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}

              {pageViewsData.totalViews > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{pageViewsData.totalViews}</div>
                      <div className="text-sm text-gray-600">Total Page Views</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {pageViewsData.dailyViews?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Active Days</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(pageViewsData.totalViews / Math.max(pageViewsData.dailyViews?.length || 1, 1))}
                      </div>
                      <div className="text-sm text-gray-600">Avg. Daily Views</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Subscribers */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Newsletter Subscribers</h2>
          <p className="text-gray-600">Recent newsletter subscriptions and analytics</p>
        </div>
        <div className="p-6">
          {/* Subscription Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-lg text-white text-center">
              <Users className="h-6 w-6 mx-auto mb-2 opacity-80" />
              <h3 className="text-2xl font-bold">{subscriptions.length}</h3>
              <p className="text-indigo-100 text-sm">Total Subscribers</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-lg text-white text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 opacity-80" />
              <h3 className="text-2xl font-bold">
                {subscriptions.filter(sub => {
                  const subDate = new Date(sub.subscribedAt || sub.createdAt);
                  const today = new Date();
                  const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
                  return subDate >= thirtyDaysAgo;
                }).length}
              </h3>
              <p className="text-emerald-100 text-sm">Last 30 Days</p>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-lg text-white text-center">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 opacity-80" />
              <h3 className="text-2xl font-bold">
                {subscriptions.filter(sub => sub.isActive !== false).length}
              </h3>
              <p className="text-amber-100 text-sm">Active Subscribers</p>
            </div>
          </div>

          {subscriptions.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers yet</h3>
              <p className="text-gray-500">Newsletter subscriptions will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact History</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.slice(0, 10).map((subscription, index) => {
                    const hasContactHistory = contacts.some(contact => contact.email === subscription.email);
                    return (
                      <tr key={subscription._id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{subscription.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{subscription.name || 'Not provided'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscription.subscribedAt || subscription.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscription.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {subscription.isActive !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {hasContactHistory ? (
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4 text-green-500" />
                              <span className="text-xs text-green-600 font-medium">Has contacted</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No contact history</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {subscriptions.length > 10 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Showing 10 of {subscriptions.length} subscribers
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-gray-600">Latest website activities and updates</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'New contact inquiry received', time: '2 hours ago', type: 'contact' },
              { action: 'Course page updated', time: '5 hours ago', type: 'update' },
              { action: 'University profile added', time: '1 day ago', type: 'add' },
              { action: 'SEO optimization completed', time: '2 days ago', type: 'seo' },
              { action: 'New specialized course added', time: '3 days ago', type: 'add' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${activity.type === 'contact' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                    activity.type === 'add' ? 'bg-purple-500' :
                      'bg-yellow-500'
                  }`}></div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const handleHeroImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutHeroSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAboutHeroFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutHeroPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = async () => {
    if (!heroImageFile) {
      setUploadMessage('Please select an image first');
      return;
    }

    setUploadingHero(true);
    setUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', heroImageFile);

      const response = await fetch('/api/upload-hero', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadMessage('✓ Home hero image uploaded successfully! Refresh the home page to see changes.');
        setHeroImageFile(null);
        setHeroImagePreview('');
        const fileInput = document.getElementById('hero-image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setUploadMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setUploadMessage('Failed to upload image. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploadingHero(false);
    }
  };

  const handleAboutHeroUpload = async () => {
    if (!aboutHeroFile) {
      setAboutUploadMessage('Please select an image first');
      return;
    }

    setUploadingAbout(true);
    setAboutUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', aboutHeroFile);

      const response = await fetch('/api/upload-about-hero', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAboutUploadMessage('✓ About hero image uploaded successfully! Refresh the about page to see changes.');
        setAboutHeroFile(null);
        setAboutHeroPreview('');
        const fileInput = document.getElementById('about-hero-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setAboutUploadMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setAboutUploadMessage('Failed to upload image. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploadingAbout(false);
    }
  };

  const handleCampusImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCampusImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCampusImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCampusImageUpload = async () => {
    if (!campusImageFile) {
      setCampusUploadMessage('Please select an image first');
      return;
    }

    setUploadingCampus(true);
    setCampusUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', campusImageFile);

      const response = await fetch('/api/upload-campus', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCampusUploadMessage('✓ Campus image uploaded successfully! Refresh the home page to see changes.');
        setCampusImageFile(null);
        setCampusImagePreview('');
        const fileInput = document.getElementById('campus-image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setCampusUploadMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setCampusUploadMessage('Failed to upload image. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploadingCampus(false);
    }
  };

  // Services Image Handlers
  const handleServicesImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setServicesImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setServicesImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServicesImageUpload = async () => {
    if (!servicesImageFile) {
      setServicesUploadMessage('Please select an image first');
      return;
    }

    setUploadingServices(true);
    setServicesUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', servicesImageFile);
      formData.append('filename', 'about-team.jpg');

      const response = await fetch('/api/upload-hero', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setServicesUploadMessage('✓ Services image uploaded successfully! Refresh the services page to see changes.');
        setServicesImageFile(null);
        setServicesImagePreview('');
        const fileInput = document.getElementById('services-image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setServicesUploadMessage(`✗ Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setServicesUploadMessage('✗ Upload failed. Please try again.');
      console.error('Services image upload error:', error);
    } finally {
      setUploadingServices(false);
    }
  };

  // Gallery Hero Image Handlers
  const handleGalleryHeroSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGalleryHeroFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryHeroPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryHeroUpload = async () => {
    if (!galleryHeroFile) {
      setGalleryHeroUploadMessage('Please select an image first');
      return;
    }

    setUploadingGalleryHero(true);
    setGalleryHeroUploadMessage('');

    try {
      const formData = new FormData();
      formData.append('file', galleryHeroFile);
      formData.append('filename', 'about-campus.jpg');

      const response = await fetch('/api/upload-campus', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setGalleryHeroUploadMessage('✓ Gallery hero image uploaded successfully! Refresh the gallery page to see changes.');
        setGalleryHeroFile(null);
        setGalleryHeroPreview('');
        const fileInput = document.getElementById('gallery-hero-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setGalleryHeroUploadMessage(`✗ Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setGalleryHeroUploadMessage('✗ Upload failed. Please try again.');
      console.error('Gallery hero upload error:', error);
    } finally {
      setUploadingGalleryHero(false);
    }
  };

  const renderHeroImagesSection = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">Hero Images Management</h2>
          <p className="text-gray-600 mt-1">Upload and manage hero section images for Home and About pages</p>
        </div>
      </div>

      {/* Home Page Hero Image */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <Home className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Home Page Hero Image</h3>
              <p className="text-sm text-gray-600">Professional image displayed on the home page hero section</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Image */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Image</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <img
                  src="/hero-professional.jpg"
                  alt="Current Home Hero"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Path: /public/hero-professional.jpg</p>
              </div>
            </div>

            {/* Upload New */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upload New Image</h4>
              <div className="space-y-4">
                <div>
                  <input
                    id="hero-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px or larger, JPG/PNG</p>
                </div>

                {heroImagePreview && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={heroImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-blue-300"
                    />
                  </div>
                )}

                <button
                  onClick={handleHeroImageUpload}
                  disabled={!heroImageFile || uploadingHero}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${!heroImageFile || uploadingHero
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {uploadingHero ? 'Uploading...' : 'Upload Home Hero Image'}
                </button>

                {uploadMessage && (
                  <div className={`p-3 rounded-lg text-sm ${uploadMessage.includes('✓')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {uploadMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Page Hero Image */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <Info className="h-6 w-6 text-indigo-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">About Page Hero Image</h3>
              <p className="text-sm text-gray-600">Professional image displayed on the about page hero section</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Image */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Image</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <img
                  src="/about-professional.jpg"
                  alt="Current About Hero"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Path: /public/about-professional.jpg</p>
              </div>
            </div>

            {/* Upload New */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upload New Image</h4>
              <div className="space-y-4">
                <div>
                  <input
                    id="about-hero-input"
                    type="file"
                    accept="image/*"
                    onChange={handleAboutHeroSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px or larger, JPG/PNG</p>
                </div>

                {aboutHeroPreview && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={aboutHeroPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-indigo-300"
                    />
                  </div>
                )}

                <button
                  onClick={handleAboutHeroUpload}
                  disabled={!aboutHeroFile || uploadingAbout}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${!aboutHeroFile || uploadingAbout
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                  {uploadingAbout ? 'Uploading...' : 'Upload About Hero Image'}
                </button>

                {aboutUploadMessage && (
                  <div className={`p-3 rounded-lg text-sm ${aboutUploadMessage.includes('✓')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {aboutUploadMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Image Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-teal-50">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Campus Image (Home Page)</h3>
              <p className="text-sm text-gray-600">Modern Campus - State-of-the-art facilities section image</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Image */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Image</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <img
                  src="/campus-modern.jpg"
                  alt="Current Campus"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Path: /public/campus-modern.jpg</p>
              </div>
            </div>

            {/* Upload New */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upload New Image</h4>
              <div className="space-y-4">
                <div>
                  <input
                    id="campus-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleCampusImageSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px or larger, JPG/PNG</p>
                </div>

                {campusImagePreview && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={campusImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-green-300"
                    />
                  </div>
                )}

                <button
                  onClick={handleCampusImageUpload}
                  disabled={!campusImageFile || uploadingCampus}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${!campusImageFile || uploadingCampus
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                    }`}
                >
                  {uploadingCampus ? 'Uploading...' : 'Upload Campus Image'}
                </button>

                {campusUploadMessage && (
                  <div className={`p-3 rounded-lg text-sm ${campusUploadMessage.includes('✓')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {campusUploadMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Page Hero Image */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-6 w-6 text-orange-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Services Page Hero Image</h3>
              <p className="text-sm text-gray-600">Team/Services image displayed on the services page hero section</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Image */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Image</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <img
                  src="/about-team.jpg"
                  alt="Current Services Hero"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Path: /public/about-team.jpg</p>
              </div>
            </div>

            {/* Upload New */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upload New Image</h4>
              <div className="space-y-4">
                <div>
                  <input
                    id="services-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleServicesImageSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px or larger, JPG/PNG</p>
                </div>

                {servicesImagePreview && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={servicesImagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-orange-300"
                    />
                  </div>
                )}

                <button
                  onClick={handleServicesImageUpload}
                  disabled={!servicesImageFile || uploadingServices}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${!servicesImageFile || uploadingServices
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                >
                  {uploadingServices ? 'Uploading...' : 'Upload Services Hero Image'}
                </button>

                {servicesUploadMessage && (
                  <div className={`p-3 rounded-lg text-sm ${servicesUploadMessage.includes('✓')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {servicesUploadMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Page Hero Image */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-pink-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Gallery Page Hero Image</h3>
              <p className="text-sm text-gray-600">Campus/Gallery image displayed on the gallery page hero section</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Image */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Current Image</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <img
                  src="/about-campus.jpg"
                  alt="Current Gallery Hero"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Path: /public/about-campus.jpg</p>
              </div>
            </div>

            {/* Upload New */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Upload New Image</h4>
              <div className="space-y-4">
                <div>
                  <input
                    id="gallery-hero-input"
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryHeroSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px or larger, JPG/PNG</p>
                </div>

                {galleryHeroPreview && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={galleryHeroPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-pink-300"
                    />
                  </div>
                )}

                <button
                  onClick={handleGalleryHeroUpload}
                  disabled={!galleryHeroFile || uploadingGalleryHero}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${!galleryHeroFile || uploadingGalleryHero
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700'
                    }`}
                >
                  {uploadingGalleryHero ? 'Uploading...' : 'Upload Gallery Hero Image'}
                </button>

                {galleryHeroUploadMessage && (
                  <div className={`p-3 rounded-lg text-sm ${galleryHeroUploadMessage.includes('✓')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {galleryHeroUploadMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Quick Instructions
        </h4>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Select an image file from your computer (JPG, PNG, etc.)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Preview the image to ensure it looks good</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Click the upload button to apply the image</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Refresh the respective page (Ctrl + Shift + R) to see changes</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderSettingsSection = () => {
    return (
      <div className="space-y-6">
        {/* Hero Image Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-lg font-semibold text-gray-900">Hero Image Upload</h2>
            <p className="text-gray-600">Upload the professional image for the home page hero section</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Current Hero Image Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Current Hero Image</h3>
                <div className="w-full max-w-md mx-auto">
                  <img
                    src="/hero-professional.jpg"
                    alt="Current Hero"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              </div>

              {/* Upload New Image */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Upload New Hero Image</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Image
                    </label>
                    <input
                      id="hero-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageSelect}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: Professional photo, JPG/PNG format, at least 800x600px
                    </p>
                  </div>

                  {/* Image Preview */}
                  {heroImagePreview && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="w-full max-w-md mx-auto">
                        <img
                          src={heroImagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-blue-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <button
                    onClick={handleHeroImageUpload}
                    disabled={!heroImageFile || uploadingHero}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${!heroImageFile || uploadingHero
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {uploadingHero ? 'Uploading...' : 'Upload Hero Image'}
                  </button>

                  {/* Upload Message */}
                  {uploadMessage && (
                    <div className={`p-3 rounded-lg text-sm ${uploadMessage.includes('✓')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {uploadMessage}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWebsiteSection = () => (
    <div className="space-y-8">
      {/* Website Navigation Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Website Navigation</h2>
              <p className="text-gray-600 mt-1">Access all website pages directly from the dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-blue-600">8</span>
                <p className="text-sm text-gray-600">Total Pages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Home', path: '/', status: 'Active', lastUpdated: '2024-01-15', description: 'Main landing page with hero section and services overview', icon: <Globe className="h-4 w-4 text-blue-600" /> },
              { name: 'About', path: '/about', status: 'Active', lastUpdated: '2024-01-14', description: 'Company information, mission, and team details', icon: <Info className="h-4 w-4 text-blue-600" /> },
              { name: 'Courses', path: '/courses', status: 'Active', lastUpdated: '2024-01-13', description: 'Complete course catalog with filtering and details', icon: <BookOpen className="h-4 w-4 text-blue-600" /> },
              { name: 'Universities', path: '/universities', status: 'Active', lastUpdated: '2024-01-12', description: 'Partner university listings and information', icon: <GraduationCap className="h-4 w-4 text-blue-600" /> },
              { name: 'Services', path: '/services', status: 'Active', lastUpdated: '2024-01-11', description: 'Educational services and offerings', icon: <Briefcase className="h-4 w-4 text-blue-600" /> },
              { name: 'Blog', path: '/blog', status: 'Active', lastUpdated: '2024-01-10', description: 'Educational articles and insights', icon: <FileText className="h-4 w-4 text-blue-600" /> },
              { name: 'Gallery', path: '/gallery', status: 'Active', lastUpdated: '2024-01-09', description: 'Photo gallery and visual content', icon: <Award className="h-4 w-4 text-blue-600" /> },
              { name: 'Contact', path: '/contact', status: 'Active', lastUpdated: '2024-01-08', description: 'Contact form and company information', icon: <MessageCircle className="h-4 w-4 text-blue-600" /> }
            ].map((page, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {page.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{page.name}</h3>
                    <p className="text-sm text-gray-500">{page.path}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{page.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {page.status}
                  </span>
                  <span className="text-xs text-gray-500">Updated: {page.lastUpdated}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(page.path, '_blank')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center space-x-1"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visit Page</span>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}${page.path}`)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded text-sm transition-colors"
                    title="Copy URL"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-gray-600">Common website management tasks</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Home className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Home Page</span>
            </button>
            <button
              onClick={() => window.open('/contact', '_blank')}
              className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Phone className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Contact Form</span>
            </button>
            <button
              onClick={() => window.open('/courses', '_blank')}
              className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">All Courses</span>
            </button>
            <button
              onClick={() => window.open('/blog', '_blank')}
              className="flex flex-col items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              <FileText className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-yellow-900">Blog Posts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourseDetailsSection = () => (
    <div className="space-y-8">
      {/* Course Details Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Course Details</h2>
              <p className="text-gray-600 mt-1">View all course detail pages</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-purple-600">6</span>
                <p className="text-sm text-gray-600">Course Pages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Bachelor of Arts', path: '/courses/bachelor-of-arts', status: 'Active', lastUpdated: '2024-01-15', description: 'Comprehensive liberal arts program', category: 'Undergraduate', duration: '3 Years', icon: <BookOpen className="h-4 w-4 text-purple-600" /> },
              { name: 'Bachelor of Commerce', path: '/courses/bachelor-of-commerce', status: 'Active', lastUpdated: '2024-01-14', description: 'Business-focused undergraduate program', category: 'Undergraduate', duration: '3 Years', icon: <BookOpen className="h-4 w-4 text-purple-600" /> },
              { name: 'Bachelor of Business Administration', path: '/courses/bachelor-of-business-administration', status: 'Active', lastUpdated: '2024-01-13', description: 'Management and leadership program', category: 'Undergraduate', duration: '3 Years', icon: <BookOpen className="h-4 w-4 text-purple-600" /> },
              { name: 'Master of Arts', path: '/courses/master-of-arts', status: 'Active', lastUpdated: '2024-01-12', description: 'Advanced humanities studies', category: 'Postgraduate', duration: '2 Years', icon: <BookOpen className="h-4 w-4 text-purple-600" /> },
              { name: 'Master of Business Administration', path: '/courses/master-of-business-administration', status: 'Active', lastUpdated: '2024-01-11', description: 'Executive management program', category: 'Postgraduate', duration: '2 Years', icon: <BookOpen className="h-4 w-4 text-purple-600" /> },
              { name: 'Master of Commerce', path: '/courses/master-of-commerce', status: 'Active', lastUpdated: '2024-01-10', description: 'Advanced commerce studies', category: 'Postgraduate', duration: '2 Years', icon: <BookOpen className="h-4 w-4 text-purple-600" /> }
            ].map((course, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.path}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${course.category === 'Undergraduate' ? 'bg-blue-100 text-blue-800' :
                    course.category === 'Postgraduate' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500">{course.duration}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(course.path, '_blank')}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center space-x-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>View Course</span>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}${course.path}`)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded text-sm transition-colors"
                    title="Copy URL"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUniversityDetailsSection = () => (
    <div className="space-y-8">
      {/* University Details Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">University Details</h2>
              <p className="text-gray-600 mt-1">View all university detail pages</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-2xl font-bold text-green-600">4</span>
                <p className="text-sm text-gray-600">University Pages</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'IGNOU', path: '/universities/ignou', status: 'Active', lastUpdated: '2024-01-15', description: 'Indira Gandhi National Open University', location: 'New Delhi', accreditation: 'NAAC A++', established: '1985', icon: <GraduationCap className="h-4 w-4 text-green-600" /> },
              { name: 'LPU', path: '/universities/lpu', status: 'Active', lastUpdated: '2024-01-14', description: 'Lovely Professional University', location: 'Punjab', accreditation: 'NAAC A+', established: '2005', icon: <GraduationCap className="h-4 w-4 text-green-600" /> },
              { name: 'Amity University', path: '/universities/amity-university', status: 'Active', lastUpdated: '2024-01-13', description: 'Leading private university', location: 'Noida', accreditation: 'NAAC A+', established: '2005', icon: <GraduationCap className="h-4 w-4 text-green-600" /> },
              { name: 'Chandigarh University', path: '/universities/chandigarh-university', status: 'Active', lastUpdated: '2024-01-12', description: 'Innovative education provider', location: 'Punjab', accreditation: 'NAAC A+', established: '2012', icon: <GraduationCap className="h-4 w-4 text-green-600" /> }
            ].map((university, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    {university.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{university.name}</h3>
                    <p className="text-sm text-gray-500">{university.path}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{university.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${university.accreditation === 'NAAC A++' ? 'bg-green-100 text-green-800' :
                    university.accreditation === 'NAAC A+' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {university.accreditation}
                  </span>
                  <span className="text-xs text-gray-500">Est. {university.established}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(university.path, '_blank')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center space-x-1"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>View University</span>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}${university.path}`)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded text-sm transition-colors"
                    title="Copy URL"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          max-height: 2.8em;
        }
      `}</style>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl my-4 flex flex-col">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </h3>
                <button
                  onClick={() => {
                    setShowCourseModal(false);
                    setEditingCourse(null);
                    resetCourseForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-8 overflow-y-auto max-h-[calc(90vh-130px)]">
  <div className="flex-1 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                  <input
                    type="text"
                    value={courseForm.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const autoUrl = name ? `/courses/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}` : '';
                      setCourseForm({ ...courseForm, name, url: autoUrl });
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Bachelor of Computer Science"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug * (Auto-generated)</label>
                  <input
                    type="text"
                    value={courseForm.url}
                    onChange={(e) => setCourseForm({ ...courseForm, url: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                    placeholder="Auto-generated from course name"
                    required
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-generated from course name. Edit if needed.</p>
                  <button
                    type="button"
                    onClick={() => {
                      const autoUrl = courseForm.name ? `/courses/${courseForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}` : '';
                      setCourseForm({ ...courseForm, url: autoUrl });
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    Regenerate URL
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as Course['category'] })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Specialized">Specialized</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 3 Years or 6 Months"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
                  <input
                    type="text"
                    value={courseForm.fees}
                    onChange={(e) => setCourseForm({ ...courseForm, fees: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., ₹50,000 per year or ₹25,000 total"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                  <input
                    type="text"
                    value={courseForm.eligibility}
                    onChange={(e) => setCourseForm({ ...courseForm, eligibility: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 12th Pass with PCM or Graduate Degree"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Comprehensive computer science program covering programming, algorithms, data structures, software engineering, and emerging technologies. Students will gain practical experience through projects and internships."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Detailed description that will appear on the course page.</p>
              </div>

              {/* Additional Course Details */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Additional Course Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum</label>
                    <textarea
                      value={courseForm.curriculum}
                      onChange={(e) => setCourseForm({ ...courseForm, curriculum: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Semester 1: Programming Fundamentals, Mathematics, English. Semester 2: Data Structures, Database Systems, Web Development..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Career Opportunities</label>
                    <textarea
                      value={courseForm.careerOpportunities}
                      onChange={(e) => setCourseForm({ ...courseForm, careerOpportunities: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Software Developer, Data Analyst, System Administrator, Web Developer, IT Consultant, Project Manager..."
                    />
                  </div>

                  {/* University Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🏛️ Offered By Universities
                    </label>
                    <p className="text-xs text-gray-500 mb-3">Select which universities offer this course. Selected universities will appear on the public course page.</p>
                    {universities.length === 0 ? (
                      <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500">No universities in database yet.</p>
                        <p className="text-xs text-gray-400 mt-1">Add universities first from the <strong>Add University</strong> section.</p>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <select
                          multiple
                          value={courseForm.offeredByUniversities || []}
                          onChange={(e) => {
                            const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                            setCourseForm({ ...courseForm, offeredByUniversities: selectedValues });
                          }}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 h-48 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm font-medium"
                        >
                          {universities.map((uni) => (
                            <option key={uni._id} value={uni._id!} className="p-2 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                              {uni.name} {uni.location ? `(${uni.location})` : ''}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">Hold Ctrl (Windows) or Command (Mac) to select multiple universities.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
  {/* Live Preview Pane */}
  <div className="w-full lg:w-[450px] flex-shrink-0">
    <div className="sticky top-0">
      <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
        <Eye className="h-5 w-5 mr-2 text-purple-600" /> Live Card Preview
      </h4>
      <div className="group relative w-full h-full bg-[#050B14] border border-white/5 rounded-[32px] p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-500 flex flex-col overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex items-start justify-between mb-8">
          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-full border tracking-[0.2em] uppercase backdrop-blur-xl ${courseForm.category === 'Undergraduate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : courseForm.category === 'Postgraduate' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
            {courseForm.category || 'Category'}
          </span>
        </div>

        <div className="relative z-10 flex-1">
          <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-2">
            {courseForm.name || 'Course Name'}
          </h4>
          <p className="text-slate-400 font-light text-sm leading-relaxed mb-6 line-clamp-3 min-h-[4.2rem]">
            {courseForm.description || 'Add a description to see it appear here...'}
          </p>
        </div>

        <div className="relative z-10 space-y-4 pt-6 mt-auto border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 opacity-80">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
            </div>
            <span className="text-sm font-bold text-slate-200">{courseForm.duration || '--'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 opacity-80">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investment</span>
            </div>
            <span className="text-sm font-bold text-blue-400">{courseForm.fees || 'TBA'}</span>
          </div>
          {courseForm.offeredByUniversities && courseForm.offeredByUniversities.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 opacity-80">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">University</span>
              </div>
              <span className="text-xs font-bold text-slate-200 line-clamp-1 text-right max-w-[150px]">
                {typeof courseForm.offeredByUniversities![0] === 'string'
                  ? universities.find(u => u._id === courseForm.offeredByUniversities![0])?.name || 'Loading...'
                  : (courseForm.offeredByUniversities![0] as any).name || 'Loading...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
<div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCourseModal(false);
                  setEditingCourse(null);
                  resetCourseForm();
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={editingCourse ? updateCourse : createCourse}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{editingCourse ? 'Update' : 'Create'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* University Modal */}
      {showUniversityModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4 flex flex-col">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {editingUniversity ? 'Edit University' : 'Add New University'}
                </h3>
                <button
                  onClick={() => {
                    setShowUniversityModal(false);
                    setEditingUniversity(null);
                    resetUniversityForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-130px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University Name *</label>
                  <input
                    type="text"
                    value={universityForm.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const autoUrl = name ? `/universities/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}` : '';
                      setUniversityForm({ ...universityForm, name, url: autoUrl });
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Delhi University or IGNOU"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug * (Auto-generated)</label>
                  <input
                    type="text"
                    value={universityForm.url}
                    onChange={(e) => setUniversityForm({ ...universityForm, url: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                    placeholder="Auto-generated from university name"
                    required
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-generated from university name. Edit if needed.</p>
                  <button
                    type="button"
                    onClick={() => {
                      const autoUrl = universityForm.name ? `/universities/${universityForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}` : '';
                      setUniversityForm({ ...universityForm, url: autoUrl });
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                  >
                    Regenerate URL
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Accreditation</label>
                  <input
                    type="text"
                    value={universityForm.accreditation}
                    onChange={(e) => setUniversityForm({ ...universityForm, accreditation: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., NAAC A++"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                  <input
                    type="text"
                    value={universityForm.established}
                    onChange={(e) => setUniversityForm({ ...universityForm, established: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 1985"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={universityForm.location}
                    onChange={(e) => setUniversityForm({ ...universityForm, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., New Delhi, India"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={universityForm.website}
                    onChange={(e) => setUniversityForm({ ...universityForm, website: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., https://www.ignou.ac.in"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={universityForm.description}
                  onChange={(e) => setUniversityForm({ ...universityForm, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Premier educational institution known for excellence in higher education. Offers diverse programs with experienced faculty, modern infrastructure, and strong industry connections. Committed to providing quality education and research opportunities."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Detailed description that will appear on the university page.</p>
              </div>

              {/* Additional University Details */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional University Details</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">University Type</label>
                    <select
                      value={universityForm.universityType}
                      onChange={(e) => setUniversityForm({ ...universityForm, universityType: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="Central University">Central University</option>
                      <option value="State University">State University</option>
                      <option value="Private University">Private University</option>
                      <option value="Deemed University">Deemed University</option>
                      <option value="Open University">Open University</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campus Size</label>
                    <input
                      type="text"
                      value={universityForm.campusSize}
                      onChange={(e) => setUniversityForm({ ...universityForm, campusSize: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 400 acres"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
                    <input
                      type="text"
                      value={universityForm.totalStudents}
                      onChange={(e) => setUniversityForm({ ...universityForm, totalStudents: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 50,000+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Count</label>
                    <input
                      type="text"
                      value={universityForm.facultyCount}
                      onChange={(e) => setUniversityForm({ ...universityForm, facultyCount: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 500+"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Courses Offered</label>
                  <textarea
                    value={universityForm.coursesOffered}
                    onChange={(e) => setUniversityForm({ ...universityForm, coursesOffered: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Undergraduate: BA, B.Com, BBA, B.Sc, B.Tech. Postgraduate: MA, M.Com, MBA, M.Sc, M.Tech. Doctoral: Ph.D programs in various disciplines..."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
                  <textarea
                    value={universityForm.specializations}
                    onChange={(e) => setUniversityForm({ ...universityForm, specializations: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Engineering, Management, Arts, Science, Commerce, Computer Applications, Education, Law, Medicine, Agriculture..."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
                  <textarea
                    value={universityForm.facilities}
                    onChange={(e) => setUniversityForm({ ...universityForm, facilities: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Modern classrooms, Well-equipped laboratories, Digital library, Sports complex, Auditorium, Cafeteria, Medical center, Wi-Fi campus..."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Process</label>
                  <textarea
                    value={universityForm.admissionProcess}
                    onChange={(e) => setUniversityForm({ ...universityForm, admissionProcess: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Online application, Document verification, Entrance examination, Merit-based selection, Counseling process, Final admission..."
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Structure</label>
                  <textarea
                    value={universityForm.feeStructure}
                    onChange={(e) => setUniversityForm({ ...universityForm, feeStructure: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Undergraduate: ₹15,000-25,000 per year. Postgraduate: ₹20,000-35,000 per year. Flexible payment options available..."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUniversityModal(false);
                  setEditingUniversity(null);
                  resetUniversityForm();
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={editingUniversity ? updateUniversity : createUniversity}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{editingUniversity ? 'Update' : 'Create'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-4 flex flex-col">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <button
                  onClick={() => {
                    setShowBlogModal(false);
                    setEditingBlog(null);
                    resetBlogForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-130px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const autoSlug = title ? title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '') : '';
                      setBlogForm({ ...blogForm, title, slug: autoSlug });
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., The Future of Online Education in India"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug * (Auto-generated)</label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                    placeholder="Auto-generated from title"
                    required
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-generated from title. Edit if needed.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Dr. Arif Wafy Varambatta"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="Education Trends">Education Trends</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Study Abroad">Study Abroad</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Skills Development">Skills Development</option>
                    <option value="University Rankings">University Rankings</option>
                    <option value="Regulations">Regulations</option>
                    <option value="Study Tips">Study Tips</option>
                    <option value="Industry Insights">Industry Insights</option>
                    <option value="Technology">Technology</option>
                    <option value="News">News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Read Time *</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 5 min read, 10 minutes read, or just 3"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: "5 min read" or just enter a number like "5" (will auto-format)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={blogForm.publishDate}
                    onChange={(e) => setBlogForm({ ...blogForm, publishDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt * (Brief Summary)</label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="A brief summary of the blog post that will appear in the blog listing and search results..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This will appear in blog listings and search results. Minimum 20 characters.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content * (Full Article)</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  rows={12}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Write your full blog post content here. You can use markdown formatting if needed..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The complete blog post content. Minimum 100 characters.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={blogForm.tags.join(', ')}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., online education, career tips, study abroad"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas. These help with search and categorization.</p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={blogForm.featured}
                    onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Featured Post
                  </label>
                  <p className="ml-2 text-xs text-gray-500">(Will appear prominently on blog page)</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Publish Immediately
                  </label>
                  <p className="ml-2 text-xs text-gray-500">(Checked by default - uncheck to save as draft)</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowBlogModal(false);
                  setEditingBlog(null);
                  resetBlogForm();
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={editingBlog ? updateBlog : createBlog}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{editingBlog ? 'Update' : 'Create'} Blog Post</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4 flex flex-col">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 z-10 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {editingGalleryImage ? 'Edit Gallery Image' : 'Upload New Image'}
                </h3>
                <button
                  onClick={() => {
                    setShowGalleryModal(false);
                    setEditingGalleryImage(null);
                    resetGalleryForm();
                    setSelectedFile(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-130px)]">
              {!editingGalleryImage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Image File *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    {selectedFile ? (
                      <div className="space-y-4">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Award className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-purple-600 hover:text-purple-800 font-medium">
                              Click to upload
                            </span>
                            <span className="text-gray-600"> or drag and drop</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (!file.type.startsWith('image/')) {
                                    alert('Please select an image file');
                                    return;
                                  }
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert('File size must be less than 5MB');
                                    return;
                                  }
                                  setSelectedFile(file);
                                  // Auto-generate title from filename if empty
                                  if (!galleryForm.title) {
                                    const filename = file.name.replace(/\.[^/.]+$/, '');
                                    const title = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                    setGalleryForm(prev => ({ ...prev, title, imageAlt: title }));
                                  }
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setGalleryForm({ ...galleryForm, title, imageAlt: title });
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Annual Graduation Ceremony 2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as GalleryImage['category'] })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="events">Events</option>
                    <option value="campus">Campus</option>
                    <option value="graduation">Graduation</option>
                    <option value="activities">Activities</option>
                    <option value="achievements">Achievements</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={galleryForm.eventDate}
                    onChange={(e) => setGalleryForm({ ...galleryForm, eventDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={galleryForm.location}
                    onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Main Auditorium, Campus Library"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe the photo and the event or moment captured..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 10 characters required.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={galleryForm.tags.join(', ')}
                  onChange={(e) => setGalleryForm({ ...galleryForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., graduation, ceremony, 2024, students, celebration"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={galleryForm.featured}
                    onChange={(e) => setGalleryForm({ ...galleryForm, featured: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured Image</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={galleryForm.published}
                    onChange={(e) => setGalleryForm({ ...galleryForm, published: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Publish Immediately</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowGalleryModal(false);
                  setEditingGalleryImage(null);
                  resetGalleryForm();
                  setSelectedFile(null);
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={editingGalleryImage ? updateGalleryImage : createGalleryImage}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{editingGalleryImage ? 'Update' : 'Upload'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen flex admin-dashboard-theme bg-[#030712] selection:bg-blue-500/30">
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --dashboard-bg: #030712;
            --dashboard-card: #050B14;
            --dashboard-border: rgba(255, 255, 255, 0.05);
            --dashboard-text: #f1f5f9;
            --dashboard-text-muted: #94a3b8;
            --dashboard-accent: #3b82f6;
          }
          
          .admin-dashboard-theme {
            background-color: var(--dashboard-bg) !important;
            color: var(--dashboard-text) !important;
          }
          
          .admin-dashboard-theme .bg-white {
            background-color: var(--dashboard-card) !important;
            border-color: var(--dashboard-border) !important;
            color: var(--dashboard-text) !important;
            backdrop-filter: blur(12px);
          }
          
          .admin-dashboard-theme .bg-gray-50, 
          .admin-dashboard-theme .bg-gray-100 {
            background-color: var(--dashboard-bg) !important;
            border-color: var(--dashboard-border) !important;
            color: var(--dashboard-text) !important;
          }
          
          .admin-dashboard-theme .text-gray-900, 
          .admin-dashboard-theme .text-gray-800 {
            color: #f8fafc !important;
          }
          
          .admin-dashboard-theme .text-gray-700, 
          .admin-dashboard-theme .text-gray-600 {
            color: var(--dashboard-text-muted) !important;
          }
          
          .admin-dashboard-theme .border-gray-200, 
          .admin-dashboard-theme .border-gray-300, 
          .admin-dashboard-theme .border-b {
            border-color: var(--dashboard-border) !important;
          }
          
          .admin-dashboard-theme .hover\\:bg-gray-50:hover, 
          .admin-dashboard-theme .hover\\:bg-gray-100:hover {
            background-color: rgba(255, 255, 255, 0.03) !important;
          }
          
          .admin-dashboard-theme input, 
          .admin-dashboard-theme select, 
          .admin-dashboard-theme textarea {
            background-color: rgba(0, 0, 0, 0.2) !important;
            color: #f8fafc !important;
            border-color: var(--dashboard-border) !important;
            border-radius: 0.75rem !important;
          }
          
          .admin-dashboard-theme input:focus, 
          .admin-dashboard-theme select:focus, 
          .admin-dashboard-theme textarea:focus {
            background-color: rgba(255, 255, 255, 0.05) !important;
            border-color: var(--dashboard-accent) !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
          }

          .admin-dashboard-theme .divide-gray-200 > * + * {
            border-color: var(--dashboard-border) !important;
          }

          .admin-dashboard-theme .bg-blue-600 {
            background-color: #2563eb !important;
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
          }
          
          .admin-dashboard-theme .bg-blue-100 {
            background-color: rgba(37, 99, 235, 0.1) !important;
            color: #60a5fa !important;
          }

          .glass-panel {
            background: rgba(255, 255, 255, 0.02) !important;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
        `}} />
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-64 flex-shrink-0 bg-[#050B14]/80 backdrop-blur-xl shadow-2xl border-r border-white/5 flex flex-col h-screen lg:h-auto lg:min-h-screen`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/5 bg-gradient-to-br from-blue-900/40 to-indigo-900/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/[0.05] border border-white/[0.1] rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100 tracking-tight leading-none">Admin</h2>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">EDBELL</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Session Active</p>
                <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</h3>
            </div>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] border border-blue-500/50'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100 border border-transparent'
                  }`}
              >
                <div className={`flex-shrink-0 transition-colors ${activeSection === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'
                  }`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-sm tracking-tight ${activeSection === item.id ? 'text-white' : 'text-slate-200'
                    }`}>
                    {item.name}
                  </div>
                  <div className={`text-[10px] ${activeSection === item.id ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>

        </div>

        {/* Main Content Area - Add left margin to account for fixed sidebar */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header - Fixed at top */}
          <div className="bg-[#050B14]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                      {navigationItems.find(item => item.id === activeSection)?.name || 'Dashboard'}
                    </h1>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-0.5">
                      {navigationItems.find(item => item.id === activeSection)?.description || 'Welcome back'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-tighter hidden sm:block">
                    Status: <span className="text-green-500">Online</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-slate-400 hover:text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-all duration-300"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden md:inline font-bold text-sm tracking-tight">Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            {activeSection === 'contacts' && renderContactsSection()}
            {activeSection === 'applications' && renderApplicationsSection()}
            {activeSection === 'subscribers' && renderSubscribersSection()}
            {activeSection === 'hero-images' && renderHeroImagesSection()}
            {activeSection === 'services' && renderServicesSection()}
            {activeSection === 'gallery' && renderGallerySection()}
            {activeSection === 'courses' && renderAddCourseSection()}
            {activeSection === 'universities' && renderAddUniversitySection()}
            {activeSection === 'seo' && renderSEOSection()}
            {activeSection === 'analytics' && renderAnalyticsSection()}
            {activeSection === 'settings' && renderSettingsSection()}
          </div>
        </div>
      </div>
      
      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-3xl w-full max-w-2xl my-4 shadow-2xl border border-gray-100 flex flex-col">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {editingService ? 'Update Service Nodes' : 'Deploy New Service Node'}
                </h3>
                <p className="text-gray-500 text-sm mt-1">Configure service parameters for public accessibility</p>
              </div>
              <button 
                onClick={() => setShowServiceModal(false)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Service Title</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                    placeholder="e.g. Admission Support"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Icon Logic</label>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900"
                  >
                    <option value="Cpu">Cpu (Tech)</option>
                    <option value="GraduationCap">GraduationCap (Academic)</option>
                    <option value="Globe">Globe (International)</option>
                    <option value="Plane">Plane (Travel)</option>
                    <option value="Award">Award (Certificates)</option>
                    <option value="Briefcase">Briefcase (Career)</option>
                    <option value="UserCheck">UserCheck (Support)</option>
                    <option value="Sparkles">Sparkles (Special)</option>
                    <option value="Zap">Zap (Scholarship)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Gradient Style</label>
                  <select
                    value={serviceForm.gradient}
                    onChange={(e) => setServiceForm({...serviceForm, gradient: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900"
                  >
                    <option value="from-blue-600 to-indigo-600">Deep Blue</option>
                    <option value="from-indigo-600 to-violet-600">Indigo Violet</option>
                    <option value="from-violet-600 to-purple-600">Royal Purple</option>
                    <option value="from-purple-600 to-fuchsia-600">Fuchsia Pulse</option>
                    <option value="from-blue-500 to-cyan-500">Ocean Cyan</option>
                    <option value="from-emerald-500 to-teal-500">Emerald Teal</option>
                    <option value="from-orange-500 to-red-500">Sunset Orange</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Service Description</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  rows={3}
                  placeholder="Detailed explanation of the service protocol..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900"
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Interactive Features (Click to Detail)</label>
                {serviceForm.features.map((feature, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <input
                      type="text"
                      value={feature.name}
                      onChange={(e) => {
                        const newFeatures = [...serviceForm.features];
                        newFeatures[idx].name = e.target.value;
                        setServiceForm({...serviceForm, features: newFeatures});
                      }}
                      placeholder={`Feature ${idx + 1} Name`}
                      className="px-4 py-2 bg-white border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm font-bold"
                    />
                    <input
                      type="text"
                      value={feature.details}
                      onChange={(e) => {
                        const newFeatures = [...serviceForm.features];
                        newFeatures[idx].details = e.target.value;
                        setServiceForm({...serviceForm, features: newFeatures});
                      }}
                      placeholder={`Detail explanation for feature ${idx + 1}`}
                      className="px-4 py-2 bg-white border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-xs text-gray-600"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Display Order</label>
                  <input
                    type="number"
                    value={serviceForm.order}
                    onChange={(e) => setServiceForm({...serviceForm, order: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Success Metric (%)</label>
                  <input
                    type="text"
                    value={serviceForm.stats.success}
                    onChange={(e) => setServiceForm({...serviceForm, stats: {...serviceForm.stats, success: e.target.value}})}
                    placeholder="e.g. 98%"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
              <button
                onClick={() => setShowServiceModal(false)}
                className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
              >
                Abort
              </button>
              <button
                onClick={editingService ? updateService : createService}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>{editingService ? 'Commit Changes' : 'Execute Creation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
