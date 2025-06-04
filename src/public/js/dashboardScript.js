$(document).ready(function () {
  $(".toggle-password").click(function () {
    const targetId = $(this).data("target");
    const passwordInput = $("#" + targetId);

    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
      $(this).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      passwordInput.attr("type", "password");
      $(this).find("i").removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });
});

//Brand

//modal add brand form
function saveScrollAndTabAndReload() {
  const scrollY = window.scrollY;
  const activeTabId = document.querySelector(".nav-link.active")?.id;

  if (activeTabId) {
    localStorage.setItem("activeTabId", activeTabId);
  }
  localStorage.setItem("scrollPosition", scrollY);

  window.location.href = window.location.pathname;
}

window.addEventListener("DOMContentLoaded", function () {
  const savedTabId = localStorage.getItem("activeTabId");
  const savedScrollY = localStorage.getItem("scrollPosition");

  if (savedTabId) {
    const tabTrigger = document.getElementById(savedTabId);
    if (tabTrigger) {
      const tab = new bootstrap.Tab(tabTrigger);
      tab.show();
    }
    localStorage.removeItem("activeTabId");
  }

  if (savedScrollY) {
    window.scrollTo(0, parseInt(savedScrollY));
    localStorage.removeItem("scrollPosition");
  }
});

document
  .getElementById("addBrandForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    const brandName = document.getElementById("brandName").value.trim();

    if (!brandName) {
      showToast("Vui lòng nhập tên nhãn hàng.", "warning");
      return;
    }

    try {
      const response = await fetch("/api/brand/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand_name: brandName }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Thêm nhãn hàng thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        document.body.innerHTML = text;
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });
// delete brand
const deleteButtons = document.querySelectorAll(".delete-brand-btn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async function () {
    const brandId = this.dataset.id;

    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa nhãn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d10024",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/brand/delete/${brandId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Đã xóa thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        showToast("Xóa thất bại: " + text, "error");
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu xóa.", "error");
      console.error(error);
    }
  });
});

//update brand
document
  .getElementById("updateBrandForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    // Lấy giá trị từ các input trong form
    const brandId = document.getElementById("brandId").value.trim();
    const brandName = document.getElementById("updateBrandName").value.trim();

    if (!brandId || !brandName) {
      showToast("Vui lòng nhập đầy đủ thông tin.", "warning");
      return;
    }

    try {
      const response = await fetch(`/api/brand/update/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand_name: brandName }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Cập nhật nhãn hàng thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        document.body.innerHTML = text;
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });
// Lắng nghe sự kiện click vào nút chỉnh sửa brand
document.querySelectorAll(".editBrandBtn").forEach((btn) => {
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
document
  .getElementById("addCategoryForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    const categoryName = document.getElementById("categoryName").value.trim();

    if (!categoryName) {
      showToast("Vui lòng nhập tên danh mục.", "error");
      return;
    }

    try {
      const response = await fetch("/api/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Thêm danh mục thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        document.body.innerHTML = text;
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });

// delete categoty
document.querySelectorAll(".delete-category-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const categoryId = this.dataset.id;

    if (!categoryId) {
      showToast("Không tìm thấy ID của danh mục.", "error");
      return;
    }

    // const confirmed = confirm("Bạn có chắc muốn xóa danh mục này?");
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d10024",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/category/delete/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Đã xóa thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        showToast("Không xóa được danh mục: " + text, "error");
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu xóa.", "error");
      console.error(error);
    }
  });
});

// Update Category
// Lắng nghe sự kiện submit của form cập nhật category
document.querySelectorAll(".editCategoryBtn").forEach((button) => {
  button.addEventListener("click", function () {
    const categoryId = this.getAttribute("data-id");
    const categoryName = this.getAttribute("data-name");

    // Điền giá trị vào form
    document.getElementById("categoryId").value = categoryId;
    document.getElementById("updateCategoryName").value = categoryName;
  });
});

// Xử lý form cập nhật danh mục
document
  .getElementById("updateCategoryForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const categoryId = document.getElementById("categoryId").value.trim();
    const categoryName = document
      .getElementById("updateCategoryName")
      .value.trim();

    if (!categoryId || !categoryName) {
      showToast("Vui lòng nhập đầy đủ thông tin.", "warning");
      return;
    }

    try {
      const response = await fetch(`/api/category/update/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Cập nhật danh mục thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        showToast("Có lỗi xảy ra: " + text, "error");
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });

// Lắng nghe sự kiện click vào nút chỉnh sửa category
document.querySelectorAll(".editCategoryBtn").forEach((btn) => {
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
      instance.input.value = flatpickr.formatDate(
        selectedDates[0],
        "Y-m-d H:i:S"
      );
    }
  },
  positionElement: null,
};
// Cấu hình cho startDate
const startPicker = flatpickr("#startDate", {
  ...config,
  clickOpens: false,
  positionElement: document.getElementById("startDateIcon"), // Gắn popup vào icon
});

// Cấu hình cho endDate
const endPicker = flatpickr("#endDate", {
  ...config,
  clickOpens: false,
  positionElement: document.getElementById("endDateIcon"), // Gắn popup vào icon
});

// Gắn sự kiện click để mở picker
document.getElementById("startDateIcon").addEventListener("click", function () {
  startPicker.open();
});

document.getElementById("endDateIcon").addEventListener("click", function () {
  endPicker.open();
});

