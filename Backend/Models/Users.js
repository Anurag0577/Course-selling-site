const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    purchasedCourses:[{type: mongoose.Schema.Types.ObjectId , ref: 'users'}]
})

let user = mongoose.model('users', userSchema);

module.exports = user;