document.addEventListener("DOMContentLoaded", function () {
    const yearSelect = document.getElementById("yearSelect");
    const statTypeSelect = document.getElementById("statTypeSelect");
    const monthSelectGroup = document.getElementById("monthSelectGroup");
    const dateRangeGroup = document.getElementById("dateRangeGroup");
    const startDateInput = document.getElementById("statsStartDate");
    const endDateInput = document.getElementById("statsEndDate");
    const monthSelect = document.getElementById("monthSelect");

    // Update hiển thị theo loại thống kê
    function updateVisibility() {
        const statType = statTypeSelect.value;
        monthSelectGroup.style.display = statType === "month" ? "flex" : "none";
        dateRangeGroup.style.display = statType === "dateRange" ? "flex" : "none";
        const yearLabel = document.querySelector('label[for="yearSelect"]');
        const yearSelectDiv = yearSelect; // hoặc dùng parent nếu muốn ẩn cả label + select
        if (statType === "dateRange") {
            yearSelect.style.display = "none";
            if (yearLabel) yearLabel.style.display = "none";
            // Clear chọn năm nếu muốn, hoặc giữ nguyên tuỳ mục đích
        } else {
            yearSelect.style.display = "";
            if (yearLabel) yearLabel.style.display = "";
        }

        // Xử lý input ngày khi chọn lại filter
        if (statType === "dateRange") {
            fpStart.clear();
            fpEnd.clear();
            endDateInput.disabled = true;
        } else {
            endDateInput.disabled = false;
        }
    }

    // Hàm tính số tháng cách nhau giữa 2 ngày
    function monthDiff(d1, d2) {
        let months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months += d2.getMonth() - d1.getMonth();
        return months;
    }

    function updateDatepickersLimits() {
        if (fpStart.selectedDates.length) {
            const start = fpStart.selectedDates[0];
            // min là ngày start, max là start + 3 tháng - 1 ngày
            let max = new Date(start);
            max.setMonth(max.getMonth() + 3);
            max.setDate(max.getDate() - 1);

            fpEnd.set("minDate", start);
            fpEnd.set("maxDate", max);
        } else {
            // Reset nếu chưa chọn start
            fpEnd.set("minDate", null);
            fpEnd.set("maxDate", null);
            endDateInput.disabled = true;
        }
    }

    // Khởi tạo flatpickr cho ngày bắt đầu
    const fpStart = flatpickr(startDateInput, {
        dateFormat: "Y-m-d",
        enableTime: false,
        time_24hr: true,
        onChange: function (selectedDates) {
            updateDatepickersLimits();
            endDateInput.disabled = !selectedDates.length;
            if (!selectedDates.length) {
                fpEnd.clear();
            }
            loadAndDrawChart();
        }
    });

    // Đảm bảo end chỉ chọn sau khi chọn start
    endDateInput.disabled = true;

    // Khởi tạo flatpickr cho ngày kết thúc
    const fpEnd = flatpickr(endDateInput, {
        dateFormat: "Y-m-d",
        enableTime: false,
        time_24hr: true,
        onChange: function (selectedDates) {
            if (fpStart.selectedDates.length && selectedDates.length) {
                let start = fpStart.selectedDates[0];
                let end = selectedDates[0];

                let months = monthDiff(start, end);

                // Nếu ngày kết thúc <= ngày bắt đầu hoặc quá 3 tháng thì cảnh báo và xóa end
                if (
                    end <= start ||
                    months > 2 ||
                    (months === 2 && end.getDate() > start.getDate())
                ) {
                    showToast("Ngày kết thúc phải lớn hơn ngày bắt đầu và tối đa trong 3 tháng!", "error");
                    fpEnd.clear();
                    return;
                }
            }
            loadAndDrawChart();
        }
    });

    // Cập nhật các sự kiện thay đổi
    yearSelect.addEventListener("change", function () {
        updateDatepickersLimits();
        loadAndDrawChart();
    });

    statTypeSelect.addEventListener("change", function () {
        updateVisibility();
        loadAndDrawChart();
    });

    monthSelect.addEventListener("change", function () {
        loadAndDrawChart();
    });

    function loadAndDrawChart() {
        const statType = statTypeSelect.value;
        const year = yearSelect.value;
        const month = monthSelect.value;
        let urlRevenue, urlProductQuantity, startDate, endDate;
        let chartTitleLine, chartTitleBar;

        if (statType === "year") {
            chartTitleLine = getLineChartTitle(statType, year);
            chartTitleBar = getBarChartTitle(statType, year);
            urlRevenue = `/api/order/revenue/year/${year}`;
            urlProductQuantity = `/api/order/productQuantity/year/${year}`;
        } else if (statType === "month") {
            chartTitleLine = getLineChartTitle(statType, year, month);
            chartTitleBar = getBarChartTitle(statType, year, month);
            urlRevenue = `/api/order/revenue/month/${year}/${month}`;
            urlProductQuantity = `/api/order/productQuantity/month/${year}/${month}`;
        } else if (statType === "quarter") {
            chartTitleLine = getLineChartTitle(statType, year);
            chartTitleBar = getBarChartTitle(statType, year);
            urlRevenue = `/api/order/revenue/quarter/${year}`;
            urlProductQuantity = `/api/order/productQuantity/quarter/${year}`;
        } else if (statType === "dateRange") {
            // Chỉ gọi khi đã chọn đủ start & end
            if (!(fpStart.selectedDates.length && fpEnd.selectedDates.length)) {
                // Nếu chưa đủ, XÓA (hoặc RESET) biểu đồ nếu muốn
                drawLineChart([]); // Xóa chart hoặc show empty
                drawBarChart([]);  // Xóa chart hoặc show empty
                return; // Không fetch API!
            }
            startDate = fpStart.selectedDates[0];
            endDate = fpEnd.selectedDates[0];
            if (endDate <= startDate) {
                showToast("Ngày kết thúc phải lớn hơn ngày bắt đầu!", "error");
                drawLineChart([]);
                drawBarChart([]);
                return;
            }
            chartTitleLine = getLineChartTitle(statType, null, null, startDate, endDate);
            chartTitleBar = getBarChartTitle(statType, null, null, startDate, endDate);
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();
            urlRevenue = `/api/order/revenue/dateRange/${startTimestamp}/${endTimestamp}`;
            urlProductQuantity = `/api/order/productQuantity/dateRange/${startTimestamp}/${endTimestamp}`;
        }

        // Chỉ fetch nếu đã xác định URL hợp lệ
        if (urlRevenue && urlProductQuantity) {
            $.getJSON(urlRevenue, function (response) {
                if (response && Array.isArray(response.revenue)) {
                    drawLineChart(response.revenue, chartTitleLine);
                } else {
                    drawLineChart([], chartTitleBar); // reset chart nếu lỗi
                    console.warn("Không có dữ liệu hợp lệ để vẽ biểu đồ doanh thu:", response);
                }
            });

            $.getJSON(urlProductQuantity, function (response) {
                if (response && Array.isArray(response.productQuantity)) {
                    drawBarChart(response.productQuantity, chartTitleBar);
                } else {
                    drawBarChart([], chartTitleBar); // reset chart nếu lỗi
                    console.warn("Không có dữ liệu hợp lệ để vẽ biểu đồ số lượng:", response);
                }
            });
        } else {
            // Khi đổi sang dateRange mà chưa đủ điều kiện, clear chart
            drawLineChart([], chartTitleLine);
            drawBarChart([], chartTitleBar);
        }
    }

    function getLineChartTitle(type, year, month, start, end) {
        if (type === "year") return `Doanh thu năm ${year}`;
        if (type === "quarter") return `Doanh thu theo các quý năm ${year}`;
        if (type === "month") return `Doanh thu tháng ${month} năm ${year}`;
        if (type === "dateRange" && start && end) {
            const f = d => d.toLocaleDateString('vi-VN');
            return `Doanh thu từ ${f(start)} đến ${f(end)}`;
        }
        return "Biểu đồ doanh thu";
    }

    function getBarChartTitle(type, year, month, start, end) {
        if (type === "year") return `Sản phẩm đã bán trong năm ${year}`;
        if (type === "quarter") return `Sản phẩm đã bán theo các quý năm ${year}`;
        if (type === "month") return `Sản phẩm đã bán trong tháng ${month} năm ${year}`;
        if (type === "dateRange" && start && end) {
            const f = d => d.toLocaleDateString('vi-VN');
            return `Sản phẩm bán ra từ ${f(start)} đến ${f(end)}`;
        }
        return "Biểu đồ sản phẩm đã bán";
    }
    let lineChart, barChart;
    // Hàm vẽ biểu đồ doanh thu (line chart)
    function drawLineChart(data, chartTitle = "Biểu đồ doanh thu") {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        const labels = data.map(d => ` ${d.period}`);
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
                        text: chartTitle,
                        font: { size: 22 }
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                // Dùng label đầy đủ khi hover vào điểm
                                return context[0].label;
                            },
                            label: function (context) {
                                const value = context.parsed.y || 0;
                                return 'Doanh thu: ' + value.toLocaleString('vi-VN') + ' VNĐ';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Thời gian'
                        },
                        ticks: {
                            autoSkip: true,
                            autoSkipPadding: 15,
                            maxRotation: 0, // Không xoay
                            minRotation: 0, // Không xoay
                            callback: function (value, index, ticks) {
                                // Hiện tối đa 12 ký tự
                                const label = this.getLabelForValue(value);
                                return label.length > 12 ? label.substr(0, 12) + '…' : label;
                            },
                            font: { size: 12 }
                        }
                    },
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


    // Hàm vẽ biểu đồ số lượng sản phẩm (bar chart)
    function drawBarChart(data, chartTitle = "Biểu đồ sản phẩm đã bán") {
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
                    maxBarThickness: 30
                }]
            },
            options: {
                indexAxis: 'y',
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: chartTitle,
                        font: { size: 22 }
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed.x || 0;
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
                        beginAtZero: true
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

    // Hàm làm sáng màu
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
    loadAndDrawChart(); // Load initial data and draw charts
});

