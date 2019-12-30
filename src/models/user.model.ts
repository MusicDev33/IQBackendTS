import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  bio: string;
  email: string;
  handle: string;
  phoneNumber: string;
  password: string;
  type: string;
  googleID: string;
  customization: any;
  knowledge: any;
  credentials: any;
  profileHits: number;
  paidProgram: boolean;
  fbTokens: Array<string>;
  currentSources: Array<any>;
  currentSubjects: Array<any>;
}

const UserSchema: Schema = new Schema({
  name: {type: String, required: true},
  bio: {type: String},
  email: {type: String, required: true, unique: true},
  handle: {type: String, required: true, unique: true},
  phoneNumber: {type: String},
  password: {type: String},
  type: {type: String, default: 'user'},
  customization: {type: Object},
  currentSources: {type: Array},
  currentSubjects: {type: Array},
  profileHits: {type: Number},
  knowledge: {type: Object},
  googleID: {type: String, default: ''},
  paidProgram: {type: Boolean, default: false},
  credentials: {type: Object},
  fbTokens: {type: Array}
}, {
  minimize: false
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
