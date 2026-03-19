import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Undergraduate', 'Postgraduate', 'Specialized']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  fees: {
    type: String,
    trim: true
  },
  eligibility: {
    type: String,
    trim: true
  },
  // Enhanced course details
  curriculum: {
    type: String,
    trim: true
  },
  careerOpportunities: {
    type: String,
    trim: true
  },
  admissionProcess: {
    type: String,
    trim: true
  },
  examPattern: {
    type: String,
    trim: true
  },
  studyMaterials: {
    type: String,
    trim: true
  },
  facultySupport: {
    type: String,
    trim: true
  },
  placementAssistance: {
    type: String,
    trim: true
  },
  certificationDetails: {
    type: String,
    trim: true
  },
  prerequisites: {
    type: String,
    trim: true
  },
  learningOutcomes: {
    type: String,
    trim: true
  },
  offeredByUniversities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University'
  }]
}, {
  timestamps: true
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);