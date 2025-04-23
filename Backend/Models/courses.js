const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image_link: String,
    published: {type: Boolean, default: false}
})

let course = mongoose.model('course', adminSchema);

module.exports = course;