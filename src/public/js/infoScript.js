 function formatVND(value) {
                    return Number(value).toLocaleString('vi-VN') + ' VNĐ';
                }

                const detailButtons = document.querySelectorAll('.view-detail-btn');

                detailButtons.forEach(btn => {
                    btn.addEventListener('click', function () {
                        const id = this.getAttribute('data-id');
                        const name = this.getAttribute('data-name');
                        const email = this.getAttribute('data-email');
                        const phone = this.getAttribute('data-phone');
                        const date = this.getAttribute('data-date');
                        const payment = this.getAttribute('data-payment');
                        const address = this.getAttribute('data-address');
                        const total = this.getAttribute('data-total');
                        const note = this.getAttribute('data-note');
                        const status = this.getAttribute('data-status');

                        document.getElementById('modalOrderId').value = id;
                        document.getElementById('modalOrderName').textContent = name || '(Không có)';
                        document.getElementById('modalOrderEmail').textContent = email || '(Không có)';
                        document.getElementById('modalOrderPhone').textContent = phone || '(Không có)';
                        document.getElementById('modalOrderDate').textContent = date || '(Không có)';
                        document.getElementById('modalOrderPayment').textContent = payment || '(Không có)';
                        document.getElementById('modalOrderAddress').textContent = address || '(Không có)';
                        document.getElementById('modalOrderTotal').textContent = formatVND(total);
                        document.getElementById('modalOrderNote').textContent = note || '(Không có)';

                        const badge = document.getElementById('modalOrderStatusDisplay');
                        document.getElementById("modalOrderStatusDisplay").dataset.status = status;
                        badge.className = 'badge';
                        badge.classList.add(
                            status === 'Hoàn Thành' ? 'badge-success' :
                                status === 'Chờ duyệt' ? 'badge-warning' :
                                    status === 'Đã duyệt' ? 'badge-info' :
                                        'badge-default'
                        );
                        badge.innerText = status;

                        const productTable = document.getElementById('modalOrderProducts');
                        productTable.innerHTML = `<tr><td colspan="3" class="text-muted text-center">Đang tải...</td></tr>`;

                        // Gọi đúng API mới: /api/order-detail/:orderId
                        fetch(`/api/order-detail/${id}`)
                            .then(response => response.json())
                            .then(data => {
                                if (!data || data.length === 0) {
                                    productTable.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Không có sản phẩm.</td></tr>`;
                                } else {
                                    productTable.innerHTML = '';
                                    data.forEach(item => {
                                        const row = document.createElement('tr');
                                        row.innerHTML = `
                                        <td>${item.product_name}</td>
                                        <td>${item.quantity}</td>
                                        <td>${formatVND(item.subtotalprice)}</td>
                                        `;
                                        productTable.appendChild(row);
                                    });
                                }
                            })
                            .catch(err => {
                                console.error("Lỗi khi fetch sản phẩm:", err);
                                productTable.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Lỗi khi tải danh sách sản phẩm.</td></tr>`;
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