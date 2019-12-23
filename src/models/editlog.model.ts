import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEditLog extends Document {
  contentID: string;
  userID: string;
  userHandle: string;
  userName: string;
  type: string;
  editType: string;
  paidContent: boolean;
}

const EditLogSchema: Schema = new Schema({
  contentID: {type: String, required: true},
  userID: {type: String, required: true},
  userHandle: {type: String, required: true},
  userName: {type: String, required: true},
  type: {type: String, required: true, default: 'editlog'},
  editType: {type: String, required: true},
  paidContent: {type: Boolean, required: true}
}, {
  minimize: false
});

export const EditLog: Model<IEditLog> = mongoose.model<IEditLog>('Editlog', EditLogSchema);
