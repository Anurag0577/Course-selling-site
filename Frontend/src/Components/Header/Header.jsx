import React from 'react'
import './Header.css'
import logo from '../../images/logo.png';
import {useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode'

function Header(){

    const [username , setUsername] =useState('');
    const [isUserLogin, setIsUserLogin] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token');
        let decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.username) {
            setIsUserLogin(true);
            setUsername(decodedToken.username);
          } else {
            setIsUserLogin(false);
            setUsername('');
          }


    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
        // You might want to redirect the user or update other state
    };

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
                    {(isUserLogin) ? (<div className='header-button'>
                        <div className='header-signup-btn'>Signup</div>
                        <div className='header-login-btn'>Login</div> 
                    </div>) : (
                        <div className='header-user-intro'>Hi {username}</div>
                        <div className='header-loginout-btn'>Login</div> 
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default Header;