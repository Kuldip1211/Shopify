// 📦 cart-page.js
document.addEventListener("DOMContentLoaded", () => {
  const quantityInputs = document.querySelectorAll(".cart_page-quantity-input");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.value <= 0) input.value = 1;
    });
  });
});
