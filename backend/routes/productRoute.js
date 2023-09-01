const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const auth = require("../middlewares/auth");
const {  getItems, getItemById, addItem, editItem, deleteItem } = require("../controllers/productController");
app.use(cors());
// using the APIs
router.post("/api/products/add", auth, addItem);
router.put("/api/products/edit/:id", auth, editItem);
router.delete("/api/products/delete/:id", auth, deleteItem);
router.get("/api/products/", getItems);
router.get("/api/products/:id", getItemById);

const Product =require('../models/productModel');

router.get("/api/pro", async (req, res) => {
    try {
      const { search, category, price } = req.query;
  
      // Construct the query based on the provided criteria
      const query = {};
  
      if (search) {
        query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
      }
  
      if (category) {
        query.category = category;
      }
  
      if (price) {
        const [minPrice, maxPrice] = price.split('-');
        query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
      }
  
      // Query the database
      const products = await Product.find(query);
  
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
