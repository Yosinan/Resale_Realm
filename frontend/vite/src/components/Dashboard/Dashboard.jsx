import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import './Prod.css';
import Message from "../Message/Message";
import { getCookie } from "../../utils/utils";
import image from '../../assets/images/icon.jpeg';
import Footer from '../Footer/Footer'


function Dashboard() {

  const dashStyles = {
    // position: 'fixed',
    display: 'flex',
    bottom: '410px',
    right: '65px',
    width: '100%',
    margin: '0',
    height: 'auto',
    background: '#244',
  }

  const handlelogout = async () => {

    const token = localStorage.getItem('Token');

    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.ok) {
        localStorage.removeItem('Token');
        window.location.href = '/home'
      }
      else {
        console.log('Logout Failed')
      }
    }
    catch (e) {
      console.log('Error during logging out' + e)

    }
  }

  const [itemTitle, setItemTitle] = useState("");
  const [price, setPrice] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [addedBy, setAddedBy] = useState(null);

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
        // console.log(user.email);
        // console.log(user.__id)
        // console.log(token)
        setCurrentUser(user);
        return user;
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
      setAddedBy(response.data.addedBy)
      setCreatedAt(response.data.dateAdded);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage({ type: "error", text: "Error fetching items. Please try again." });

    }
  };

  const handleitemTitleChange = (event) => {
    setItemTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };


  const formatPostedDate = (date) => {
    const now = moment();
    const postedDate = moment(date);
    const diff = now.diff(postedDate, "hours");
    if (diff < 24) {
      return `${diff} hours ago`;
    } else {
      return `${now.diff(postedDate, "days")} days ago`;
    }
  };

  const handleOwner = async (item) => {

    const token = localStorage.getItem('Token');
   
    const user = await fetch('http://localhost:5000/api/users/6484bbbec368be4d049addbe', {
      headers: {
        Authorization: `Bearer ${token}`,
        },
        });

        return user.name;
  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      name: itemTitle,
      unitPrice: price,
      dateAdded: new Date().toLocaleDateString(),
    };

    const token = localStorage.getItem('Token');

    try {
      await axios.post("http://localhost:5000/api/products/add", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItemTitle("");
      setPrice("");
      fetchitems(); // Refresh items after successful post
      setMessage({ type: "success", text: "Post published successfully." });
    } catch (error) {
      alert('Login to post');
      console.error("Error posting item:", error);
      setMessage({ type: "error", text: "Error posting item. Please try again." });
    }
  };


  return (
    <>
      <div className="item-container" style={dashStyles}> 
        <button className='logout' onClick={handlelogout}>Logout</button>
        <br />
        <div className="new-item-section">
          <h2>Post New item</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="itemTitleInput">itemTitle:  </label>
              <input
                id="itemTitleInput"
                type="text"
                value={itemTitle}
                onChange={handleitemTitleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="priceInput">Price:  </label>
              <input
                id="priceInput"
                value={price}
                onChange={handlePriceChange}
                required
                type="number"
              />
            </div>

            <button type="submit">Publish</button>
          </form>
          {/* <button onClick={() => handleLogout}>logout</button> */}
          {message && <Message text={message.text} type={message.type} />}
        </div>
        <div className="posted-items-section">
          <h2>Published items</h2>
          <p>Showing {items.length} items</p>
          <br />
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
                  <br />
                  <i className="created-at">Posted by: {formatPostedDate(900)}</i>
                  <p>Iphone 14</p>
                  {/* <p>{handleOwner(item)}</p> */}
                  {/* {handleOwner(item) && (
                    <button className="delete-button">Delete</button>
                  )} */}
                 
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Dashboard;