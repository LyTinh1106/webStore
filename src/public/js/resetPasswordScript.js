const form = document.getElementById('resetForm');
const messageDiv = document.getElementById('resetMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Ngăn không chuyển trang

  const formData = new FormData(form);
  const email = formData.get('email');

  try {
    const response = await fetch('/send-reset-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      messageDiv.textContent = result.message || 'Email khôi phục đã được gửi!';
      messageDiv.classList.remove('text-danger');
      messageDiv.classList.add('text-success');

      // 👉 Thêm alert
      showToast('Vui lòng kiểm tra email để đặt lại mật khẩu!', 'success');
    } else {
      messageDiv.textContent = result.message || 'Có lỗi xảy ra!';
      messageDiv.classList.remove('text-success');
      messageDiv.classList.add('text-danger');
    }
  } catch (error) {
    messageDiv.textContent = 'Lỗi kết nối đến máy chủ!';
    messageDiv.classList.remove('text-success');
    messageDiv.classList.add('text-danger');
  }
});