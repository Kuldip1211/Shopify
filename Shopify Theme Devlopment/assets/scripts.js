const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

// 🍔 Toggle mobile nav
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// 👤 Toggle Profile Dropdown
profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileMenu.classList.toggle("show");
});

// Hide menu when clicking outside
document.addEventListener("click", (e) => {
  if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
    profileMenu.classList.remove("show");
  }
});

// 🛒 Dynamic cart count
async function updateCartCount() {
  try {
    const res = await fetch("/cart.js");
    const cart = await res.json();
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
      cartCountEl.textContent = cart.item_count;
    }
  } catch (error) {
    console.error("Cart update failed:", error);
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);
window.updateCartCount = updateCartCount;

//   announcement Bar js
// 🧠 Optional JS enhancement for dynamic pause on hover
  document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(
      "#Home-page-announcement-section .announcement-text-loop span"
    );

    if (texts.length <= 1) return; // Only one text, no need to animate

    let index = 0;
    setInterval(() => {
      texts[index].classList.remove("active");
      index = (index + 1) % texts.length;
      texts[index].classList.add("active");
    }, 3500); // ⏱ Change message every 3.5 seconds
  });


//   bestseller js
// 🧠 Optional interactivity (expand later if needed)
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Featured Collection Loaded Successfully");

  // Example: Lazy-load images
  const images = document.querySelectorAll(
    "#Home-page-featured-collection .product-image"
  );
  images.forEach((img) => {
    img.loading = "lazy";
  });
});


// ✅ contact mapJS Enhancements (Optional)
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Contact Map Section Loaded");

  // Fade animations trigger on scroll
  const fadeElements = document.querySelectorAll(".fade-in-left, .fade-in-right");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = "0.1s";
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => observer.observe(el));
});


// testinomial js 
