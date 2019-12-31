import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVote extends Document {
  userID: string;
  answerID: string;
  questionID: string;
  type: string;
  vote: number;
}

const VoteSchema: Schema = new Schema({
  userID: {type: String, required: true},
  answerID: {type: String, required: true},
  questionID: {type: String, required: true},
  type: {type: String, required: true, default: 'vote'},
  vote: {type: Number, required: true}
}, {
  minimize: false
});

export const Vote: Model<IVote> = mongoose.model<IVote>('Vote', VoteSchema);
