import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISource extends Document {
  name: string;
  author: string;
  isbn: string;
  posterID: string;
  sourceURL: string;
  type: string;
  followers: number;
  questions: number;
  edition: number;
  tags: string[];
}

const SourceSchema: Schema = new Schema({
  name: {type: String, required: true},
  author: {type: String},
  isbn: {type: String},
  posterID: {type: String, required: true},
  sourceURL: {type: String, required: true, unique: true},
  type: {type: String, required: true, default: 'source'},
  followers: {type: Number, default: 0},
  questions: {type: Number, default: 0},
  edition: {type: Number},
  tags: {type: Array, default: []},
}, {
  minimize: false
});

export const Source: Model<ISource> = mongoose.model<ISource>('Source', SourceSchema);
