import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
}

const UserSchema: Schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
