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



const LandingNew = () => {
    const [navWidth, setNavWidth] = useState(0);
    const [items, setItems] = useState([]);


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


    const handleSuccess = () => {
        setSuccessMessage('Logged In successfully.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleError = () => {
        setErrorMessage('Something went wrong. Please try again.');
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };



    useEffect(() => {
        const fetchitems = async () => {
            try {

                // const token = getToken();
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
        <div>

            <div class="banner_bg_main">
                {/* <!-- header top section start --> */}
                <div>
                    <Nav />
                </div>
<div className='side-login'>
                {<SideLogin />}
                </div>
                {/* <!-- header top section start -->
         <!-- logo section start --> */}<br />
                <div class="logo_section">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="logo"><a href="index.html"><img alt='logo' /></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- logo section end -->
         <!-- header section start --> */}
                <div class="header_section">
                    <div class="container">
                        <div class="containt_main">
                            <div id="mySidenav" style={{ width: `${navWidth}px`, height: '300px' }} className="sidenav">
                                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                                <a href="settings">Profile</a>
                                <a href="post"> Your Post</a>
                                <a href="page">Profile Update</a>
                                <a href="ClosedPost">Closed Post</a>
                                <a><button onClick={handleLogOut} >Sign Out <FontAwesomeIcon icon={faSignOut} /></button></a>
                            </div>
                            <span className="toggle_icon" onClick={openNav}><img src={imgs} alt="Toggle Navigation" /></span>
                            <div class="dropdown">
                                {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All Category 
                     </button> */}
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {/* <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a> */}
                                </div>
                            </div><br />
                            <div class="main">
                                {/* <!-- Another variation with a button --> */}
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search this blog" />
                                    <div class="input-group-append">
                                        <button class="btn btn-secondary" type="button" style={{ backgroundColor: "#f26522", borderColor: "#f26522 " }}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="header_box">
                                <div class="lang_box ">
                                    {/* <a href="#" title="" class="nav-link" data-toggle="dropdown" aria-expanded="true">
                        <img src="images/flag-uk.png" alt="flag" class="mr-2 " title="United Kingdom"/> English <i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
                        </a> */}
                                    <div class="dropdown-menu ">
                                        <a href="#" class="dropdown-item">
                                            <img src="images/flag-france.png" class="mr-2" alt="flag" />
                                            French
                                        </a>
                                    </div>
                                </div>
                                <div class="login_menu">
                                    <ul>
                                        <li><a href="#">
                                            {/* <i class="fa fa-shopping-cart" aria-hidden="true"></i> */}
                                            <span class="padding_10"></span></a>
                                        </li>
                                        <li><a href="#">
                                            {/* <i class="fa fa-user" aria-hidden="true"></i> */}
                                            <span class="padding_10"></span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- header section end -->
         <!-- banner section start --> */}
                <div class="banner_section layout_padding">
                    <div class="container">
                        <div id="my_slider" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h1 class="banner_taital">Get Start <br />Your favorite shopping</h1>
                                            <div class="buynow_bt"><a href="dashboard">Buy Now</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h1 class="banner_taital">Get Start <br />Your favriot shoping</h1>
                                           {}
                                            <div class="buynow_bt"><a href="#">Buy Now</a></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h1 class="banner_taital">Get Start <br />Your favriot shoping</h1>
                                            <div class="buynow_bt"><a href="#">Buy Now</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
                                <i class="fa fa-angle-left"></i>
                            </a>
                            <a class="carousel-control-next" href="#my_slider" role="button" data-slide="next">
                                <i class="fa fa-angle-right"></i>
                            </a>
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
{<Footer/>}
        </div>


    )
}

export default LandingNew