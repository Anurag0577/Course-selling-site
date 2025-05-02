import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function PurchasedCourses(){
    let [purchasedCourses, setPurchasedCourses] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    let navigate = useNavigate();

    function viewCourse(courseId){
        navigate(`/courses/${courseId}`);
    }

    useEffect(() => {
        async function getPurchasedCourses(){
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/users/purchasedCourses', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        // Make sure to include auth token if needed
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    credentials: 'include' // Include cookies if you're using cookie-based auth
                });
                
                const data = await response.json();
                console.log('API Response:', data);
                
                // Check if the response contains the purchasedCourses property
                if (data.purchasedCourses) {
                    setPurchasedCourses(data.purchasedCourses);
                } else {
                    // Handle case where there are no purchased courses
                    setPurchasedCourses([]);
                    setError(data.message || 'No courses available');
                }
            } catch(error) {
                console.error('Error fetching purchased courses:', error);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
        
        getPurchasedCourses();
    }, []);
    
    return(
        <>
        <div className='purchasedCoursesPage' style={{color: '#fff'}}>
            <div className='purchasedCoursesPage-container'>
                <div className='purchasedCourses-heading'>Courses</div>
                <div className='filterBtn'>
                    <div className='purchasedCoursess-btn'>All Courses</div>
                    <div className='purchasedCourses-btn' onClick={()=> navigate('/users/purchasedCourses')} >Purchased Courses</div>
                </div>
                <div className='courseCardContainer'>
                    {loading ? (
                        <div>Loading courses...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : purchasedCourses.length === 0 ? (
                        <div>No courses available!</div>
                    ) : (
                        purchasedCourses.map((course) => (
                            <div className='course-card' key={course._id || course.title}>
                                <img src={course.image_link} alt="Course Thumbnail" />
                                <div className='course-content'>
                                    <div className='courseTitle'>{course.title}</div>
                                    <small className='courseDescription'>{course.description}</small>
                                    <div className='courseBuyBtn' onClick={() => viewCourse(course._id)}>View Details</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default PurchasedCourses;