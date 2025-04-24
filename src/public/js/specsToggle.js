document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('specs-container');
    const toggleLink = document.getElementById('toggle-specs-link');

    let expanded = false;

    toggleLink.addEventListener('click', function () {
        expanded = !expanded;
        container.classList.toggle('expanded', expanded);
        toggleLink.innerText = expanded ? 'Rút gọn' : 'Xem thêm';
    });
});

