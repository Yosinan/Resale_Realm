import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import SideLogin from "../SideLogin/SideLogin";
import './Prod.css';
import Message from "../Message/Message";
import { getCookie } from "../../utils/utils";
import image1 from '../../assets/images/icon.jpeg';
import Footer from '../Footer/Footer'


function Dashboard() {

  const dashStyles = {
    // position: 'fixed',
    // display: 'flex',
    // bottom: '410px',
    // right: '65px',
    // width: '100%',
    // margin: '0',
    // height: 'auto',
    // background: '#244',
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
        window.location.href = '/'
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
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

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
      console.log(token)
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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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

    const user = await fetch('http://localhost:5001/api/users/6484bbbec368be4d049addbe', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user.name;

  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const postData = new FormData();
    postData.append("name", itemTitle);
    postData.append("unitPrice", price);
    postData.append("dateAdded", new Date().toLocaleDateString());
    postData.append("description", description);
    postData.append("images", image);
    postData.append("category", category);

    const token = localStorage.getItem('Token');

    try {
      await axios.post("http://localhost:5001/api/products/add", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItemTitle("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
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
    <div className="main-container">
      
        <button className='logout' onClick={handlelogout}>Logout</button>
           <h2>Published items</h2>
          <p>Showing {items.length} items</p>
          <br />
        <div className="container">
            <div className="sidebar">
              <h2>Sort & Filter</h2>
              <ul>
                Option 1
                Option 2
                Option 3
                Option 4
                Option 5
                Option 6
              </ul>
            </div>
          <div className="content">
            {items.map((item) => (
              <div key={item.id} className="item">
                

                <div className="item-card-image">
                  <img
                    src={image1}
                    alt={item.itemTitle}

                  />
                </div>
                  <h3>{item.name}</h3>
                  <b>ETB: {item.unitPrice}</b>
                  <div className="item-card-user">
                    {/* <img
                      src={currentUser?.profilePictureUrl}
                      alt={currentUser?.username}
                    /> */}
                    <i className="created-at">Posted at: {item.dateAdded}</i>
                  </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
        </div>
    </>
  );
}

export default Dashboard;






        // <div className="new-item-section">

        //   <h2>Post New Item</h2>
        //   <form onSubmit={handleSubmit}>

        //     <label htmlFor="itemTitleInput">Item Name:  </label>
        //     <input
        //       id="itemTitleInput"
        //       type="text"
        //       value={itemTitle}
        //       onChange={handleitemTitleChange}
        //       required
        //     />
        //     <br />
        //     <label htmlFor="priceInput">Price:  </label>
        //     <input
        //       id="priceInput"
        //       value={price}
        //       onChange={handlePriceChange}
        //       required
        //       type="number"
        //     />
        //     <br />
        //     <label htmlFor="descriptionInput">Description:  </label>
        //     <textarea
        //       id="descriptionInput"
        //       value={description}
        //       onChange={handleDescriptionChange}
        //       required
        //       type="text"
        //     />
        //     <br />
        //     <label htmlFor="imageInput">Image:  </label>
        //     <input
        //       id="imageInput"
        //       onChange={handleImageChange}
        //       required
        //       type="file"
        //     />
        //     <br />
        //     <label htmlFor="categoryInput">Category:  </label>
        //     <select id="categoryInput" value={category} onChange={handleCategoryChange} required>
        //       <option value="">Select a category</option>
        //       <option value="Electronics">Electronics</option>
        //       <option value="Clothing">Clothing</option>
        //       <option value="Furniture">Furniture</option>
        //       <option value="Books">Books</option>
        //       <option value="Other">Other</option>
        //     </select>
        //     <br />
        //     <button type="submit" >Publish</button>
        //   </form>
        //   {message && <Message text={message.text} type={message.type} />}
        // </div>