import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "../../../api";
// import aa from "../../../images/R.jpeg"

function UpdateProductForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [loadimage, setLoadImage] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get("");
 
//     setLoadImage(data.map(image => ({
//       name: image.name,
//       description: image.description,
//       img_path: image.img_path
//     })));
  };


  const handleSubmission = async (e) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", name);
    formData.append("desc", desc);
    await fetch("", {
      method: "POST",
      body: formData,
    })
    .then((result) => {
      loadList();
    })
    .catch(() => {
      alert('Error in the Code');
    });
  };

  const deleteImage = (productId) => {
    axios.get('' + productId)
      .then((result) => {
        loadList();
      })
      .catch(() => {
        alert('Error in the Code');
      });
  };

  return (
    <div className="container">
      <h4 class="text-center text-success  ml-4 mb-4 mt-4">Post page</h4>
      <div className="row">
        <div className="col-sm-3 p-2 bg-gray">
          <div className="box mr-4" style={{ border: "1px solid #b7b7b7", backgroundColor: "#rgb(253 253 253);" }}>
            <h5 class="text-center  ml-4 mb-3 mt-3">Add Image</h5>
            <table className="">
              <tr>
                <td>
                  <div class="form-group ml-3">
                    <input type="text" name="name"
                      className="mb-4"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Country Name"
                    />
                  </div>
                  <div class="form-group ml-3">
                    <input type="text" name="name"
                      className="mb-4"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Country Name"
                    />
                  </div>
                  <div class="form-group ml-3">
                    <input type="text" name="name"
                      className="mb-4"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Country Name"
                    />
                  </div>
                  <div class="form-group ml-3">
                    <input type="text" name="name"
                      className="mb-4"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Country Name"
                    />
                  </div>
                  <div class="form-group ml-3">
                    <input type="text" name="name"
                      className="mb-4"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Country Name"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="form-group">
                    <textarea type="text" name="desc"
                      className="mb-4"
                      rows="3"
                      cols="23"
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Write Description"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="form-group">
                    <input type="file" name="file"
                      className="mb-4"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </div>
                </td>
              </tr>


          </table>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="row">
            {loadimage.map((name) => (
              <div className="col-sm-3">
                <div class="card mb-3" style={{width:"12rem"}}>
                    <h5><a  href="#" onClick={() => deleteImage(name.id)} style={{textDecoration:"none",marginLeft:"162px"}}>
                      <span aria-hidden="true" className="text-danger">&times;</span>
                    </a></h5>
                    <img class="card-img-top hover-shadow" src={ name.img_path} alt="Card image cap" style={{height:"110px"}}/>
                   
                    <div class="card-body">
                    <h6>{name.name}</h6>
                      <span class="card-text">{name.description}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProductForm;