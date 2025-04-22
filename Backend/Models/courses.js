const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    purchasedBy: {type: Schema.Types.ObjectId} , ref: 'users', require: true ,
    title: String,
    description: String,
    price: Number,
    image_link: String,
    published: {type: Boolean, default: false}
})

let course = mongoose.model('course', adminSchema);

module.exports = course;