const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

let user = mongoose.model('users', adminSchema);

module.exports = user;