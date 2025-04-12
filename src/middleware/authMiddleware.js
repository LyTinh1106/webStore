const session = require('express-session');
const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next(); // Cho phép vào
    } else {
        res.status(403).send("Bạn không có quyền truy cập trang này.");
    }
};


module.exports = { checkAdmin };