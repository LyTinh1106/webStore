const express = require('express');
const apiRouters = express.Router();

const Brand = require('./brand');
const Product = require('./product');
const Voucher = require('./voucher');
const Supplier = require('./supplier');
const Cart = require('./cart');
const Category = require('./category');
const Order = require('./order');
const OrderDetail = require('./orderdetail');
const ProductDetail = require('./productdetail');
const ProductImage = require('./productimage');
const Importing = require('./importing');
const ImportingDetail = require('./importingdetail');
const Shipping = require('./shipping');
const Customer = require('./customer');
const Account = require('./account')
const Checkout = require('./checkout')


    // ✅ Dùng đúng biến apiRouters
    apiRouters.use('/brand', Brand);
    apiRouters.use('/product', Product);
    apiRouters.use('/voucher', Voucher);
    apiRouters.use('/supplier', Supplier);
    apiRouters.use('/cart', Cart);
    apiRouters.use('/account', Account);  
    apiRouters.use('/category', Category);
    apiRouters.use('/order', Order);
    apiRouters.use('/order-detail', OrderDetail);
    apiRouters.use('/product-detail', ProductDetail);
    apiRouters.use('/product-image', ProductImage);
    apiRouters.use('/importing', Importing);
    apiRouters.use('/importing-detail', ImportingDetail);
    apiRouters.use('/shipping', Shipping);
    apiRouters.use('/customer', Customer);
    apiRouters.use('/checkout',Checkout)

module.exports = apiRouters;
