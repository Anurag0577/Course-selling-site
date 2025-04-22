const express = require('express');
const mongoose = require('mongoose');
require('./Models/Admins')
require('./Models/Users')

const app = express(); // Create an instance of express.
const PORT = 3000;

app.use(express.json()); // this tell we are going to use json in the server.

mongoose.connect('mongodb+srv://anurag0577:anurag0577@cluster0.afdw2.mongodb.net/course-selling-db?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Database Connected!')
})

// ADMIN ROUTES
/*
POST /admin/signup Description: Creates a new admin account. Input: { username: 'admin', password: 'pass' } Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
POST /admin/login Description: Authenticates an admin. It requires the admin to send username and password in the headers. Input: Headers: { 'username': 'admin', 'password': 'pass' } Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
POST /admin/courses Description: Creates a new course. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } Output: { message: 'Course created successfully', courseId: 1 }
PUT /admin/courses/:courseId Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false } Output: { message: 'Course updated successfully' }
GET /admin/courses Description: Returns all the courses. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } User Routes:
*/

app.post('/admin/signup', (req, res) => {
    let [username, password] = req.body;
    let newUser = new 
})


app.listen(PORT, () => {
    console.log('Server Started!')
})