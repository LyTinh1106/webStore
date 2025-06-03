$(function () {
    $('.toggle-password').on('click', function () {
        // Tìm input ngay trước icon (hoặc tuỳ theo HTML, tìm trong cha)
        var $group = $(this).closest('.input-group');
        var $input = $group.find('input[type="password"], input[type="text"]');

        // Đổi type
        var isPwd = $input.attr('type') === 'password';
        $input.attr('type', isPwd ? 'text' : 'password');

        // Đổi icon
        $(this).toggleClass('fa-eye fa-eye-slash');
    });
});