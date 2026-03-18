import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
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

const ServiceSchema: Schema = new Schema({
  serviceId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Cpu' },
  gradient: { type: String, default: 'from-blue-600 to-indigo-600' },
  features: [{
    name: { type: String, required: true },
    details: { type: String, required: true }
  }],
  stats: {
    success: { type: String, default: '95%' },
    speed: { type: String, default: 'Optimized' }
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
