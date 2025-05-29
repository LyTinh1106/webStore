// cart.js
document.addEventListener("DOMContentLoaded", function () {
  // 1. Delegation cho nút "Thêm vào giỏ hàng"
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    e.preventDefault();

    const id    = btn.dataset.id;
    const img   = btn.dataset.img;
    const name  = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    if (!id || !name || isNaN(price)) return;

    let cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cartData.find(p => p.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cartData.push({ id, img, name, price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartData));

    updateCartUI();
    if (typeof renderCart === 'function') renderCart();
  });

  let globalVoucherDiscount = parseInt(localStorage.getItem('voucherDiscount')) || 0;
  let shipping = 0;

  function formatVND(value) {
    return value.toLocaleString('vi-VN') + '₫';
  }

  function saveCartData() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  // 2. updateCartUI với <ul> / <li> hợp lệ
  function updateCartUI() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.querySelector('.header-ctn .cart-list');
    const cartQty  = document.querySelector('.header-ctn .qty');
    const subtotal = document.querySelector('.cart-summary h5');
    const summaryText = document.querySelector('.cart-summary small');
    const emptyMsg = document.getElementById('empty-cart-message');

    cartList.innerHTML = '';
    let totalQty = 0;
    let totalPrice = 0;

    if (cartData.length === 0) {
      cartList.innerHTML = `<li class="cart-message-notify"><p>Không có sản phẩm trong giỏ hàng.</p></li>`;
      if (emptyMsg) emptyMsg.style.display = 'block';
      cartQty.innerText = '0';
      summaryText.innerText = `Chưa có sản phẩm nào`;
      subtotal.innerText = `TỔNG CỘNG: 0₫`;
      document.querySelector('.cart-dropdown').style.display = 'none';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';

      cartData.forEach((product, index) => {
        totalQty  += product.qty;
        totalPrice+= product.price * product.qty;

        const itemHTML = `
        <li class="product-widget clearfix">
          <a href="/product/${product.id}">
            <div class="product-img">
              <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="product-body">
              <h3 class="product-name">${product.name}</h3>
              <h4 class="product-price">
              <span class="qty">${product.qty}x</span> ${formatVND(product.price)}
              </h4>
            </div>
          </a>
          <button class="delete" data-index="${index}">
            <i class="fa fa-close"></i>
          </button>
        </li>`;
        cartList.insertAdjacentHTML('beforeend', itemHTML);
      });

      cartQty.innerText = totalQty;
      summaryText.innerText = `${totalQty} sản phẩm đã chọn`;
      subtotal.innerText = `TỔNG CỘNG: ${formatVND(totalPrice)}`;
      document.querySelector('.cart-dropdown').style.display = 'block';

      // Xử lý nút xóa
      cartList.querySelectorAll('.delete').forEach(button => {
        button.onclick = function (e) {
          e.preventDefault();
          const idx = parseInt(this.dataset.index);
          let cartData = JSON.parse(localStorage.getItem('cart')) || [];
          cartData.splice(idx, 1);
          localStorage.setItem('cart', JSON.stringify(cartData));
          updateCartUI();
          if (typeof renderCart === 'function') renderCart();
        };
      });
    }

    // Cập nhật section giỏ hàng chi tiết (full page)
    const mainSubtotal = document.querySelector('.summary-subtotal');
    const mainDiscount = document.querySelector('.summary-discount');
    const mainTotal    = document.querySelector('.summary-total');
    if (mainSubtotal && mainDiscount && mainTotal) {
      mainSubtotal.innerText = formatVND(totalPrice);
      mainDiscount.innerText = formatVND(Math.floor(totalPrice * globalVoucherDiscount / 100));
      mainTotal.innerText    = formatVND(totalPrice - Math.floor(totalPrice * globalVoucherDiscount / 100) + shipping);
    }

    saveCartData();
  }

  // 3. Hàm renderCart (full page) giữ nguyên
  function renderCart() {
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.cart-items');
    if (!container) return;

    container.innerHTML = '';
    if (cartData.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-container text-center py-5">
          <h5>Giỏ hàng của bạn đang trống</h5>
          <a href="/" class="btn btn-outline-primary mt-3">
            <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
          </a>
        </div>`;
      document.querySelector('#subtotal').innerText = '0₫';
      document.querySelector('#totalPrice').innerText = '0₫';
      document.querySelector('#couponSection').style.display = 'none';
      return;
    }
    document.querySelector('#couponSection').style.display = 'block';

    let subtotal = 0;
    cartData.forEach(prod => {
      subtotal += prod.price * prod.qty;
      const row = document.createElement('div');
      row.className = 'cart-item row align-items-center';
      row.innerHTML = `
        <div class="col-md-2 ">
          <a href="/product/${prod.id}">
            <img src="${prod.img}" class="product-image" alt="${prod.name}">
          </a>
        </div>
        <div class="col-md-4 cart">
          <a href="/product/${prod.id}">${prod.name}</a>
        </div>
        <div class="col-md-2 cart">${formatVND(prod.price)}</div>
        <div class="col-md-3 cart">
          <div class="quantity-group">
            <button class="quantity-btn minus" data-name="${prod.name}"><i class="fa fa-minus"></i></button>
            <input class="quantity-input" value="${prod.qty}" readonly>
            <button class="quantity-btn plus" data-name="${prod.name}"><i class="fa fa-plus"></i></button>
          </div>
        </div>
        <div class="col-md-1 cart">
          <i class="fas fa-trash remove-item" data-name="${prod.name}"></i>
        </div>`;
      container.appendChild(row);
    });

    const discount = Math.floor(subtotal * globalVoucherDiscount / 100);
    const total    = subtotal + shipping - discount;
    document.querySelector('#subtotal').innerText       = formatVND(subtotal);
    document.querySelector('#discountAmount').innerText = formatVND(discount);
    document.querySelector('#totalPrice').innerText    = formatVND(total);
  }

  // 4. Cộng / trừ / xóa trên full-page Cart
  document.addEventListener('click', function(e) {
    if (e.target.matches('.plus, .minus, .remove-item')) {
      let cartData = JSON.parse(localStorage.getItem('cart')) || [];
      const name = e.target.dataset.name;
      let product = cartData.find(p => p.name === name);
      if (!product) return;

      if (e.target.matches('.plus')) {
        product.qty++;
      } else if (e.target.matches('.minus')) {
        if (product.qty > 1) product.qty--;
        else return; // nếu =1 thì phải bấm xóa
      } else if (e.target.matches('.remove-item')) {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
        cartData = cartData.filter(p => p.name !== name);
      }

      localStorage.setItem('cart', JSON.stringify(cartData));
      updateCartUI();
      renderCart();
    }
  });

  // 5. Áp dụng Voucher
  document.getElementById('applyVoucherBtn')?.addEventListener('click', function () {
    const code = document.getElementById('voucherCode')?.value.trim();
    if (!code) return alert('Vui lòng nhập mã giảm giá');
    fetch('/api/voucher/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        globalVoucherDiscount = 0;
        alert(data.error || 'Mã không hợp lệ hoặc đã hết hạn');
      } else {
        globalVoucherDiscount = parseInt(data.voucher.voucher_value);
        localStorage.setItem('voucherDiscount', globalVoucherDiscount);
      }
      updateCartUI();
      renderCart();
    })
    .catch(() => alert('Lỗi khi áp dụng mã'));
  });

  // 6. Checkout
  document.getElementById('checkoutButton')?.addEventListener('click', function () {
    const isLoggedIn = document.getElementById('isLoggedIn')?.value === 'true';
    if (!isLoggedIn) {
      alert('Bạn cần đăng nhập để thanh toán.');
      return window.location.href = '/login';
    }
    window.location.href = '/checkout';
  });

  // Khởi tạo hiển thị lần đầu
  updateCartUI();
  renderCart();
});
