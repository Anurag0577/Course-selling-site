import React from 'react'
import './Header.css'
import logo from '../../images/logo.png';

function Header(){

    return(
        <>
            <div className='header'>
                <div className='header-container'>
                    <div className='header-logo-image'>
                        <img className='logo-img' src={logo} alt="logo" />
                    </div>
                    <div className='header-menu'>
                        <ul className='menu'>
                            <li className='menu-element'>All Courses</li>
                            <li className='menu-element'>For Creators</li>
                            {/* <li className='menu-element'></li> */}
                        </ul>
                    </div>
                    <div className='header-button'>
                        <div className='header-signup-btn'>Signup</div>
                        <div className='header-login-btn'>Login</div> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;