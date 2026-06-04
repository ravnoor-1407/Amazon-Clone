// 1. Back to Top Button (Added to footer)
const backToTop = document.querySelector(".foot-panel1");
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 2. Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem("amazonCart")) || [];

function saveCart() {
    localStorage.setItem("amazonCart", JSON.stringify(cart));
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
    const total = getCartTotal();
    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = `Cart (${total})`;
        badge.style.color = total > 0 ? "#febd68" : "#fff";
    }
}

function addToCart(name = "Item", price = 0) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    updateCartBadge();
    showToast(`"${name}" added to cart! 🛒`);
    renderCartItems();
}

// 3. Toast Notifications
function showToast(message, type = "success") {
    const existing = document.getElementById("toast-msg");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "toast-msg";
    toast.textContent = message;
    Object.assign(toast.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        padding: "12px 20px",
        background: type === "success" ? "#007600" : "#c40000",
        color: "#fff",
        borderRadius: "6px",
        fontSize: "0.875rem",
        fontWeight: "600",
        zIndex: "9999",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        opacity: "1",
        transition: "opacity 0.4s ease",
        maxWidth: "300px"
    });
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// 4. Search Bar Alert 
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");

const sampleProducts = [
    "Men's T-Shirt", "Women's Dress", "Wireless Earbuds", "Smart Watch",
    "Office Chair", "Bookshelf", "Vitamin C Serum", "Dog Food Premium",
    "LEGO City Set", "Denim Jacket", "Face Moisturizer", "Sneakers",
    "Lipstick Set", "Remote Control Car", "Multivitamin Pack", "Cat Toy Bundle"
];

function doSearch(query) {
    if (!query.trim()) {
        showToast("Please enter something to search.", "error");
        return;
    }
    removeSuggestions();
    const matches = sampleProducts.filter(p =>
        p.toLowerCase().includes(query.toLowerCase())
    );
    if (matches.length === 0) {
        showToast(`No results for "${query}"`, "error");
    } else {
        showToast(`Found ${matches.length} result(s) for "${query}"`);
    }
}

if (searchIcon) {
    searchIcon.addEventListener("click", () => doSearch(searchInput.value));
}

if (searchInput) {
    // Enter key
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") doSearch(searchInput.value);
        if (e.key === "Escape") {
            removeSuggestions();
            searchInput.blur();
        }
    });

    // Live suggestions
    searchInput.addEventListener("input", () => {
        const q = searchInput.value.trim().toLowerCase();
        removeSuggestions();
        if (q.length < 2) return;
        const matches = sampleProducts.filter(p => p.toLowerCase().includes(q)).slice(0, 6);
        if (!matches.length) return;

        const wrap = document.createElement("div");
        wrap.id = "search-suggestions";
        const rect = searchInput.getBoundingClientRect();
        Object.assign(wrap.style, {
            top: rect.bottom + "px",
            left: rect.left + "px",
            width: rect.width + "px"
        });
        wrap.innerHTML = matches.map(p =>
            `<div class="suggestion-item" data-name="${p}">
                <i class="fa-solid fa-magnifying-glass" style="color:#999;font-size:0.75rem;"></i> ${p}
            </div>`
        ).join("");
        wrap.querySelectorAll(".suggestion-item").forEach(el => {
            el.addEventListener("click", () => {
                searchInput.value = el.dataset.name;
                removeSuggestions();
                doSearch(el.dataset.name);
            });
        });
        document.body.appendChild(wrap);
    });

    document.addEventListener("click", e => {
        if (!e.target.closest(".nav-search")) removeSuggestions();
    });
}

function removeSuggestions() {
    document.getElementById("search-suggestions")?.remove();
}

// 5. Navbar Shadow & Scroll Button Visibility
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.classList.toggle("navbar-shadow", window.scrollY > 0);
    }
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

// 6. Hero Message Close Button
const heroMessage = document.querySelector(".hero-message");
if (heroMessage) {
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    Object.assign(closeBtn.style, {
        marginLeft: "12px",
        fontSize: "1.3rem",
        cursor: "pointer",
        color: "#555",
        fontWeight: "700",
        lineHeight: "1",
        flexShrink: "0"
    });
    closeBtn.title = "Dismiss";
    closeBtn.addEventListener("click", () => {
        const heroSection = document.querySelector(".hero-section");
        if (heroSection) {
            heroSection.style.opacity = "0";
            setTimeout(() => heroSection.style.display = "none", 400);
        }
    });
    heroMessage.appendChild(closeBtn);
}

