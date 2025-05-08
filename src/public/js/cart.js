document.addEventListener("DOMContentLoaded", function () {
  let cartData = JSON.parse(localStorage.getItem('cart')) || [];
  let globalVoucherDiscount = 0;
  let shipping = 0;

  function formatVND(value) {
    return value.toLocaleString('vi-VN') + '₫';
  }

  function saveCartData() {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  function updateCartUI() {
    const cartList = document.querySelector('.cart-list');
    const cartQty = document.querySelector('.header-ctn .qty');
    const subtotal = document.querySelector('.cart-summary h5');
    const summaryText = document.querySelector('.cart-summary small');
    const emptyMsg = document.getElementById('empty-cart-message');

    cartList.innerHTML = '';
    let totalQty = 0;
    let totalPrice = 0;

    if (cartData.length === 0) {
      cartList.innerHTML = `<div class="cart-message-notify"><p>Không có sản phẩm trong giỏ hàng.</p></div>`;
      if (emptyMsg) emptyMsg.style.display = 'block';
      cartQty.innerText = '0';
      summaryText.innerText = `Chưa có sản phẩm nào`;
      subtotal.innerText = `TỔNG CỘNG: 0₫`;
      document.querySelector('.cart-dropdown').style.display = 'none';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';

      cartData.forEach((product, index) => {
        const productHTML = `
          <div class="product-widget">
            <a href="/product/${product.id}">  
              <div class="product-img">
                <img src="${product.img}" alt="">
              </div>
              <div class="product-body">
                <h3 class="product-name"><a href="/product/${product.id}">${product.name}</a></h3>
                <h4 class="product-price"><span class="qty">${product.qty}x</span> ${formatVND(product.price)}</h4>
              </div>
              <button class="delete" data-index="${index}"><i class="fa fa-close"></i></button> 
            </a>  
          </div>
        `;
        cartList.insertAdjacentHTML('beforeend', productHTML);
        totalQty += product.qty;
        totalPrice += product.price * product.qty;
      });

      cartQty.innerText = totalQty;
      summaryText.innerText = `${totalQty} sản phẩm đã chọn`;
      subtotal.innerText = `TỔNG CỘNG: ${formatVND(totalPrice)}`;
      document.querySelector('.cart-dropdown').style.display = 'block';

      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function () {
          const index = parseInt(this.getAttribute('data-index'));
          cartData.splice(index, 1);
          updateStorage();
        });
      });
    }

    // Cập nhật khu vực chi tiết giỏ hàng
    const mainSubtotal = document.querySelector('.summary-subtotal');
    const mainDiscount = document.querySelector('.summary-discount');
    const mainTotal = document.querySelector('.summary-total');

    if (mainSubtotal && mainDiscount && mainTotal) {
      mainSubtotal.innerText = formatVND(totalPrice);
      mainDiscount.innerText = formatVND(Math.floor(totalPrice * globalVoucherDiscount / 100));
      mainTotal.innerText = formatVND(totalPrice - Math.floor(totalPrice * globalVoucherDiscount / 100));
    }

    saveCartData();
  }

  // Xử lý thêm sản phẩm từ danh sách
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productCard = button.closest('.product');
      if (!productCard) return;
      const id = productCard.querySelector('.product-id')?.innerText.trim();
      const img = productCard.querySelector('.product-img img')?.getAttribute('src') || '/images/noImage.jpg';
      const name = productCard.querySelector('.product-name')?.innerText.trim();
      const priceText = productCard.querySelector('.product-price')?.innerText.trim().replace(/[^\d]/g, '') || '0';
      const price = parseFloat(priceText);
      if (!name || isNaN(price)) return;

      const existingProduct = cartData.find(p => p.name === name);
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cartData.push({ id, img, name, price, qty: 1 });
      }
      updateStorage();
    });
  });

  // Từ trang chi tiết
  const detailBtn = document.getElementById('detail-add-to-cart');
  if (detailBtn) {
    detailBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const id = document.getElementById('detail-id')?.innerText.trim() || document.getElementById('detail-id')?.value.trim();
      const name = document.getElementById('detail-name')?.innerText.trim();
      const priceText = document.getElementById('detail-price')?.innerText.trim();
      const cleanedPrice = priceText.replaceAll('.', '').replace(/[^\d]/g, '');
      const price = parseInt(cleanedPrice);
      const qty = parseInt(document.getElementById('detail-qty')?.value) || 1;
      const img = document.querySelector('#product-main-img img')?.getAttribute('src') || '/images/noImage.jpg';

      if (!name || isNaN(price) || isNaN(qty) || qty < 1) return;

      const existingProduct = cartData.find(p => p.name === name);
      if (existingProduct) {
        existingProduct.qty += qty;
      } else {
        cartData.push({ id, img, name, price, qty });
      }
      updateStorage();
    });
  }

  // Xóa theo tên
  window.removeFromCart = function (productName) {
    cartData = cartData.filter(p => p.name !== productName);
    updateStorage();
  };

  // Cập nhật localStorage và toàn bộ giao diện
  function updateStorage() {
    localStorage.setItem('cart', JSON.stringify(cartData));
    renderCart();
    updateCartUI();
  }

  // Render chi tiết giỏ hàng (dạng full page)
  function renderCart() {
    const cartItemsContainer = $('.cart-items');
    cartItemsContainer.empty();

    if (cartData.length === 0) {
      cartItemsContainer.html(`
        <div class="text-center py-5 empty-cart-container">
          <h5>Giỏ hàng của bạn đang trống</h5>
          <p>Hãy thêm sản phẩm vào giỏ hàng</p>
          <a href="/" class="btn btn-outline-primary mt-3 return-to-homepage">
            <i class="fas fa-arrow-left me-2"></i>Tiếp tục mua sắm
          </a>
        </div>`);
      $('#subtotal').text('0₫');
      $('#totalPrice').text('0₫');
      $('#couponSection').hide();
      return;
    } else {
      $('#couponSection').show();
    }

    let subtotal = 0;

    cartData.forEach(product => {
      subtotal += product.price * product.qty;
      const itemHTML = `
      <div class="cart-item">
        <div class="row align-items-center">
          <div class="col-md-2">
            <a href="/product/${product.id}">
              <img src="${product.img}" alt="${product.name}" class="product-image">
            </a>
          </div>
          <div class="col-md-4 cart">
            <a href="/product/${product.id}">
              <span class="cart-product-name">${product.name}</span>
            </a>
          </div>
          <div class="col-md-2 cart">
            <span class="cart-product-price">${formatVND(product.price)}</span>
          </div>
          <div class="col-md-3">
            <div class="quantity-control">
              <div class="quantity-btn minus" data-name="${product.name}"><i class="fa fa-minus"></i></div>
              <input type="text" class="quantity-input" value="${product.qty}" readonly>
              <div class="quantity-btn plus" data-name="${product.name}"><i class="fa fa-plus"></i></div>
            </div>
          </div>
          <div class="col-md-1 cart">
            <i class="fas fa-trash remove-item" data-name="${product.name}"></i>
          </div>
        </div>
      </div>`;
      cartItemsContainer.append(itemHTML);
    });

    const discount = Math.floor(subtotal * globalVoucherDiscount / 100);
    const total = subtotal + shipping - discount;

    $('#subtotal').text(formatVND(subtotal));
    $('#totalPrice').text(formatVND(total));
    $('#discountAmount').text(formatVND(discount));
  }

  // Xử lý cộng/trừ/xóa
  $(document).on('click', '.plus', function () {
    const name = $(this).data('name');
    const product = cartData.find(p => p.name === name);
    if (product) {
      product.qty += 1;
      updateStorage();
    }
  });

  $(document).on('click', '.minus', function () {
    const name = $(this).data('name');
    const product = cartData.find(p => p.name === name);
    if (product && product.qty > 1) {
      product.qty -= 1;
      updateStorage();
    } else if (product && product.qty === 1) {
      if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        cartData = cartData.filter(p => p.name !== name);
        updateStorage();
      }
    }
  });

  $(document).on('click', '.remove-item', function () {
    const name = $(this).data('name');
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      cartData = cartData.filter(p => p.name !== name);
      updateStorage();
    }
  });

  $('#applyVoucherBtn').on('click', function () {
    const code = $('#voucherCode').val().trim();
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
          return alert(data.error || 'Mã không hợp lệ hoặc đã hết hạn');
        }

        globalVoucherDiscount = parseInt(data.voucher.voucher_value);
        localStorage.setItem('voucherDiscount', globalVoucherDiscount);
        updateStorage();
      })
      .catch(() => alert('Đã xảy ra lỗi khi áp dụng mã'));
  });

  $('#checkoutButton').on('click', function () {
    const isLoggedIn = document.getElementById('isLoggedIn')?.value;
    if (isLoggedIn !== 'true') {
      alert('Bạn cần đăng nhập để tiến hành thanh toán.');
      window.location.href = '/login';
    } else {
      window.location.href = '/checkout';
    }
  });

  // Gọi khi trang tải
  updateCartUI();
  renderCart();
});
