
document.addEventListener("DOMContentLoaded", function () {
    const yearSelect = document.getElementById('yearSelect');
    let lineChart;
    let barChart;

    if (yearSelect && yearSelect.value) {
        loadAndDrawChart(yearSelect.value);
    }

    yearSelect.addEventListener('change', function () {
        loadAndDrawChart(this.value);
    });

    function loadAndDrawChart(year) {
        $.getJSON(`/api/order/revenue/${year}`, function (response) {
            if (response && Array.isArray(response.revenueByMonth)) {
                drawLineChart(response.revenueByMonth);
            } else {
                console.warn("Không có dữ liệu hợp lệ để vẽ biểu đồ doanh thu:", response);
            }
        });

        $.getJSON(`/api/order/productQuantity/${year}`, function (response) {
            if (response && Array.isArray(response.productQuantity)) {
                drawBarChart(response.productQuantity);
            } else {
                console.warn("Không có dữ liệu hợp lệ để vẽ biểu đồ số lượng:", response);
            }
        });
    }

    function drawBarChart(data) {
        const ctx = document.getElementById('productChart').getContext('2d');

        const labels = data.map(d => d.product_name);
        const values = data.map(d => d.total_quantity);

        const colors = [
            "#3498db", "#e74c3c", "#f39c12", "#2ecc71", "#9b59b6", "#1abc9c",
            "#e67e22", "#16a085", "#27ae60", "#2980b9", "#d35400", "#c0392b"
        ];
        const hoverColors = colors.map(color => lightenColor(color, 20));

        if (barChart) barChart.destroy();

        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Số lượng sản phẩm bán ra',
                    data: values,
                    backgroundColor: colors,
                    hoverBackgroundColor: hoverColors,
                    maxBarThickness: 30 // ✅ giúp thanh không quá dày
                }]
            },
            options: {
                indexAxis: 'y', // ✅ chuyển thành biểu đồ ngang
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        bottom: 10,
                        top: 10
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Số lượng sản phẩm đã bán theo năm',
                        font: { size: 22 }
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed.x || 0; // ✅ trục ngang dùng `x`
                                return 'Số lượng: ' + value.toLocaleString('vi-VN');
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Số lượng bán ra'
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // nếu cần chia đều số lượng
                        }
                    },
                    y: {
                        ticks: {
                            autoSkip: false,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    function drawLineChart(data) {
        const ctx = document.getElementById('revenueChart').getContext('2d');

        const labels = data.map(d => `Tháng ${d.month}`);
        const values = data.map(d => d.revenue);

        if (lineChart) lineChart.destroy();

        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Doanh thu theo tháng (VNĐ)',
                    data: values,
                    borderColor: 'rgb(0, 30, 255)',
                    backgroundColor: 'rgba(0, 30, 255, 0)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 6,
                    pointBackgroundColor: 'rgba(0, 30, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 30, 255, 1)',
                    fill: true,
                    tension: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Doanh thu theo tháng',
                        font: { size: 22 }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed.y || 0;
                                return 'Doanh thu: ' + value.toLocaleString('vi-VN') + ' VNĐ';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Doanh thu (VNĐ)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function lightenColor(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = ((num >> 8) & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return (
            "#" +
            (
                0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255)
            ).toString(16).slice(1)
        );
    }
});