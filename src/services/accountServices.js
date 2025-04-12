const connection = require('../config/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hàm tạo người dùng mới
const createNewUser = async (data) => {
    try {
        // 🔍 Kiểm tra email đã tồn tại chưa
        const checkQuery = `SELECT * FROM account WHERE email = ?`;
        const [existingUsers] = await connection.promise().query(checkQuery, [data.email]);

        if (existingUsers.length > 0) {
            return { success: false, message: 'Email đã tồn tại!' };
        }

        // 🧂 Mã hóa mật khẩu
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);

        // ✅ Thêm người dùng mới
        const insertQuery = `INSERT INTO account (email, password, role) VALUES (?, ?, ?)`;
        const values = [data.email, hashPasswordFromBcrypt, 'customer'];

        const [rows] = await connection.promise().query(insertQuery, values);

        return { success: true, message: 'Đăng ký thành công!', userId: rows.insertId };
    } catch (error) {
        console.log("Error creating new user: ", error);
        throw error;
    }
};


// Hàm mã hóa mật khẩu
let hashUserPassword = async (password) => {
    try {
        // Dùng bcrypt.hash để mã hóa mật khẩu bất đồng bộ
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword; // Trả kết quả về
    } catch (error) {
        throw error; // Nếu có lỗi thì ném lỗi lên
    }
};



const handleUserLogin = async (email, password) => {
    try {
        const query = `SELECT * FROM account WHERE email = ?`;
        const [rows] = await connection.promise().query(query, [email]);

        if (rows.length === 0) {
            return { success: false, message: "Email không tồn tại!" };
        }

        const user = rows[0];
        

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return { success: false, message: "Mật khẩu không đúng!" };
        }

        return {
            success: true,
            message: "Đăng nhập thành công!",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };

    } catch (error) {
        console.log("Login error:", error);
        throw error;
    }
};

const isAdmin = async (email) =>{
    const query = `SELECT role FROM account WHERE email = ?`;
    const [rows] = await connection.promise().query(query, [email]);
    if(rows.length > 0 && rows[0].role === "admin")
        return true;
    return false
}



module.exports = { createNewUser,handleUserLogin, isAdmin };
