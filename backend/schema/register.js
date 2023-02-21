import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const userSchema = mongoose.Schema({
    password: String,
    firstName: String,
    lastName: String,
    securityQuestion: String,
    securityAnswer: String,
    email: String
});

// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, 'user');
// we need to turn it into a model
const postUser = mongoose.model('user', userSchema);

export default postUser; 








//const mongoose = require('mongoose')

// const register = new mongoose.Schema({
//     firstname : {
//         type : String,
//         required : true
//     },
//     lastname : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : String,
//         required : true
//     },
//     password : {
//         type : String,
//         required : true
//     }
// })

// module.exports = mongoose.model("register" , register)