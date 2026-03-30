import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'University name is required'],
    unique: true,
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
  accreditation: {
    type: String,
    required: [true, 'Accreditation is required'],
    trim: true
  },
  established: {
    type: String,
    required: [true, 'Established year is required'],
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.University || mongoose.model('University', UniversitySchema);