//modal add voucher form
document
  .getElementById("addVoucherForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn form reload mặc định

    const vouCode = document
      .getElementById("vouCode")
      .value.trim()
      .toUpperCase();
    const vouValue = parseInt(document.getElementById("vouValue").value);
    const startDateStr = document.getElementById("startDate").value.trim();
    const endDateStr = document.getElementById("endDate").value.trim();

    const messageBox = document.getElementById("voucherMessage");
    messageBox.style.display = "none";

    if (!vouCode || isNaN(vouValue) || !startDateStr || !endDateStr) {
      showToast("Vui lòng nhập đầy đủ thông tin voucher.", "warning");
      return;
    }

    const formatDateTime = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`;
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voucher_code: vouCode,
          voucher_value: vouValue,
          date_start: formattedStart,
          date_end: formattedEnd,
        }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Thêm voucher thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        document.body.innerHTML = text; // fallback lỗi server
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });

// delete voucher
document.querySelectorAll(".delete-voucher-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const voucherId = this.dataset.id;

    if (!voucherId) {
      showToast("Không tìm thấy ID của voucher.", "error");
      return;
    }

    // const confirmed = confirm("Bạn có chắc muốn xóa voucher này?");
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa voucher này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d10024",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/voucher/delete/${voucherId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Đã xóa thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        showToast("Không thể xóa voucher: " + text, "error");
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu xóa voucher.", "error");
      console.error(error);
    }
  });
});

const editStartPicker = flatpickr("#editStartDate", {
  ...config,
  clickOpens: false,
  positionElement: document.getElementById("editStartDateIcon"), // Gắn popup vào icon
});

const editEndPicker = flatpickr("#editEndDate", {
  ...config,
  clickOpens: false,
  positionElement: document.getElementById("editEndDateIcon"), // Gắn popup vào icon
});

document
  .getElementById("editStartDateIcon")
  .addEventListener("click", function () {
    editStartPicker.open();
  });

document
  .getElementById("editEndDateIcon")
  .addEventListener("click", function () {
    editEndPicker.open();
  });

// Update Voucher
document
  .getElementById("editVoucherForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("editVoucherId").value;
    const vouCode = document
      .getElementById("editVouCode")
      .value.trim()
      .toUpperCase();
    const vouValue = parseInt(document.getElementById("editVouValue").value);
    const startDateStr = document.getElementById("editStartDate").value.trim();
    const endDateStr = document.getElementById("editEndDate").value.trim();

    const messageBox = document.getElementById("editVoucherMessage");
    messageBox.style.display = "none";

    if (!vouCode || isNaN(vouValue) || !startDateStr || !endDateStr) {
      showToast("Vui lòng nhập đầy đủ thông tin voucher.", "warning");
      return;
    }

    const formatDateTime = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`;
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voucher_code: vouCode,
          voucher_value: vouValue,
          date_start: formattedStart,
          date_end: formattedEnd,
        }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Cập nhật voucher thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        let msg = "Cập nhật thất bại!";
        try {
          if (
            response.headers.get("Content-Type")?.includes("application/json")
          ) {
            const result = await response.json();
            msg = result.message || msg;
          } else {
            msg = await response.text();
          }
        } catch (err) {
          msg = "Có lỗi khi xử lý dữ liệu từ server!";
        }
        messageBox.textContent = msg;
        messageBox.style.display = "block";
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu." + error, "error");
      console.error(error);
    }
  });
document.querySelectorAll(".edit-voucher-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Lấy data từ thuộc tính data-*
    document.getElementById("editVoucherId").value = btn.dataset.id;
    document.getElementById("editVouCode").value = btn.dataset.code;
    document.getElementById("editVouValue").value = btn.dataset.value;
    document.getElementById("editStartDate").value = btn.dataset.datestart;
    document.getElementById("editEndDate").value = btn.dataset.dateend;
    // Mở modal
    const modal = new bootstrap.Modal(
      document.getElementById("editVoucherModal")
    );
    modal.show();
  });
});

