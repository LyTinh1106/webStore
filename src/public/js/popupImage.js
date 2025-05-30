document.addEventListener('DOMContentLoaded', function () {
    // Danh sách URL ảnh (lấy từ main + thumb)
    const thumbImgs = Array.from(document.querySelectorAll('#product-imgs .product-preview img'));
    const mainImgs = Array.from(document.querySelectorAll('#product-main-img .product-preview img'));
    const allImgs = thumbImgs.length > 0 ? thumbImgs : mainImgs; // fallback

    // Chuyển đổi sang array URL (chuẩn hóa src, bỏ domain nếu có)
    const imgUrls = allImgs.map(img => img.src);

    // Modal & các nút
    const modal = document.getElementById('imagePopupModal');
    const popupImg = document.getElementById('popupImage');
    const closeBtn = document.getElementById('popupCloseBtn');
    const prevBtn = document.getElementById('popupPrevBtn');
    const nextBtn = document.getElementById('popupNextBtn');
    let currentIndex = 0, isGallery = false;

    // --- Xử lý thumbnail: mở popup gallery ---
    thumbImgs.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            popupImg.src = imgUrls[i];
            currentIndex = i;
            isGallery = true;
            modal.style.display = 'flex';
            prevBtn.style.display = (imgUrls.length > 1) ? 'block' : 'none';
            nextBtn.style.display = (imgUrls.length > 1) ? 'block' : 'none';
        });
    });

    // --- Xử lý main image: chỉ mở popup đơn ---
    mainImgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            popupImg.src = img.src;
            isGallery = false;
            modal.style.display = 'flex';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        });
    });

    // Prev/Next trong gallery
    prevBtn.onclick = function (e) {
        e.stopPropagation();
        if (!isGallery) return;
        currentIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
        popupImg.src = imgUrls[currentIndex];
    };
    nextBtn.onclick = function (e) {
        e.stopPropagation();
        if (!isGallery) return;
        currentIndex = (currentIndex + 1) % imgUrls.length;
        popupImg.src = imgUrls[currentIndex];
    };

    // Đóng popup
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };
    modal.onclick = function (e) {
        if (e.target === modal) modal.style.display = 'none';
    };

    // Hỗ trợ phím ← → và ESC khi mở gallery
    document.addEventListener('keydown', function (e) {
        if (modal.style.display !== 'flex') return;
        if (isGallery && e.key === 'ArrowLeft') prevBtn.click();
        if (isGallery && e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') modal.style.display = 'none';
    });
});