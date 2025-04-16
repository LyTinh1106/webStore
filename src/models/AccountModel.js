const sql = require('../config/database')

const Account = function(account){
  this.email = account.email
  this.password = account.password
  this.role = account.role  
}

Account.create = (newAccount, result) => {
  sql.query("INSERT INTO account SET ?", newAccount, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created account: ", { id: res.insertId, ...newAccount });
    result(null, { id: res.insertId, ...newAccount });
  });
};


Account.findById = (id, result) => {
  sql.query(`SELECT * FROM account WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found account: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Account.findByEmail = (email, result) => {
  sql.query("SELECT * FROM account WHERE email = ?", [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


Account.getAll = (email, result) => {
  let query = "SELECT * FROM account";
  let params = [];

  if (email) {
    query += " WHERE email LIKE ?";
    params.push(`%${email}%`);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("account: ", res);
    result(null, res);
  });
};

Account.updateById = (id, account, result) => {
  sql.query(
    "UPDATE account SET email = ?, password = ?, role = ? WHERE id = ?",
    [account.email, account.password, account.role, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Không tìm thấy account với id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated account: ", { id: id, ...account });
      result(null, { id: id, ...account });
    }
  );
};

Account.remove = (id, result) => {
  sql.query("DELETE FROM account WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted account with id: ", id);
    result(null, res);
  });
};
Account.isAdmin = (email, result) => {
  sql.query("SELECT role FROM account WHERE email = ?", [email], (err, res) => {
    if (err) return result(err, null);
    if (res.length > 0 && res[0].role === "admin") {
      return result(null, true);
    }
    return result(null, false);
  });
};

Account.updatePasswordByEmail = (email, hashedPassword, result) => {
  sql.query(
    "UPDATE account SET password = ? WHERE email = ?",
    [hashedPassword, email],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    }
  );
};


module.exports = Account;