let compareList = [];

function addToCompare(product) {
  if (compareList.length >= 2) return;
  if (compareList.find(p => p.id === product.id)) return;

  // Nếu đã có 1 sản phẩm → kiểm tra loại
  if (compareList.length === 1 && compareList[0].category_id !== product.category_id) {
    alert("Chỉ có thể so sánh các sản phẩm cùng loại.");
    return;
  }

  compareList.push(product);
  renderCompareBar();
}

function renderCompareBar() {
  const compareBar = document.getElementById("compare-bar");
  const compareBtn = document.getElementById("compare-btn");

  if (compareList.length > 0) {
    compareBar.style.display = "flex";
  } else {
    compareBar.style.display = "none";
  }

  for (let i = 0; i < 2; i++) {
    const slot = document.getElementById(`slot-${i + 1}`);
    slot.innerHTML = compareList[i]
      ? `
        <div>
          <img src="/images/${compareList[i].image}" alt="${compareList[i].name}">
          <p>${compareList[i].name}</p>
          <button class="remove-compare-btn" onclick="removeFromCompare(${i})"><i class="fa fa-times"></i></button>
        </div>`
      : `<div onclick="openProductSelector(${i})"><i class="fa-solid fa-plus"></i>Thêm sản phẩm</div>`;
  }

  compareBtn.disabled = compareList.length < 2;

  compareBtn.onclick = () => {
    if (compareList.length === 2) {
      const url = `/compare/${compareList[0].id}/${compareList[1].id}`;
      window.location.href = url;
    }
  };
}

function removeFromCompare(index) {
  compareList.splice(index, 1);
  renderCompareBar();
}

function closeCompareBar() {
  document.getElementById("compare-bar").style.display = "none";
}

document.getElementById("clear-btn").addEventListener("click", () => {
  compareList = [];
  renderCompareBar();
});

function openProductSelector(slotIndex) {
  alert("Mở modal để chọn thêm sản phẩm (tuỳ triển khai thêm)");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-compare").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const image = btn.getAttribute("data-image");
      const category_id = btn.getAttribute("data-category");

      addToCompare({
        id,
        name,
        image,
        category_id,
      });
    });
  });
});
