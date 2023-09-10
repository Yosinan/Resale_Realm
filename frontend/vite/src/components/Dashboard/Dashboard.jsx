// import React from 'react'
// import ProductForm from '../Products/ProductForm'
// import Footer from '../Footer/Footer'

// function Dashboard() {


//   const handlelogout = async () => {

//     const token = localStorage.getItem('Token');

//     try {
//       const response = await fetch('http://localhost:5000/api/users/logout', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });


//       if (response.ok) {
//         localStorage.removeItem('Token');
//         window.location.href = '/home'
//       }
//       else {
//         console.log('Logout Failed')
//       }
//     }
//     catch (e) {
//       console.log('Error during logging out' + e)

//     }
//   }

//   return (
//     <>
//       <div className='dashboard-container'>
//         <button className='logout' onClick={handlelogout}>Logout</button>
//         <br />
//       </div>
//       <ProductForm />
//       <Footer />
//     </>
//   )
// }

// export default Dashboard

import React, { useState, useEffect } from "react";
import axios from "axios";
import './Prod.css';
import { getCookie } from "../../utils/utils";
import image from '../../assets/images/icon.jpeg';
import Footer from '../Footer/Footer'

function Dashboard() {
  const [itemTitle, setItemTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // ...

  useEffect(() => {
    // Fetch the current user information
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        console.log(user.email);
        console.log(token)
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchitems();
  }, []);

  const fetchitems = async () => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setItems(response.data);
      setCreatedAt(response.data.dateAdded);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage("Error fetching items. Please try again.");
    }
  };

  const handleitemTitleChange = (event) => {
    setItemTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      name: itemTitle,
      unitPrice: content,
      dateAdded: new Date().toLocaleTimeString,
    };

    const token = localStorage.getItem('Token');

    try {
      await axios.post("http://localhost:5000/api/products/add", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItemTitle("");
      setContent("");
      fetchitems(); // Refresh items after successful post
      setMessage("Post published successfully.");
    } catch (error) {
      alert('Login to post');
      console.error("Error posting item:", error);
      //   setErrorMessage("Error posting item. Please try again.");
      setMessage("Error posting item:", error);
    }
  };


  return (
    <>
      <div className="item-container">
        <div className="new-item-section">
          <h2>Post a New item</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="itemTitleInput">itemTitle:</label>
              <input
                id="itemTitleInput"
                type="text"
                value={itemTitle}
                onChange={handleitemTitleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="contentInput">Content:</label>
              <textarea
                id="contentInput"
                value={content}
                onChange={handleContentChange}
                required
              />
            </div>

            <button type="submit">Publish</button>
          </form>
          {/* <button onClick={() => handleLogout}>logout</button> */}
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} */}
          {message && <p className="message">{message}</p>}
        </div>
        <div className="posted-items-section">
          <h2>Published items</h2>
          <div className="posted-items-container">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <h3>{item.name}</h3>

                <div className="item-card-image">
                  <img
                    src={image}
                    alt={item.itemTitle}

                  />
                </div>
                <p>{item.unitPrice}</p>
                <div className="item-card-user">
                  <img
                    src={currentUser?.profilePictureUrl}
                    alt={currentUser?.username}
                  />
                  <i className="created-at">Posted at: {item.dateAdded}</i>
                  <p>Iphone 14</p>
                  <span>{currentUser?.username}</span>
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default Dashboard;