
$(document).ready(function () {
    $('.toggle-password').click(function () {
        const targetId = $(this).data('target');
        const passwordInput = $('#' + targetId);

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            $(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            $(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Smooth scroll khi click vào các mục trong sidebar
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        const target = this.hash;
        const $target = $(target);

        $('html, body').animate({
            'scrollTop': $target.offset().top - 20
        }, 800, 'swing');
    });
});

//Brand

//modal add brand form
document.getElementById("addBrandForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    const brandName = document.getElementById("brandName").value.trim();

    if (!brandName) {
        alert("Vui lòng nhập tên nhãn hàng.");
        return;
    }

    try {
        const response = await fetch("/api/brand/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ brand_name: brandName })
        });

        if (response.ok) {
            // Lưu vị trí cuộn
            const scrollY = window.scrollY;
            localStorage.setItem("scrollPosition", scrollY);

            // Reload lại trang
            location.reload();
        } else {
            const text = await response.text();
            document.body.innerHTML = text;
        }

    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});
// delete brand
document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-brand-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", async function () {
            const brandId = this.dataset.id;

            const confirmed = confirm("Bạn có chắc muốn xóa?");
            if (!confirmed) return;

            try {
                const response = await fetch(`/api/brand/delete/${brandId}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    // Lưu vị trí cuộn
                    const scrollY = window.scrollY;
                    localStorage.setItem("scrollPosition", scrollY);

                    // Reload lại trang
                    location.reload();
                } else {
                    const text = await response.text();
                    alert("Xóa thất bại: " + text);
                }

            } catch (error) {
                alert("Đã xảy ra lỗi khi gửi yêu cầu xóa.");
                console.error(error);
            }
        });
    });

    // Khôi phục vị trí cuộn nếu có
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem("scrollPosition");
    }
});
//update brand
document.getElementById("updateBrandForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    // Lấy giá trị từ các input trong form
    const brandId = document.getElementById("brandId").value.trim();
    const brandName = document.getElementById("updateBrandName").value.trim();

    if (!brandId || !brandName) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    try {
        const response = await fetch(`/api/brand/update/${brandId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ brand_name: brandName })
        });

        if (response.ok) {
            // Lưu vị trí cuộn
            const scrollY = window.scrollY;
            localStorage.setItem("scrollPosition", scrollY);

            // Reload lại trang
            location.reload();
        } else {
            const text = await response.text();
            document.body.innerHTML = text;
        }

    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});
document.querySelectorAll(".editBrandBtn").forEach(btn => {
    btn.addEventListener("click", function () {
        const brandId = this.getAttribute("data-id");
        const brandName = this.getAttribute("data-name");

        // Điền thông tin vào các input trong modal
        document.getElementById("brandId").value = brandId;
        document.getElementById("updateBrandName").value = brandName;
    });
});




//Category

//modal add category form
document.getElementById("addCategoryForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    const categoryName = document.getElementById("categoryName").value.trim();

    if (!categoryName) {
        alert("Vui lòng nhập tên danh mục.");
        return;
    }

    try {
        const response = await fetch("/api/category/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: categoryName })
        });

        if (response.ok) {
            const scrollY = window.scrollY;
            localStorage.setItem("scrollPosition", scrollY);
            
            location.reload();
        } else {
            const text = await response.text();
            document.body.innerHTML = text;
        }

    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});
// Sau khi reload xong, cuộn về vị trí cũ
window.addEventListener("load", () => {
    const scrollY = localStorage.getItem("scrollPosition");
    if (scrollY !== null) {
        window.scrollTo(0, parseInt(scrollY));
        localStorage.removeItem("scrollPosition");
    }
});
// delete categoty
document.querySelectorAll(".delete-category-btn").forEach(button => {
    button.addEventListener("click", async function () {
        const categoryId = this.dataset.id;

        if (!categoryId) {
            alert("Không tìm thấy ID của danh mục.");
            return;
        }

        const confirmed = confirm("Bạn có chắc muốn xóa danh mục này?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/category/delete/${categoryId}`, {
                method: "DELETE", 
            });

            if (response.ok) {
                const scrollY = window.scrollY;
                localStorage.setItem("scrollPosition", scrollY);
                location.reload();
            } else {
                const text = await response.text();
                alert("Không xóa được danh mục: " + text);
            }

        } catch (error) {
            alert("Đã xảy ra lỗi khi gửi yêu cầu xóa.");
            console.error(error);
        }
    });
});

// Sau khi reload, cuộn về vị trí cũ
window.addEventListener("load", () => {
    const scrollY = localStorage.getItem("scrollPosition");
    if (scrollY !== null) {
        window.scrollTo(0, parseInt(scrollY));
        localStorage.removeItem("scrollPosition");
    }
});