// 7. Panel Hover Effects
document.querySelectorAll(".panel-options p, .panel-deals, .panel-all").forEach(item => {
    item.addEventListener("mouseenter", () => item.style.outline = "1.5px solid #fff");
    item.addEventListener("mouseleave", () => item.style.outline = "none");
});

// 8. Sign-In Drop Down Menu
const signInBox = document.querySelector(".nav-signin");
if (signInBox) {
    signInBox.style.position = "relative";
    const dropdown = document.createElement("div");
    Object.assign(dropdown.style, {
        position: "absolute",
        top: "100%",
        right: "0",
        width: "210px",
        background: "#fff",
        color: "#333",
        borderRadius: "6px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        padding: "14px",
        zIndex: "3000",
        display: "none",
        fontSize: "0.85rem",
        border: "1px solid #ddd"
    });
    dropdown.innerHTML = `
        <button onclick="showToast('Sign-in coming soon!')" style="width:100%;padding:8px;background:#FFD814;border:1px solid #FCD200;
            border-radius:4px;font-size:0.875rem;font-weight:700;cursor:pointer;margin-bottom:10px;">Sign In</button>
        <p style="text-align:center;font-size:0.75rem;color:#333;">New customer?
            <a style="color:#007185;cursor:pointer;" onclick="showToast('Registration coming soon!')">Start here</a>
        </p>
        <hr style="margin:10px 0;border-color:#eee;">
        <p style="font-weight:700;margin-bottom:8px;">Your Lists</p>
        <p style="color:#007185;cursor:pointer;margin-bottom:6px;" onclick="openWishlist()">
            <i class="fa-regular fa-heart" style="margin-right:5px;"></i>Your Wish List (${getWishlist().length})
        </p>
        <p style="color:#007185;cursor:pointer;" onclick="showToast('Registry coming soon!')">Find a List or Registry</p>`;
    signInBox.appendChild(dropdown);

    let hideTimer;
    signInBox.addEventListener("mouseenter", () => { clearTimeout(hideTimer); dropdown.style.display = "block"; });
    signInBox.addEventListener("mouseleave", () => { hideTimer = setTimeout(() => dropdown.style.display = "none", 200); });
    dropdown.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    dropdown.addEventListener("mouseleave", () => { hideTimer = setTimeout(() => dropdown.style.display = "none", 200); });
}

// 9. Scroll to Top Button Functionality
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
scrollBtn.title = "Back to top";
Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#febd68",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#111",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    display: "none",
    zIndex: "8000",
    transition: "transform 0.2s ease"
});
document.body.appendChild(scrollBtn);
scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
scrollBtn.addEventListener("mouseenter", () => scrollBtn.style.transform = "scale(1.12)");
scrollBtn.addEventListener("mouseleave", () => scrollBtn.style.transform = "scale(1)");

// 10. Build Cart Sidebar (initially hidden)
function buildCartSidebar() {
    if (document.getElementById("cart-sidebar")) return;

    // Overlay
    const overlay = document.createElement("div");
    overlay.id = "cart-overlay";
    overlay.addEventListener("click", closeCart);
    document.body.appendChild(overlay);

    // Sidebar
    const sidebar = document.createElement("div");
    sidebar.id = "cart-sidebar";
    sidebar.innerHTML = `
        <div style="padding:14px 18px;background:#131921;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
            <h3 style="font-size:1.05rem;display:flex;align-items:center;gap:8px;">
                <i class="fa-solid fa-cart-shopping"></i> Shopping Cart
            </h3>
            <button id="close-cart" style="background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;line-height:1;">&times;</button>
        </div>
        <div id="cart-items" style="flex:1;overflow-y:auto;padding:12px 16px;"></div>
        <div id="cart-footer" style="padding:14px 18px;border-top:2px solid #eee;flex-shrink:0;"></div>`;
    document.body.appendChild(sidebar);
    document.getElementById("close-cart").addEventListener("click", closeCart);
}

