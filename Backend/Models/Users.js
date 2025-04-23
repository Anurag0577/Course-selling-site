const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    purchasedCourses:[{type: Schema.Types.ObjectId , ref: 'users'}]
})

let user = mongoose.model('users', adminSchema);

module.exports = user;