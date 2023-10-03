import React from 'react'
import  { useState } from 'react';
// import imgs from '../../../assets/images/images/untitled.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

const Sidenav = () => {
  const [navWidth, setNavWidth] = useState(0);

   const openNav = () => {
     setNavWidth(250);
   };
 
   const closeNav = () => {
     setNavWidth(0);
   };


  const handleLogOut = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      localStorage.removeItem('Token');
      window.location.href = '/';
    }
  };


  return (
    <>
     <div class="header_section">
            <div class="container">
               <div class="containt_main">
               <div id="mySidenav" style={{ width: `${navWidth}px` }} className="sidenav"></div>
    <div id="mySidenav" style={{ width: `${navWidth}px` }} className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
         <p>
         <h2>   Profile setting </h2>
         </p>
          <a href="settings">Profile Management</a>
          <a href="post"> Your post</a>
          <a href="page">Update Profile</a>
          <a href="ClosedPost">Closed Post</a>
              <a><button onClick={handleLogOut} >Sign Out <FontAwesomeIcon icon={faSignOut} /></button></a>

        </div>
        <span className="toggle_icon    " onClick={openNav}>
          <div className='bar1'></div>
          <div className='bar2'></div>
          <div className='bar3'></div>
           
          {/* <img src={imgs} alt="Toggle Navigation" /> */}
          </span>
                  <div class="dropdown">
                     {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Category 
                     </button> */}
                     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {/* <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a> */}
                     </div>
                  </div>
                  </div></div></div>
                  <br/>
    </>
  )
}

export default Sidenav