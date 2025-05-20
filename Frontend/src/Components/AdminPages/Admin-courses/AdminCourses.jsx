import React from 'react';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminCourses.css'
// import '../../Header/Header.jsx'
import Header from '../../Header/Header.jsx';
import AddCoursePopup from '../../AddCoursePopup/AddCoursePopup.jsx';
import EditCoursePopup from '../../EditCoursePopup/EditCoursePopup.jsx';

function AdminCourses(){

    // track the adminCourses array
    const [adminCourse, setAdminCourse] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [ currentCourse, setCurrentCourse ] = useState({})
    const navigate = useNavigate();

    // Function to fetch courses
    const fetchCourses = () => {
        let token = localStorage.getItem('token');
        if(!token){
            navigate('/admin/login')
            return;
        }
        
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
    }

    // When page load following code will run
    useEffect(()=>{
        fetchCourses();
    }, [])

    function handleEdit(course) {
        setCurrentCourse(course)
    }

    function deleteCourse(element) {
        const token = localStorage.getItem('token');
        const courseId = element._id;
        
        fetch(`http://localhost:3000/admin/courses/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete course');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Course deleted successfully!');
            // Refresh the course list to get updated data
                        // Update the UI by filtering out the deleted course
                        setAdminCourse(prevCourses => prevCourses.filter(course => course._id !== courseId));
        })
        .catch((error) => {
            console.error('Error deleting course:', error);
            alert('Failed to delete course. Please try again.');
        });
    }

    return (
        <div className='admin-course-page'>
            <Header></Header>
            <div className='admin-course-page-container'>
                <div className='admin-course-heading'>My Courses</div>
                <div className='add-new-course-container'>
                    <div className='add-new-course-btn' onClick={()=> setShowAddPopup(true)} >New Course</div> 
                </div>
                <div className='admin-course-card-container'>
                    {(adminCourse.length <= 0) ? (
                        <div className='ZeroCourseMessage'> You did not created any course yet. </div>
                    ) : (
                        adminCourse.map((element) => (
                            <div className='admin-course-card' key={element._id}>
                                <img className='admin-course-card-img' src={element.image_link} alt={element.title}></img> 
                                <div className='admin-course-content-container'>
                                    <div className='admin-course-title'>{element.title}</div>
                                    <div className='admin-course-description'>{element.description}</div>
                                    <div className='admin-course-price'>Price: {element.price}</div>
                                    <div className='admin-course-btn-container'>
                                        <div className='admin-course-edit-btn' onClick={()=> {
                                            handleEdit(element);
                                            setShowEditPopup(true);
                                        }} >Edit</div>
                                        <div className='admin-course-delete-btn' onClick={() => deleteCourse(element)}>Delete</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            { showAddPopup && (<AddCoursePopup onClose= {()=>{
                setShowAddPopup(false);
                fetchCourses(); // Refresh after adding
            }}></AddCoursePopup>)}
            { showEditPopup && currentCourse && (<EditCoursePopup onClose = {() => {
                setShowEditPopup(false);
                fetchCourses(); // Refresh after editing
            }}
                prevImageLink = {currentCourse.image_link} 
                prevTitle = {currentCourse.title} 
                prevPrice = {currentCourse.price} 
                prevDescription = {currentCourse.description}
                courseId = {currentCourse._id}
            ></EditCoursePopup>)}
            
        </div>
    )
}
export default AdminCourses;