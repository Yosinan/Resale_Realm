import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import './Prod.css';
// import './Dashboard.css';
import './cust-css.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOut, 
  faTimes, 
  faHeart, 
  faChevronLeft, 
  faChevronRight,
  faSortAlphaAsc,
  faSort,
  faClock,
  faArrowLeft,
  faArrowRight,
  faDollarSign,
  faSortAmountUp,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import Status from "../Status/Status";
import { getToken } from "../../utils/utils";
import { handlelogout } from "../../utils/logOut";
import image1 from '../../assets/images/icon.jpeg';
import Footer from '../Footer/Footer'


function Dashboard() {


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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [addedBy, setAddedBy] = useState(null);
  const [data, setData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSort, setShowSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");
  const [currenPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);



  const itemsToDisplay = items.slice(
    (currenPage - 1) * itemsPerPage,
    currenPage * itemsPerPage
  );


  function handlePageChange() {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currenPage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {/* <span>
          Page {currenPage} of {totalPages}
        </span> */}
        <div className="page-numbers">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={'pagination-button'}
              disabled={pageNumber === currenPage}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currenPage === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }


  useEffect(() => {
    // Fetch the current user information
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        // console.log(token)
        setCurrentUser(user);
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
          setCreatedAt(response.data.dateAdded);
          console.log(token)
          setItems(response.data);
        }
        else {
          console.log('Failed')
        }

      } catch (error) {
        console.error("Error fetching items:", error);
        handleError();

      }
    };
    fetchitems();
  }, [sortOption, sortOrder, filterOption, minPrice, maxPrice]);


  const handleSortOptionChange = (val) => {

    if (val === "name") {
      setSortOption("name");
    }
    if (val === "price") {
      setSortOption("unitPrice");
    }

    if (val == 'highest') {
      setSortOption("unitPrice");
      setSortOrder("desc");
    }

    if (val == 'lowest') {
      setSortOption("unitPrice");
      setSortOrder("asc");
    }

    if (val === "oldest") {
      setSortOption("dateAdded");
      setSortOrder("asc");
    }

    if (val === "newest") {
      setSortOption("dateAdded");
      setSortOrder("desc");
    }


  };

  const sortingOptions = [
    { label: 'Default', icon: faSort },
    { label: 'A-Z', icon: faSortAlphaAsc },
    { label: 'Highest Price First', icon: faArrowUp },
    { label: 'Lowest Price First', icon: faArrowDown },
    { label: 'Newest First', icon: faClock },
    { label: 'Oldest First', icon: faClock },
  ];

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


  const handleSearchChange = async (event) => {
    const { value } = event.target;
    if (value) {
      try {
        const token = getToken();
        const response = await axios.get(`http://localhost:5000/api/products/search?name=${value}`, {
          headers: {

            Authorization: `Bearer ${token}`,
          },

        });
        if (response.status === 200) {
          console.log('Success')
          console.log(response.data)
          setItems(response.data);
        }
        else {
          console.log('Failed')
        }

      } catch (error) {
        console.error("Error fetching items:", error);
        handleError();

      }
    }
  };


  const openSort = () => {
    setShowSort(!showSort);
  };

  const filteredOptions = sortingOptions.filter((option) => option.label !== selectedOption);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option === "Default") {
      setSortOption("");
      setSortOrder("");
    }
    if (option === "A-Z") {
      setSortOption("name");
      setSortOrder("asc");
    }
    if (option === "Highest Price First") {
      setSortOption("unitPrice");
      setSortOrder("desc");
    }
    if (option === "Lowest Price First") {
      setSortOption("unitPrice");
      setSortOrder("asc");
    }
    if (option === "Newest First") {
      setSortOption("dateAdded");
      setSortOrder("desc");
    }
    if (option === "Oldest First") {
      setSortOption("dateAdded");
      setSortOrder("asc");
    }

    setShowSort(false);
  };




  const openProductDetails = (productId) => {
    const product = items.find((p) => p.id === productId);
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleLogOut = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      localStorage.removeItem('Token');
      window.location.href = '/';
    }
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


  return (
    <>
      {successMessage && <Status message={successMessage} type="success" />}
      {errorMessage && <Status message={errorMessage} type="error" />}
      <div className="main-container">
        <button className='logout' onClick={handleLogOut}><FontAwesomeIcon bounce={true} spinReverse={true} icon={faSignOut} /></button>
        <h2>Products</h2>
        <p>Showing {items.length} items</p>
        <br />
        <div className="toggleDropdown">
        <p style={{ textAlign: 'right', marginRight: '90px' }} >Sort By: 
            <span style={{ cursor: 'pointer' }} onClick={() => { openSort() }}> <FontAwesomeIcon icon={faSort} style={{ marginLeft: '10px' }} />  {selectedOption}</span></p>
        </div>
        <br />
        {showSort && (
          <div className="sort-options">
            <div className="in-sort-options">
              <ul>
                {filteredOptions.map((option) => (
                  <li key={option.label} onClick={(e) => handleOptionSelect(option.label)}>
                    <FontAwesomeIcon icon={option.icon} style={{ marginRight: '10px' }} />
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}
        <br />
        <div className="container">
          <div className="sidebar">
            <div className="in-sidebar">
              <br />
              {/* <button className="clear" onClick={() => {
                setSortOption("");
                setSortOrder("");
                setFilterOption("");
                document.querySelectorAll('input[type="checkbox"]:checked').forEach((el) => el.checked = false);
                document.querySelectorAll('input[type="radio"]:checked').forEach((el) => el.checked = false);
                setMinPrice("");
                setMaxPrice("");
              }}>Reset</button>
              <br />
              <input
                type='search'
                placeholder='Search'
                value={data}
                onChange={handleSearchChange} />
              <br />
              <div className="sort-options">
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
              </div>
              <div className="filter-methods">

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
                </select> */}
              <br />
              <div className="price-range">
                <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
              <br />

            </div>
          </div>

          {/* Main content */}
          <div className="content">
            {items.length === 0 && <p className="no-item">No items found.</p>}
            {itemsToDisplay.map((item) => (
              <div key={item.id} className="product-item" onClick={() => openProductDetails(item.id)}>
                <div className="item-card-image">
                  <img
                    src={`../uploads/img/${item.images[0].filename}`}
                    alt={"Uploaded" + item.images[0].filename}
                  />
                </div>
                <div >
                </div>
                <h3>{item.name}</h3>
                <b>ETB: {item.unitPrice}</b>

                {/* {console.log('added by : ' + item.addedBy + ' User: ' + currentUser.__id)} */}

                {currentUser && currentUser.__id === item.addedBy ? (
                  <p>

                    <i className="created-at">Your Post</i>
                  </p>
                ) : (
                  <p>
                    <i className="created-at">Posted By: </i>
                    <i className="created-at">{item.addedBy.name}</i>
                  </p>
                )
                }
                {/* <i className="created-at">Posted at: {item.dateAdded}</i> */}
              </div>
            ))}

            {selectedProduct && (
              <div className="product-details-modal">
                <div className="product-details">
                  <button className="close-button" onClick={closeProductDetails}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <h2>{selectedProduct.name}</h2>
                  <i>{selectedProduct.images.length}</i> &nbsp;
                  {selectedProduct.images.length > 1 ? (
                    <span>Images</span>
                  ) : (
                    <span>Image</span>
                  )}
                  <div className="product-images">
                    <button className="prev-button" onClick={handlePrevImage}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <img src={`../uploads/img/${selectedProduct.images[currentImageIndex].filename}`} alt={selectedProduct.name} />
                    <button className="next-button" onClick={handleNextImage}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                  <p className="description">Description: {selectedProduct.description}</p>
                  <p className="created-at">Category: {selectedProduct.category}</p>
                  <p className="price">ETB: {selectedProduct.unitPrice}</p>
                  <p className="created-at">Posted at: {moment(selectedProduct.dateAdded).format("DD/MM/YYYY")}</p>
                  <p className="created-at">Posted By: {selectedProduct.addedBy}</p>

                </div>
              </div>
            )}
          </div>
        </div>
        {handlePageChange()}
      </div>
     
      <Footer />
    </>
  );
}

export default Dashboard;
