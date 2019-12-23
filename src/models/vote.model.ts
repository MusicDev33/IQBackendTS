import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVote extends Document {
  userid: string;
  answerid: string;
  questionid: string;
  type: string;
  vote: number;
}

const VoteSchema: Schema = new Schema({
  userid: {type: String, required: true},
  answerid: {type: String, required: true},
  questionid: {type: String, required: true},
  type: {type: String, required: true, default: 'vote'},
  vote: {type: Number, required: true}
}, {
  minimize: false
});

export const Vote: Model<IVote> = mongoose.model<IVote>('Vote', VoteSchema);
