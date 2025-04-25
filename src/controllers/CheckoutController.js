const connection = require('../config/database')


const getCart = (req,res) => {
  res.render('cart', {
      user: req.user || null 
    });
};

const getCheckout = (req,res) => {
    res.render('checkout', {
        user: req.user || null 
      });
};


module.exports = {getCheckout, getCart}