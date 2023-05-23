import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  phone: String,
  role: { type: String, required: true, default: 'user', enum: ['user', 'admin', 'premium'] },
  token: String,
  documents: [{
    name: String,
    reference: String
  }],
  tokenDate: Date,
  last_connection: Date
})

export const userModel = model(userCollection, userSchema)
