import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestion extends Document {
  questionText: string;
  urlText: string;
  asker: string;
  askerID: string;
  askerHandle: string;
  subject: string;
  details: string;
  time: string;
  type: string;
  views: number;
  votes: number;
  answerNum: number;
  tags: string[];
  homeworkSource: string[];
  previewAnswer: any;
}

const QuestionSchema: Schema = new Schema({
  questionText: {type: String, required: true, unique: true},
  urlText: {type: String, required: true},
  asker: {type: String, required: true},
  askerID: {type: String, required: true},
  askerHandle: {type: String, required: true},
  subject: {type: String},
  details: {type: String},
  time: {type: String},
  type: {type: String, required: true, default: 'question'},
  views: {type: Number, required: true, default: 0},
  votes: {type: Number, required: true, default: 0},
  answerNum: {type: Number, required: true, default: 0},
  tags: {type: Array, default: []},
  homeworkSource: {type: [String], default: []},
  previewAnswer: {type: Object}
}, {
  minimize: false
});

export const Question: Model<IQuestion> = mongoose.model<IQuestion>('Question', QuestionSchema);
