import React, { useState, useEffect } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faLaptop, faTshirt, faBook, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './PostItems.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Message from "../Message/Message";
import CustomSelect from './CustomSelect';
// import { getToken } from "../../utils/utils";


const postStyles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '140vh',
        flexDirection: 'column',
        fontSize: '2rem',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        // background: 'rgba(255, 255, 255, 0.15)', /* Background color with opacity */
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Box shadow for depth */
        padding: '20px',
        width: '600px', /* Adjust the width as needed */
        margin: '0 auto', /* Center the form horizontally */
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '110vh',
        backgroundColor: '#3d2c1a',
        borderRadius: '30px',
        boxShadow: '0 0 10px #000',
        padding: '20px',
    },
    input: {
        width: '60%',
        height: '200px',
        padding: '10px',
        margin: '10px',
        border: 'none',
        borderRadius: '15px',
        fontSize: '1rem',
        backgroundColor: 'lightblue'
    },

    button: {
        width: '50%',
        padding: '10px',
        margin: '10px',
        border: 'none',
        borderRadius: '45px',
        fontSize: '30px',
        cursor: 'pointer',
        backgroundColor: '#3c3c3c',
        color: '#1a13d1',
        fontWeight: 'bold',
        

    },
    label: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff',
    }
}


function PostItems() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setfile] = useState([]);
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState(null);


    const handleNameChange = (event) => {
        setName(event.target.value);
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

    const handleCategoryChange = (category) => {
        console.log(category);
        setCategory(category);
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
            <div style={postStyles.container}>
                <h2>Post Your Item Here</h2>
                <form onSubmit={handleSubmit} style={postStyles.form}>

                    <label
                        style={postStyles.label}
                        htmlFor="nameInput">Item Name:
                    </label>
                    <input
                        style={postStyles.input}
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                        placeholder='Enter Item Name'
                    />
                    <br />
                    <label
                        style={postStyles.label}
                        htmlFor="priceInput">Price:
                    </label>
                    <input
                        style={postStyles.input}
                        id="priceInput"
                        value={price}
                        onChange={handlePriceChange}
                        required
                        type="number"
                        placeholder='Enter Price in ETB'
                    />
                    <br />
                    <label
                        style={postStyles.label}
                        htmlFor="descriptionInput">Description:
                    </label>
                    <textarea
                        style={postStyles.input}
                        id="descriptionInput"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        type="text"
                        placeholder='Enter Description'
                    />
                    <br />
                    <label
                        style={postStyles.label}
                        htmlFor="imageInput">Image:
                    </label>
                    <input
                        style={postStyles.input}
                        id="imageInput"
                        onChange={handleFileChange}
                        //  required
                        type="file"
                        multiple={true}
                    />
                    <br />
                    <label
                        style={postStyles.label}
                        htmlFor="categoryInput">Category:
                    </label>
                    {/* <select
                        // style={postStyles.input}
                        style={customSelectStyle}
                        id="categoryInput"
                        value={category}
                        onChange={handleCategoryChange} required>
                        <option style={optionStyle} value="">
                            <FontAwesomeIcon style={iconStyle} icon={faQuestionCircle} size='1px'/>
                            Select a category
                        </option>
                        <option style={optionStyle} value="Electronics">
                            <FontAwesomeIcon style={iconStyle} icon={faLaptop} />
                            Electronics
                        </option>
                        <option style={optionStyle} value="Clothing">
                            <FontAwesomeIcon style={iconStyle} icon={faTshirt} />
                            Clothing
                            </option>
                        <option style={optionStyle} value="Furniture">
                            <FontAwesomeIcon style={iconStyle} icon={faCouch} />
                            Furniture
                            </option>
                        <option style={optionStyle} value="Books">
                            <FontAwesomeIcon style={iconStyle} icon={faBook} />
                            Books
                            </option>
                        <option style={optionStyle} value="Other">
                            <FontAwesomeIcon style={iconStyle} icon={faQuestionCircle} />
                            Other
                            </option>
                    </select> */}
                    <CustomSelect 
                    category={category}
                    handleCategoryChange={handleCategoryChange}
                    />
                    <br />
                    <button
                        style={postStyles.button}
                        type="submit"
                    >Publish</button>
                </form>
                
                {message && <Message text={message.text} type={message.type} />}
            </div>
        </>
    )
}

export default PostItems