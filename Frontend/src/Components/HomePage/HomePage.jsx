import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import Header from '../Header/Header'

function HomePage() {
    let navigate = useNavigate();
        let [courses, setCourses] = useState([]);
    
        function viewCourse(courseId){
            navigate(`/courses/${courseId}`)
        }
    
        useEffect(() => {
            function getCourses(){
    
                try{
                    fetch('http://localhost:3000/courses', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setCourses(data);
                    })
                 } catch(error){
                    console.log({Error: error,
                        message: "Courses fetching failed!"
                    })
                }
                
            }
            getCourses();
        }, []
             // passing empty array as a dependency, now it will run only when dom mount, means only once.
        )

    return (
        <>
            <Header></Header>
            <div className='home-page'>
                <div className='homepage-container'>
                    <div className='intro-section'>
                        <div className='top-heading'>Learn anything, anytime, at your pace.</div>
                        <div className='top-description'>An engaging course marketplace loaded with diverse topics, interactive content, and easy progress tracking, built to empower you to explore and achieve your learning goals effortlessly.</div>
                        <div className='top-btn' onClick={() => navigate('/courses') }>Explore Courses</div>
                    </div>
                    <div className='scrollbar-section'></div>
                    <div className='populerCourse-section'>
                <div className='populerCourses-heading' >Our Bestsellers</div>
                <div className='courseCardContainer'>
                   { (courses.length === 0) ? (<div> No courses available!</div>) : 
                    (courses.slice(0, 4).map((course) => {
                        return (<div className='course-card' key={course.title} >
                            <img src={course.image_link} alt="Course Thumbnail"></img>
                            <div className='course-content'>
                                <div className='courseTitle'>{course.title}</div>
                                <small className='courseDescription'>{course.description}</small>
                                <div className='price-btn'>
                                    <div className='coursePrice'>Price: ${course.price}</div>
                                            <div className='courseBuyBtn' onClick={() => viewCourse(course._id)}>View Details</div>
                                </div>

                            </div>
                            

                            </div>)
}))
                   } 
                   
                   
                    
                </div>
            </div>

            {/* about us */}
            <div className='aboutUs-section'>
                <div className='aboutUs-heading'>About Us</div>
                <div className='aboutUs-description'>Welcome to our course selling platform, where learners and educators come together to inspire growth and unlock potential. We’re passionate about making education accessible, engaging, and empowering for everyone.
For learners, we offer a vibrant marketplace filled with diverse, high-quality courses tailored to your goals. With intuitive search tools, personalized recommendations, and seamless access, you can explore new skills, advance your career, or dive into your passions—all at your own pace, from any device.
For educators, we provide a powerful, user-friendly platform to create and sell courses with ease. Our drag-and-drop builders, customizable templates, and secure payment systems let you focus on sharing your expertise while we handle the rest, helping you reach a global audience and grow your impact.
Founded with a mission to bridge knowledge and opportunity, we’re here to support both learners and creators every step of the way. Join our community today and start your journey of learning or teaching!</div>
            </div>

            <div className='adminLogin_section'>
                <div className='adminLogin-heading'>Want to sell courses?</div>
                <div className='adminLoginBtn-container'>
                    <div className='adminSignupBtn'>Create Account</div>
                    <div className='adminLoginBtn'>Login</div>
                </div>
            </div>
        </div>
                    </div>
        </>
    )
}

export default HomePage;