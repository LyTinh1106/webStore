const connection = require('../config/database')



const getCheckout = (req,res) => {
    res.render('checkout', {
        user: req.user || null 
      });
};


module.exports = {getCheckout}