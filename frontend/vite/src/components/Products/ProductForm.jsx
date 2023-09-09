// import React, { useState } from 'react';

// function ProductForm({ onAddProduct }) {
//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         image: null,
//         price: '',
//         contactInfo: '',
//         location: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setProduct({ ...product, image: file });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();
//             formData.append('name', product.name);
//             formData.append('description', product.description);
//             formData.append('image', product.image);
//             formData.append('price', product.price);
//             formData.append('contactInfo', product.contactInfo);
//             formData.append('location', product.location);

//             const response = await fetch('http://localhost:5000/api/products/add', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 const newProduct = await response.json();
//                 onAddProduct(newProduct);
//                 setProduct({
//                     name: '',
//                     description: '',
//                     image: null,
//                     price: '',
//                     contactInfo: '',
//                     location: '',
//                 });
//             } else {
//                 console.error('Failed to add product');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };


//     const cities = ['Addis Ababa', 'Hawassa', 'Dire Dawa', 'Adama'];

//     return (
//         <div>
//             <h2>Add a Product</h2>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <input
//                     type="text"
//                     name="name"
//                     value={product.name}
//                     onChange={handleInputChange}
//                     placeholder="Product Name"
//                     required
//                 /> <br />
//                 <input
//                     type="text"
//                     name="description"
//                     value={product.description}
//                     onChange={handleInputChange}
//                     placeholder="Product Description"
//                     required
//                 /> <br />
//                 <input
//                     type="file"
//                     accept="image/*"
//                     name="image"
//                     onChange={handleImageChange}
//                     required
//                 /> <br />
//                 <input
//                     type="number"
//                     name="price"
//                     value={product.price}
//                     onChange={handleInputChange}
//                     placeholder="Price"
//                     required
//                 /> <br />
//                 <input
//                     type="text"
//                     name="contactInfo"
//                     value={product.contactInfo}
//                     onChange={handleInputChange}
//                     placeholder="Contact Info"
//                     required
//                 />
//                 <br />
//                 <label htmlFor="location">Location:</label>
//                 <select
//                     id="location"
//                     name="location"
//                     value={product.location}
//                     onChange={handleInputChange}
//                     required
//                 >
//                     <option value="">Select a city</option>
//                     {cities.map((city, index) => (
//                         <option key={index} value={city}>
//                             {city}
//                         </option>
//                     ))}
//                 </select>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default ProductForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import './Prod.css';
import { getCookie } from "../../utils/utils";
import image from '../../assets/images/icon.jpeg';

function ProductForm() {
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
            // const token = getCookie('Token');
            const token = localStorage.getItem('Token');
            const response = await axios.get("http://localhost:5000/api/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCreatedAt(response.data.createdAt);
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
            //   setErrorMessage("Error fetching items. Please try again.");
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
            itemTitle: itemTitle,
            content: content,
        };

        try {
            // const token = localStorage.getItem('Token');
            // const token = getCookie('Token');
            await axios.post("http://localhost:5000/api/products/add", postData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItemTitle("");
            setContent("");
            fetchitems(); // Refresh items after successful post
            //   setSuccessMessage("post published successfully.");
            setMessage("Post published successfully.");
        } catch (error) {
            alert('Login to post');
            console.error("Error posting item:", error);
            //   setErrorMessage("Error posting item. Please try again.");
            setMessage("Error posting item:", error);
        }
    };


    return (
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
                        />
                    </div>
                    <div>
                        <label htmlFor="contentInput">Content:</label>
                        <textarea
                            id="contentInput"
                            value={content}
                            onChange={handleContentChange}
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
                            <h3>{item.itemTitle}Smart Phone</h3>

                        <div className="item-card-image">
                            <img
                                src={image}
                                alt={item.itemTitle}

                            />
                        </div>
                            <p>{item.content}</p>

                            
                                <div className="item-card-user">
                                    <img
                                        src={currentUser?.profilePictureUrl}
                                        alt={currentUser?.username}
                                    />
                                    <p>Iphone 14</p>
                                    <span>{currentUser?.username}</span>
                                    </div>
                                    

                            <i className="created-at">Posted at: {new Date().toLocaleString()}</i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductForm;