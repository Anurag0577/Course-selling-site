import React from 'react';
import { useState, useEffect} from 'react'
import { useNavigator } from 'react-router-dom'

function AdminCourses(){
    let [adminCourse, setAdminCourse] = useState([]);
    let navigate = useNavigator;
    useEffect(()=>{
        
        let token = localStorage.getItem('token');
        if(!token){
            navigate('/admin/login')
        }
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) =>{
            let adminCourseId = data; // this admin course is just a array of courseId not the actual course.
            adminCourseId.forEach((element) => {
                fetch(`https://localhost:3000/courses/${element}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                

            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                adminCourse.push(data);
            })
            })
            
        })
    }, [])

    return (
        <div className='admin-course-page'>
            <div className='admin-course-page-container'>
                <div className='admin-course-heading'>My Courses</div>
                <div className='add-new-course-container'>
                    <div className='add-new-course-btn'>New Course</div>
                </div>
                <div className='admin-course-card-container'>
                    {(adminCourse.length <= 0) ? (
                        <div className='ZeroCourseMessage'> You did not created any course yet. </div>
                    ) : (
                        adminCourse.map((element) => {
                            <div className='admin-course-card'>
                            {/* did not add src of the image. */}
                                <img className='admin-course-card-img' src=' '></img> 
                                <div className='admin-course-content-container'>
                                    <div className='admin-course-title'>element.title</div>
                                    <div className='admin-course-price'>element.price</div>
                                    <div className='admin-course-btn-container'>
                                        <div className='admin-course-edit-btn'>Edit</div>
                                        <div className='admin-course-delete-btn'>Delete</div>
                                    </div>
                                </div>
                            </div>
                        })
                    )}
                </div>
            </div>
        </div>
    )
}