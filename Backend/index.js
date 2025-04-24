const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const admin = require('./Models/Admins');
const course = require('./Models/Courses');
const user = require('./Models/Users');

const app = express();
const PORT = 3000;
const SECRET = 'aNuRaG';

app.use(express.json());

mongoose.connect('mongodb+srv://anurag0577:anurag0577@cluster0.afdw2.mongodb.net/course-selling-db?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Database Connected!');
})

function authenticateUser(req, res, next){
    let token = req.headers.Authorization.split(' ')[0];
    let user = jwt.verify(token, SECRET );
    req.user = user;
    req.role = user.role;
    next();
}

function generateToken(credentials, role){
    let payload = credentials;
    
    let token = jwt.sign(payload, SECRET, {expiresIn: '24h'})
    return token;
}

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

app.post('/users/signup', (req, res) => {
    let {username, email, password} = req.body;
    let isUserExist = user.findOne({username});
    if(isUserExist){
        res.status(400).json("User already existed, please Login!");
    }
    let newUser = new user({username, email, password})
    let saveUser = newUser.save()
    .then(() => {
        generateToken({username, role: 'user'})
        res.status(201).json({message: "New user created successfully!", saveUser})
    })
    .catch((err) => {
        console.log("Error: ", err )
    })
})


app.post('/user/login', (req, res) => {
    let {username, password} = req.body;
    let isUserExist = user.findOne({username, password});
    if(!isUserExist){
        res.status(400).json('Account does not exist, please create new one.')
    }
    res.status(200).json("Login successfull!")
})

app.get('/user/courses', authenticateUser, (req, res) => {
    let allCourses = course.find({})
    .then(() => console.log('Course fetched successfully!'))
    res.status(200).json(allCourses);
})

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
    let _id = req.params.courseId;
    let course = course.findOne({_id});
    let currentUser = req.user;
    currentUser.purchasedCourses.push(_id)
    currentUser.save()
    .then(() => {
        res.status(200).json("Course purchased successfully!");
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {

    let currentUser = user.findOne(req.user.username);
    res.status(201).json("purchasedCourse: " , currentUser.purchasedCourses)

})

app.listen(PORT, () => {
    console.log('Server Started!');
})