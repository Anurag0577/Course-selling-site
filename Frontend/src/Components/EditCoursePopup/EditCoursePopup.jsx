import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditCoursePopup( onClose, prevImageLink, prevTitle, prevPrice, prevDescription ){
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLink, setImageLink] = useState(prevImageLink);
    const [title, setTitle] = useState(preTitle);
    const [price, setPrice] = useState(prePrice);
    const [description, setDescription] = useState(preDescription);


    function editCourse(){
        setLoading(true);
        setError(null);

        // get token from the localStorage
        let token = localStorage.getItem('token');
        
        // fetching from the backend
        fetch('http://localhost:3000/admin/courses/:courseId', {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: {
                imageLink,
                title,
                description,
                price
            }
        })
        .then((editedCourse)=> {
            setLoading(false);
            if(!editedCourse.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return editedCourse;
        })
        .then((data)=>{
            console.log('Edit Complete', data)
            onClose();
        })
        .catch((error) => {
            setError('Fetching failed!')
        })
    }

    return (
        <div className='popup-container-bg'>
            <div className='popup-container'>
                <div className='close-btn' onClick={onClose}>X</div>
                <div className='popup-content' >
                    <div className='popup-heading'>New Course Details</div>
                    <form className='add-course-form' onSubmit={editCourse} >
                        <label id='image-id' htmlFor='image-input'  >Image Link</label>
                        <input id='image-input' type='text'  value={prevImageLink} onChange={(e) => setImageLink(e.target.value)} style={{color : 'black'}}/>

                        <label id='title-id' htmlFor='title-input'>Title</label>
                        <input id='title-input' type='text' value={prevTitle} onChange={(e) => setTitle(e.target.value)} style={{color : 'black'}}/>

                        <label id='price-id' htmlFor='price-input'>Price</label>
                        <input id='price-input' type='number'  value={prevPrice} onChange={(e) => setPrice(e.target.value)} style={{color : 'black'}} />

                        <label id='description-id' htmlFor='description-input'>Description </label>
                        <input id='description-input' type='text' value={prevDescription} onChange={(e) => setDescription(e.target.value)} style={{color : 'black'}}/>

                        <button type='submit' className='submit-btn'>Edit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCoursePopup;