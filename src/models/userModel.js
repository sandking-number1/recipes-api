import mongoose from 'mongoose';
const { Schema } = mongoose;

const userModel = new Schema({
  googleId: {
    type: String
  }
});

const user = mongoose.model('users', userModel);

export default user;
