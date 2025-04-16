// Hiện/ẩn mật khẩu
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