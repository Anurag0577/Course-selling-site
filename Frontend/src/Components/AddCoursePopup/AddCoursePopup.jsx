import React from 'react';
import { useState, useEffect} from 'react'
import { Form } from 'react-router-dom';

function AddCoursePopup(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let [imgLink , setImgLink] = useState('');
    let [ title, setTitle ] = useState('');
    let [ description, setDescription] = useState('');
    let [ price , setPrice ] = useState('');

    function addNewCourse(){
        setLoading(true);
        setError(null);

        if (!imgLink || !title || !description || !price) {
            setError('All fields are required.');
            setLoading(false);
            return;
          }

          if (isNaN(price) || Number(price) <= 0) {
            setError('Price must be a valid positive number.');
            setLoading(false);
            return;
          }  

        let token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token is missing.');
            setLoading(false);
            return;
          }

        fetch('http://localhost:3000/admin/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                image_link: imgLink,
                title,
                description,
                price: Number(price)
            })
        })
        .then((response) => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
           return response.json();
        })
        .then((data) => {
            console.log('successfull!', data)
        })
        .catch((error) => {
            setError(`Failed to add course: ${error.message}`);
            setLoading(false);
        })
        
    }

    return (
        <div className='popup-container-bg'>
            <div className='popup-container'>
                <div className='popup-heading'>New Course Details</div>
            </div>
            <div className='popup-content' >
                <form className='add-course-form' onSubmit={addNewCourse} >
                    <label id='image-id' htmlFor='image-input'  >Image Link</label>
                    <input id='image-input' type='text'  value={imgLink} onChange={(e) => setImgLink(e.target.value)} style={{color : 'black'}}/>

                    <label id='title-id' htmlFor='title-input'  >Title</label>
                    <input id='title-input' type='text' value={title} onChange={(e) => setTitle(e.target.value)} style={{color : 'black'}}/>

                    <label id='price-id' htmlFor='price-input'  >Price</label>
                    <input id='price-input' type='number'  value={price} onChange={(e) => setPrice(e.target.value)} style={{color : 'black'}} />

                    <label id='description-id' htmlFor='description-input'>Description </label>
                    <input id='description-input' type='text' value={description} onChange={(e) => setDescription(e.target.value)} style={{color : 'black'}}/>

                    <button type='submit'>Add Course</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoursePopup;