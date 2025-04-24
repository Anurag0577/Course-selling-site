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
    let token = req.headers.Authorization.split(' ')[1];
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


// PROPER WAY TO WRITE
app.post('/admin/signup', (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if admin already exists
    admin.findOne({ username })
        .then(existingAdmin => {
            if (existingAdmin) {
                res.status(400).json({ message: 'Admin already exists, please login.' });
            } else {
                // Create new admin
                const newAdmin = new admin({ username, email, password });
                return newAdmin.save();
            }
        })
        .then(savedAdmin => {
            if (savedAdmin) {
                const token = generateToken({ username, role: 'admin' });
                res.status(201).json({ 
                    message: 'Admin created successfully', 
                    token 
                });
            }
        })
        .catch(err => {
            console.error('Signup error:', err);
            res.status(500).json({ 
                message: 'Signup failed!',
                error: err.message 
            });
        });
});

/*
    BAD CODE
app.post('/admin/signup', (req, res) => {
    try{
        let {username, email, password} = req.body;
        let existingUser = admin.findOne({username})
        .then(() => {
            if(existingUser){
                return res.status(400).json({ message: 'Admin already exists, please login.' });
            }
        })
        let newAdmin = new admin({username, email, password});    
        newAdmin.save()
    .then(() => {
        console.log("Admin created successfully!");
        let token = generateToken({username, role: 'admin'});
        res.status(201).json({message: 'Admin login successfully', Token: token})
    })
    .catch(() => console.log('Admin does not save in the backed!'))
    } catch(err){
        console.log({error: err, message: 'Signup failed!'})
    }
    
})
*/


app.post('/admin/login', (req, res) => {

    // IMPORATNT : Either use promise with catch or try/catch with async/await

        let {username, password} = req.body;
        admin.findOne({username, password})
        .then( existingAdmin => {
            if(!existingAdmin){
                res.status(400).json({message: "Invalid username or passsword!"})
            }else{
                let token = generateToken({username, role: 'admin'})
                res.status(200).json({message: 'Admin login successfull', token})
            }
        })
    .catch((err) => res.status(500).json({message: "Login failed!" , error: err.message}));
})


app.post('/admin/courses', authenticateUser,(req,  res) => {
    if(req.role !== 'admin'){
        res.status(403).json({message: 'Unauthorized: Admin access required'})
    }
    let {title, description, price, image_link} = req.body;

    // validate required fields
    if (!title || !description || !price) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    let newCourse = new course({title, description, price, image_link});
    newCourse.save()
    .then(savedCourses => {
        res.status(201).json({message: 'Course created successfully!', course: savedCourses})
    })
    .catch(error => res.status(500).json({message: "Information not saved!" , Error: err}))
})

app.put('/admin/courses/:courseId', authenticateUser, (req, res) => {
    if(req.role !== 'admin'){
        res.status(403).json({message: 'Unauthorized: Admin access required'})
    }
    let courseId = req.params.courseId;
    let updatedCourse = req.body;
    course.findOneAndUpdate({_id: courseId}, updatedCourse, {new : true})
    .then(updatedCourse => {
        if (!updatedCourse) {
            return res.status(404).json({message: "Course not found"});
        }

        res.status(200).json({message: "Course updated successfully!", updatedCourse})
    })
    .catch(error => {
        res.status(500).json({message: "Course not updated in the backend", error: err.message})
    })
})

app.get('/admin/courses', authenticateUser, (req, res) => {
    if(req.role !== 'admin'){
        return res.status(403).json({message: 'Unauthorized: Admin access required'});
    }
    course.find({})
    .then(courses => {
        res.status(200).json(courses)
    })
    .catch(err => res.status(500).json({message: 'Find request failed!', eerror: err.message}))
})


app.post('/users/signup', (req, res) => {
    let {username, email, password} = req.body;
    user.findOne({username})
    .then(isFound => {
        if(isFound){
            res.status(400).json({message: "User already existed, please login!"})
        } else {
            let newUser = new user({username, email, password})
            newUser.save()
        }
    })
    .then(data => {
        if(data){
            let token = generateToken({username: data.username, role:'user'})
            res.status(201).json({message: 'Signup successfull', token});
        }
    })
    .catch((err) => res.status(500).json({message: "Signup failed!", Error: err.message}) )
})


app.post('/user/login', (req, res) => {
    let {username, password} = req.body;
    user.findOne({username, password})
    .then(isExist => {
        if(!isExist){
            res.status(400).json({message: 'Invalid username or password!'})
        }
        let token = generateToken({username, role: 'user'})
        res.status(200).json({message: "Login successfull", token})
    })
    .catch(err => {
        res.status(500).json({message: 'Login failed', Error: err.message})
    })
})

app.get('/user/courses', authenticateUser, (req, res) => {
    course.find({})
    .then(courses => {
        res.status(200).json(courses)
    })
    .catch(err => res.status(500).json({message: 'Find request failed!', eerror: err.message}))
})

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
    let id = req.params.courseId;
    course.findById({id})
    .then(isFound => {
        if(!isFound){
            res.status(400).json({message: 'Course does not exist'})
        } else {
            user.findOne({username: req.user.username})
            .then( currentUser => {
                if(!currentUser) {
                    return res.status(404).json({message: 'User not found'});
                }
                currentUser.purchasedCourses.push(_id)
                currentUser.save()
            })

        }
    })
    .then(data => {
        res.status(200).json({message: "Course purchased successfully!"});
    })
    .catch((err) => {
        res.status(500).json({message: "Purchase failed", Error: err.message})
    })
})

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {

    user.findOne({username: req.user.username})
    .then(currentUser => {
        if(!currentUser){
            res.status(200).json('Does not have any purchased course!')
        }
        res.status(201).json({message: "Purchased courses retrieved successfully",
 purchasedCourses:  currentUser.purchasedCourses})
    })
    .catch(err => {
        res.status(500).json({message: 'Request failed!', Error: err.message})
    })
})

app.listen(PORT, () => {
    console.log('Server Started!');
})