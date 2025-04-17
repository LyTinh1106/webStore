
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

