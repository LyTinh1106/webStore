const connection = require('../config/database')
const accountServices = require('../services/accountServices')




const getHomePage = (req,res) => {
    res.render('HomePage')
}
const getRegister = (req,res) => {
    res.render('register')
}
const getLogin = (req,res) => {
    res.render('login')
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
        const { email, password } = req.body;
        const result = await accountServices.handleUserLogin(email, password);
        

        if (result.success) {
            // ✅ Đăng nhập thành công, chuyển đến trang homepage
            return res.redirect('HomePage');
        } else {
            // ❌ Sai thông tin
            return res.send(`<script>alert("${result.message}"); window.history.back();</script>`);
        }

    } catch (error) {
        return res.status(500).send("Lỗi server khi đăng nhập.");
    }
};




module.exports = {
    getHomePage,
    getRegister,
    getLogin,
    postRegister,
    postLogin

}