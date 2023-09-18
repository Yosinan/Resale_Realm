import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import SideLogin from "../SideLogin/SideLogin";
import './Prod.css';
import Message from "../Message/Message";
import { getToken } from "../../utils/utils";
import image1 from '../../assets/images/icon.jpeg';
import Footer from '../Footer/Footer'


function Dashboard() {

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

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setfile] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [addedBy, setAddedBy] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [data, setData] = useState(null);



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
    const fetchitems = async () => {
      try {

        const token = getToken();
        const url = `http://localhost:5000/api/products/search?sortOption=${sortOption}&sortOrder=${sortOrder}&category=${filterOption}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log('Success')
          console.log(response.data)
          setItems(response.data);
          setAddedBy(response.data.addedBy)
          setCreatedAt(response.data.dateAdded);
          console.log(token)
          setItems(response.data);
        }
        else {
          console.log('Failed')
        }

      } catch (error) {
        console.error("Error fetching items:", error);
        setMessage({ type: "error", text: "Error fetching items. Please try again." });

      }
    };
    fetchitems();
  }, [sortOption, sortOrder, filterOption, minPrice, maxPrice]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };


  const handleSortOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (value === "name") {
        setSortOption("name");
      }
      if (value === "price") {
        setSortOption("unitPrice");
      }
      if (value === "oldest") {
        setSortOption("dateAdded");
        setSortOrder("asc");
      }

      if (value === "newest") {
        setSortOption("dateAdded");
        setSortOrder("desc");
      }

    } else {
      setSortOption("");
    }



  };

  const handleSortOrderChange = (event) => {

    if (event.target.value === "asc") {
      setSortOrder("asc");
    }
    if (event.target.value === "desc") {
      setSortOrder("desc");
    }
  };

  const handleFilterOptionChange = (event) => {
    if (event.target.value === "Electronics") {
      setFilterOption("Electronics");
    }
    if (event.target.value === "Clothing") {
      setFilterOption("Clothing");
    }
    if (event.target.value === "Furniture") {
      setFilterOption("Furniture");
    }
    if (event.target.value === "Books") {
      setFilterOption("Books");
    }
    if (event.target.value === "Other") {
      setFilterOption("Other");
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setfile(filesArray);
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

    const user = await fetch('http://localhost:5000/api/users/6484bbbec368be4d049addbe', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user.name;

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append("name", name);
    postData.append("unitPrice", price);
    postData.append("dateAdded", new Date().toLocaleDateString());
    postData.append("description", description);
    for (let i = 0; i < file.length; i++) {
      postData.append("images", file[i]);
    }
    postData.append("category", category);

    const token = localStorage.getItem('Token');

    try {
      await axios.post("http://localhost:5000/api/products/add", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName("");
      setPrice("");
      setDescription("");
      setfile("");
      setCategory("");
      setMessage({ type: "success", text: "Post published successfully." });

    } catch (error) {

      console.error("Error posting item:", error.message);
      setMessage({ type: "error", text: "Error posting item. Please try again." });
    }
  };


  return (
    <>
      <div className="main-container">

        <button className='logout' onClick={handlelogout}>Logout</button>
        <div className="new-item-section">
          <h2>Post New Item</h2>
          <form onSubmit={handleSubmit}>

            <label htmlFor="nameInput">Item Name:  </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
            <br />
            <label htmlFor="priceInput">Price:  </label>
            <input
              id="priceInput"
              value={price}
              onChange={handlePriceChange}
              required
              type="number"
            />
            <br />
            <label htmlFor="descriptionInput">Description:  </label>
            <textarea
              id="descriptionInput"
              value={description}
              onChange={handleDescriptionChange}
              required
              type="text"
            />
            <br />
            <label htmlFor="imageInput">Image:  </label>
            <input
              id="imageInput"
              onChange={handleFileChange}
              //  required
              type="file"
              multiple={true}
            />
            <br />
            <label htmlFor="categoryInput">Category:  </label>
            <select id="categoryInput" value={category} onChange={handleCategoryChange} required>
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <button type="submit" >Publish</button>
          </form>
          {message && <Message text={message.text} type={message.type} />}
        </div>

        <h2>Published items</h2>
        <p>Showing {items.length} items</p>
        <br />
        <div className="container">
          <div className="sidebar">
            <div className="in-sidebar">
              <br />
              <button className="clear" onClick={() => {
                setSortOption("");
                setSortOrder("");
                setFilterOption("");
                document.querySelectorAll('input[type="checkbox"]:checked').forEach((el) => el.checked = false);
                document.querySelectorAll('input[type="radio"]:checked').forEach((el) => el.checked = false);
                setMinPrice("");
                setMaxPrice("");
              }}>Reset</button>
              <br />
              <h3>Sort By: </h3>
              <input type="checkbox" id="name" name="name" value="name" onChange={handleSortOptionChange} />
              <label htmlFor="name"> Name</label>
              <br />
              <input type="checkbox" id="price" name="price" value="price" onChange={handleSortOptionChange} />
              <label htmlFor="price"> Price</label>
              <br />
              <input type="radio" id="dateAdded" name="dateAdded" value="newest" onChange={handleSortOptionChange} />
              <label htmlFor="dateAdded"> Newest First</label>
              <br />
              <input type="radio" id="dateAdded" name="dateAdded" value="oldest" onChange={handleSortOptionChange} />
              <label htmlFor="dateAdded"> Oldest First</label>


              <h3>Sort Order: </h3>
              <label htmlFor="filterOption">Sort Order: </label>
              <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                <option value="">Select an option</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <br />
              <label htmlFor="filterOption">Filter By Category: </label>
              <select id="filterOption" value={filterOption} onChange={handleFilterOptionChange}>
                <option value="">Select an option</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
              <br />
              <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              <br />
            </div>
          </div>
          <div className="content">
            {items.map((item) => (
              <div key={item.id} className="item">
                {item.images.map((image) => (
                  <div key={image._id}>
                    <img
                      src={`../../../../backend/uploads/img/${image.filename}`}
                      alt={image.filename}
                    />
                  </div>

                ))
                }
                <div className="item-card-image">
                  <img
                    src={image1}
                    alt={item.name}
                  />
                </div>
                &nbsp; <i>{item.category}</i>&nbsp;&nbsp;
                <h3>{item.name}</h3>
                <b>ETB: {item.unitPrice}</b>
                <div className="item-card-user">
                  <img
                  // src={imageUrl}
                  // alt={item.name}
                  />
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
