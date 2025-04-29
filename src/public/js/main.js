(function ($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	$('.dropdown').hover(
		function (e) {
			$(this).find('.cart-dropdown').stop(true, true).slideDown(100);
		},
		function (e) {
			$(this).find('.cart-dropdown').stop(true, true).slideUp(100);
		}
	);

	$('.dropdown').hover(
		function () {
			$(this).addClass('open');
		},
		function () {
			$(this).removeClass('open');
		}
	);
	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function () {
		var $this = $(this),
			$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			]
		});
	});

	//Banners Slick
	$('.banners-slick').each(function () {
		var $this = $(this),
			$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 500,
			dots: true,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			rslidesToShow: 1,
			slidesToScroll: 1,
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function () {
		var $this = $(this),
			$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
		infinite: true,
		speed: 300,
		dots: true,
		arrows: true,
		fade: true,
		asNavFor: '#product-imgs',
	});

	// Product imgs Slick
	$('#product-imgs').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		centerMode: false,
		focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
		asNavFor: '#product-main-img',
		infinite: true,
		responsive: [{
			breakpoint: 991,
			settings: {
				vertical: false,
				arrows: false,
				dots: true,
				infinite: true,
			}
		},
		]
	});

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function () {
		var $this = $(this),
			$input = $this.find('input[type="number"]'),
			up = $this.find('.qty-up'),
			down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this, value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this, value)
		})
	});

	var priceInputMax = document.getElementById('price-max'),
		priceInputMin = document.getElementById('price-min');

	priceInputMax.addEventListener('change', function () {
		updatePriceSlider($(this).parent(), this.value)
	});

	priceInputMin.addEventListener('change', function () {
		updatePriceSlider($(this).parent(), this.value)
	});

	function updatePriceSlider(elem, value) {
		if (elem.hasClass('price-min')) {
			console.log('min')
			priceSlider.noUiSlider.set([value, null]);
		} else if (elem.hasClass('price-max')) {
			console.log('max')
			priceSlider.noUiSlider.set([null, value]);
		}
	}

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1, 999],
			connect: true,
			step: 1,
			range: {
				'min': 1,
				'max': 999
			}
		});

		priceSlider.noUiSlider.on('update', function (values, handle) {
			var value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});
		priceSlider.noUiSlider.on('change', function (values) {
			const min = Math.round(values[0]);
			const max = Math.round(values[1]);
			filterByPrice(min, max);
		});

	}
	/////////////////////////////////////////

	// Dropdown toggle on click + hover
	$('.account-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	$('.dropdown').hover(
		function (e) {
			$(this).find('.account-dropdown').stop(true, true).slideDown(100);
		},
		function (e) {
			$(this).find('.account-dropdown').stop(true, true).slideUp(100);
		}
	);

	$('.dropdown').hover(
		function () {
			$(this).addClass('open');
		},
		function () {
			$(this).removeClass('open');
		}
	);

})(jQuery);
// Tách lọc theo Category
const categoryCheckboxes = document.querySelectorAll('.category-filter input[type="checkbox"]');
categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterByCategory));

async function filterByCategory() {
	const category_ids = Array.from(categoryCheckboxes)
		.filter(cb => cb.checked)
		.map(cb => cb.value);

	const res = await fetch('/api/product/filter/categories', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ category_ids })
	});

	const products = await res.json();
	renderFilteredProducts(products, category_ids.length > 0);
}

// Tách lọc theo Brand
const brandCheckboxes = document.querySelectorAll('.brand-filter input[type="checkbox"]');
brandCheckboxes.forEach(cb => cb.addEventListener('change', filterByBrand));

async function filterByBrand() {
	const brand_ids = Array.from(brandCheckboxes)
		.filter(cb => cb.checked)
		.map(cb => cb.value);

	const res = await fetch('/api/product/filter/brands', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ brand_ids })
	});

	const products = await res.json();
	renderFilteredProducts(products, brand_ids.length > 0);
}
// tách lọc theo thanh kéo trượt giá
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');

priceMin.addEventListener('change', () => {
	const min = parseInt(priceMin.value) || 0;
	const max = parseInt(priceMax.value) || 999999;
	filterByPrice(min, max);
});

priceMax.addEventListener('change', () => {
	const min = parseInt(priceMin.value) || 0;
	const max = parseInt(priceMax.value) || 999999;
	filterByPrice(min, max);
});

async function filterByPrice(min, max) {
	const res = await fetch('/api/product/filter-price', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ min, max })
	});

	const products = await res.json();
	renderFilteredProducts(products, true);
}

// Hàm render sản phẩm lọc
function renderFilteredProducts(products, shouldShowFiltered) {
	const filteredBox = document.getElementById('filtered-products');
	const allBox = document.getElementById('all-products');
	filteredBox.innerHTML = '';

	if (!shouldShowFiltered) {
		filteredBox.classList.add('d-none');
		allBox.classList.remove('d-none');
		return;
	}

	allBox.classList.add('d-none');
	filteredBox.classList.remove('d-none');

	if (!products || products.length === 0) {
		filteredBox.innerHTML = `
		<div class="message-notify">
  			<p>Không có sản phẩm phù hợp.</p>
		</div>
		`;
		return;
	}

	products.forEach(p => {
		filteredBox.innerHTML += `
      <div class="col-md-4 col-xs-6">
        <div class="product">
          <div class="product-img">
            <img src="/images/${p.image}" alt="${p.name}">
          </div>
          <div class="product-body">
            <p class="product-category">${p.category_name || ''}</p>
            <h3 class="product-name"><a href="#">${p.name}</a></h3>
            <h4 class="product-price">$${p.retail_price}</h4>
            <div class="product-rating">
												<i class="fa fa-star"></i>
												<i class="fa fa-star"></i>
												<i class="fa fa-star"></i>
												<i class="fa fa-star"></i>
												<i class="fa fa-star"></i>
			</div>
            <div class="product-btns">
              <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
              <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
              <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
            </div>
          </div>
          <div class="add-to-cart">
            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
          </div>
        </div>
      </div>
    `;
	});
}
// header chuyển trang + lọc

const navLinks = document.querySelectorAll('#nav-categories a');

navLinks.forEach(link => {
	link.addEventListener('click', async function (e) {
		const href = this.getAttribute('href');
		const categoryId = this.getAttribute('data-id');

		if (href === '/' || href === '/store/all') {
			// Nếu là Trang Chủ hoặc Sản Phẩm => cho chuyển trang bình thường
			return;
		}

		// Nếu là Laptop, Chuột, Bàn phím, Màn hình => chặn chuyển trang
		e.preventDefault();

		// Xóa active tất cả li
		navLinks.forEach(link => link.parentElement.classList.remove('active'));

		// Active li mới click
		this.parentElement.classList.add('active');

		// Bỏ hết check cũ ở category filter
		document.querySelectorAll('.category-filter input[type="checkbox"]').forEach(cb => cb.checked = false);

		// Check đúng checkbox tương ứng category_id
		const targetCheckbox = document.querySelector(`.category-filter input[value="${categoryId}"]`);
		if (targetCheckbox) {
			targetCheckbox.checked = true;
		}

		// Gọi filter theo checkbox mới
		filterByCategory();
	});
});










