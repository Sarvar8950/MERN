import mongoose from "mongoose";
// import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const item = mongoose.Schema({
  title: String,
  description: String,
  email: String,
  time: Date,
  page: Number,
  limit: Number,
});

// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, 'user');
// we need to turn it into a model
const itemDB = mongoose.model("item", item);

export default itemDB;
