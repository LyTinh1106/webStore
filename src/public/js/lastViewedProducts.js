// Hàm set cookie cơ bản
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
}

function getCookie(name) {
    const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return match ? decodeURIComponent(match[2]) : null;
}

document.addEventListener('DOMContentLoaded', function () {
    var detailIdEl = document.getElementById('detail-id');
    if (detailIdEl) {
        var productId = detailIdEl.textContent.trim();
        // Lưu nhiều id vào cookie
        const MAX_HISTORY = 10;
        let ids = [];

        // Lấy mảng cũ nếu có
        try {
            ids = JSON.parse(getCookie('viewed_product_ids') || '[]');
        } catch (e) {
            ids = [];
        }

        // Xóa id hiện tại nếu đã có (để không bị trùng)
        ids = ids.filter(id => id !== productId);

        // Thêm id mới vào đầu mảng
        ids.unshift(productId);

        // Giới hạn tối đa
        if (ids.length > MAX_HISTORY) ids = ids.slice(0, MAX_HISTORY);

        // Lưu lại vào cookie (dạng JSON)
        setCookie('viewed_product_ids', JSON.stringify(ids), 7);
    }
});