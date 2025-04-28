const form = document.getElementById("otpForm");
const inputs = document.querySelectorAll(".otp-inputs input");

inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const otp = Array.from(inputs).map(i => i.value).join("");

    if (otp.length !== 6) {
        alert("Vui lòng nhập đủ 6 số.");
        return;
    }

    try {
        const response = await fetch("/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = "/login";
        } else {
            alert(result.message || "Mã OTP không đúng.");
        }
    } catch (error) {
        console.error("Lỗi xác minh:", error);
        alert("Có lỗi xảy ra khi xác minh OTP.");
    }
});

