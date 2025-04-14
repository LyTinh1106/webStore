const Category = require('../models/CategoryModel');

exports.getAllCategories = (req, res) => {
  Category.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred." });
    else res.send(data);
  });
};

exports.getCategoryById = (req, res) => {
  const id = req.params.id;
  Category.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") res.status(404).send({ message: `Not found category with id ${id}.` });
      else res.status(500).send({ message: "Error retrieving category with id " + id });
    } else res.send(data);
  });
};

exports.createCategory = (req, res) => {
  const newCategory = new Category({ name: req.body.name });
  Category.create(newCategory, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating." });
    else res.send(data);
  });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  Category.updateById(id, new Category(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") res.status(404).send({ message: `Not found category with id ${id}.` });
      else res.status(500).send({ message: "Error updating category with id " + id });
    } else res.send(data);
  });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  Category.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") res.status(404).send({ message: `Not found category with id ${id}.` });
      else res.status(500).send({ message: "Could not delete category with id " + id });
    } else res.send({ message: "Category deleted successfully!" });
  });
};
