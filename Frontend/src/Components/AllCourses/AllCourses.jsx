import React from 'react'
import { useState, useEffect} from 'react'
import './AllCourses.css'

function AllCourses() {

    const courses = [
        {
            title: "Master Web Development with React",
            description: "Dive into modern web development with this comprehensive course on React. Learn to build dynamic, responsive applications with hands-on projects, from components to state management.",
            price: 49.99,
            image_link: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        },
        {
            title: "Introduction to Digital Photography",
            description: "Capture stunning photos with this beginner-friendly course. Explore camera settings, composition techniques, and editing basics to elevate your photography skills.",
            price: 29.99,
            image_link: "https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        },
        {
            title: "Data Science with Python",
            description: "Unlock the power of data with this in-depth course on Python for data science. Master libraries like Pandas, NumPy, and Matplotlib through real-world projects and analysis.",
            price: 79.99,
            image_link: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        },
        {
            title: "Creative Writing: Crafting Your First Novel",
            description: "Turn your story ideas into reality with this course on creative writing. Learn narrative structure, character development, and editing techniques from published authors.",
            price: 39.99,
            image_link: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: false
        },
        {
            title: "Yoga for Beginners: Mind and Body Balance",
            description: "Start your yoga journey with this beginner-focused course. Discover foundational poses, breathing techniques, and mindfulness practices to enhance your well-being.",
            price: 24.99,
            image_link: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        },
        {
            title: "Master Web Development with React",
            description: "Dive into modern web development with this comprehensive course on React. Learn to build dynamic, responsive applications with hands-on projects, from components to state management.",
            price: 49.99,
            image_link: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        },
        {
            title: "Introduction to Digital Photography",
            description: "Capture stunning photos with this beginner-friendly course. Explore camera settings, composition techniques, and editing basics to elevate your photography skills.",
            price: 29.99,
            image_link: "https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        },
        {
            title: "Data Science with Python",
            description: "Unlock the power of data with this in-depth course on Python for data science. Master libraries like Pandas, NumPy, and Matplotlib through real-world projects and analysis.",
            price: 79.99,
            image_link: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
            published: true
        }]

    return <>
        <div className='allCoursePage' style={{color: '#fff'}}>
            <div className='allCoursePage-container'>
                <div className='allCourse-heading'>Courses</div>
                <div className='filterBtn'>
                    <div className='allCourses-btn'>All Courses</div>
                    <div className='purchasedCourses-btn'>Purchased Courses</div>
                </div>
                <div className='courseCardContainer'>
                   {
                    courses.map((course) => {
                        return (<div className='course-card' key={course.title} >
                            <img src={course.image_link} alt="Course Thumbnail"></img>
                            <div className='course-content'>
                                <div className='courseTitle'>{course.title}</div>
                                <small className='courseDescription'>{course.description}</small>
                                <div className='price-btn'>
                                    <div className='coursePrice'>Price: ${course.price}</div>
                                    <div className='courseBuyBtn'>Buy Now</div>
                                </div>

                            </div>
                            

                            </div>)
})
                   } 
                </div>
            </div>
        </div>
    </>


}

export default AllCourses;