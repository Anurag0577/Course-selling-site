import React, { useState, useEffect } from 'react';
import './CourseDetail.css'

function CourseDetail() {
    // Mock course data
    const course = {
        image_link: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
        title: 'Complete Web development + DevOps Cohort',
        price: 4869,
        description: 'In the Web Development Cohort, we’ll be diving deep into the MERN stack from the basics. The goal is for you to be able to understand ANY MERN codebase out there.\n\nWe’ll also be diving into Devops, both basic and advance'
    };

    return (
        <>
            <div className='course-page'>
                <div className='course-page-title-container'>
                    <div className='course-page-title'>{course.title}</div>
                </div>
                <div className='course-page-syllabus-part'>
                <div className='course-page-syllabus'>
                    <div style={{fontSize:"2.5rem", fontWeight: 'bold', color:'#90C67C'}}>Description</div>
                    {course.description}
                </div>
                <div className='course-page-card'>
                        <img src={course.image_link} alt="Course Thumbnail" />
                        <div className='course-page-content'>
                            <div className='course-page-price-btn'>
                                <div className='course-page-price-container'>
                                    <div className='course-pagePrice'>Price: ₹{course.price}</div>
                                </div>
                                <div className='course-pageBuyBtn'>Buy Now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetail;