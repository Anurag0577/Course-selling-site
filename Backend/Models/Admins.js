const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

let admin = mongoose.model('admins', adminSchema);

module.exports = admin;