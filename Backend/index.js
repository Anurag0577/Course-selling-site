const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const admin = require('./Models/Admins');
const course = require('./Models/Courses');
const user = require('./Models/Users');
const cors = require('cors')

const app = express();
const PORT = 3000;
const SECRET = 'aNuRaG';

app.use(express.json());
app.use(cors())

mongoose.connect('mongodb+srv://anurag0577:anurag0577@cluster0.afdw2.mongodb.net/course-selling-db?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Database Connected!');
})

function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
  
    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!tokenMatch) {
      return res.status(401).json({ error: 'Invalid Authorization header format' });
    }
    const token = tokenMatch[1];
  
    try {
      const user = jwt.verify(token, SECRET);
      if (!user || !user.role) {
        return res.status(401).json({ error: 'Invalid token payload' });
      }
  
      req.user = user;
      req.role = user.role;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      }
      return res.status(401).json({ error: 'Authentication failed' });
    }
}

function generateToken(credentials, role){
    let payload = credentials;
    
    let token = jwt.sign(payload, SECRET, {expiresIn: '24h'})
    return token;
}

app.post('/admin/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: 'All fields are required: username, email, and password' 
        });
    }
    
    admin.findOne({ username })
        .then(existingAdmin => {
            if (existingAdmin) {
                res.status(400).json({ message: 'Admin already exists, please login.' });
            } else {
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

app.post('/admin/login', (req, res) => {
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
        return res.status(403).json({message: 'Unauthorized: Admin access required'});
    }
    
    let {title, description, price, image_link} = req.body;

    if (!title || !description || !price) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    let newCourse = new course({title, description, price, image_link});
    
    newCourse.save()
    .then(savedCourses => {
        let username = req.user.username;
        
        admin.findOne({username: username})
        .then((adminUser) => {
            if (!adminUser) {
                return res.status(404).json({message: 'Admin user not found'});
            }
            console.log('admin found');
            
            adminUser.createdCourses.push(savedCourses._id);
            return adminUser.save();
        })
        .then(() => {
            res.status(201).json({
                message: 'Course created successfully and added to admin profile!',
                course: savedCourses
            });
        })
        .catch(err => {
            console.error('Error updating admin document:', err);
            res.status(207).json({
                message: 'Course created but failed to update admin profile',
                course: savedCourses,
                error: err.message
            });
        });
    })
    .catch(err => {
        console.error('Error creating course:', err);
        res.status(500).json({message: "Course creation failed!", error: err.message});
    });
});

app.put('/admin/courses/:courseId', authenticateUser, (req, res) => {
    if(req.role !== 'admin'){
        res.status(403).json({message: 'Unauthorized: Admin access required'})
    }
    let courseId = req.params.courseId;
    let updatedCourse = req.body;
    console.log(updatedCourse);
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

app.get('/admin/courses', authenticateUser, (req, res)=>{
    let username = req.user.username;
    admin.findOne({username : username})
    .then((data) => {
        if(!data){
            return res.json({message: "Admin not found!"})
        }
        let adminCoursesId = data.createdCourses;
        console.log(adminCoursesId);
        course.find({ _id : { $in: adminCoursesId }})
        .then((adminCourses) => {
            return res.status(200).json({courses: adminCourses});
        })
        .catch((error) => {
            return res.status(500).json({ message: 'Error fetching courses.', error: error.message });
        })
        
    })
    .catch((error) => {
        return res.status(500).json({ message: 'Error fetching courses.', error: error.message });
    })
})

app.get('/courses', (req, res) => {
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
            .then(data => {
                let token = generateToken({username: data.username, role:'user'})
                res.status(201).json({message: 'Signup successfull', token});
        })
        }
    })
    
    .catch((err) => res.status(500).json({message: "Signup failed!", Error: err.message}) )
})

app.post('/users/login', (req, res) => {
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
    .catch(err => res.status(500).json({message: 'Find request failed!', error: err.message}))
})

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
    const courseId = req.params.courseId;
    
    course.findById(courseId)
        .then(foundCourse => {
            if (!foundCourse) {
                return res.status(404).json({message: 'Course does not exist'});
            }
            
            return user.findOne({username: req.user.username})
                .then(currentUser => {
                    if (!currentUser) {
                        return res.status(404).json({message: 'User not found'});
                    }
                    
                    if (currentUser.purchasedCourses.includes(courseId)) {
                        return res.status(400).json({message: 'Course already purchased'});
                    }
                    
                    currentUser.purchasedCourses.push(courseId);
                    return currentUser.save();
                })
                .then(updatedUser => {
                    res.status(200).json({message: "Course purchased successfully!"});
                });
        })
        .catch(err => {
            console.error('Purchase error:', err);
            res.status(500).json({message: "Purchase failed", error: err.message});
        });
});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
    user.findOne({username: req.user.username})
    .then(currentUser => {
        if(!currentUser){
            res.status(200).json('Does not have any purchased course!')
        }
        res.status(201).json({message: "Purchased courses retrieved successfully", purchasedCourses:  currentUser.purchasedCourses})
    })
    .catch(err => {
        res.status(500).json({message: 'Request failed!', Error: err.message})
    })
})

app.get('/courses/:id', (req, res) => {
    let courseId = req.params.id;
    course.findById(courseId)
    .then((response) => {
        console.log(response);
        res.json(response);
        
    })
})

app.get('/users/courses/check/:courseId', authenticateUser, (req, res) => {
    const courseId = req.params.courseId;
    
    user.findOne({username: req.user.username})
        .then(currentUser => {
            if (!currentUser) {
                return res.status(404).json({message: 'User not found', owned: false});
            }
            
            const owned = currentUser.purchasedCourses.includes(courseId);
            
            res.status(200).json({
                owned: owned,
                message: owned ? 'User owns this course' : 'User does not own this course'
            });
        })
        .catch(err => {
            console.error('Error checking course ownership:', err);
            res.status(500).json({message: "Failed to check course ownership", error: err.message, owned: false});
        });
});

app.delete('/admin/courses/:courseId', authenticateUser, (req, res) => {
    if(req.role !== 'admin'){
        return res.status(403).json({message: 'Unauthorized: Admin access required'});
    }
    
    const courseId = req.params.courseId;
    
    course.findByIdAndDelete(courseId)
        .then((deletedCourse) => {
            if (!deletedCourse) {
                return res.status(404).json({message: 'Course not found'});
            }
            
            const username = req.user.username;
            return admin.findOneAndUpdate(
                { username: username },
                { $pull: { createdCourses: courseId } },
                { new: true }
            )
            .then((updatedAdmin) => {
                if (!updatedAdmin) {
                    return res.status(404).json({
                        message: 'Admin not found',
                        course: deletedCourse
                    });
                }
                
                return res.status(200).json({
                    message: 'Course deleted successfully',
                    course: deletedCourse
                });
            });
        })
        .catch((error) => {
            console.error('Deletion failed:', error);
            return res.status(500).json({message: 'Failed to delete course', error: error.message});
        });
});

app.listen(PORT, () => {
    console.log('Server Started!');
})