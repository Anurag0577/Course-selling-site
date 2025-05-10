const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'courses'}]
})

let admin = mongoose.model('admins', adminSchema);

module.exports = admin;