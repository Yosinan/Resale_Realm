import React from 'react'
import { useEffect, useState } from 'react';
import './order.css'
import Nav from '../../landingNew/nav';
import Sidenav from '../../landingNew/sidenav';
import CustomSelect from './CustomSelect'
import axios from 'axios';
import Status from '../../../../utils/Status';


export const Order = () => {


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setfile] = useState([]);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


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
      handleSuccess();
    } catch (error) {

      console.error("Error posting item:", error.message);
      handleError();
    }
  };

  const handleSuccess = () => {
    setSuccessMessage('Item posted successfully.');
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

    $("#wizard").steps({
      headerTag: "h4",
      bodyTag: "section",
      transitionEffect: "fade",
      enableAllSteps: true,
      transitionEffectSpeed: 500,
      onStepChanging: function (event, currentIndex, newIndex) {

        return true;
      },
      labels: {
        // finish: "Home",
        next: "Next",
        previous: "Previous"
      }
    });


    $('.wizard > .steps li a').click(function () {
      $(this).parent().addClass('checked');
      $(this).parent().prevAll().addClass('checked');
      $(this).parent().nextAll().removeClass('checked');
    });


    $('.forward').click(function () {
      $("#wizard").steps('next');
    })
    $('.backward').click(function () {
      $("#wizard").steps('previous');
    })

    $('.checkbox-circle label').click(function () {
      $('.checkbox-circle label').removeClass('active');
      $(this).addClass('active');
    })
  }, []);
  return (
    <>
      <Nav />
      <Sidenav />
      <div>
        <div class="wrapper ">
          <form onSubmit={handleSubmit} >
            <div className="ordershadow" id="wizard">
              <h4></h4>
              <section>
                <div class="form-row">
                  <input type="text" class="form-control" placeholder="Item Name" onChange={handleNameChange} value={name} required />
                </div>
                <div class="form-row">
                  <input type="text" class="form-control" placeholder="price" onChange={handlePriceChange} value={price} required />
                </div>
                <div class="form-row">
                  <input type="file" class="form-control" placeholder="photo add" multiple="true" onChange={handleFileChange} required />
                </div>
              </section>
              <h4></h4>
              <section>
                <div class="form-row"> <input type="tel" class="form-control" placeholder="phone number" required /> </div>
                <div class="form-row"> <input type="text" class="form-control" placeholder="city" required /> </div>
                <div class="form-row"> <input type="text" class="form-control" placeholder="subcity" /> </div>
              </section>
              <h4></h4>
              <section>
                <div>
                  Category:
                  {/* <CustomSelect
                    // category={category}
                    // handleCategoryChange={handleCategoryChange}
                  /> */}
                  <select name="" id="" class="form-control" onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <br />
                <div class="form-row" style={{ marginBottom: "18px" }}>
                  <textarea name="" id="" class="form-control" value={description}
                    onChange={handleDescriptionChange} placeholder="Discription" style={{ Height: "108px" }}>
                  </textarea>
                </div>
              </section>
              <h4></h4>
              <section>
                {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                  <circle class="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                  <polyline class="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg> */}
                <p class="succes">Upload  successfully. </p>
                <button
                  type="submit"
                >Publish</button>
                {successMessage && <Status message={successMessage} type="success" />}
                {errorMessage && <Status message={errorMessage} type="error" />}
              </section>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
