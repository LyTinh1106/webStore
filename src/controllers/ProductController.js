const Product = require("../models/ProductModel");


const getProduct = (req,res) => {
    res.render('Product')
}
const getStore = (req,res) => {
    res.render('Store')
}


// Create new product
const createProduct = (req, res) => {
  const {
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  } = req.body;

  if (!fancy_id || !name) {
    return res.status(400).json({ message: "fancy_id and name are required!" });
  }

  const newProduct = new Product({
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  });

  Product.create(newProduct, (err, data) => {
    if (err)
      return res.status(500).json({ message: err.message || "Error creating product." });
    res.status(200).json({ message: "Product created successfully", data });
  });
};

// Get all products (optional: filter by name)
const getAllProducts = (req, res) => {
  const name = req.query.name;

  Product.getAll(name, (err, data) => {
    if (err)
      return res.status(500).json({ message: err.message || "Error retrieving products." });
    res.status(200).json({ message: "ok", data });
  });
};

// Get product by ID
const getProductById = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).json({ message: "Product not found." });
      return res.status(500).json({ message: "Error retrieving product." });
    }
    res.status(200).json({ message: "ok", data });
  });
};

// Update product
const updateProduct = (req, res) => {
  const {
    fancy_id, 
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Product name is required!" });
  }

  const updatedProduct = new Product({
    fancy_id,
    name,
    description,
    import_price,
    retail_price,
    brand_id,
    category_id,
    origin,
    warranty,
  });

  Product.updateById(req.params.id, updatedProduct, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).json({ message: "Product not found." });
      return res.status(500).json({ message: "Error updating product." });
    }
    res.status(200).json({ message: "Product updated successfully", data });
  });
};

const deleteProduct = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found")
        return res.status(404).json({ message: "Product not found." });
      return res.status(500).json({ message: "Could not delete product." });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  });
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProduct, 
  getStore
};

