import React, { useEffect, useState } from 'react'
// import './slick.css'
import './style.css'
import imgs from '../../assets/images/images/toggle-icon.png';
import Nav from './nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faSignOut
} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import SideLogin from '../../components/SideLogin/SideLogin';
import Footer from '../../components/Footer/Footer';
import Status from '../../components/Status/Status';
import MainLogin from '../../components/Login/MainLogin';
import MainRegister from '../../components/Register/MainRegister';
import useAuth from '../../components/hooks/useAuth';



const LandingNew = () => {
    const [navWidth, setNavWidth] = useState(0);
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignModal, setShowSignModal] = useState(false);
    const authenticated = useAuth();

    const openNav = () => {
        setNavWidth(250);
    };

    const closeNav = () => {
        setNavWidth(0);
    };


    const openLoginModal = () => {
        setShowLoginModal(true);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const openSignModal = () => {
        setShowSignModal(true);
    }

    const closeSignModal = () => {
        setShowSignModal(false);
    }

    const handleBuy = () => {
        if (authenticated) {
            window.location.href = '/dashboard';
        }
        else {
            handleError();
        }
    }


    const handleLogOut = () => {
        const confirm = window.confirm("Are you sure you want to log out?");
        if (confirm) {
            localStorage.removeItem('Token');
            window.location.href = '/';
        }
    };


    const handleSuccess = () => {
        setSuccessMessage('Logged In successfully.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleError = () => {
        setErrorMessage('You have to Log in');
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
        openLoginModal();
        // openSignModal();
    };



    useEffect(() => {
        const fetchitems = async () => {
            try {

                const token = localStorage.getItem('Token');
                const url = `http://localhost:5000/api/products/`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGIyYzdkM2NmZGQ5YTU4ODI5ODE0OCIsImlhdCI6MTY5NjMyMzQ0MSwiZXhwIjoxNjk2NDA5ODQxfQ.kjFZR0NGfYpAnJBE1oj2M7-o5OYks5kP7GEfItSTB4Y',
                    },
                });

                if (response.status === 200) {
                    setItems(response.data.slice(0, 3));
                    // console.log(token)
                }
                else {
                    console.log('Failed')
                }

            } catch (error) {
                console.error("Error fetching items:", error.message);
                // handleError();

            }
        };
        fetchitems();
    });



    return (
        <>
            <div>
                {successMessage && <Status message={successMessage} type="success" />}
                {errorMessage && <Status message={errorMessage} type="error" />}

                <div class="banner_bg_main">
                    {/* <!-- header top section start --> */}
                    <div>
                        <Nav />
                    </div>
                    <div className='side-login'>
                        {<SideLogin />}
                    </div>
                    <div class="logo_section">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    {/* <div class="logo"><a href="#"><img alt='logo' /></a></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {authenticated ? (
                        <div class="header_section">
                            <div class="container">
                                <div class="containt_main">
                                    <div id="mySidenav" style={{ width: `${navWidth}px`, height: '300px' }} className="sidenav">
                                        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                                        {/* <a href="settings">Profile</a> */}
                                        <a href="post"> Your Post</a>
                                        <a href="profile">Profile Update</a>
                                        <a href="ClosedPost">Closed Post</a>
                                        <a>
                                            <button
                                                class='btn btn-yellow'
                                                onClick={handleLogOut} >Sign Out &nbsp; <FontAwesomeIcon icon={faSignOut} /></button></a>
                                    </div>
                                    <span className="toggle_icon" onClick={openNav}><img src={imgs} alt="Toggle Navigation" /></span>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div class="banner_section layout_padding">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h1 class="banner_taital">Resale Redefined <br/> Discover a New Way to Buy and Sell</h1>
                                    <div class="buynow_bt">
                                        <button
                                            href="dashboard"
                                            class='btn btn-blue'
                                            onClick={handleBuy}>
                                            Buy Now</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="fashion_section">
                    <div id="main_slider" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="container">
                                    {/* <h1 class="fashion_taital">Man & Woman Fashion</h1> */}
                                    <div class="fashion_section_2">
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}

                                                            </div>
                                                        ))}

                                                    </div>



                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fashion_section_2">
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">

                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="fashion_section">
                    <div id="main_slider" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="container">
                                    {/* <h1 class="fashion_taital">Man & Woman Fashion</h1> */}
                                    <div class="fashion_section_2">
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">

                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fashion_section_2">
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fashion_section">
                    <div id="main_slider" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="container">
                                    {/* <h1 class="fashion_taital">Man & Woman Fashion</h1> */}
                                    <div class="fashion_section_2">
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">

                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fashion_section_2">
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">

                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-sm-4">
                                                <div class="box_main">
                                                    <div className='content'>
                                                        {items.slice(2).map((item) => (
                                                            <div key={item.id}>                                                        <div e>
                                                                <img
                                                                    src={`../uploads/img/${item.images[0].filename}`}
                                                                    alt={"Uploaded" + item.images[0].filename}
                                                                />
                                                            </div>
                                                                <div >
                                                                </div>
                                                                <h3>{item.name}</h3>
                                                                <b>ETB: {item.unitPrice}</b>

                                                                {/* {console.log('added by : ' + item.addedByUsername + ' User: ' + currentUser.__id)} */}


                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {<Footer />}
            </div>

            {showLoginModal && (
                <div className="log-modal">
                    <div className="log-in">
                        <button className="close-button" onClick={closeLoginModal}>
                            Close
                        </button>

                        <MainLogin />

                    </div>
                </div>
            )}


            {showSignModal && (
                <div className="log-modal">
                    <div className="log-in">
                        <button className="close-button" onClick={closeSignModal}>
                            Close
                        </button>
                        <MainRegister />
                    </div>
                </div>
            )}


        </>


    )
}

export default LandingNew