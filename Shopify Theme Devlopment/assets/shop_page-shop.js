document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("shop_page-searchInput");
  const categoryFilter = document.getElementById("shop_page-categoryFilter");
  const products = document.querySelectorAll(".shop_page-product-card");
  const cartToast = document.getElementById("shop_page-cart-toast");
  const cartCountEl = document.getElementById("shop_page-cart-count") || document.getElementById("cart-count");

  // 🧮 Update Cart Count
  async function updateCartCount() {
    try {
      const res = await fetch("/cart.js");
      const data = await res.json();
      const totalItems = data.item_count || 0;
      if (cartCountEl) {
        cartCountEl.textContent = totalItems;
        cartCountEl.classList.add("bump");
        setTimeout(() => cartCountEl.classList.remove("bump"), 300);
      }
    } catch (error) {
      console.error("Cart count update failed:", error);
    }
  }

  updateCartCount();

  // 🧩 Filter Logic
  function applyFilters() {
    const category = categoryFilter.value;
    const search = searchInput.value.toLowerCase();
    products.forEach(prod => {
      const title = prod.dataset.title;
      const cat = prod.dataset.category;
      prod.style.display =
        (category === "all" || category === cat) && title.includes(search)
          ? "flex"
          : "none";
    });
  }

  categoryFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("keyup", applyFilters);

  // 🛒 Add to Cart Handling
  document.querySelectorAll(".shop_page-add-to-cart-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const res = await fetch("/cart/add.js", { method: "POST", body: formData });
      if (res.ok) {
        updateCartCount();
        cartToast.classList.add("show");
        setTimeout(() => cartToast.classList.remove("show"), 2500);
      }
    });
  });
});
