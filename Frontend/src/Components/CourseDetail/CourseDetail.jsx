import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css'
import PurchaseButton from '../PurchaseButton/PurchaseButton'

function CourseDetail() {
    // Mock course data
    const [course, setCourse] = useState([])
    let {id} = useParams();

    useEffect(()=> {
        function getCourseDetails(){
            fetch(`http://localhost:3000/courses/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
            })
            .catch((error) => {
                console.log(error)
            })
        }
        getCourseDetails()
    }, []);
    

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
                                <div className="purchase-section">
                                    <PurchaseButton courseId={course._id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseDetail;