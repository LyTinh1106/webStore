const session = require('express-session');
const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).send("Bạn không có quyền truy cập trang này.");
    }
};
function checkLogin(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      
      return next();
    }
  
    if (req.session && req.session.user) {
      
      return next();
    }
  
    
    return res.redirect('/login');
  }
  
  

module.exports = { checkAdmin,checkLogin };