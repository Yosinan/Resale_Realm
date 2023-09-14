const Product = require('../models/productModel');
const User = require("../models/userModel");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



// Set up multer for file uploads

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads/products');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage: storage });


// Set up routes for products

// Add products (logged in users only)
const addItem = (upload.single('image'), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      unitPrice: req.body.unitPrice,
      description: req.body.description,
      images: {
        data: req.file.buffer,  
        contentType: req.file.mimetype,
      },
      category: req.body.category,
      addedBy: req.user._id,
    })
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).send("Our side" + err);
  }
});

// GET all products
const getItems = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    next(err);
  }
};

// GET a product by ID
// const getItemById = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) { res.send(product); }
//   } catch (err) {
//     next(err);
//   }
// };

// DELETE a product by ID (logged in users and owners of the product only)
const deleteItem = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const product = await Product.findOne({ _id: productId, addedBy: userId });

    if (!product) {
      return res.status(404).send("Product not found or unauthorized to delete.");
    }

    await Product.deleteOne({ _id: productId });
    res.send("Product Deleted");
  } catch (err) {
    next(err);
  }
};

// Edit a product by ID (logged in users and owners of the product only)
const editItem = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const product = await Product.findOne({ _id: productId, addedBy: userId });

    if (!product) {
      return res.status(404).send("Product not found or unauthorized to edit.");
    }

    product.set(req.body);
    const updatedProduct = await product.save();

    res.send(updatedProduct);
  } catch (err) {
    next(err);
  }
};


// search products by name

const searchProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ name: req.params.name });
    res.send(products);
  } catch (err) {
    next(err);
  }
}

// search products by category

const searchProductsByCategory = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.send(products);
  } catch (err) {
    next(err);
  }
}

// search products by price

const searchProductsByPrice = async (req, res, next) => {
  try {
    const products = await Product.find({ unitPrice: req.params.unitPrice });
    res.send(products);
  } catch (err) {
    next(err);
  }
}

// search 

const searchAll = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (minPrice && maxPrice) {
      filter.unitPrice = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.unitPrice = { $gte: minPrice };
    } else if (maxPrice) {
      filter.unitPrice = { $lte: maxPrice };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getItems,
  // getItemById,
  deleteItem,
  addItem,
  editItem,
  searchProducts,
  searchProductsByCategory,
  searchProductsByPrice,
  searchAll
}