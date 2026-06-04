//Function to keep navbar consistent at every page
function injectNav() {
  const placeholder = document.getElementById("nav-placeholder");
  if (!placeholder) return;
  placeholder.innerHTML = `
  <div class="navbar">
    <div class="nav-logo border" onclick="window.location.href='index.html'">
      <div class="logo"></div>
    </div>
    <div class="nav-address border">
      <p class="address-one">Deliver to</p>
      <div class="address-icon">
        <i class="fa-solid fa-location-dot"></i>
        <p class="address-two">India</p>
      </div>
    </div>
    <div class="nav-search">
      <select class="search-category">
        <option>All</option>
        <option>Beauty</option>
        <option>Clothes</option>
        <option>Electronics</option>
        <option>Health and Personal Care</option>
        <option>Home and Kitchen</option>
        <option>Pet Supplies</option>
        <option>Toys and Games</option>
      </select>
      <input class="search-input" placeholder="Search Amazon">
      <div class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
    </div>
    <div class="nav-signin border" style="position:relative;">
      <p><span class="nav-label">Hello, <a href="signin.html" style="color:#fff;text-decoration:none;">sign in</a></span></p>
      <p class="nav-two">Accounts &amp; Lists</p>
    </div>
    <div class="nav-return border" onclick="window.location.href='index.html'">
      <p><span class="nav-label">Returns</span></p>
      <p class="nav-two">&amp; Orders</p>
    </div>
    <div class="nav-cart border">
      <i class="fa-solid fa-cart-shopping"></i>
      <span id="cart-count">Cart (0)</span>
    </div>
  </div>

  <div class="panel">
    <div class="panel-all" onclick="window.location.href='products.html'">
      <i class="fa-solid fa-bars"></i> All
    </div>
    <div class="panel-options">
      <p onclick="window.location.href='products.html?cat=Electronics'">Electronics</p>
      <p onclick="window.location.href='products.html?cat=Clothes'">Fashion</p>
      <p onclick="window.location.href='products.html?cat=Home and Kitchen'">Home &amp; Kitchen</p>
      <p onclick="window.location.href='products.html?cat=Beauty'">Beauty</p>
      <p onclick="window.location.href='products.html?cat=Toys and Games'">Toys</p>
      <p onclick="window.location.href='products.html?cat=Pet Supplies'">Pet Supplies</p>
    </div>
    <div class="panel-deals">Shop Deals in Electronics</div>
  </div>

  <!-- Cart Sidebar -->
  <div id="cart-overlay"></div>
  <div id="cart-sidebar">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #eee;background:#232F3E;color:#fff;">
      <h3 style="font-size:1.1rem;"><i class="fa-solid fa-cart-shopping" style="margin-right:8px;"></i>Shopping Cart</h3>
      <button onclick="closeCart()" style="background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;">&times;</button>
    </div>
    <div id="cart-body" style="flex:1;overflow-y:auto;"></div>
    <div id="cart-footer"></div>
  </div>`;
}

// Function to keep Footer consistent at every page
function injectFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;
  placeholder.innerHTML = `
  <footer>
    <div class="foot-panel1" onclick="window.scrollTo({top:0,behavior:'smooth'})">Back to Top</div>
    <div class="foot-panel2">
      <ul>
        <p>Get to Know Us</p>
        <a>Careers</a><a>Blog</a><a>About Amazon</a>
        <a>Investor Relations</a><a>Amazon Devices</a>
      </ul>
      <ul>
        <p>Make Money with Us</p>
        <a>Sell Products on Amazon</a><a>Sell on Amazon Business</a>
        <a>Become an Affiliate</a><a>Advertise Your Products</a>
      </ul>
      <ul>
        <p>Payment Products</p>
        <a>Amazon Business Card</a><a>Shop with Points</a>
        <a>Reload Your Balance</a><a>Amazon Currency Converter</a>
      </ul>
      <ul>
        <p>Let Us Help You</p>
        <a href="signin.html">Your Account</a><a>Your Orders</a>
        <a>Shipping Rates &amp; Policies</a><a>Returns &amp; Replacements</a><a>Help</a>
      </ul>
    </div>
    <hr style="border-color:rgba(255,255,255,.1);">
    <div class="foot-panel3">
      <div class="pages">
        <a>Conditions of Use</a><a>Privacy Notice</a>
        <a>Your Ads Privacy Choices</a>
      </div>
      <div class="copyright">© 1996-2025, Amazon.com, Inc. or its affiliates</div>
    </div>
  </footer>`;
}