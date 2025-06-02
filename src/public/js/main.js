(function ($) {
  "use strict";
  // ----------- XỬ LÝ GIAO DIỆN, NAV, SLICK -------------
  // Mobile Nav toggle
  $(".menu-toggle > a").on("click", function (e) {
    e.preventDefault();
    $("#responsive-nav").toggleClass("active");
  });

  // Fix cart dropdown from closing
  $(".cart-dropdown").on("click", function (e) {
    e.stopPropagation();
  });

  $(".dropdown").hover(
    function () {
      $(this).find(".cart-dropdown").stop(true, true).slideDown(100);
    },
    function () {
      $(this).find(".cart-dropdown").stop(true, true).slideUp(100);
    }
  );

  $(".dropdown").hover(
    function () {
      $(this).addClass("open");
    },
    function () {
      $(this).removeClass("open");
    }
  );

  // Products Slick
  $(".products-slick").each(function () {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });

  // Banners Slick
  $(".banners-slick").each(function () {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 500,
      dots: true,
      arrows: true,
      appendArrows: $nav ? $nav : false,
    });
  });

  // Products Widget Slick
  $(".products-widget-slick").each(function () {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      infinite: true,
      autoplay: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
    });
  });

  // Product Main img Slick
  $("#product-main-img").slick({
    infinite: false,
    speed: 300,
    dots: false,
    arrows: false,
    fade: true,
    asNavFor: "#product-imgs",
  });

  // Product imgs Slick
  $("#product-imgs").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: 0,
    vertical: true,
    asNavFor: "#product-main-img",
    infinite: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: false,
          infinite: true,
        },
      },
    ],
  });

  // Dropdown toggle on click + hover (account)
  $(".account-dropdown").on("click", function (e) {
    e.stopPropagation();
  });

  $(".dropdown").hover(
    function () {
      $(this).find(".account-dropdown").stop(true, true).slideDown(100);
    },
    function () {
      $(this).find(".account-dropdown").stop(true, true).slideUp(100);
    }
  );

  $(".dropdown").hover(
    function () {
      $(this).addClass("open");
    },
    function () {
      $(this).removeClass("open");
    }
  );

})(jQuery);