function openCart() {
    buildCartSidebar();
    renderCartItems();
    document.getElementById("cart-sidebar").classList.add("open");
    document.getElementById("cart-overlay").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeCart() {
    document.getElementById("cart-sidebar")?.classList.remove("open");
    const overlay = document.getElementById("cart-overlay");
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "";
}

function renderCartItems() {
    const container = document.getElementById("cart-items");
    const footer    = document.getElementById("cart-footer");
    if (!container || !footer) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:50px 20px;color:#888;">
                <i class="fa-solid fa-cart-shopping" style="font-size:3rem;color:#ddd;"></i>
                <p style="margin-top:16px;font-size:0.95rem;">Your cart is empty.</p>
            </div>`;
        footer.innerHTML = "";
        return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);

    container.innerHTML = cart.map(item => `
        <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #f0f0f0;align-items:center;">
            <div style="width:54px;height:54px;background:#f5f5f5;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#ccc;">
                <i class="fa-solid fa-box"></i>
            </div>
            <div style="flex:1;min-width:0;">
                <p style="font-size:0.82rem;font-weight:600;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</p>
                ${item.price > 0 ? `<p style="font-size:0.8rem;color:#B12704;font-weight:700;">$${item.price.toFixed(2)}</p>` : ""}
                <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
                    <button onclick="changeQty('${item.name}',-1)"
                        style="width:24px;height:24px;border:1px solid #ccc;background:#f5f5f5;cursor:pointer;border-radius:3px;font-weight:700;font-size:0.9rem;">−</button>
                    <span style="font-size:0.875rem;font-weight:600;">${item.qty}</span>
                    <button onclick="changeQty('${item.name}',1)"
                        style="width:24px;height:24px;border:1px solid #ccc;background:#f5f5f5;cursor:pointer;border-radius:3px;font-weight:700;font-size:0.9rem;">+</button>
                </div>
            </div>
            <button onclick="removeFromCart('${item.name}')"
                style="background:none;border:none;cursor:pointer;color:#bbb;font-size:1rem;padding:4px;"
                title="Remove">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`).join("");

    footer.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-size:1rem;font-weight:700;">Subtotal (${getCartTotal()} item${getCartTotal()!==1?"s":""})</span>
            <span style="font-size:1.05rem;font-weight:700;color:#B12704;">$${subtotal}</span>
        </div>
        <button onclick="checkout()"
            style="width:100%;padding:10px;background:#FFD814;border:1px solid #FCD200;border-radius:8px;font-size:0.95rem;font-weight:700;cursor:pointer;transition:background 0.15s;"
            onmouseover="this.style.background='#f0c912'" onmouseout="this.style.background='#FFD814'">
            Proceed to Checkout
        </button>
        <button onclick="clearCart()"
            style="width:100%;padding:8px;margin-top:8px;background:#fff;border:1px solid #ccc;border-radius:8px;font-size:0.8rem;cursor:pointer;color:#555;">
            Clear Cart
        </button>`;
}

function changeQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(name);
    else { saveCart(); updateCartBadge(); renderCartItems(); }
}

function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    updateCartBadge();
    renderCartItems();
    showToast("Item removed from cart.");
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartBadge();
    renderCartItems();
    showToast("Cart cleared.");
}

function checkout() {
    if (cart.length === 0) { showToast("Your cart is empty!", "error"); return; }
    cart = [];
    saveCart();
    updateCartBadge();
    closeCart();
    showToast("Order placed! Thank you 🎉");
}

// Wire cart icon to open sidebar
const cartEl = document.querySelector(".nav-cart");
if (cartEl) {
    cartEl.addEventListener("click", openCart);
}

// 11. Attach Event Listeners to "See More" (Acting as Add to Cart for now)
const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
    const title   = box.querySelector("h2")?.textContent.trim() || "Item";
    const seeMore = box.querySelector(".box-content p");
    if (seeMore) {
        seeMore.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(title, (Math.random() * 80 + 10).toFixed(2) * 1);
        });
    }
});

// 12. Wishlist Functionality
function getWishlist() {
    return JSON.parse(localStorage.getItem("amazonWishlist")) || [];
}

function saveWishlist(list) {
    localStorage.setItem("amazonWishlist", JSON.stringify(list));
}

