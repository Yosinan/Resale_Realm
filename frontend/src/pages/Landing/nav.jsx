import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import './slick.css'
import useAuth from '../../components/hooks/useAuth';
import Status from '../../components/Status/Status'
import SideLogin from '../../components/SideLogin/SideLogin'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faSignOut,
} from '@fortawesome/free-solid-svg-icons';
const Nav = () => {

   const authenticated = useAuth();


   const handleLogOut = () => {
      const confirm = window.confirm("Are you sure you want to log out?");
      if (confirm) {
         localStorage.removeItem('Token');
         window.location.href = '/';
      }
   };

   return (
      <>
         {/* //  <div class="banner_bg_main"> */}
         {/* <!-- header top section start --> */}
         <div class="container">
            <div class="header_section_top">
               <div class="row">
                  <div class="col-sm-12">
                     <div class="custom_menu">
                        <ul>
                           <li><a href="/">HOME</a></li>
                           {/* <li><a href="#">Gift Ideas</a></li> */}
                           <li><a href="#">ABOUT</a></li>
                           {authenticated ? (
                              <li>
                                 <a href='add'>Sell</a>
                              </li>
                           ) : (
                              <li>
                              <a href='/l'>Login</a>
                              </li>
                           )}

                           <li><a href="#">Contact</a></li>
                        </ul>
                        <button onClick={handleLogOut} className='logout' ><FontAwesomeIcon icon={faSignOut} /></button>
                     </div>
                  </div>
               </div>
            </div>
         </div></>
   )
}

export default Nav