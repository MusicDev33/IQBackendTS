import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnswer extends Document {
  answerText: string;
  poster: string;
  posterID: string;
  posterHandle: string;
  questionURL: string;
  questionID: string;
  questionText: string;
  time: string;
  type: string;
  views: number;
  votes: number;
  comments: any[];
}

const AnswerSchema: Schema = new Schema({
  answerText: {type: String, required: true},
  poster: {type: String, required: true},
  posterID: {type: String, required: true},
  posterHandle: {type: String, required: true},
  views: {type: Number},
  questionURL: {type: String, required: true},
  questionID: {type: String, required: true},
  questionText: {type: String, required: true},
  time: {type: String, required: true},
  type: {type: String, required: true, default: 'answer'},
  votes: {type: Number, required: true},
  comments: {type: Array},
}, {
  minimize: false
});

export const Answer: Model<IAnswer> = mongoose.model<IAnswer>('Answer', AnswerSchema);
