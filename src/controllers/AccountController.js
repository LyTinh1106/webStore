const connection = require('../config/database')
const accountServices = require('../services/accountServices')



const getHomePage = (req, res) => {
    res.render('HomePage', {
        user: req.user || null
    });
}
const getRegister = (req, res) => {
    res.render('register')
}
const getLogin = (req, res) => {
    res.render('login')
}
const getDashboard = (req, res) => {
    res.render('dashboard')
}

const postRegister = async (req, res) => {
    try {
        const result = await accountServices.createNewUser(req.body);

        if (result.success) {
            return res.redirect('/login'); // hoặc tới trang nào bạn muốn
        } else {
            // Nếu email đã tồn tại, thông báo
            return res.send(`<script>alert("${result.message}"); window.history.back();</script>`);
        }
    } catch (error) {
        console.log("Lỗi khi đăng ký:", error);
        return res.status(500).send("Lỗi server khi đăng ký.");
    }
};

const postLogin = async (req, res) => {
    try {

        console.log("Dữ liệu form gửi lên:", req.body);
        console.log('Session:', req.session);
        const { email, password } = req.body;
        const result = await accountServices.handleUserLogin(email, password);


        if (result.success) {
            req.session.user = {
                email: result.user.email,
                role: result.user.role
            };
            // console.log('Session after login:', req.session); // Debug
            if (result.user.role === 'admin') {
                return res.redirect('/dashboard');
            } else {
                return res.redirect('/HomePage');
            }
        } else {
            return res.send(`<script>alert("${result.message}"); window.history.back();</script>`);
        }
    } catch (error) {
        console.error("Lỗi server khi đăng nhập:", error);
        return res.status(500).send("Lỗi server khi đăng nhập.");
    }
};




module.exports = {
    create,
    findAll,
    findOne,
    findByEmail,
    update,
    remove,
    isAdmin,
    getDashboard,
    getHomePage,
    getRegister,
    getLogin,
    register,
    login
}