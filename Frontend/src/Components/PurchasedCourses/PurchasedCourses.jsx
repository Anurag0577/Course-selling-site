import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PurchasedCourses() {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function viewCourse(courseId) {
        navigate(`/courses/${courseId}`);
    }

    function navigateToAllCourses() {
        navigate('/courses');
    }

    useEffect(() => {
        fetch('http://localhost:3000/users/purchasedCourses', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            if (data.purchasedCourses) {
                setPurchasedCourses(data.purchasedCourses);
            } else {
                setPurchasedCourses([]);
            }
        })
        .catch(error => {
            console.error('Error fetching purchased courses:', error);
        });
    }, []);
    
    return (
        <div className='purchasedCoursesPage' style={{color: '#fff'}}>
            <div className='purchasedCoursesPage-container'>
                <h1 className='purchasedCourses-heading'>Courses</h1>
                <div className='filterBtn'>
                    <button 
                        className='purchasedCourses-btn'
                        onClick={navigateToAllCourses}>
                        All Courses
                    </button>
                    <button 
                        className='purchasedCourses-btn active'
                        onClick={() => navigate('/users/purchasedCourses')}>
                        Purchased Courses
                    </button>
                </div>
                <div className='courseCardContainer'>
                    {purchasedCourses.length === 0 ? (
                        <div>No purchased courses available. Browse our catalog to find courses!</div>
                    ) : (
                        purchasedCourses.map((course) => (
                            <div className='course-card' key={course._id || course.id || course.title}>
                                <img 
                                    src={course.image_link} 
                                    alt={`Thumbnail for ${course.title}`} 
                                />
                                <div className='course-content'>
                                    <h2 className='courseTitle'>{course.title}</h2>
                                    <p className='courseDescription'>{course.description}</p>
                                    <button 
                                        className='courseBuyBtn' 
                                        onClick={() => viewCourse(course._id)}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default PurchasedCourses;