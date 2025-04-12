


const getProduct = (req,res) => {
    res.render('Product')
}
const getStore = (req,res) => {
    res.render('Store')
}

module.exports = {getProduct, getStore}