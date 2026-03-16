import mongoose from 'mongoose';

const CourseApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  courseId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['apply', 'enquiry'],
    default: 'apply',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'admitted', 'rejected'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

export default mongoose.models.CourseApplication || mongoose.model('CourseApplication', CourseApplicationSchema);
