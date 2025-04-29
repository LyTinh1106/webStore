document.addEventListener("DOMContentLoaded", function () {
  let cartData = JSON.parse(localStorage.getItem('cart')) || [];
  
  function formatVND(value) {
    return value.toLocaleString('vi-VN') + ' VNĐ';
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
      cartList.innerHTML = `
      <div class="cart-message-notify">
  			<p>Không có sản phẩm trong giỏ hàng. </p>
		  </div>
      `;
      if (emptyMsg) emptyMsg.style.display = 'block';
      cartQty.innerText = '0';
      summaryText.innerText = `Chưa có sản phẩm nào`;
      subtotal.innerText = `TỔNG CỘNG: 0 VNĐ`;
      document.querySelector('.cart-dropdown').style.display = 'none'; // Thêm dòng này để ẩn dropdown nếu trống
      localStorage.setItem('cart', JSON.stringify(cartData)); // Lưu lại cart rỗng
      return;
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
    }

    cartData.forEach((product, index) => {
      const productHTML = `
        <div class="product-widget">
          <div class="product-img">
            <img src="${product.img}" alt="">
          </div>
          <div class="product-body">
            <h3 class="product-name"><a href="#">${product.name}</a></h3>
            <h4 class="product-price"><span class="qty">${product.qty}x</span> ${formatVND(product.price)}</h4>
          </div>
          <button class="delete" data-index="${index}"><i class="fa fa-close"></i></button>
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
    localStorage.setItem('cart', JSON.stringify(cartData));

    // Bắt sự kiện click vào nút xóa sản phẩm
    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'));
        cartData.splice(index, 1); // Xóa sản phẩm khỏi mảng
        updateCartUI(); // Cập nhật lại giao diện
      });
    });
    saveCartData();
  }

  // Xử lý xóa từ tên sản phẩm
  window.removeFromCart = function (productName) {
    cartData = cartData.filter(p => p.name !== productName);
    updateCartUI();
  };

  // Xử lý nút "Thêm vào giỏ hàng" từ danh sách sản phẩm
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productCard = button.closest('.product');
      if (!productCard) return;

      const img = productCard.querySelector('.product-img img')?.getAttribute('src') || '/images/noImage.jpg';
      const name = productCard.querySelector('.product-name')?.innerText.trim();
      const priceText = productCard.querySelector('.product-price')?.innerText.trim().replace(/[^\d]/g, '') || '0';
      const price = parseFloat(priceText);

      if (!name || isNaN(price)) return;

      const existingProduct = cartData.find(p => p.name === name);
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cartData.push({ img, name, price, qty: 1 });
      }

      updateCartUI();
    });
  });

  // Xử lý từ trang chi tiết sản phẩm
  const detailBtn = document.getElementById('detail-add-to-cart');
  
  if (detailBtn) {
    detailBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const name = document.getElementById('detail-name')?.innerText.trim();
      const priceText = document.getElementById('detail-price')?.innerText.trim().replace(/[^\d]/g, '');
      const price = parseFloat(priceText);
      const qty = parseInt(document.getElementById('detail-qty')?.value) || 1;
      const img = document.querySelector('#product-main-img img')?.getAttribute('src') || '/images/noImage.jpg';

      if (!name || isNaN(price) || isNaN(qty) || qty < 1) return;

      const existingProduct = cartData.find(p => p.name === name);
      if (existingProduct) {
        existingProduct.qty += qty;
      } else {
        cartData.push({ img, name, price, qty });
      }

      updateCartUI();
    });
  }

  updateCartUI();
});
