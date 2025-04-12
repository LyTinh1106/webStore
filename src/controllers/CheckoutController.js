const connection = require('../config/database')



const getCheckout = (req,res) => {
    res.render('checkout')
}


module.exports = {getCheckout}