//supplier
//add supplier modal form
document
  .getElementById("addSupplierForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    const suppName = document.getElementById("supplierName").value.trim();
    const suppPhoneNum = document
      .getElementById("supplierPhonenumber")
      .value.trim();
    const suppEmail = document.getElementById("supplierEmail").value.trim();
    const suppAddress = document.getElementById("supplierAddress").value.trim();

    if (!brandName) {
      showToast("Vui lòng nhập tên nhà cung cấp.", "warning");
      return;
    }

    try {
      const response = await fetch("/api/supplier/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: suppName,
          phonenumber: suppPhoneNum,
          email: suppEmail,
          address: suppAddress,
        }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Thêm nhà cung cấp thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        document.body.innerHTML = text;
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });
//delete supplier
document.querySelectorAll(".delete-supplier-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const supplierId = this.dataset.id;

    if (!supplierId) {
      showToast("Không tìm thấy ID của nhà cung cấp.", "error");
      return;
    }

    // const confirmed = confirm("Bạn có chắc muốn xóa nhà cung cấp này?");
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa nhãn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d10024",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/supplier/delete/${supplierId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Đã xóa thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        showToast("Không thể xóa nhà cung cấp: " + text, "error");
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu xóa nhà cung cấp.", "error");
      console.error(error);
    }
  });
});
// Cập nhật supplier
document
  .getElementById("updateSupplierForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    // Lấy giá trị từ các input trong form
    const supplierId = document.getElementById("updateSupplierId").value.trim();
    const supplierName = document
      .getElementById("updateSupplierName")
      .value.trim();
    const supplierPhonenumber = document
      .getElementById("updateSupplierPhonenumber")
      .value.trim();
    const supplierEmail = document
      .getElementById("updateSupplierEmail")
      .value.trim();
    const supplierAddress = document
      .getElementById("updateSupplierAddress")
      .value.trim();

    if (
      !supplierId ||
      !supplierName ||
      !supplierPhonenumber ||
      !supplierEmail ||
      !supplierAddress
    ) {
      showToast("Vui lòng nhập đầy đủ thông tin.", "warning");
      return;
    }

    try {
      const response = await fetch(`/api/supplier/update/${supplierId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: supplierName,
          phonenumber: supplierPhonenumber,
          email: supplierEmail,
          address: supplierAddress,
        }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Cập nhật nhà cung cấp thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        document.body.innerHTML = text;
      }
    } catch (error) {
      showToast("Đã xảy ra lỗi khi gửi yêu cầu.", "error");
      console.error(error);
    }
  });

// Đổ dữ liệu vào form khi bấm nút sửa
document.querySelectorAll(".editSupplierBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.getElementById("updateSupplierId").value =
      this.getAttribute("data-id");
    document.getElementById("updateSupplierName").value =
      this.getAttribute("data-name");
    document.getElementById("updateSupplierPhonenumber").value =
      this.getAttribute("data-phonenumber");
    document.getElementById("updateSupplierEmail").value =
      this.getAttribute("data-email");
    document.getElementById("updateSupplierAddress").value =
      this.getAttribute("data-address");
  });
});

//product
const imagesInput = document.getElementById("images");
const editImagesInput = document.getElementById("editImages");
const imagePreview = document.getElementById("imagePreview");
const editImagePreview = document.getElementById("editImagePreview");

let imageFiles = [];

// Xử lý chọn ảnh
imagesInput.addEventListener("change", (event) => {
  handleImageSelection(event, imagePreview);
});

editImagesInput.addEventListener("change", (event) => {
  handleImageSelection(event, editImagePreview);
});

// Hàm xử lý chọn ảnh và render preview
function handleImageSelection(event, previewContainer) {
  const files = Array.from(event.target.files);
  let added = false;

  const validExtensions = [".png", ".jpg", ".jpeg"];

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      showToast(
        `"${file.name}" không hợp lệ. Chỉ chấp nhận file PNG hoặc JPG.`,
        "info"
      );
      return;
    }

    if (imageFiles.some((f) => f.name === file.name)) {
      showToast(`Hình "${file.name}" đã được chọn.`, "warning");
      return;
    }

    imageFiles.push(file);
    added = true;
  });

  if (added) renderImagePreviews(previewContainer);
}

// Hàm hiển thị ảnh preview
function renderImagePreviews(previewContainer) {
  previewContainer.innerHTML = "";

  imageFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const wrapper = document.createElement("div");
      wrapper.className = "position-relative me-2 mb-2";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("img-thumbnail");
      img.style.width = "100px";
      img.style.height = "100px";

      const removeBtn = document.createElement("button");
      removeBtn.innerText = "×";
      removeBtn.type = "button";
      removeBtn.className = "btn btn-sm btn-danger position-absolute";
      removeBtn.style.top = "0";
      removeBtn.style.right = "0";

      removeBtn.onclick = () => {
        imageFiles.splice(index, 1);
        renderImagePreviews(previewContainer);
      };

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      previewContainer.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  });
}

//thông số kĩ thuật

const fileMappings = [
  {
    inputId: "specFile",
    tableBodyId: "specTableBody",
    containerId: "specTableContainer",
    actionsId: "specActions",
  },
  {
    inputId: "editSpecFile",
    tableBodyId: "editSpecTableBody",
    containerId: "editSpecTableContainer",
    actionsId: "editSpecActions",
  },
];

fileMappings.forEach(({ inputId, tableBodyId, containerId, actionsId }) => {
  const input = document.getElementById(inputId);
  const tableBody = document.getElementById(tableBodyId);
  const container = document.getElementById(containerId);
  const actions = document.getElementById(actionsId);

  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    const render = (data) =>
      renderSpecTable(data, tableBody, container, actions);

    if (fileName.endsWith(".csv") || fileName.endsWith(".txt")) {
      reader.onload = function (e) {
        const lines = e.target.result.split(/\r?\n/);
        const data = lines
          .map((line) => {
            const parts = line.includes(":")
              ? line.split(":")
              : line.split(",");
            return parts.length >= 2
              ? [parts[0].trim(), parts.slice(1).join(",").trim()]
              : null;
          })
          .filter((pair) => pair && pair[0] !== "");
        render(data);
      };
      reader.readAsText(file);
    } else if (fileName.endsWith(".xlsx")) {
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const dataArr = json
          .filter((row) => row.length >= 2 && row[0])
          .map((row) => [row[0], row[1]]);
        render(dataArr);
      };
      reader.readAsArrayBuffer(file);
    } else {
      showToast(
        "Định dạng không được hỗ trợ. Chỉ chấp nhận CSV, TXT hoặc Excel (.xlsx).",
        "error"
      );
      this.value = "";
    }

    // Xóa dữ liệu riêng theo input
    window[`clearSpecData_${inputId}`] = function () {
      input.value = "";
      tableBody.innerHTML = "";
      container.style.display = "none";
      actions.style.display = "none";
    };
  });
});

// Hàm render bảng
function renderSpecTable(data, tableBody, container, actions) {
  tableBody.innerHTML = "";

  data.forEach(([key, value]) => {
    let cleanedValues = "";

    if (Array.isArray(value)) {
      // Nếu là mảng, xử lý từng phần tử rồi nối bằng <br>
      cleanedValues = value
        .map((item) =>
          String(item)
            .replace(/[\[\]{}"]/g, "")
            .trim()
        )
        .filter((item) => item !== "")
        .join("<br>");
    } else {
      // Nếu là chuỗi thường, xử lý như cũ
      cleanedValues = String(value)
        .replace(/[\[\]{}"]/g, "")
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part !== "")
        .join("<br>");
    }

    const cleanedKey = key.replace(/[\[\]{}"]/g, "").trim();

    const row = document.createElement("tr");
    row.innerHTML = `<td>${cleanedKey}</td><td>${cleanedValues}</td>`;
    tableBody.appendChild(row);
  });

  container.style.display = "block";
  actions.style.display = "block";
}

// Add product
document
  .getElementById("addProductForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const importPrice = parseFloat(
      document.getElementById("importPrice").value
    );
    const salePrice = parseFloat(document.getElementById("salePrice").value);

    if (!isNaN(importPrice) && !isNaN(salePrice) && importPrice > salePrice) {
      showToast("Giá nhập không được lớn hơn giá bán!", "warning");
      document.getElementById("importPrice").focus();
      return;
    }

    // 1. Gán value từ Quill vào input trước
    document.getElementById("description").value = quill.root.innerHTML;

    // 2. Tạo FormData sau khi đã gán value
    const form = e.target;
    const formData = new FormData(form);

    // Xoá file ảnh cũ trong input (vì không đầy đủ)
    formData.delete("images");
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/product/create", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        imageFiles = []; // Reset danh sách ảnh
        renderImagePreviews(imagePreview);

        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: result.message || "Thêm sản phẩm thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        showToast(result.message || "Thêm sản phẩm thất bại.", "error");
      }
    } catch (err) {
      showToast("Đã xảy ra lỗi khi gửi dữ liệu.", "error");
      console.error(err);
    }
  });

// xóa product
// Xử lý nút xóa sản phẩm
document.querySelectorAll(".delete-product-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const productId = this.dataset.id; // Lấy productId từ data-id của nút xóa

    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d10024",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return; // Nếu không xác nhận thì dừng lại

    try {
      const response = await fetch(`/api/product/delete/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Đã xóa sản phẩm thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const errorText = await response.text();
        console.error("Lỗi khi xóa sản phẩm:", errorText);
        showToast("Không thể xóa sản phẩm. Lỗi: " + errorText, "error");
      }
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      showToast(
        "Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại." + err,
        "error"
      );
    }
  });
});

