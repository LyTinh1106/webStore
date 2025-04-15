const Shipping = require("../models/ShippingModel");

const getAllShipping = (req, res) => {
  Shipping.getAll((err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Đã xảy ra lỗi khi lấy danh sách vận chuyển." });
    } else {
      res.render("shippingDashboard", { shippings: data });
    }
  });
};

const getShippingById = (req, res) => {
  const id = req.params.id;
  Shipping.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy thông tin vận chuyển với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: `Lỗi truy xuất thông tin vận chuyển với ID ${id}.` });
      }
    } else {
      res.render("shippingDashboard", { shipping: data, mode: "edit" });
    }
  });
};

const createShipping = (req, res) => {
  const { shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address } = req.body;

  if (!shipping_date || !delivery_method || !shipping_status || !id_customer || !id_order || !shipping_address) {
    return res.status(400).render("error", { message: "Thiếu thông tin vận chuyển." });
  }

  const newShipping = new Shipping({ shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address });

  Shipping.create(newShipping, (err, data) => {
    if (err) {
      res.status(500).render("error", { message: err.message || "Lỗi khi tạo vận chuyển." });
    } else {
      res.redirect("/shippings");
    }
  });
};

const updateShippingById = (req, res) => {
  const id = req.params.id;
  const { shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address } = req.body;

  if (!shipping_date || !delivery_method || !shipping_status || !id_customer || !id_order || !shipping_address) {
    return res.status(400).render("error", { message: "Thiếu thông tin để cập nhật vận chuyển." });
  }

  const updatedShipping = new Shipping({ shipping_date, delivery_method, shipping_status, id_customer, id_order, shipping_address });

  Shipping.updateById(id, updatedShipping, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy vận chuyển với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi cập nhật vận chuyển." });
      }
    } else {
      res.redirect("/shippings");
    }
  });
};

const deleteShippingById = (req, res) => {
  const id = req.params.id;

  Shipping.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).render("error", { message: `Không tìm thấy vận chuyển với ID ${id}.` });
      } else {
        res.status(500).render("error", { message: "Lỗi khi xoá vận chuyển." });
      }
    } else {
      res.redirect("/shippings");
    }
  });
};

// 👉 Export toàn bộ
module.exports = {
  createShipping,
  getShippingById,
  getAllShipping,
  updateShippingById,
  deleteShippingById
};
