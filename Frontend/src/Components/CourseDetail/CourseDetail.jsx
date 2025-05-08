import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css'
import PurchaseButton from '../PurchaseButton/PurchaseButton'
import Header from '../Header/Header';

function CourseDetail() {
    // State variables
    const [course, setCourse] = useState({});
    const [courseBtnText, setCourseBtnText] = useState('Buy Now');
    const [purchaseBtnMessage, setPurchaseBtnMessage] = useState('');
    const { id } = useParams();

    // Function to handle course purchase
    function buyCourse() {
        let token = localStorage.getItem('token');
        if (!token) {
            setPurchaseBtnMessage('Please login to purchase this course');
            return;
        }

        fetch(`http://localhost:3000/users/courses/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.status === 400) {
                setCourseBtnText('Already Purchased!');
                setPurchaseBtnMessage('You already purchased this course, please have a look in the purchased Courses.');
            } else if (response.status === 200) {
                setCourseBtnText('Successfully purchased!');
                setPurchaseBtnMessage('You purchased this course successfully.');
            } else if (response.status === 404) {
                setPurchaseBtnMessage('Course or user not found.');
            } else if (response.status === 500) {
                setPurchaseBtnMessage('Server error. Please try again later.');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.message);
            // Don't overwrite the message if we've already set it based on status code
            if (!purchaseBtnMessage) {
                setPurchaseBtnMessage(data.message);
            }
        })
        .catch((error) => {
            console.error("Error purchasing course:", error);
            setPurchaseBtnMessage('Failed to process purchase. Please try again.');
        });
    }

    useEffect(() => {
        function getCourseDetails() {
            fetch(`http://localhost:3000/courses/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
                checkCourseOwnership();
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
            });
        }

        function checkCourseOwnership() {
            const token = localStorage.getItem('token');
            if (!token) return;

            // Check if user already owns the course
            fetch(`http://localhost:3000/users/courses/check/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                // Don't handle response status here, wait for the parsed JSON
                return response.json();
            })
            .then((data) => {
                if (data.owned) {
                    setCourseBtnText('Already Purchased!');
                    setPurchaseBtnMessage('You already purchased this course, please have a look in the purchased Courses.');
                }
            })
            .catch((error) => {
                console.error("Error checking course ownership:", error);
            });
        }

        getCourseDetails();
    }, [id]);

    return (
        <>
            <Header />
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
                                    <div className='purchase-btn' onClick={buyCourse}>{courseBtnText}</div>
                                    <small className='message'>{purchaseBtnMessage}</small>
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