//edit product
// Cập nhật sản phẩm
document
  .getElementById("updateProductForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn reload mặc định của form

    // **GÁN GIÁ TRỊ MÔ TẢ TỪ QUILL VÀO INPUT ẨN TRƯỚC KHI LẤY VALUE**
    document.getElementById("editDescription").value = editQuill.root.innerHTML;

    // Lấy dữ liệu từ form
    const productId = document.getElementById("editProductId").value.trim();
    const productName = document.getElementById("editProductName").value.trim();
    const description = document.getElementById("editDescription").value.trim();
    const importPrice = document.getElementById("editImportPrice").value.trim();
    const salePrice = document.getElementById("editSalePrice").value.trim();
    const category = document.getElementById("editCategory").value.trim();
    const brand = document.getElementById("editBrand").value.trim();
    const origin = document.getElementById("editOrigin").value.trim();
    const warranty = document.getElementById("editWarranty").value.trim();
    const specFile = document.getElementById("editSpecFile").files[0];

    // Kiểm tra thông tin bắt buộc
    if (!productId || !productName || !importPrice || !salePrice) {
      showToast("Vui lòng nhập đầy đủ thông tin bắt buộc.", "warning");
      return;
    }

    // Tạo FormData
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("description", description); // giờ chắc chắn là HTML từ Quill
    formData.append("name", productName);
    formData.append("import_price", importPrice);
    formData.append("retail_price", salePrice);
    formData.append("category_id", category);
    formData.append("brand_id", brand);
    formData.append("origin", origin);
    formData.append("warranty", warranty);

    const newImageFiles = allPreviewImages.filter((img) => img.type === "new");
    newImageFiles.forEach((fileObj) => {
      formData.append("editImages", fileObj.file); // file là kiểu File
    });

    if (specFile) {
      formData.append("specFile", specFile); // File Excel hoặc CSV
    }

    try {
      const response = await fetch(`/api/product/update/${productId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Cập nhật sản phẩm thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const errorText = await response.text();
        document.body.innerHTML = errorText; // Debug nếu lỗi
      }
    } catch (error) {
      showToast(
        "Đã xảy ra lỗi khi gửi yêu cầu cập nhật sản phẩm." + error.message,
        "error"
      );
      console.error(error);
    }
  });

// load data into product update form
let oldImageFiles = []; // Lưu danh sách ảnh cũ từ DB
let removedOldImages = []; // Lưu tên ảnh cũ bị xóa
let allPreviewImages = [];

const previewContainer = document.getElementById("editImagePreview");
const imageInput = document.getElementById("editImages");

document.querySelectorAll(".editProductBtn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const productId = btn.getAttribute("data-id");

    try {
      const res = await fetch(`/api/product/${productId}`);
      const json = await res.json();

      if (!json.success) {
        showToast("Không tìm thấy sản phẩm.", "error");
        return;
      }

      const product = json.data;
      editQuill.root.innerHTML = product.description || "";
      // Gán vào input ẩn để phòng trường hợp submit chưa sửa gì
      document.getElementById("editDescription").value =
        product.description || "";

      // Gán dữ liệu
      document.getElementById("editProductId").value = product.id || "";
      document.getElementById("editProductName").value = product.name || "";
      document.getElementById("editDescription").value =
        editQuill.root.innerHTML;
      document.getElementById("editImportPrice").value =
        product.import_price || "";
      document.getElementById("editSalePrice").value =
        product.retail_price || "";
      document.getElementById("editCategory").value = product.category_id || "";
      document.getElementById("editBrand").value = product.brand_id || "";
      document.getElementById("editOrigin").value = product.origin || "";
      document.getElementById("editWarranty").value = product.warranty || "";

      // Reset mảng
      oldImageFiles = [];
      removedOldImages = [];
      allPreviewImages = [];

      if (product.images && Array.isArray(product.images)) {
        product.images.forEach((img) => {
          oldImageFiles.push(img.URL);
          allPreviewImages.push({
            type: "old",
            name: img.URL,
            file: null,
            preview: `/images/${img.URL}`,
          });
        });
      }

      renderUnifiedImagePreview();

      // Render specs
      const specData = product.specs || {};
      const specTableBody = document.getElementById("editSpecTableBody");
      const specTableContainer = document.getElementById(
        "editSpecTableContainer"
      );
      const specActions = document.getElementById("editSpecActions");

      specTableBody.innerHTML = "";
      if (Object.keys(specData).length > 0) {
        for (const [key, value] of Object.entries(specData)) {
          let displayValue = value;

          // Nếu là object hoặc array, stringify để xử lý
          if (typeof displayValue === "object" && displayValue !== null) {
            displayValue = JSON.stringify(displayValue);
          } else if (displayValue === null || displayValue === undefined) {
            displayValue = "";
          } else {
            displayValue = String(displayValue); // ép về chuỗi nếu là number, boolean...
          }

          // Xử lý chuỗi:
          displayValue = displayValue
            .replace(/["{}\[\]]/g, "") // Bỏ dấu ", { }, [ ]
            .split(",") // Tách theo dấu ,
            .map((item) => item.trim()) // Xóa khoảng trắng thừa
            .map((item) => {
              // Nếu là cặp key:value thì bỏ dấu " ở cả hai
              return item.replace(/:/, ": ");
            })
            .join("<br>");

          // Key cũng bỏ dấu ngoặc kép nếu có
          const cleanKey = key.replace(/["]/g, "");

          specTableBody.insertAdjacentHTML(
            "beforeend",
            `<tr><td>${cleanKey}</td><td>${displayValue}</td></tr>`
          );
        }

        specTableContainer.style.display = "block";
        specActions.style.display = "block";
      } else {
        specTableContainer.style.display = "none";
        specActions.style.display = "none";
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu sản phẩm:", err);
      showToast("Đã xảy ra lỗi khi lấy dữ liệu sản phẩm." + err, "error");
    }
  });
});

imageInput.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files);
  const validExtensions = [".png", ".jpg", ".jpeg"];

  for (const file of files) {
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      showToast(
        `"${file.name}" không hợp lệ. Chỉ chấp nhận file PNG hoặc JPG.`,
        "info"
      );
      continue;
    }

    if (allPreviewImages.length >= 3) {
      showToast("Chỉ được tối đa 3 ảnh.", "warning");
      break;
    }

    if (allPreviewImages.some((img) => img.name === file.name)) {
      showToast(`Ảnh "${file.name}" đã tồn tại.`, "warning");
      continue;
    }

    const preview = await fileToBase64(file);

    allPreviewImages.push({
      type: "new",
      name: file.name,
      file: file,
      preview: preview,
    });
  }

  renderUnifiedImagePreview();
  imageInput.value = "";
});

function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function renderUnifiedImagePreview() {
  previewContainer.innerHTML = "";

  allPreviewImages.forEach((imgObj) => {
    const wrapper = document.createElement("div");
    wrapper.className = "position-relative me-2 mb-2";
    wrapper.dataset.name = imgObj.name;

    const img = document.createElement("img");
    img.classList.add("img-thumbnail");
    img.style.width = "100px";
    img.style.height = "100px";
    img.src = imgObj.preview;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "×";
    removeBtn.type = "button";
    removeBtn.className = "btn btn-sm btn-danger position-absolute";
    removeBtn.style.top = "0";
    removeBtn.style.right = "0";

    removeBtn.onclick = () => {
      const indexToRemove = allPreviewImages.findIndex(
        (img) => img.name === imgObj.name
      );
      if (indexToRemove !== -1) {
        const removed = allPreviewImages.splice(indexToRemove, 1)[0];

        // Nếu là ảnh cũ, đánh dấu đã xóa
        if (removed.type === "old") {
          removedOldImages.push(removed.name);
          oldImageFiles = oldImageFiles.filter((name) => name !== removed.name);
        }

        renderUnifiedImagePreview();
      }

      if (allPreviewImages.length === 0) {
        imageInput.value = "";
      }
    };

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    previewContainer.appendChild(wrapper);
  });

  if (allPreviewImages.length === 0) {
    imageInput.value = "";
  }
}

//view product detail
const viewModalEl = document.getElementById("viewProductModal");
//product random filler
function generateProductCode(id) {
  const randomPart = ("0000" + ((id * 1237) % 10000)).slice(-4);
  return `${randomPart}${id}`;
}

viewModalEl.addEventListener("shown.bs.modal", async function (event) {
  const triggerBtn = event.relatedTarget;
  const productId = triggerBtn.dataset.id;

  try {
    const response = await fetch(`/api/product/${productId}`);
    const json = await response.json();
    if (!json.success) {
      showToast("Không tìm thấy sản phẩm.", "error");
      return;
    }

    const data = json.data;

    // Gán dữ liệu
    document.getElementById("viewId").textContent =
      "#" + generateProductCode(data.id);
    document.getElementById("viewName").textContent = data.name;
    document.getElementById("viewDescription").innerHTML = data.description;
    document.getElementById("viewImportPrice").textContent =
      Number(data.import_price).toLocaleString("vi-VN") + " VNĐ";
    document.getElementById("viewSalePrice").textContent =
      Number(data.retail_price).toLocaleString("vi-VN") + " VNĐ";
    document.getElementById("viewCategory").textContent =
      data.category_name || data.category_id;
    document.getElementById("viewBrand").textContent =
      data.brand_name || data.brand_id;
    document.getElementById("viewOrigin").textContent = data.origin;
    document.getElementById("viewWarranty").textContent = data.warranty;

    // Hình ảnh
    const imageContainer = document.getElementById("viewImages");
    imageContainer.innerHTML = "";
    if (Array.isArray(data.images) && data.images.length > 0) {
      data.images.forEach((img) => {
        const imgEl = document.createElement("img");
        imgEl.src = `/images/${img.URL}`;
        imgEl.classList.add("img-thumbnail");
        imgEl.style.maxWidth = "120px";
        imageContainer.appendChild(imgEl);
      });
    } else {
      imageContainer.innerHTML = `<p class="text-muted">Không có hình ảnh</p>`;
    }

    // Thông số kỹ thuật
    const specContainer = document.getElementById("viewSpecs");
    specContainer.innerHTML = "";
    if (!data.specs || Object.keys(data.specs).length === 0) {
      specContainer.innerHTML = `<tr><td colspan="2" class="text-muted">Không có thông số kỹ thuật</td></tr>`;
    } else {
      Object.entries(data.specs).forEach(([key, val]) => {
        const row = `<tr><td>${key.replace(/_/g, " ")}</td><td>${
          Array.isArray(val) ? val.join("<br>") : val
        }</td></tr>`;
        specContainer.insertAdjacentHTML("beforeend", row);
      });
    }
  } catch (err) {
    console.error("Lỗi khi tải sản phẩm:", err);
    showToast("Đã xảy ra lỗi khi lấy dữ liệu sản phẩm." + err, "error");
  }
});

//Acount
document.addEventListener("DOMContentLoaded", () => {
  // Thêm tài khoản
  document
    .getElementById("addAccountForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("accEmail").value;
      const password = document.getElementById("accPassword").value;
      const role = document.getElementById("accRole").value;

      try {
        const res = await fetch("/api/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem(
            "toastAfterReload",
            JSON.stringify({
              message: "Tạo tài khoản thành công!",
              type: "success",
            })
          );
          saveScrollAndTabAndReload();
        } else {
          showToast(data.message || "Lỗi khi tạo tài khoản.", "error");
        }
      } catch (error) {
        console.error(error);
        showToast("Lỗi server.", "error");
      }
    });

  // Bấm nút sửa: đổ dữ liệu vào modal
  document.querySelectorAll(".edit-account-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");
      const email = button.getAttribute("data-email");
      const role = button.getAttribute("data-role");

      document.getElementById("editAccountId").value = id;
      document.getElementById("editAccEmail").value = email;
      document.getElementById("editAccRole").value = role;

      // Mở modal
      const editModal = new bootstrap.Modal(
        document.getElementById("editAccountModal")
      );
      editModal.show();
    });
  });

  // Submit chỉnh sửa tài khoản
  document
    .getElementById("editAccountForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = document.getElementById("editAccountId").value;
      const email = document.getElementById("editAccEmail").value;
      const role = document.getElementById("editAccRole").value;

      try {
        const res = await fetch(`/api/account/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem(
            "toastAfterReload",
            JSON.stringify({
              message: "Cập nhật tài khoản thành công!",
              type: "success",
            })
          );
          saveScrollAndTabAndReload();
        } else {
          showToast(data.message || "Lỗi khi cập nhật tài khoản.", "error");
        }
      } catch (error) {
        console.error(error);
        showToast("Lỗi server.", "error");
      }
    });

  // Xóa tài khoản
  document.querySelectorAll(".delete-account-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const id = button.getAttribute("data-id");

      const result = await Swal.fire({
        title: "Xác nhận xóa?",
        text: "Bạn có chắc muốn xóa tài khoản này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d10024",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      });
      if (!result.isConfirmed) return;

      try {
        const res = await fetch(`/api/account/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem(
            "toastAfterReload",
            JSON.stringify({
              message: "Xoá tài khoản thành công!",
              type: "success",
            })
          );
          saveScrollAndTabAndReload();
        } else {
          showToast(data.message || "Lỗi khi xóa tài khoản.", "error");
        }
      } catch (error) {
        console.error(error);
        showToast("Lỗi server.", "error");
      }
    });
  });
});

//quill
let quill; // Quill editor cho thêm sản phẩm
let editQuill; // Quill editor cho sửa sản phẩm

document.addEventListener("DOMContentLoaded", function () {
  quill = new Quill("#quill-description", {
    theme: "snow",
    placeholder: "Nhập mô tả sản phẩm...",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
      ],
    },
  });

  editQuill = new Quill("#edit-quill-description", {
    theme: "snow",
    placeholder: "Nhập mô tả sản phẩm...",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
      ],
    },
  });

  const addProductModal = document.getElementById("addProductModal");
  if (addProductModal) {
    addProductModal.addEventListener("hidden.bs.modal", function () {
      quill.setContents([]);
    });
  }

  const editProductModal = document.getElementById("editProductModal");
  if (editProductModal) {
    editProductModal.addEventListener("hidden.bs.modal", function () {
      editQuill.setContents([]);
    });
  }

  document.querySelectorAll(".editProductBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.getAttribute("data-id");

      const res = await fetch(`/api/product/${productId}`);
      const json = await res.json();
      if (!json.success) return;
      const product = json.data;

      editQuill.root.innerHTML = product.description || "";
      document.getElementById("editDescription").value =
        product.description || "";
    });
  });
});

//order
document.querySelectorAll(".order-delete-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc muốn xóa đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d10024",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return;

    const orderId = form.getAttribute("data-id");
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Xoá đơn hàng thành công!",
            type: "success",
          })
        );
        form.closest("tr").remove(); // Xóa dòng khỏi giao diện
      } else {
        showToast("Không thể xóa đơn hàng. Vui lòng thử lại sau.", "error");
      }
    } catch (err) {
      showToast("Đã xảy ra lỗi khi xóa đơn hàng: " + err.message, "error");
      console.error(err);
    }
  });
});

// function formatVND(value) {
//     return Number(value).toLocaleString('vi-VN') + ' VNĐ';
// }

// Show order detail modal
// document.addEventListener('show.bs.modal', async function (event) {
//     const modal = event.target;
//     if (modal.id !== 'orderDetailModal') return;

//     const button = event.relatedTarget;
//     const id = button.getAttribute('data-id');

//     // Thiết lập action cho form
//     document.getElementById('orderUpdateForm').action = `/api/order-detail/${id}`;
//     document.getElementById('modalOrderId').value = id;
//     document.getElementById('modalOrderEmail').innerText = button.getAttribute('data-email') || '(Không có)';
//     document.getElementById('modalOrderName').innerText = button.getAttribute('data-name') || '(Không có)';
//     document.getElementById('modalOrderPhone').innerText = button.getAttribute('data-phone') || '(Không có)';
//     document.getElementById('modalOrderDate').innerText = button.getAttribute('data-date');
//     document.getElementById('modalOrderPayment').innerText = button.getAttribute('data-payment');
//     document.getElementById('modalOrderAddress').innerText = button.getAttribute('data-address') || '(Không có)';
//     document.getElementById('modalOrderNote').innerText = button.getAttribute('data-note') || '(Không có)';

//     // Tổng tiền (sau giảm)
//     const totalAfter = parseInt(button.getAttribute('data-total')) || 0;
//     document.getElementById('modalOrderTotal').innerText = formatVND(totalAfter);

//     // Lấy thông tin voucher từ data-attributes
//     const voucherCode = button.getAttribute('data-vouchercode') || '';
//     const voucherValue = parseInt(button.getAttribute('data-vouchervalue')) || 0;
//     const dataDiscount = parseInt(button.getAttribute('data-discount'));

//     // Tính và hiển thị Giảm giá (nếu có)
//     let discountAmount = 0;
//     if (!isNaN(dataDiscount)) {
//         // Nếu đã có sẵn data-discount (số tiền giảm trực tiếp)
//         discountAmount = dataDiscount;
//     } else if (voucherValue > 0 && totalAfter > 0) {
//         // Nếu có data-vouchervalue (phần trăm), tính ngược
//         discountAmount = Math.round((totalAfter * voucherValue) / (100 - voucherValue));
//     }

//     const discountWrapper = document.getElementById('modalOrderDiscountWrapper');
//     const discountEl = document.getElementById('modalOrderDiscount');
//     if (discountAmount > 0) {
//         discountWrapper.style.display = 'block';

//         // Hiển thị cả mã voucher và số tiền giảm
//         if (voucherCode) {
//             discountEl.innerText = `${voucherCode} - ${formatVND(discountAmount)}`;
//         } else {
//             // Nếu không có mã, chỉ hiển thị số tiền giảm
//             discountEl.innerText = `- ${formatVND(discountAmount)}`;
//         }
//     } else {
//         discountWrapper.style.display = 'none';
//         discountEl.innerText = '';
//     }

//     // Xử lý trạng thái
//     const status = button.getAttribute('data-status');
//     const badge = document.getElementById('modalOrderStatusDisplay');
//     document.getElementById("orderUpdateForm").dataset.status = status;
//     badge.className = 'badge';
//     badge.classList.add(
//         status === 'Hoàn Thành' ? 'bg-success' :
//             status === 'Chờ duyệt' ? 'bg-warning' :
//                 status === 'Đã duyệt' ? 'bg-info' :
//                     'bg-secondary'
//     );
//     badge.innerText = status;

//     // Load danh sách sản phẩm
//     const productList = document.getElementById('modalOrderProducts');
//     productList.innerHTML = `<tr><td colspan="3" class="text-muted text-center">Đang tải...</td></tr>`;
//     try {
//         const res = await fetch(`/api/order-detail/${id}`);
//         const data = await res.json();
//         productList.innerHTML = '';
//         if (!Array.isArray(data) || data.length === 0) {
//             productList.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Không có sản phẩm nào.</td></tr>`;
//         } else {
//             data.forEach(item => {
//                 const tr = document.createElement('tr');
//                 tr.innerHTML = `
//                     <td>${item.product_name}</td>
//                     <td>${item.quantity}</td>
//                     <td>${formatVND(item.subtotalprice)}</td>
//                 `;
//                 productList.appendChild(tr);
//             });
//         }
//     } catch (err) {
//         productList.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Lỗi khi tải sản phẩm.</td></tr>`;
//     }
// });
function formatVND(value) {
  return Number(value).toLocaleString("vi-VN") + " VNĐ";
}

// Show order detail modal
document.addEventListener("show.bs.modal", async function (event) {
  const modal = event.target;
  if (modal.id !== "orderDetailModal") return;

  const button = event.relatedTarget;
  const id = button.getAttribute("data-id");

  // Thiết lập action cho form
  document.getElementById("orderUpdateForm").action = `/api/order-detail/${id}`;
  document.getElementById("modalOrderId").value = id;
  document.getElementById("modalOrderEmail").innerText =
    button.getAttribute("data-email") || "(Không có)";
  document.getElementById("modalOrderName").innerText =
    button.getAttribute("data-name") || "(Không có)";
  document.getElementById("modalOrderPhone").innerText =
    button.getAttribute("data-phone") || "(Không có)";
  document.getElementById("modalOrderDate").innerText =
    button.getAttribute("data-date");
  document.getElementById("modalOrderPayment").innerText =
    button.getAttribute("data-payment");
  document.getElementById("modalOrderAddress").innerText =
    button.getAttribute("data-address") || "(Không có)";
  document.getElementById("modalOrderNote").innerText =
    button.getAttribute("data-note") || "(Không có)";

  // Tổng tiền (sau giảm)
  const totalAfter = parseInt(button.getAttribute("data-total")) || 0;
  document.getElementById("modalOrderTotal").innerText = formatVND(totalAfter);

  // Lấy thông tin voucher từ data-attributes
  const voucherCode = button.getAttribute("data-vouchercode") || "";
  const voucherValue = parseInt(button.getAttribute("data-vouchervalue")) || 0;
  const dataDiscount = parseInt(button.getAttribute("data-discount"));

  // Tính và hiển thị Giảm giá (nếu có)
  let discountAmount = 0;
  if (!isNaN(dataDiscount)) {
    // Nếu đã có sẵn data-discount (số tiền giảm trực tiếp)
    discountAmount = dataDiscount;
  } else if (voucherValue > 0 && totalAfter > 0) {
    // Nếu có data-vouchervalue (phần trăm), tính ngược
    discountAmount = Math.round(
      (totalAfter * voucherValue) / (100 - voucherValue)
    );
  }

  const discountWrapper = document.getElementById("modalOrderDiscountWrapper");
  const discountEl = document.getElementById("modalOrderDiscount");
  if (discountAmount > 0) {
    discountWrapper.style.display = "block";

    // Hiển thị cả mã voucher và số tiền giảm
    if (voucherCode) {
      discountEl.innerText = `${voucherCode} - ${formatVND(discountAmount)}`;
    } else {
      // Nếu không có mã, chỉ hiển thị số tiền giảm
      discountEl.innerText = `- ${formatVND(discountAmount)}`;
    }
  } else {
    discountWrapper.style.display = "none";
    discountEl.innerText = "";
  }

  // Xử lý trạng thái
  const status = button.getAttribute("data-status");
  const badge = document.getElementById("modalOrderStatusDisplay");
  document.getElementById("orderUpdateForm").dataset.status = status;
  badge.className = "badge";
  badge.classList.add(
    status === "Hoàn Thành"
      ? "bg-success"
      : status === "Chờ duyệt"
      ? "bg-warning"
      : status === "Đã duyệt"
      ? "bg-info"
      : "bg-secondary"
  );
  badge.innerText = status;

  // Load danh sách sản phẩm
  const productList = document.getElementById("modalOrderProducts");
  productList.innerHTML = `<tr><td colspan="3" class="text-muted text-center">Đang tải...</td></tr>`;
  try {
    const res = await fetch(`/api/order-detail/${id}`);
    const data = await res.json();
    productList.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      productList.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Không có sản phẩm nào.</td></tr>`;
    } else {
      data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${item.product_name}</td>
                    <td>${item.quantity}</td>
                    <td>${formatVND(item.subtotalprice)}</td>
                `;

                productList.appendChild(tr);
            });
            // Tính số tiền đã giảm nếu có discount
            if (discountValue > 0) {
                discountAmount = Math.round(totalBeforeDiscount * discountValue / 100);
            }
        }
    } catch (err) {
        productList.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Lỗi khi tải sản phẩm.</td></tr>`;
    }

    // Hiển thị giảm giá (nếu có)
    const discountWrapper = document.getElementById('modalOrderDiscountWrapper');
    const discountEl = document.getElementById('modalOrderDiscount');
    if (discountAmount > 0) {
        discountWrapper.style.display = 'block';
        discountEl.innerText = `- ${formatVND(discountAmount)}`;
    } else {
        discountWrapper.style.display = 'none';
        discountEl.innerText = '';
    }

    // Hiển thị tổng tiền sau giảm
    document.getElementById('modalOrderTotal').innerText = formatVND(totalBeforeDiscount - discountAmount);
});

// Cập nhật trạng thái đơn hàng
document
  .getElementById("orderUpdateForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const orderId = document.getElementById("modalOrderId").value.trim();
    const status = document.getElementById("orderUpdateForm").dataset.status; // Lấy từ dataset

    if (!orderId || !status) {
      showToast("Thiếu thông tin đơn hàng.", "warning");
      return;
    }

    if (status !== "Chờ duyệt") {
      return;
    }

    try {
      const response = await fetch(`/api/order/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Chờ duyệt" }),
      });

      if (response.ok) {
        localStorage.setItem(
          "toastAfterReload",
          JSON.stringify({
            message: "Duyệt đơn hàng thành công!",
            type: "success",
          })
        );
        saveScrollAndTabAndReload();
      } else {
        const text = await response.text();
        showToast("Có lỗi xảy ra khi cập nhật đơn hàng: " + text, "error");
      }
    } catch (error) {
      showToast(
        "Lỗi khi gửi yêu cầu cập nhật đơn hàng: " + error.message,
        "error"
      );
      console.error(error);
    }
  });

