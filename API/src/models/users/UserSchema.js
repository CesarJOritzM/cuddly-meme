import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  lastName: String,
  date: Date,
  gender: String,
  height: Number,
  colombian: Boolean,
});

const User = model('User', userSchema);

export default User;