// ------------ FILTER GIÁ, CHECKBOX, RENDER SẢN PHẨM: QUẢN LÝ TẠI ĐÂY ------------
document.addEventListener("DOMContentLoaded", () => {
  // Lấy DOM filter
  const priceSlider = document.getElementById("price-slider");
  const priceMin = document.getElementById("price-min");
  const priceMax = document.getElementById("price-max");
  const categoryCheckboxes = document.querySelectorAll('.category-filter input[type="checkbox"]');
  const brandCheckboxes = document.querySelectorAll('.brand-filter  input[type="checkbox"]');
  const filteredBox = document.getElementById("filtered-products");
  const allBox = document.getElementById("all-products");
  const paginationBox = document.getElementById("store-nav");

  // Khởi tạo noUiSlider (nếu có)
  if (priceSlider && priceMin && priceMax) {
    noUiSlider.create(priceSlider, {
      start: [1000, 200000000],
      connect: true,
      step: 1000,
      range: {
        min: 1000,
        max: 200000000,
      },
      format: {
        to: value => Math.round(value),
        from: value => Number(value.toString().replace(/[^\d]/g, "")),
      },
    });

    // Slider kéo -> cập nhật input + gọi filter
    priceSlider.noUiSlider.on("update", (values, handle) => {
      if (handle === 0) priceMin.value = values[0];
      if (handle === 1) priceMax.value = values[1];
    });
    priceSlider.noUiSlider.on("change", () => applyCombinedFilter());

    // Nhập input -> cập nhật slider (không gọi filter ở đây, filter sẽ được gọi khi slider set xong)
    priceMin.addEventListener("change", function () {
  priceSlider.noUiSlider.set([this.value, null]);
  // Gọi lọc sau khi nhập giá xong
  applyCombinedFilter();
});
priceMax.addEventListener("change", function () {
  priceSlider.noUiSlider.set([null, this.value]);
  // Gọi lọc sau khi nhập giá xong
  applyCombinedFilter();
});
  }

  // Checkbox filter change
  [...categoryCheckboxes, ...brandCheckboxes].forEach(cb =>
    cb.addEventListener("change", applyCombinedFilter)
  );

  // Hàm lọc + render (dùng chung)
  async function applyCombinedFilter() {
    const category_ids = Array.from(categoryCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    const brand_ids = Array.from(brandCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    const min = parseInt(priceMin.value) || 0;
    const max = parseInt(priceMax.value) || 999999999;

    try {
      const res = await fetch("/api/product/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_ids, brand_ids, min, max }),
      });
      const products = await res.json();
      renderFilteredProducts(
        products,
        category_ids.length > 0 || brand_ids.length > 0 || min > 0 || max < 999999999
      );
    } catch (err) {
      console.error("Lỗi khi filter:", err);
    }
  }

  // Hàm render sản phẩm đã lọc + phân trang
  function renderFilteredProducts(
    products,
    shouldShowFiltered,
    currentPage = 1
  ) {
    function formatVND(value) {
      return value.toLocaleString("vi-VN");
    }
    filteredBox.innerHTML = "";

    const productsPerPage = 9;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const currentProducts = products.slice(start, end);

    if (!shouldShowFiltered) {
      filteredBox.classList.add("d-none");
      allBox.classList.remove("d-none");
      paginationBox.style.display = "none";
      return;
    }
    allBox.classList.add("d-none");
    filteredBox.classList.remove("d-none");

    if (!products || products.length === 0) {
      filteredBox.innerHTML = `
        <div class="message-notify">
          <p>Không có sản phẩm phù hợp.</p>
        </div>
      `;
      paginationBox.style.display = "none";
      return;
    } else {
      paginationBox.style.display = "block";
    }

    currentProducts.forEach((p) => {
      filteredBox.innerHTML += `
      <div class="col-md-4 col-xs-6">
        <div class="product">
          <a href="/product/${p.id}">
            <div class="product-img">
              <img src="/images/${p.image}" alt="${p.name}">
            </div>
          </a> 
          <div class="product-body">
            <p class="product-category">${p.category_name || ""}</p>
            <h3 class="product-name"><a href="/product/${p.id}">${p.name}</a></h3>
            <h4 class="product-price">${formatVND(p.retail_price)} VNĐ</h4>
            <div class="product-rating">
              <i class="fa fa-star" style="margin-right: 1px;"></i>
              <i class="fa fa-star" style="margin-right: 1px;"></i>
              <i class="fa fa-star" style="margin-right: 1px;"></i>
              <i class="fa fa-star" style="margin-right: 1px;"></i>
              <i class="fa fa-star" style="margin-right: 1px;"></i>
            </div>
            <div class="product-btns">
              <button class="add-to-compare"
                data-id="${p.id}" 
                data-name="${p.name}" 
                data-image="${p.image}" 
                data-category="${p.category_id}">
                <i class="fa fa-exchange"></i>
                <span class="tooltipp">add to compare</span>
              </button>
            </div>
          </div>
          <div class="add-to-cart">
            <button class="add-to-cart-btn"
              data-id="${p.id}" 
              data-img="/images/${p.image}" 
              data-name="${p.name}" 
              data-price="${p.retail_price}">
              <i class="fa fa-shopping-cart"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      `;
    });

    // Pagination
    let paginationHTML = '<ul class="store-pagination">';
    paginationHTML += `
      <li class="${currentPage <= 1 ? "disabled" : ""}">
        <a href="#" data-page="${Math.max(currentPage - 1, 1)}"><i class="fa fa-angle-left"></i></a>
      </li>
    `;
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `
        <li class="${i === currentPage ? "active" : ""}">
          <a href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }
    paginationHTML += `
      <li class="${currentPage >= totalPages ? "disabled" : ""}">
        <a href="#" data-page="${Math.min(currentPage + 1, totalPages)}"><i class="fa fa-angle-right"></i></a>
      </li>
    `;
    paginationHTML += "</ul>";
    paginationBox.innerHTML = paginationHTML;

    // Phân trang click
    paginationBox.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = parseInt(this.getAttribute("data-page"));
        renderFilteredProducts(products, shouldShowFiltered, page);
      });
    });

    // Sự kiện "So sánh"
    filteredBox.querySelectorAll(".add-to-compare").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-id");
        const name = btn.getAttribute("data-name");
        const image = btn.getAttribute("data-image");
        const category_id = btn.getAttribute("data-category");
        addToCompare({ id, name, image, category_id });
      });
    });
  }

  // Nếu truy cập /store?category=xxx sẽ auto lọc theo category đó
  if (window.location.pathname.startsWith("/store")) {
    const cid = new URLSearchParams(window.location.search).get("category");
    if (cid) {
      categoryCheckboxes.forEach((cb) => (cb.checked = false));
      const cb = document.querySelector(`.category-filter input[value="${cid}"]`);
      if (cb) {
        cb.checked = true;
        applyCombinedFilter();
      }
    }
  }

  // Nav category click → auto filter hoặc chuyển trang
  document.querySelectorAll("#nav-categories a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const categoryId = this.dataset.id;
      const isStore = window.location.pathname.startsWith("/store");

      // 1) Nếu là home hoặc /store/all → redirect
      if (href === "/" || href === "/store/all") {
        window.location.href = href;
        return;
      }
      // 2) Nếu là /store?category=xxx
      if (categoryId && categoryId !== "0") {
        if (!isStore) {
          window.location.href = `/store?category=${categoryId}`;
        } else {
          document.querySelectorAll('.category-filter input[type="checkbox"]').forEach(cb => cb.checked = false);
          const cb = document.querySelector(`.category-filter input[value="${categoryId}"]`);
          if (cb) {
            cb.checked = true;
            applyCombinedFilter();
          }
        }
      }
    });
  });

  // Nếu muốn tự động lọc lúc load trang, gọi ở đây (nếu cần)
  // applyCombinedFilter();
});
