import mongoose from "mongoose";
// import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const chat = mongoose.Schema({
  message: String,
  sender: String,
  receiver: [],
  time: Date
});

// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, 'user');
// we need to turn it into a model
const chatDB = mongoose.model("chat", chat);

export default chatDB;
