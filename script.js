// 1. Back to Top Functionality
const backToTop = document.querySelector(".foot-panel1");
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 2. Shopping Cart Logic
let cartCount = 0;
const cartDisplay = document.querySelector(".nav-cart");

// Function to update cart
function addToCart() {
    cartCount++;
    // This updates the text to show the count. 
    // Note: You might want to wrap the number in a <span> later for better styling.
    cartDisplay.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
    alert("Item added to cart!");
}

// 3. Search Bar Alert (Simulating a search)
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");

searchIcon.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
        alert(`Searching Amazon for: ${query}`);
    } else {
        alert("Please enter something to search.");
    }
});

// 4. Attach Event Listeners to "See More" (Acting as Add to Cart for now)
const productButtons = document.querySelectorAll(".box-content p");
productButtons.forEach(button => {
    button.style.cursor = "pointer"; // Make it look clickable
    button.addEventListener("click", addToCart);
});