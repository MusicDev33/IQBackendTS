import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobApplication extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  skillsDesc: string;
  type: string;
  jobType: string;
  job: string;
}

const JobApplicationSchema: Schema = new Schema({
  fullName: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  skillsDesc: {type: String},
  type: {type: String, required: true, default: 'jobapp'},
  jobType: {type: String, required: true},
  job: {type: String, required: true}
}, {
  minimize: false
});

export const JobApplication: Model<IJobApplication> = mongoose.model<IJobApplication>('JobApp', JobApplicationSchema);
