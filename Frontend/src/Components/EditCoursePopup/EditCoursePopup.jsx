import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditCoursePopup({ onClose, prevImageLink, prevTitle, prevPrice, prevDescription, courseId }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLink, setImageLink] = useState(prevImageLink);
    const [title, setTitle] = useState(prevTitle);
    const [price, setPrice] = useState(prevPrice);
    const [description, setDescription] = useState(prevDescription);

    function editCourse(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // get token from the localStorage
        let token = localStorage.getItem('token');
        
        // fetching from the backend
        fetch(`http://localhost:3000/admin/courses/${courseId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                image_link :imageLink,
                title,
                description,
                price
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Edit Complete', data);
            onClose();
        })
        .catch((error) => {
            setError('Failed to edit course!');
            setLoading(false);
        });
    }

    return (
        <div className='popup-container-bg'>
            <div className='popup-container'>
                <div className='close-btn' onClick={onClose}>X</div>
                <div className='popup-content' >
                    <div className='popup-heading'>Edit Course Details</div>
                    <form className='add-course-form' onSubmit={editCourse}>
                        <label id='image-id' htmlFor='image-input'  >Image Link</label>
                        <input id='image-input' type='text'  value={imageLink} onChange={(e) => setImageLink(e.target.value)} style={{color : 'white'}}/>

                        <label id='title-id' htmlFor='title-input'>Title</label>
                        <input id='title-input' type='text' value={title} onChange={(e) => setTitle(e.target.value)} style={{color : 'white'}}/>

                        <label id='price-id' htmlFor='price-input'>Price</label>
                        <input id='price-input' type='number'  value={price} onChange={(e) => setPrice(e.target.value)} style={{color : 'white'}} />

                        <label id='description-id' htmlFor='description-input'>Description </label>
                        <input id='description-input' type='text' value={description} onChange={(e) => setDescription(e.target.value)} style={{color : 'white'}}/>

                        <button type='submit' className='submit-btn Edit-btn' onClick={editCourse}>Edit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCoursePopup;