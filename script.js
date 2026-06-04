// 1. Back to Top Functionality
const backToTop = document.querySelector(".foot-panel1");
if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Floating scroll-to-top button 
const scrollBtn = document.createElement("button");
scrollBtn.id = "scroll-top-btn";
scrollBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
scrollBtn.setAttribute("aria-label", "Scroll to top");
Object.assign(scrollBtn.style, {
    position:"fixed", bottom:"70px", right:"20px",
    width:"40px", height:"40px", borderRadius:"50%",
    background:"#37475a", color:"#fff", border:"none",
    fontSize:"1rem", cursor:"pointer", display:"none",
    zIndex:"3000", boxShadow:"0 2px 8px rgba(0,0,0,0.3)",
    transition:"background 0.2s, opacity 0.3s"
});
scrollBtn.onmouseenter = () => scrollBtn.style.background = "#232F3E";
scrollBtn.onmouseleave = () => scrollBtn.style.background = "#37475a";
scrollBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
document.body.appendChild(scrollBtn);

// 2. Cart Management (add/remove items, update badge count, persist in localStorage)
let cart = JSON.parse(localStorage.getItem("amazonCart")) || [];

function saveCart() { localStorage.setItem("amazonCart", JSON.stringify(cart)); }

function getCartTotal() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartBadge() {
    const total = getCartTotal();
    document.querySelectorAll("#cart-count").forEach(badge => {
        badge.textContent = `Cart (${total})`;
        badge.style.color = total > 0 ? "#febd68" : "#fff";
    });
}

function addToCart(name = "Item", price = 0, id = null) {
    const key = id != null ? String(id) : name;
    const existing = cart.find(i => (id != null ? i.id === key : i.name === name));
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: key, name, price: parseFloat(price) || 0, qty: 1 });
    }
    saveCart();
    updateCartBadge();
    showToast(`"${name}" added to cart! 🛒`);
    renderCartItems();
}

// 3. Toast Notifications on actions like add/remove cart, wishlist updates, sign in/out, etc. at bottom right corner 
function showToast(message, type = "success") {
    const existing = document.getElementById("toast-msg");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.id = "toast-msg";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = message;
    Object.assign(toast.style, {
        position:"fixed", bottom:"30px", right:"30px",
        padding:"12px 20px",
        background: type === "success" ? "#03d303" : "#f53636",
        color:"#fff", borderRadius:"6px", fontSize:"0.875rem",
        fontWeight:"600", zIndex:"9999",
        boxShadow:"0 4px 14px rgba(0,0,0,0.25)",
        opacity:"1", transition:"opacity 0.4s ease", maxWidth:"300px"
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 400); }, 3000);
}

// 4. Search Bar
const searchIcon  = document.querySelector(".search-icon");
const searchInput = document.getElementById("amazon-search");

const productNames = typeof PRODUCTS !== "undefined"
    ? PRODUCTS.map(p => p.name)
    : ["Men's T-Shirt","Women's Dress","Wireless Earbuds","Smart Watch",
       "Office Chair","Bookshelf","Vitamin C Serum","Dog Food Premium",
       "LEGO City Set","Denim Jacket","Face Moisturizer","Sneakers"];

function doSearch(query) {
    if (!query.trim()) { showToast("Please enter something to search.", "error"); return; }
    removeSuggestions();
    const catEl = document.querySelector(".search-category");
    const cat   = catEl ? catEl.value : "All";
    window.location.href = `products.html?q=${encodeURIComponent(query.trim())}&cat=${encodeURIComponent(cat)}`;
}

if (searchIcon)  searchIcon.addEventListener("click", () => doSearch(searchInput?.value || ""));
if (searchInput) {
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter")  doSearch(searchInput.value);
        if (e.key === "Escape") { removeSuggestions(); searchInput.blur(); }
    });

    searchInput.addEventListener("input", () => {
        const q = searchInput.value.trim().toLowerCase();
        removeSuggestions();
        if (q.length < 2) return;
        const matches = productNames.filter(p => p.toLowerCase().includes(q)).slice(0, 6);
        if (!matches.length) return;

        const wrap = document.createElement("div");
        wrap.id = "search-suggestions";
        const rect = searchInput.getBoundingClientRect();
        Object.assign(wrap.style, {
            top: (rect.bottom + window.scrollY) + "px",   // FIX: account for page scroll
            left: rect.left + "px",
            width: rect.width + "px"
        });
        wrap.innerHTML = matches.map(p =>
            `<div class="suggestion-item" data-name="${p.replace(/"/g,'&quot;')}">
                <i class="fa-solid fa-magnifying-glass" style="color:#999;font-size:0.75rem;"></i> ${p}
            </div>`
        ).join("");
        wrap.querySelectorAll(".suggestion-item").forEach(el => {
            el.addEventListener("mousedown", e => {          // FIX: mousedown fires before blur
                e.preventDefault();
                searchInput.value = el.dataset.name;
                removeSuggestions();
                doSearch(el.dataset.name);
            });
        });
        document.body.appendChild(wrap);
    });

    document.addEventListener("click", e => { if (!e.target.closest(".nav-search")) removeSuggestions(); });
}

function removeSuggestions() { document.getElementById("search-suggestions")?.remove(); }

// 5. Navbar Shadow & Scroll Button 
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("navbar-shadow", window.scrollY > 0);
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
}, { passive: true });  // FIX: passive scroll listener for better performance

// 6. Hero Message Close Notification
const heroMessage = document.querySelector(".hero-message");
if (heroMessage) {
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.setAttribute("aria-label", "Dismiss message");
    Object.assign(closeBtn.style, {
        marginLeft:"12px", fontSize:"1.3rem", cursor:"pointer",
        color:"#555", fontWeight:"700", lineHeight:"1", flexShrink:"0",
        background:"none", border:"none", padding:"0 2px"
    });
    closeBtn.title = "Dismiss";
    closeBtn.addEventListener("click", () => {
        const heroSection = document.querySelector(".hero-section");
        if (heroSection) { heroSection.style.opacity = "0"; setTimeout(() => heroSection.style.display = "none", 400); }
    });
    heroMessage.appendChild(closeBtn);
}

// 7. Panel Hover Effects on categories and deals (adds outline on hover)
document.querySelectorAll(".panel-options p, .panel-deals, .panel-all").forEach(item => {
    item.addEventListener("mouseenter", () => item.style.outline = "1.5px solid #fff");
    item.addEventListener("mouseleave", () => item.style.outline = "none");
});

// 8. Sign In Dropdown (shows user name if logged in, else sign in/register options)
const signInBox = document.querySelector(".nav-signin");
if (signInBox) {
    signInBox.style.position = "relative";
    const dropdown = document.createElement("div");
    Object.assign(dropdown.style, {
        position:"absolute", top:"100%", right:"0",
        width:"210px", background:"#fff", color:"#333",
        borderRadius:"6px", boxShadow:"0 4px 16px rgba(0,0,0,0.2)",
        padding:"14px", zIndex:"3000", display:"none",
        fontSize:"0.85rem", border:"1px solid #ddd"
    });

    const currentUser = JSON.parse(localStorage.getItem("amazonCurrentUser") || "null");
    dropdown.innerHTML = currentUser
        ? `<p style="font-weight:700;margin-bottom:10px;">Hello, ${currentUser.name.split(" ")[0]}</p>
           <button onclick="location.href='products.html'" style="width:100%;padding:8px;background:#FFD814;border:1px solid #FCD200;
               border-radius:4px;font-size:0.875rem;font-weight:700;cursor:pointer;margin-bottom:10px;">Browse Products</button>
           <button onclick="signOut()" style="width:100%;padding:8px;background:#fff;border:1px solid #ccc;
               border-radius:4px;font-size:0.8rem;cursor:pointer;color:#555;">Sign Out</button>`
        : `<button onclick="location.href='signin.html'" style="width:100%;padding:8px;background:#FFD814;border:1px solid #FCD200;
               border-radius:4px;font-size:0.875rem;font-weight:700;cursor:pointer;margin-bottom:10px;">Sign In</button>
           <p style="text-align:center;font-size:0.75rem;color:#333;">New customer?
               <a href="signin.html#register" style="color:#007185;cursor:pointer;">Start here</a>
           </p>
           <hr style="margin:10px 0;border-color:#eee;">
           <p style="font-weight:700;margin-bottom:8px;">Your Lists</p>
           <p onclick="openWishlist()" style="cursor:pointer;color:#007185;font-size:0.8rem;">Wish List</p>`;

    signInBox.appendChild(dropdown);

    let hoverTimer;
    signInBox.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimer);
        dropdown.style.display = "block";
    });
    signInBox.addEventListener("mouseleave", () => {
        hoverTimer = setTimeout(() => dropdown.style.display = "none", 150);
    });
    dropdown.addEventListener("mouseenter", () => clearTimeout(hoverTimer));
    dropdown.addEventListener("mouseleave", () => {
        hoverTimer = setTimeout(() => dropdown.style.display = "none", 150);
    });

    // Update label if logged in (show first name at navbar)
    if (currentUser) {
        const span = signInBox.querySelector("p span");
        if (span) span.textContent = `Hello, ${currentUser.name.split(" ")[0]}`;
    }
}

function signOut() {
    localStorage.removeItem("amazonCurrentUser");
    showToast("Signed out successfully.");
    setTimeout(() => location.reload(), 800);
}

// 9. Cart Sidebar 
let cartSidebar, cartOverlay;

function buildCartSidebar() {
    cartSidebar = document.getElementById("cart-sidebar");
    cartOverlay = document.getElementById("cart-overlay");
    if (!cartSidebar) return;

    const closeBtn = document.getElementById("cart-close");
    if (closeBtn)    closeBtn.addEventListener("click", closeCart);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
}

// Functions to open/close cart on clicking the cart icon and render items
function openCart()  {
    renderCartItems();
    if (cartSidebar) cartSidebar.classList.add("open");
    if (cartOverlay) { cartOverlay.style.display = "block"; }
    document.body.style.overflow = "hidden";
}

function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove("open");
    if (cartOverlay) cartOverlay.style.display = "none";
    document.body.style.overflow = "";
}

function renderCartItems() {
    const itemsEl  = document.getElementById("cart-items") || document.getElementById("cart-body");
    const footer   = document.getElementById("cart-footer");
    if (!itemsEl || !footer) return;

    if (!cart.length) {
        itemsEl.innerHTML = `<div style="text-align:center;padding:40px 20px;color:#888;">
            <i class="fa-solid fa-cart-shopping" style="font-size:2.5rem;margin-bottom:12px;display:block;"></i>
            <p>Your cart is empty.</p>
            <a href="products.html" style="color:#007185;font-size:0.875rem;display:inline-block;margin-top:8px;">Browse products →</a>
        </div>`;
        footer.innerHTML = "";
        return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
    itemsEl.style.padding = "16px";  // ensure padding regardless of which element is used
    itemsEl.innerHTML = cart.map(i => `
        <div style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid #eee;align-items:flex-start;">
            <div style="flex:1;font-size:0.875rem;">
                <div style="font-weight:500;margin-bottom:4px;">${i.name}</div>
                <div style="color:#B12704;font-weight:700;">$${(i.price * i.qty).toFixed(2)}</div>
                <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
                    <button onclick="changeQty('${i.name.replace(/'/g,"\\'")}', -1)"
                        style="width:24px;height:24px;border:1px solid #ccc;border-radius:3px;background:#f0f0f0;cursor:pointer;font-size:1rem;line-height:1;"
                        aria-label="Decrease quantity">−</button>
                    <span style="font-size:0.875rem;font-weight:600;">${i.qty}</span>
                    <button onclick="changeQty('${i.name.replace(/'/g,"\\'")}', 1)"
                        style="width:24px;height:24px;border:1px solid #ccc;border-radius:3px;background:#f0f0f0;cursor:pointer;font-size:1rem;line-height:1;"
                        aria-label="Increase quantity">+</button>
                </div>
            </div>
            <button onclick="removeFromCart('${i.name.replace(/'/g,"\\'")}'")"
                style="background:none;border:none;cursor:pointer;color:#888;font-size:0.85rem;padding:2px 4px;"
                title="Remove" aria-label="Remove ${i.name} from cart">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`).join("");

    footer.style.padding = "16px";
    footer.style.borderTop = "1px solid #eee";
    footer.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-size:1rem;font-weight:700;">Subtotal (${getCartTotal()} item${getCartTotal()!==1?"s":""})</span>
            <span style="font-size:1.05rem;font-weight:700;color:#B12704;">$${subtotal}</span>
        </div>
        <button onclick="location.href='checkout.html';closeCart();"
            style="width:100%;padding:10px;background:#FFD814;border:1px solid #FCD200;border-radius:8px;font-size:0.95rem;font-weight:700;cursor:pointer;transition:background 0.15s;"
            onmouseover="this.style.background='#f0c912'" onmouseout="this.style.background='#FFD814'">
            Proceed to Checkout
        </button>
        <button onclick="clearCart()"
            style="width:100%;padding:8px;margin-top:8px;background:#fff;border:1px solid #ccc;border-radius:8px;font-size:0.8rem;cursor:pointer;color:#555;">
            Clear Cart
        </button>`;
}

// Functions to change quantity, remove items, and clear cart
function changeQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(name);
    else { saveCart(); updateCartBadge(); renderCartItems(); }
}

function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart(); updateCartBadge(); renderCartItems();
    showToast("Item removed from cart.");
}

function clearCart() {
    cart = []; saveCart(); updateCartBadge(); renderCartItems();
    showToast("Cart cleared.");
}

// Wire cart icon — support both id and class
const cartEl = document.querySelector(".nav-cart");
if (cartEl) cartEl.addEventListener("click", openCart);
const navCartBtn = document.getElementById("nav-cart-btn");
if (navCartBtn) navCartBtn.addEventListener("click", openCart);

// 10. See More Click for Product Categories on Homepage to open products details
const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
    const title   = box.querySelector("h2")?.textContent.trim() || "Item";
    const seeMore = box.querySelector(".box-content p");

    box.addEventListener("click", (e) => {
        if (!e.target.closest(".wishlist-btn")) {
            window.location.href = `products.html?cat=${encodeURIComponent(title)}`;
        }
    });

    if (seeMore) {
        seeMore.addEventListener("click", (e) => {
            e.stopPropagation();
            window.location.href = `products.html?cat=${encodeURIComponent(title)}`;
        });
    }
});

// 11. Wishlist Functionality
function getWishlist()       { return JSON.parse(localStorage.getItem("amazonWishlist")) || []; }
function saveWishlist(list)  { localStorage.setItem("amazonWishlist", JSON.stringify(list)); }

function toggleWishlist(name) {
    let list = getWishlist();
    const idx = list.indexOf(name);
    if (idx === -1) { list.push(name); saveWishlist(list); showToast(`"${name}" added to Wish List ❤️`); }
    else            { list.splice(idx,1); saveWishlist(list); showToast(`"${name}" removed from Wish List`); }
    updateWishlistHeartIcons();
}

function updateWishlistHeartIcons() {
    const list = getWishlist();
    document.querySelectorAll(".wishlist-btn").forEach(btn => {
        const name = btn.dataset.name;
        const icon = btn.querySelector("i");
        if (list.includes(name)) { icon.className = "fa-solid fa-heart"; icon.style.color = "#c40000"; }
        else                     { icon.className = "fa-regular fa-heart"; icon.style.color = "#888"; }
    });
}

// Favourite category icons on homepage boxes
boxes.forEach(box => {
    const title   = box.querySelector("h2")?.textContent.trim() || "Item";
    const content = box.querySelector(".box-content");
    if (!content) return;
    const heartBtn = document.createElement("button");
    heartBtn.className = "wishlist-btn";
    heartBtn.dataset.name = title;
    heartBtn.title = "Add to Wish List";
    heartBtn.setAttribute("aria-label", `Add ${title} to wish list`);
    heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    Object.assign(heartBtn.style, {
        background:"none", border:"none", cursor:"pointer",
        fontSize:"1.1rem", float:"right", marginTop:"-1.6rem", padding:"2px 4px"
    });
    heartBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleWishlist(title); });
    content.appendChild(heartBtn);
});

// Wishlist Modal
function openWishlist() {
    const list = getWishlist();
    const existing = document.getElementById("wishlist-modal");
    if (existing) existing.remove();
    const modal = document.createElement("div");
    modal.id = "wishlist-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Your Wish List");
    Object.assign(modal.style, {
        position:"fixed", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:"min(90vw,420px)", background:"#fff", borderRadius:"10px",
        boxShadow:"0 10px 40px rgba(0,0,0,0.25)", zIndex:"6000",
        padding:"24px", maxHeight:"70vh", overflowY:"auto"
    });
    const closeWishlist = () => {
        modal.remove();
        const bd = document.getElementById("wishlist-backdrop");
        if (bd) bd.remove();
    };
    modal.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 style="font-size:1.05rem;display:flex;align-items:center;gap:8px;">
                <i class="fa-solid fa-heart" style="color:#c40000;"></i> Your Wish List
            </h3>
            <button id="wishlist-close" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#555;">&times;</button>
        </div>
        ${!list.length
            ? `<p style="color:#888;text-align:center;padding:30px 0;">Your wish list is empty.<br>Click ❤️ on any product to add.</p>`
            : list.map(name => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee;">
                    <span style="font-size:0.875rem;">${name}</span>
                    <div style="display:flex;gap:8px;">
                        <button onclick="addToCart('${name.replace(/'/g,"\\'")}',0)" id="wl-add-${name.replace(/[^a-z0-9]/gi,'_')}"
                            style="padding:5px 10px;background:#FFD814;border:1px solid #FCD200;border-radius:4px;font-size:0.75rem;font-weight:700;cursor:pointer;">
                            Add to Cart
                        </button>
                        <button onclick="toggleWishlist('${name.replace(/'/g,"\\'")}');document.getElementById('wishlist-close').click();"
                            style="padding:5px 8px;background:#fff;border:1px solid #ccc;border-radius:4px;font-size:0.75rem;cursor:pointer;color:#c40000;">
                            Remove
                        </button>
                    </div>
                </div>`).join("")}`;
    const backdrop = document.createElement("div");
    backdrop.id = "wishlist-backdrop";
    Object.assign(backdrop.style, { position:"fixed", inset:"0", background:"rgba(0,0,0,0.4)", zIndex:"5999" });
    backdrop.addEventListener("click", closeWishlist);
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    modal.querySelector("#wishlist-close").addEventListener("click", closeWishlist);
}

// 12. Keyboard Shortcuts to focus search (/) and close modals (Escape)
document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault(); searchInput?.focus(); searchInput?.select();
    }
    if (e.key === "Escape") {
        closeCart();
        document.getElementById("wishlist-close")?.click();
    }
});

// 13. Footer Links Hover Effect
document.querySelectorAll(".foot-panel2 a").forEach(link => {
    link.addEventListener("mouseenter", () => link.style.color = "#febd68");
    link.addEventListener("mouseleave", () => link.style.color = "#DDDDDD");
});

// 14. Initialize cart sidebar and update UI on page load
buildCartSidebar();
updateCartBadge();
updateWishlistHeartIcons();