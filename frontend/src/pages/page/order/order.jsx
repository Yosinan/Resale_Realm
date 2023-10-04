import React, { useEffect, useState } from 'react'
import './order.css'
import Nav from '../../Landing/nav'
import Sidenav from '../../Landing/sidenav';
import useAuth from '../../../components/hooks/useAuth';
import Status from '../../../components/Status/Status';
import axios from 'axios';
import CustomSelect from './CustomSelect';

const Order = () => {
  // useEffect(() => {

  //   $("#wizard").steps({
  //     headerTag: "h4",
  //     bodyTag: "section",
  //     transitionEffect: "fade",
  //     enableAllSteps: true,
  //     transitionEffectSpeed: 500,
  //     onStepChanging: function (event, currentIndex, newIndex) {

  //       return true;
  //     },
  //     labels: {
  //       // finish: "Home",
  //       next: "Next",
  //       previous: "Previous"
  //     }
  //   });


  //   $('.wizard > .steps li a').click(function () {
  //     $(this).parent().addClass('checked');
  //     $(this).parent().prevAll().addClass('checked');
  //     $(this).parent().nextAll().removeClass('checked');
  //   });


  //   $('.forward').click(function () {
  //     $("#wizard").steps('next');
  //   })
  //   $('.backward').click(function () {
  //     $("#wizard").steps('previous');
  //   })


  //   $('.checkbox-circle label').click(function () {
  //     $('.checkbox-circle label').removeClass('active');
  //     $(this).addClass('active');
  //   })
  // }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState([false, false, false]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setfile] = useState([]);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const authenticated = useAuth();

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

      window.location = "/dashboard";
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

  const handleNextClick = () => {
    const updatedStepStatuses = [...stepStatuses];
    updatedStepStatuses[currentStep] = true;
    setStepStatuses(updatedStepStatuses);

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousClick = () => {
    const updatedStepStatuses = [...stepStatuses];
    updatedStepStatuses[currentStep] = false;
    setStepStatuses(updatedStepStatuses);

    setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (stepIndex) => {
    // const updatedStepStatuses = [...stepStatuses];
    // updatedStepStatuses[stepIndex] = true;
    setCurrentStep(stepIndex);
  };



  return (
    <>
      {successMessage && <Status message={successMessage} type="success" />}
      {errorMessage && <Status message={errorMessage} type="error" />}
      <Nav />
      <Sidenav />
      <div>
        <div class="wrapper ">
          <form onSubmit={handleSubmit}>
            <div className="ordershadow" id="wizard">
              <h3>Post Item</h3>
              <ul className="steps">
                {["", "", "", ""].map((step, index) => (
                  <li key={index} className={`${stepStatuses[index] ? "completed" : ""
                    } ${currentStep === index ? "checked" : ""}`}>
                    <a className='' onClick={() => handleStepClick(index)}>{step}</a>
                  </li>
                ))}
              </ul>
              <h4></h4>
              {currentStep === 0 && (
                <section>
                  <div class="form-row">
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Item Name"
                      value={name}
                      onChange={handleNameChange} />
                  </div>
                  <div class="form-row">
                    <input
                      required
                      type="text"
                      class="form-control"
                      value={price}
                      onChange={handlePriceChange}
                      placeholder="price" />
                  </div>
                  <div class="form-row">
                    <input required
                      type="file"
                      class="form-control"
                      onChange={handleFileChange}
                      multiple={true}
                      placeholder="Add Photo"
                    />
                  </div>
                  <button className='btn btn-primary' onClick={handleNextClick}>Next</button>
                </section>
              )}
              <h4></h4>
              {currentStep === 1 && (
                <section>
                  <div class="form-row">
                    <input
                      // required
                      type="tel"
                      class="form-control"
                      placeholder="phone number" />
                  </div>
                  <div class="form-row">
                    <input
                      // required
                      type="text"
                      class="form-control"
                      placeholder="city" />
                  </div>
                  <div class="form-row">
                    <input
                      // required
                      type="text"
                      class="form-control"
                      placeholder="subcity" />
                  </div>
                  <button className='btn btn-primary' onClick={handlePreviousClick}>Previous</button>
                  <button className='btn btn-primary' onClick={handleNextClick}>Next</button>
                </section>

              )}
              <h4></h4>
              {currentStep === 2 && (
                <section>
                  <div>
                    <CustomSelect
                      category={category}
                      handleCategoryChange={handleCategoryChange}
                    />
                  </div>
                  <br />
                  <div class="form-row" style={{ marginBottom: "18px" }}>
                    <textarea
                      class="form-control"
                      placeholder="Discription"
                      value={description}
                      onChange={handleDescriptionChange}
                      style={{ Height: "108px" }}>
                    </textarea>
                  </div>
                  <div class="form-check">
                    <input
                      // required 
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                      Negotiable
                    </label>
                  </div>
                  <button className='btn btn-primary' onClick={handlePreviousClick}>Previous</button>
                  <button className='btn btn-primary' onClick={handleNextClick}>Next</button>
                </section>
              )}

              <h4></h4>
              {currentStep === 3 && (

                <section className='svg'>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                    <circle class="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline class="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                  </svg>
                  <p class="succes">Ready to Post </p>
                  <button className='btn btn-primary' onClick={handlePreviousClick}>Previous</button>
                  <button type="submit" className='btn btn-secondary'>Post</button>
                </section>
              )}
            </div>
          </form>
        </div>
      </div>

    </>
  )
}


export default Order;
