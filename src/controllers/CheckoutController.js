const connection = require('../config/database');
const https = require('https');
const crypto = require('crypto');

const getCart = (req, res) => {
  res.render('cart', {
    user: req.user || req.session.user || null,
  });
};

const getCheckout = (req, res) => {
  res.render('checkout', {
    user: req.user || req.session.user || null,
  });
};

// Hàm tạo thanh toán MoMo
const createMomoPayment = (req, res) => {
  const partnerCode = process.env.MOMO_PARTNER_CODE;
  const accessKey = process.env.MOMO_ACCESS_KEY;
  const secretkey = process.env.MOMO_SECRET_KEY;
  const requestId = partnerCode + new Date().getTime();
  const baseOrderId = req.query.orderId || "default";
  const orderId = `${baseOrderId}-${Date.now()}`;
  const orderInfo = "Thanh toán đơn hàng qua MoMo";
  const redirectUrl = process.env.MOMO_REDIRECT_URL;
  const ipnUrl = process.env.MOMO_IPN_URL;
  const amount = req.query.amount;
  const requestType = "captureWallet";
  const extraData = "";

  // Tạo chuỗi raw signature
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // Tạo chữ ký SHA256
  const signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');

  // Tạo body gửi MoMo
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'vi'
  });

  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  const momoRequest = https.request(options, (momoResponse) => {
    momoResponse.setEncoding('utf8');
    let data = '';

    momoResponse.on('data', (chunk) => {
      data += chunk;
    });

    momoResponse.on('end', () => {
      const result = JSON.parse(data);
      console.log(result);

      if (result && result.payUrl) {
        res.redirect(result.payUrl); // Chuyển hướng sang giao diện thanh toán MoMo
      } else {
        res.status(500).send('Lỗi tạo thanh toán MoMo');
      }
    });
  });

  momoRequest.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  momoRequest.write(requestBody);
  momoRequest.end();
};

module.exports = { getCheckout, getCart, createMomoPayment };
