function showToast(message, type = 'info', duration = 3000) {
    const icons = {
        success: "✔️",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️"
    };
    const icon = icons[type] || "";

    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    toast.innerHTML = `<span style="font-size:20px;margin-right:10px">${icon}</span> ${message}`;

    document.getElementById('toast-container').appendChild(toast);

    // Tự động biến mất với hiệu ứng mờ dần
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300); // Cho hiệu ứng mờ dần tự nhiên
    }, duration);
}

// notify after reload
document.addEventListener('DOMContentLoaded', function () {
    const toastInfo = localStorage.getItem('toastAfterReload');
    if (toastInfo) {
        try {
            const { message, type } = JSON.parse(toastInfo);
            showToast(message, type || 'info');
        } catch { }
        localStorage.removeItem('toastAfterReload');
    }
});