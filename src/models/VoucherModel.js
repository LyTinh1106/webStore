const sql = require('../config/database');

// Hàm hỗ trợ định dạng ngày giờ thành YYYY-MM-DD HH:mm:ss
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0') + ' ' +
    String(d.getHours()).padStart(2, '0') + ':' +
    String(d.getMinutes()).padStart(2, '0') + ':' +
    String(d.getSeconds()).padStart(2, '0');
};

const Voucher = function (voucher) {
  this.voucher_code = voucher.voucher_code;
  this.voucher_value = voucher.voucher_value;
  this.date_start = voucher.date_start ? formatDate(voucher.date_start) : null;
  this.date_end = voucher.date_end ? formatDate(voucher.date_end) : null;
};

Voucher.create = (newVoucher, result) => {
  const formattedVoucher = {
    ...newVoucher,
    date_start: newVoucher.date_start ? formatDate(newVoucher.date_start) : null,
    date_end: newVoucher.date_end ? formatDate(newVoucher.date_end) : null
  };

  sql.query('INSERT INTO voucher SET ?', formattedVoucher, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created voucher: ', { id: res.insertId, ...formattedVoucher });
    result(null, { id: res.insertId, ...formattedVoucher });
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
      const voucher = {
        ...res[0],
        date_start: res[0].date_start ? formatDate(res[0].date_start) : null,
        date_end: res[0].date_end ? formatDate(res[0].date_end) : null
      };
      console.log('found voucher: ', voucher);
      result(null, voucher);
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

    const formattedVouchers = res.map(voucher => ({
      ...voucher,
      date_start: voucher.date_start ? formatDate(voucher.date_start) : null,
      date_end: voucher.date_end ? formatDate(voucher.date_end) : null
    }));

    // console.log('vouchers: ', formattedVouchers);
    result(null, formattedVouchers);
  });
};

Voucher.updateById = (id, voucher, result) => {
  const formattedVoucher = {
    ...voucher,
    date_start: voucher.date_start ? formatDate(voucher.date_start) : null,
    date_end: voucher.date_end ? formatDate(voucher.date_end) : null
  };

  sql.query(
    'UPDATE voucher SET voucher_code = ?, voucher_value = ?, date_start = ?, date_end = ? WHERE id = ?',
    [formattedVoucher.voucher_code, formattedVoucher.voucher_value, formattedVoucher.date_start, formattedVoucher.date_end, id],
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

      console.log('updated voucher: ', { id: id, ...formattedVoucher });
      result(null, { id: id, ...formattedVoucher });
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