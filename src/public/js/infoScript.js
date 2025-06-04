function formatVND(value) {
  return Number(value).toLocaleString("vi-VN") + " VNĐ";
}

function formatFullDateTime(date = new Date()) {
  const pad = n => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
    + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function generateOrderCode(id) {
  const randomPart = ("0000" + (id * 7919 % 10000)).slice(-4);
  return `${randomPart}${id}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const detailButtons = document.querySelectorAll(".view-detail-btn");

  detailButtons.forEach(btn => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      // Trước hết, set các trường tĩnh (nếu muốn). Nhưng chúng ta sẽ fetch dữ liệu động:
      document.getElementById("modalOrderId").value = id;


      try {
        const orderResp = await fetch(`/api/order/details/${id}`);
        const order = await orderResp.json();
        if (!order.id) throw new Error("Không tìm thấy order.");

        // Điền thông tin chung
        document.getElementById("modalOrderName").textContent = order.fullname || "(Không có)";
        document.getElementById("modalOrderEmail").textContent = order.email || "(Không có)";
        document.getElementById("modalOrderPhone").textContent = order.phone || "(Không có)";
        document.getElementById("modalOrderDate").textContent = formatFullDateTime(new Date(order.created_at));
        document.getElementById("modalOrderPayment").textContent = order.payment_method || "(Không có)";
        document.getElementById("modalOrderAddress").textContent = order.address || "(Không có)";
        document.getElementById("modalOrderNote").textContent = order.note || "(Không có)";

        // Hiển thị trạng thái
        const badge = document.getElementById("modalOrderStatusDisplay");
        const status = order.order_status || "Đang xử lý";
        badge.className = "badge";
        badge.classList.add(
          status === "Hoàn Thành" ? "badge-success" :
            status === "Chờ duyệt" ? "badge-warning" :
              status === "Đã duyệt" ? "badge-info" :
                "badge-default"
        );
        badge.innerText = status;

        // Hiển thị Tổng tiền và Giảm giá nếu có
        const voucherValue = parseInt(order.voucher_value) || 0;
        let discountAmount = 0;
        // Nếu backend trả sẵn order.discount_amount thì lấy luôn
        if (order.discount_amount !== undefined) {
          discountAmount = parseInt(order.discount_amount) || 0;
        } else if (voucherValue > 0) {
          // Tính ngược nếu không có discount_amount
          const totalAfter = parseInt(order.total_payment) || 0;
          discountAmount = Math.round((totalAfter * voucherValue) / (100 - voucherValue));
        }

        // Hiển thị Giảm giá
        const discountWrapper = document.getElementById("modalOrderDiscountWrapper");
        const discountEl = document.getElementById("modalOrderDiscount");
        if (discountAmount > 0) {
          discountWrapper.style.display = "block";
          discountEl.textContent = "- " + formatVND(discountAmount);
        } else {
          discountWrapper.style.display = "none";
          discountEl.textContent = "";
        }

        // Hiển thị Tổng tiền (sau giảm)
        document.getElementById("modalOrderTotal").textContent = formatVND(order.total_payment || 0);

        // Load danh sách sản phẩm
        const productTable = document.getElementById("modalOrderProducts");
        productTable.innerHTML = `<tr><td colspan="3" class="text-muted text-center">Đang tải...</td></tr>`;
        const prodResp = await fetch(`/api/order-detail/${id}`);
        const products = await prodResp.json();
        if (!Array.isArray(products) || products.length === 0) {
          productTable.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Không có sản phẩm.</td></tr>`;
        } else {
          productTable.innerHTML = "";
          products.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.product_name}</td>
                <td>${item.quantity}</td>
                <td>${formatVND(item.subtotalprice)}</td>
              `;
            productTable.appendChild(row);
          });
        }

        // Hiển thị modal
        $("#orderDetailModalView").modal("show");

      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
        showToast("Không thể tải thông tin đơn hàng.", "error");
      }
    });
  });
});


$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const tabId = urlParams.get("tab");

  if (tabId) {
    $('.nav-pills a[href="#' + tabId + '"]').tab('show');
  }


});

const hash = window.location.hash;
if (hash === "#order-history") {
  // Ngăn scroll mặc định bằng cách xóa hash rồi xử lý thủ công
  history.replaceState(null, null, location.pathname);

  // Kích hoạt tab
  const orderTabLink = document.querySelector('a[href="#order-history"]');
  if (orderTabLink) {
    // Remove 'active' from current
    document.querySelectorAll('.nav-pills li').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active', 'in'));

    // Activate the correct tab and pane
    orderTabLink.parentElement.classList.add('active');
    const tabPane = document.querySelector('#order-history');
    if (tabPane) {
      tabPane.classList.add('active', 'in');
    }

    // Sử dụng jQuery để kích hoạt tab nếu dùng Bootstrap Tabs
    if (typeof $ !== 'undefined' && typeof $.fn.tab === 'function') {
      $(orderTabLink).tab('show');
    }
  }

  // Scroll lên đầu trang sau khi tab đã được bật
  window.scrollTo({ top: 0, behavior: 'smooth' });
}