// Update Category
// Lắng nghe sự kiện submit của form cập nhật category
document.querySelectorAll('.editCategoryBtn').forEach(button => {
    button.addEventListener('click', function () {
        const categoryId = this.getAttribute('data-id');
        const categoryName = this.getAttribute('data-name');
        
        // Điền giá trị vào form
        document.getElementById('categoryId').value = categoryId;
        document.getElementById('updateCategoryName').value = categoryName;
    });
});

// Xử lý form cập nhật danh mục
// Xử lý form cập nhật danh mục
document.getElementById("updateCategoryForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const categoryId = document.getElementById("categoryId").value.trim();
    const categoryName = document.getElementById("updateCategoryName").value.trim();

    if (!categoryId || !categoryName) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    try {
        const response = await fetch(`/api/category/update/${categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: categoryName }) // ✅ gửi đúng thuộc tính 'name'
        });

        if (response.ok) {
            location.reload();
        } else {
            const text = await response.text();
            alert("Có lỗi xảy ra: " + text);
        }
    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});


// Lắng nghe sự kiện click vào nút chỉnh sửa category
document.querySelectorAll(".editCategoryBtn").forEach(btn => {
    btn.addEventListener("click", function () {
        const categoryId = this.getAttribute("data-id");
        const categoryName = this.getAttribute("data-name");

        // Điền thông tin vào các input trong modal
        document.getElementById("categoryId").value = categoryId;
        document.getElementById("updateCategoryName").value = categoryName;
    });
});


//Voucher

// Khởi tạo flatpickr cho các trường nhập liệu ngày
 const config = {
    enableTime: true,
    time_24hr: true,
    allowInput: true,
    dateFormat: "Y-m-d H:i:S",
    position: "auto left",
    onClose: function (selectedDates, dateStr, instance) {
        if (selectedDates.length > 0) {
            instance.input.value = flatpickr.formatDate(selectedDates[0], "Y-m-d H:i:S");
        }
    },
    positionElement: null
};
// Cấu hình cho startDate
const startPicker = flatpickr("#startDate", {
    ...config,
    positionElement: document.getElementById("startDateIcon") // Gắn popup vào icon
});

// Cấu hình cho endDate
const endPicker = flatpickr("#endDate", {
    ...config,
    positionElement: document.getElementById("endDateIcon") // Gắn popup vào icon
});

// Gắn sự kiện click để mở picker
document.getElementById("startDateIcon").addEventListener("click", function () {
    startPicker.open();
});

document.getElementById("endDateIcon").addEventListener("click", function () {
    endPicker.open();
});


//modal add voucher form
document.getElementById("addVoucherForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn form reload mặc định

    const vouCode = document.getElementById("vouCode").value.trim().toUpperCase();
    const vouValue = parseInt(document.getElementById("vouValue").value);
    const startDateStr = document.getElementById("startDate").value.trim();
    const endDateStr = document.getElementById("endDate").value.trim();

    const messageBox = document.getElementById("voucherMessage");
    messageBox.style.display = "none";

    if (!vouCode || isNaN(vouValue) || !startDateStr || !endDateStr) {
        alert("Vui lòng nhập đầy đủ thông tin voucher.");
        return;
    }

    const formatDateTime = (date) => {
        const pad = (n) => n < 10 ? '0' + n : n;
        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    
    const startDate = flatpickr.parseDate(startDateStr, "Y-m-d H:i:s");
    const endDate = flatpickr.parseDate(endDateStr, "Y-m-d H:i:s");
    
    if (!startDate || !endDate || endDate <= startDate) {
        messageBox.textContent = "Ngày kết thúc phải sau ngày bắt đầu!";
        messageBox.style.display = "block";
        return;
    }
    
    const formattedStart = formatDateTime(startDate);
    const formattedEnd = formatDateTime(endDate);
    
    try {
        const response = await fetch("/api/voucher/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                voucher_code: vouCode,
                voucher_value: vouValue,
                date_start: formattedStart,
                date_end: formattedEnd
            })
        });

        if (response.ok) {
            // Lưu vị trí cuộn
            const scrollY = window.scrollY;
            localStorage.setItem("voucherScrollPosition", scrollY);

            // Reload lại trang
            location.reload();
        } else {
            const text = await response.text();
            document.body.innerHTML = text; // fallback lỗi server
        }

    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});

// delete voucher
document.querySelectorAll(".delete-voucher-btn").forEach(button => {
    button.addEventListener("click", async function () {
        const voucherId = this.dataset.id;

        if (!voucherId) {
            alert("Không tìm thấy ID của voucher.");
            return;
        }

        const confirmed = confirm("Bạn có chắc muốn xóa voucher này?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/voucher/delete/${voucherId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                const scrollY = window.scrollY;
                localStorage.setItem("voucherScrollPosition", scrollY);
                location.reload();
            } else {
                const text = await response.text();
                alert("Không thể xóa voucher: " + text);
            }

        } catch (error) {
            alert("Đã xảy ra lỗi khi gửi yêu cầu xóa voucher.");
            console.error(error);
        }
    });
});
// Update Voucher
document.getElementById("editVoucherForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload

    const id = document.getElementById("editVoucherId").value;
    const vouCode = document.getElementById("editVouCode").value.trim().toUpperCase();
    const vouValue = parseInt(document.getElementById("editVouValue").value);
    const startDateStr = document.getElementById("editStartDate").value.trim();
    const endDateStr = document.getElementById("editEndDate").value.trim();

    const messageBox = document.getElementById("editVoucherMessage");
    messageBox.style.display = "none";

    if (!vouCode || isNaN(vouValue) || !startDateStr || !endDateStr) {
        alert("Vui lòng nhập đầy đủ thông tin voucher.");
        return;
    }

    const formatDateTime = (date) => {
        const pad = (n) => n < 10 ? '0' + n : n;
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const startDate = flatpickr.parseDate(startDateStr, "Y-m-d H:i:s");
    const endDate = flatpickr.parseDate(endDateStr, "Y-m-d H:i:s");

    if (!startDate || !endDate || endDate <= startDate) {
        messageBox.textContent = "Ngày kết thúc phải sau ngày bắt đầu!";
        messageBox.style.display = "block";
        return;
    }

    const formattedStart = formatDateTime(startDate);
    const formattedEnd = formatDateTime(endDate);

    try {
        const response = await fetch(`/api/voucher/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                voucher_code: vouCode,
                voucher_value: vouValue,
                date_start: formattedStart,
                date_end: formattedEnd
            })
        });

        if (response.ok) {
            // Lưu vị trí scroll
            const scrollY = window.scrollY;
            localStorage.setItem("voucherScrollPosition", scrollY);

            // Reload
            location.reload();
        } else {
            const result = await response.json();
            messageBox.textContent = result.message || "Cập nhật thất bại!";
            messageBox.style.display = "block";
        }

    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});
