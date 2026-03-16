const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually read .env.local since dotenv is not in package.json
let MONGODB_URI = '';
try {
  const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
  const match = envContent.match(/MONGODB_URI=(.+)/);
  if (match) {
    MONGODB_URI = match[1].trim();
  }
} catch (err) {
  console.error('Error reading .env.local:', err.message);
}

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  accreditation: { type: String, required: true },
  established: { type: String, required: true },
  location: { type: String },
  website: { type: String },
  ranking: String,
  studentsCount: String,
  coursesOffered: Number
}, { timestamps: true });

const University = mongoose.models.University || mongoose.model('University', UniversitySchema);

const universities = [
  {
    name: 'LPU (Placement & Industry Hub)',
    description: 'Modern infrastructure and industry partnerships with comprehensive programs across engineering, management, and liberal arts. A hub for placement and industry connections.',
    accreditation: 'NAAC A++',
    established: '2005',
    location: 'Punjab, India',
    website: 'https://www.lpu.in',
    url: '/universities/lpu-placement',
    ranking: '#2 Private University',
    studentsCount: '30K+',
    coursesOffered: 200,
  },
  {
    name: 'Amity University (Online Excellence)',
    description: 'Technology-enabled learning with comprehensive online programs and industry-relevant curriculum. Renowned for online excellence.',
    accreditation: 'NAAC A+',
    established: '2005',
    location: 'Noida, India',
    website: 'https://www.amity.edu',
    url: '/universities/amity-university-online',
    ranking: '#3 Online Education',
    studentsCount: '25K+',
    coursesOffered: 150,
  },
  {
    name: 'Delhi University (Academic Heritage)',
    description: 'Premier institution with 100+ years of excellence in higher education and research. Academic heritage you can trust.',
    accreditation: 'NAAC A++',
    established: '1922',
    location: 'Delhi, India',
    website: 'https://www.du.ac.in',
    url: '/universities/delhi-university-heritage',
    ranking: '#1 Central University',
    studentsCount: '130K+',
    coursesOffered: 300,
  },
  {
    name: 'Manipal (Research & Innovation)',
    description: 'Comprehensive university with strong focus on research, innovation, and global education standards.',
    accreditation: 'NAAC A++',
    established: '1953',
    location: 'Karnataka, India',
    website: 'https://www.manipal.edu',
    url: '/universities/manipal-research',
    ranking: '#4 Private University',
    studentsCount: '35K+',
    coursesOffered: 250,
  },
  {
    name: 'Symbiosis (Management Specialists)',
    description: 'Specialized university known for excellence in management, law, and liberal arts education. Management specialists.',
    accreditation: 'NAAC A+',
    established: '1971',
    location: 'Pune, India',
    website: 'https://www.siu.edu.in',
    url: '/universities/symbiosis-management',
    ranking: '#5 Private University',
    studentsCount: '20K+',
    coursesOffered: 180,
  },
  {
    name: 'Excellence Institute (Future-Ready Tech)',
    description: 'A research-driven educational node focused on future technologies and management excellence.',
    accreditation: 'NAAC A++',
    established: '2000',
    location: 'Knowledge City, India',
    website: 'https://www.excellence.edu',
    url: '/universities/excellence-institute-tech',
    ranking: '#1 Research Institute',
    studentsCount: '5K+',
    coursesOffered: 45,
  }
];

async function seed() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env.local');
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    for (const uni of universities) {
      await University.findOneAndUpdate({ url: uni.url }, uni, { upsert: true, new: true, runValidators: true });
      console.log('Upserted:', uni.name);
    }
    
    console.log('Seeding process finished.');
  } catch (err) {
    console.error('Error during seeding:', err.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(0);
  }
}

seed();
