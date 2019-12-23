import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeedback extends Document {
  userHandle: string;
  userName: string;
  feedback: string;
  type: string;
}

const FeedbackSchema: Schema = new Schema({
  userHandle: {type: String, required: true},
  userName: {type: String, required: true},
  feedback: {type: String, required: true},
  type: {type: String, required: true, default: 'feedback'}
}, {
  minimize: false
});

export const Feedback: Model<IFeedback> = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