document.querySelectorAll(".edit-voucher-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const row = btn.closest("tr");
        document.getElementById("editVoucherId").value = row.children[0].innerText.trim();
        document.getElementById("editVouCode").value = row.children[1].innerText.trim();
        document.getElementById("editVouValue").value = row.children[2].innerText.trim();
        document.getElementById("editStartDate").value = row.children[3].innerText.trim();
        document.getElementById("editEndDate").value = row.children[4].innerText.trim();
        const modal = new bootstrap.Modal(document.getElementById("editVoucherModal"));
        modal.show();
    });
});



//supplier
//add supplier modal form
//modal add brand form
document.getElementById("addSupplierForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    const suppName = document.getElementById("supplierName").value.trim();
    const suppPhoneNum = document.getElementById("supplierPhonenumber").value.trim();
    const suppEmail = document.getElementById("supplierEmail").value.trim();
    const suppAddress = document.getElementById("supplierAddress").value.trim();

    if (!brandName) {
        alert("Vui lòng nhập tên nhãn hàng.");
        return;
    }

    try {
        const response = await fetch("/api/supplier/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: suppName,
                phonenumber: suppPhoneNum,
                email: suppEmail,
                address: suppAddress
            })
        });

        if (response.ok) {
            // Lưu vị trí cuộn
            const scrollY = window.scrollY;
            localStorage.setItem("scrollPosition", scrollY);

            // Reload lại trang
            location.reload();
        } else {
            const text = await response.text();
            document.body.innerHTML = text;
        }

    } catch (error) {
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
        console.error(error);
    }
});
//delete supplier
document.querySelectorAll(".delete-supplier-btn").forEach(button => {
    button.addEventListener("click", async function () {
        const supplierId = this.dataset.id;

        if (!supplierId) {
            alert("Không tìm thấy ID của nhà cung cấp.");
            return;
        }

        const confirmed = confirm("Bạn có chắc muốn xóa nhà cung cấp này?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/supplier/delete/${supplierId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                const scrollY = window.scrollY;
                localStorage.setItem("supplierScrollPosition", scrollY);
                location.reload();
            } else {
                const text = await response.text();
                alert("Không thể xóa nhà cung cấp: " + text);
            }

        } catch (error) {
            alert("Đã xảy ra lỗi khi gửi yêu cầu xóa nhà cung cấp.");
            console.error(error);
        }
    });
});

