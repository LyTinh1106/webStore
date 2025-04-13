const sql = require('../config/database');

const Voucher = function (voucher) {
  this.voucher_code = voucher.voucher_code;
  this.voucher_value = voucher.voucher_value;
  this.date_start = voucher.date_start;
  this.date_end = voucher.date_end;
};

Voucher.create = (newVoucher, result) => {
  sql.query('INSERT INTO voucher SET ?', newVoucher, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created voucher: ', { id: res.insertId, ...newVoucher });
    result(null, { id: res.insertId, ...newVoucher });
  });
};

Voucher.findById = (id, result) => {
  sql.query('SELECT * FROM voucher WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found voucher: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Voucher.getAll = (code, result) => {
  let query = 'SELECT * FROM voucher';
  let params = [];

  if (code) {
    query += ' WHERE voucher_code LIKE ?';
    params.push(`%${code}%`);
  }

  sql.query(query, params, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('vouchers: ', res);
    result(null, res);
  });
};

Voucher.updateById = (id, voucher, result) => {
  sql.query(
    'UPDATE voucher SET voucher_code = ?, voucher_value = ?, date_start = ?, date_end = ? WHERE id = ?',
    [voucher.voucher_code, voucher.voucher_value, voucher.date_start, voucher.date_end, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated voucher: ', { id: id, ...voucher });
      result(null, { id: id, ...voucher });
    }
  );
};

Voucher.remove = (id, result) => {
  sql.query('DELETE FROM voucher WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted voucher with id: ', id);
    result(null, res);
  });
};

module.exports = Voucher;
