import React from 'react';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminCourses.css'
// import '../../Header/Header.jsx'
import Header from '../../Header/Header.jsx';

function AdminCourses(){

    // track the adminCourses array
    let [adminCourse, setAdminCourse] = useState([]);
    let navigate = useNavigate();

    // When page load following code will run
    useEffect(()=>{
        let token = localStorage.getItem('token');
        if(!token){
            navigate('/admin/login')
        }
        // fetch the courses created by current admin
        fetch('http://localhost:3000/admin/courses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.courses);
            setAdminCourse(data.courses || []);
        })
        .catch((error) => {
            console.error('Error fetching courses:', error);
            navigate('/admin/login');
        });
    }, [])

    

    return (
        <div className='admin-course-page'>
            <Header></Header>
            <div className='admin-course-page-container'>
                <div className='admin-course-heading'>My Courses</div>
                <div className='add-new-course-container'>
                    <div className='add-new-course-btn' >New Course</div> 
                </div>
                <div className='admin-course-card-container'>
                    {(adminCourse.length <= 0) ? (
                        <div className='ZeroCourseMessage'> You did not created any course yet. </div>
                    ) : (
                        adminCourse.map((element) => (
                            <div className='admin-course-card'>
                            {/* did not add src of the image. */}
                                <img className='admin-course-card-img' src={element.image_link}></img> 
                                <div className='admin-course-content-container'>
                                    <div className='admin-course-title'>{element.title}</div>
                                    <div className='admin-course-description'>{element.description}</div>
                                    <div className='admin-course-price'>Price: {element.price}</div>
                                    <div className='admin-course-btn-container'>
                                        <div className='admin-course-edit-btn'>Edit</div>
                                        <div className='admin-course-delete-btn'>Delete</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminCourses;