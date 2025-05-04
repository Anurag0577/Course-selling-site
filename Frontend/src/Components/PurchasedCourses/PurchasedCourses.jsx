import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PurchasedCourses() {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function viewCourse(courseId) {
        navigate(`/courses/${courseId}`);
    }

    function navigateToAllCourses() {
        navigate('/courses');
    }

    useEffect(() => {
        // First, fetch the user's purchased course IDs
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
            console.log('API Response (purchased course IDs):', data);
            
            if (data.purchasedCourses && data.purchasedCourses.length > 0) {
                // Now fetch the full details for each course
                const fetchCoursePromises = data.purchasedCourses.map(courseId => 
                    fetch(`http://localhost:3000/courses/${courseId}`)
                        .then(res => res.json())
                        .catch(err => {
                            console.error(`Error fetching course ${courseId}:`, err);
                            return null; // Return null for failed fetches
                        })
                );
                
                // Wait for all course detail requests to complete
                return Promise.all(fetchCoursePromises);
            } else {
                return [];
            }
        })
        .then(courseDetails => {
            // Filter out any null results (failed fetches)
            const validCourses = courseDetails.filter(course => course !== null);
            console.log('Fetched course details:', validCourses);
            setPurchasedCourses(validCourses);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error in the fetch process:', error);
            setLoading(false);
        });
    }, [token]);
    
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
                        className='purchasedCourses-btn active'>
                        Purchased Courses
                    </button>
                </div>
                
                <div className='courseCardContainer'>
                    {loading ? (
                        <div>Loading your courses...</div>
                    ) : purchasedCourses.length === 0 ? (
                        <div>No purchased courses available. Browse our catalog to find courses!</div>
                    ) : (
                        purchasedCourses.map((course) => (
                            <div className='course-card' key={course._id || course.id}>
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