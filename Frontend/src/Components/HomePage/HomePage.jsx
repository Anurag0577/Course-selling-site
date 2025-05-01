import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    let navigate = useNavigate();

    return (
        <>
            <div className='home-page'>
                <div className='homepage-container'>
                    <div className='intro-section'>
                        <div className='top-heading'>Learn anything, anytime, at your pace.</div>
                        <div className='top-description'>An engaging course marketplace loaded with diverse topics, interactive content, and easy progress tracking, built to empower you to explore and achieve your learning goals effortlessly.</div>
                        <div className='top-btn' onClick={() => navigate('/courses') }>Explore Courses</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;