const Brand = require("../models/BrandModel");


const createBrand = (req, res) => {
  if (!req.body.brand_name) {
    return res.status(400).send({ message: "brand_name is required!" });
  }

  const brand = new Brand({ brand_name: req.body.brand_name });

  Brand.create(brand, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred." });
    else res.status(200).send({ message: "ok", data });
  });
};


const getAllBrands = (req, res) => {
  const name = req.query.name;

  Brand.getAll(name, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred." });
    else res.status(200).send({ message: "ok", data });
  });
};


const getBrandById = (req, res) => {
  Brand.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") res.status(404).send({ message: "Brand not found." });
      else res.status(500).send({ message: "Error retrieving brand." });
    } else res.status(200).send({ message: "ok", data });
  });
};


const updateBrand = (req, res) => {
  if (!req.body.brand_name) {
    return res.status(400).send({ message: "brand_name is required!" });
  }

  Brand.updateById(req.params.id, new Brand(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") res.status(404).send({ message: "Brand not found." });
      else res.status(500).send({ message: "Error updating brand." });
    } else res.status(200).send({ message: "ok", data });
  });
};

// Delete brand
const deleteBrand = (req, res) => {
  Brand.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") res.status(404).send({ message: "Brand not found." });
      else res.status(500).send({ message: "Could not delete brand." });
    } else res.status(200).send({ message: "ok" });
  });
};


module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};