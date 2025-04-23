const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const admin = require('./Models/Admins');
require('./Models/Admins')
require('./Models/Users')

const app = express(); // Create an instance of express.
const PORT = 3000;

app.use(express.json()); // this tell we are going to use json in the server.

mongoose.connect('mongodb+srv://anurag0577:anurag0577@cluster0.afdw2.mongodb.net/course-selling-db?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Database Connected!')
})

function generateToken(credentials){
    let payload = credentials;
    let SECRET = 'aNuRaG'
    let token = jwt.sign(payload, SECRET, {expiresIn: '24h'})
    return token;
}

// ADMIN ROUTES
/*
POST /admin/signup Description: Creates a new admin account. Input: { username: 'admin', password: 'pass' } Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
POST /admin/login Description: Authenticates an admin. It requires the admin to send username and password in the headers. Input: Headers: { 'username': 'admin', 'password': 'pass' } Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
POST /admin/courses Description: Creates a new course. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true } Output: { message: 'Course created successfully', courseId: 1 }
PUT /admin/courses/:courseId Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false } Output: { message: 'Course updated successfully' }
GET /admin/courses Description: Returns all the courses. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] } User Routes:
*/

app.post('/admin/signup', (req, res) => {
    try{
        let {username, email, password} = req.body;
        let existingUser = admin.findOne({username});
        if(existingUser){
            return res.status(400).json({ message: 'Admin already exists' });
        }
        let newAdmin = new admin({username, email, password});    
        newAdmin.save()

    .then(() => {
        console.log("Admin created successfully!");
        let token = generateToken({username, role: 'admin'});
        res.status(201).json({message: 'Admin login successfully', Token: token})
    })
    } catch(err){
        console.log({error: err, message: 'Signup failed!'})
    }
    
})

app.post('/admin/login', (req, res) => {
    try{
        let {username, password} = req.body;
        let existingUser = admin.findOne({username, password})
        .then(() => {
            console.log('Admin login successfully!')
            let token = generateToken({username, role: 'admin'})
            res.status(201).json({message: 'Admin login successfull', Token: token})
        })
        if(!existingUser){
            res.status(400).json({message: 'Admin does not exist, please signup.'});
        }
    } catch(err){
        console.log({message: 'Login issue!', Error: err})
    }
})

app.post('/admin/courses', authenticateUser,(req,  res) => {
    let {title, description, price, image_link} = req.body;
    let newCourse = new course({title, description, price, image_link});
    newCourse.save()
    .then(() => {
        console.log('New course created successfully!');
        req.status(201).json({message: 'Course created successfully!'})
    })
})

app.put('/admin/courses/:courseId', authenticateUser, (req, res) => {
    let courseId = req.params.courseId;
    let updatedCourse = req.body;
    let courseContent = course.findOneAndUpdate(courseId, updatedCourse, {new : true})
    if(!courseContent){
        res.status(400).json({message: "Updation failed!"})
    }
    res.status(201).json({message: "course updated successfully!"})
})

app.get('/admin/courses', authenticateUser, (req, res) => {
    let allCourses = course.find({})
    res.status(201).json({allCourses})
})

app.listen(PORT, () => {
    console.log('Server Started!')
})