function toggleWishlist(name) {
    let list = getWishlist();
    const idx = list.indexOf(name);
    if (idx === -1) {
        list.push(name);
        saveWishlist(list);
        showToast(`"${name}" added to Wish List ❤️`);
    } else {
        list.splice(idx, 1);
        saveWishlist(list);
        showToast(`"${name}" removed from Wish List`);
    }
    updateWishlistHeartIcons();
}

function updateWishlistHeartIcons() {
    const list = getWishlist();
    document.querySelectorAll(".wishlist-btn").forEach(btn => {
        const name = btn.dataset.name;
        const icon = btn.querySelector("i");
        if (list.includes(name)) {
            icon.className = "fa-solid fa-heart";
            icon.style.color = "#c40000";
        } else {
            icon.className = "fa-regular fa-heart";
            icon.style.color = "#888";
        }
    });
}

// Add heart icons to each box
boxes.forEach(box => {
    const title   = box.querySelector("h2")?.textContent.trim() || "Item";
    const content = box.querySelector(".box-content");
    if (!content) return;

    const heartBtn = document.createElement("button");
    heartBtn.className = "wishlist-btn";
    heartBtn.dataset.name = title;
    heartBtn.title = "Add to Wish List";
    heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    Object.assign(heartBtn.style, {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        float: "right",
        marginTop: "-1.6rem",
        padding: "2px 4px"
    });
    heartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(title);
    });
    content.appendChild(heartBtn);
});

function openWishlist() {
    const list = getWishlist();
    // Close sign-in dropdown first
    const existingDropdown = document.querySelector(".nav-signin div");
    if (existingDropdown) existingDropdown.style.display = "none";

    const existing = document.getElementById("wishlist-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "wishlist-modal";
    Object.assign(modal.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(90vw,420px)",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        zIndex: "6000",
        padding: "24px",
        maxHeight: "70vh",
        overflowY: "auto"
    });

    modal.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 style="font-size:1.05rem;display:flex;align-items:center;gap:8px;">
                <i class="fa-solid fa-heart" style="color:#c40000;"></i> Your Wish List
            </h3>
            <button onclick="document.getElementById('wishlist-modal').remove();document.getElementById('wishlist-backdrop').remove();"
                style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#555;">&times;</button>
        </div>
        ${list.length === 0
            ? `<p style="color:#888;text-align:center;padding:30px 0;">Your wish list is empty.<br>Click ❤️ on any product to add.</p>`
            : list.map(name => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee;">
                    <span style="font-size:0.875rem;">${name}</span>
                    <div style="display:flex;gap:8px;">
                        <button onclick="addToCart('${name}',0);document.getElementById('wishlist-modal').remove();document.getElementById('wishlist-backdrop').remove();"
                            style="padding:5px 10px;background:#FFD814;border:1px solid #FCD200;border-radius:4px;font-size:0.75rem;font-weight:700;cursor:pointer;">
                            Add to Cart
                        </button>
                        <button onclick="toggleWishlist('${name}');document.getElementById('wishlist-modal').remove();document.getElementById('wishlist-backdrop').remove();"
                            style="padding:5px 8px;background:#fff;border:1px solid #ccc;border-radius:4px;font-size:0.75rem;cursor:pointer;color:#c40000;">
                            Remove
                        </button>
                    </div>
                </div>`).join("")
        }`;

    const backdrop = document.createElement("div");
    backdrop.id = "wishlist-backdrop";
    Object.assign(backdrop.style, { position:"fixed", inset:"0", background:"rgba(0,0,0,0.4)", zIndex:"5999" });
    backdrop.addEventListener("click", () => {
        modal.remove();
        backdrop.remove();
    });

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
}

// 13. Footer Link Hover Effects
document.querySelectorAll(".foot-panel2 a").forEach(link => {
    link.addEventListener("mouseenter", () => link.style.color = "#febd68");
    link.addEventListener("mouseleave", () => link.style.color = "#DDDDDD");
});

// 14. Keyboard Shortcut for Search 
//  Press "/" anywhere to focus the search bar (like real Amazon)
document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchInput?.focus();
        searchInput?.select();
    }
});

// 15. Initial UI Updates
updateCartBadge();
updateWishlistHeartIcons();