//loc role
document.addEventListener("DOMContentLoaded", function () {
  const roleFilter = document.getElementById("roleFilter");
  // Lấy tất cả các <tr> trong phần <tbody> của bảng
  const rows = document.querySelectorAll("#accounts tbody tr");

  roleFilter.addEventListener("change", function () {
    const selectedRole = this.value.trim().toLowerCase();

    rows.forEach((row) => {
      // Cột "Quyền" là cột thứ 3, nên ta chọn td:nth-child(3)
      const roleCell = row.querySelector("td:nth-child(3)");
      if (!roleCell) return;

      const roleText = roleCell.textContent.trim().toLowerCase();

      // Nếu chọn "Tất cả" (selectedRole == ""), hiển thị hết
      // Ngược lại chỉ hiển thị nếu roleText === selectedRole
      if (selectedRole === "" || roleText === selectedRole) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});
// loc trang thai don hang
document.addEventListener("DOMContentLoaded", function () {
  const statusFilter = document.getElementById("statusFilter");
  const rows = document.querySelectorAll("#orders tbody tr");

  statusFilter.addEventListener("change", function () {
    const selectedStatus = this.value.trim().toLowerCase();

    rows.forEach((row) => {
      // Cột "Trạng thái" nằm ở vị trí thứ 6 (nth-child(6))
      const statusCell = row.querySelector("td:nth-child(6)");
      if (!statusCell) return;

      const statusText = statusCell.textContent.trim().toLowerCase();
      if (selectedStatus === "" || statusText === selectedStatus) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});

//Shipping
function formatVND(value) {
  return Number(value).toLocaleString("vi-VN") + " VNĐ";
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "(Không rõ)" : d.toLocaleDateString("vi-VN");
}

function formatFullDateTime(date = new Date()) {
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`
  );
}

function generateOrderCode(id) {
  const randomPart = ("0000" + ((id * 7919) % 10000)).slice(-4);
  return `${randomPart}${id}`;
}

let formCancelled = false;

document.addEventListener("DOMContentLoaded", () => {
  const orderList = document.getElementById("orderList");
  const addBtn = document.querySelector('[data-bs-target="#addOrderModal"]');
  const addForm = document.getElementById("addShippingForm");

  if (!orderList || !addBtn || !addForm) return;

  // Khi bấm Hủy thì đánh dấu cần reset form
  document
    .querySelector("#addShippingModal .btn-secondary")
    ?.addEventListener("click", () => (formCancelled = true));

  // Load danh sách đơn chờ giao
  addBtn.addEventListener("click", () => {
    fetch("/api/order/basic-on-delivering")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          orderList.innerHTML = `<tr><td colspan="4">Không có đơn hàng nào.</td></tr>`;
          return;
        }
        orderList.innerHTML = data
          .map((o) => {
            const code = generateOrderCode(o.id);
            return `<tr>
                        <td>#${code}</td>
                        <td>${o.fullname}</td>
                        <td>${o.phone}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-primary select-order"
                                    data-id="${o.id}"
                                    data-code="${code}">
                              Chọn
                            </button>
                        </td>
                    </tr>`;

          })
          .join("");
      })
      .catch(() => {
        orderList.innerHTML = `<tr><td colspan="4" class="text-danger">Không thể tải đơn.</td></tr>`;
      });
  });

  // Bắt sự kiện chọn đơn
  orderList.addEventListener("click", (e) => {
    const btn = e.target.closest(".select-order");
    if (!btn) return;
    selectOrder(+btn.dataset.id, btn.dataset.code);
  });

  // Reset form khi đóng modal
  document
    .getElementById("addShippingModal")
    .addEventListener("hidden.bs.modal", () => {
      if (formCancelled) {
        addForm.reset();
        document.getElementById("modalOrderId").value = "";
        [
          "shippingOrderCode",
          "shippingOrderName",
          "shippingOrderEmail",
          "shippingOrderPhone",
          "shippingOrderDate",
          "shippingOrderPayment",
          "shippingOrderAddress",
          "shippingOrderTotal",
          "shippingOrderNote",
          "shippingOrderVoucherCode",
        ].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.innerText = "";
        });
        document.getElementById("shippingOrderVoucher").style.display = "none";
        document.getElementById(
          "shippingOrderProductList"
        ).innerHTML = `<tr><td colspan="3" class="text-muted text-center">Đang tải...</td></tr>`;
      }
      formCancelled = false;
    });

  // Submit form: tạo shipping & gửi email
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id_order = document.getElementById("modalOrderId").value;
    const delivery_method = document.getElementById("deliveryMethod").value;
    const shipping_address = document.getElementById(
      "shippingOrderAddress"
    ).innerText;
    const shipping_status = "Thành công";
    const shipping_date = formatFullDateTime();

    if (!id_order || !delivery_method || !shipping_address) {
      alert("Vui lòng chọn đơn hàng và phương thức giao hàng.");
      return;
    }

    try {
      const resp = await fetch("/api/shipping/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipping_date,
          delivery_method,
          shipping_status,
          id_order,
          shipping_address,
        }),
      });
      const result = await resp.json();
      if (!resp.ok || !result.success) {
        return alert("Tạo thất bại: " + (result.message || resp.statusText));
      }

      alert("Tạo đơn giao hàng thành công và email đã được gửi.");
      bootstrap.Modal.getInstance(
        document.getElementById("addShippingModal")
      )?.hide();
      window.location.reload();
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
      alert("Đã xảy ra lỗi khi gửi dữ liệu.");
    }
  });
});

// Hiển thị chi tiết đơn & sản phẩm
async function selectOrder(id, orderCode) {
  try {
    const [order, products] = await Promise.all([
      fetch(`/api/order/details/${id}`).then((r) => r.json()),
      fetch(`/api/order-detail/${id}`).then((r) => r.json()),
    ]);
    if (!order.id) throw new Error();

    document.getElementById("modalOrderId").value = id;
    document.getElementById("shippingOrderCode").innerText = "#" + orderCode;
    document.getElementById("shippingOrderName").innerText =
      order.fullname || "(Không có)";
    document.getElementById("shippingOrderEmail").innerText =
      order.email || "(Không có)";
    document.getElementById("shippingOrderPhone").innerText =
      order.phone || "(Không có)";
    document.getElementById("shippingOrderDate").innerText = formatDate(
      order.created_at
    );
    document.getElementById("shippingOrderPayment").innerText =
      order.payment_method || "(Không có)";
    document.getElementById("shippingOrderAddress").innerText =
      order.address || "(Không có)";
    document.getElementById("shippingOrderNote").innerText =
      order.note || "(Không có)";

    // Hiển thị danh sách sản phẩm
    const tb = document.getElementById("shippingOrderProductList");
    tb.innerHTML = "";
    if (!products.length) {
      tb.innerHTML = `<tr><td colspan="3" class="text-danger text-center">Không có sản phẩm.</td></tr>`;
    } else {
      products.forEach((it) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${it.product_name}</td>
                    <td>${it.quantity}</td>
                    <td>${formatVND(it.subtotalprice)}</td>
                `;
        tb.appendChild(tr);
      });
    }

    // Hiển thị Tổng tiền (sau giảm)
    document.getElementById(
      "shippingOrderTotal"
    ).innerHTML = `<span class="text-danger">${formatVND(order.total_payment || 0)}</span>`;

    // Tính số tiền giảm từ voucher_value
    const voucherValue = parseInt(order.voucher_value) || 0;
    const totalAfter = parseInt(order.total_payment) || 0;
    let discountAmount = 0;
    if (voucherValue > 0 && totalAfter > 0) {
      discountAmount = Math.round((totalAfter * voucherValue) / (100 - voucherValue));
    }

    // Hiển thị "Mã giảm giá" nhưng thực ra show số tiền giảm
    if (discountAmount > 0) {
      document.getElementById("shippingOrderVoucher").style.display = "block";
      document.getElementById("shippingOrderVoucherCode").innerHTML = 
        `<span class="text-danger">- ${formatVND(discountAmount)}</span>`;
    } else {
      document.getElementById("shippingOrderVoucher").style.display = "none";
    }

    bootstrap.Modal.getInstance(document.getElementById("addOrderModal"))?.hide();
    setTimeout(() => {
      let m = bootstrap.Modal.getInstance(
        document.getElementById("addShippingModal")
      );
      if (!m)
        m = new bootstrap.Modal(document.getElementById("addShippingModal"));
      m.show();
    }, 300);
  } catch {
    console.error("Lỗi tải đơn hoặc sản phẩm");
    alert("Không thể tải thông tin đơn hàng hoặc sản phẩm.");
  }
}

//loc category
// Mã lọc sản phẩm theo danh mục, chuyển vào jQuery ready:
$(document).ready(function () {
  // Chỉ chọn <tbody> của <table class="table table-striped">
  const tableBody = document.querySelector(
    "#products table.table-striped tbody"
  );
  const filterSelect = document.getElementById("filterCategory");

  if (!filterSelect || !tableBody) {
    console.error(
      "Không tìm thấy filterCategory hoặc table.table-striped tbody"
    );
    return;
  }

  const allRows = Array.from(tableBody.querySelectorAll("tr"));
  console.log("Tổng số dòng sản phẩm tìm được:", allRows.length);

  filterSelect.addEventListener("change", function () {
    const selectedCat = this.value.trim();
    console.log("Đã chọn danh mục ID =", selectedCat);

    allRows.forEach((row) => {
      const rowCatId = (row.getAttribute("data-category-id") || "").trim();
      row.style.display =
        !selectedCat || rowCatId === selectedCat ? "" : "none";
    });
  });
});

