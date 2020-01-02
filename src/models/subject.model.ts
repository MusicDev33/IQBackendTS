import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  posterID: string;
  subjectURL: string;
  type: string;
  followers: number;
  questions: number;
  views: number;
}

const SubjectSchema: Schema = new Schema({
  name: {type: String, required: true, unique: true},
  posterID: {type: String},
  subjectURL: {type: String, required: true, unique: true},
  type: {type: String, required: true, default: 'subject'},
  followers: {type: Number},
  questions: {type: Number},
  views: {type: Number}
}, {
  minimize: false
});

export const Subject: Model<ISubject> = mongoose.model<ISubject>('Subject', SubjectSchema);
