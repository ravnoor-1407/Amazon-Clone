// Products details and helper functions
const PRODUCTS = [
    // Clothes
    {
        id: 1,
        name: "Men's Classic Fit T-Shirt",
        category: "Clothes",
        price: 14.99,
        originalPrice: 24.99,
        rating: 4.3,
        reviews: 2841,
        image: "Boston Men Classic Fit Tshirt.jpg",
        description: "Premium cotton crew-neck T-shirt with a relaxed classic fit. Breathable, lightweight fabric that's perfect for everyday wear. Available in 12 colors.",
        colors: ["White", "Black", "Navy", "Grey", "Olive"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        badge: "Best Seller",
        inStock: true
    },
    {
        id: 2,
        name: "Women's Floral Wrap Dress",
        category: "Clothes",
        price: 34.99,
        originalPrice: 59.99,
        rating: 4.5,
        reviews: 1203,
        image: "Women Floral Wrap Dress.jpg",
        description: "Elegant wrap-style dress with a flattering silhouette and vibrant floral print. Made from soft chiffon fabric — ideal for summer occasions.",
        colors: ["Blue Floral", "Pink Floral", "Red Floral"],
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "Sale",
        inStock: true
    },
    {
        id: 3,
        name: "Denim Jacket — Slim Fit",
        category: "Clothes",
        price: 49.99,
        originalPrice: 79.99,
        rating: 4.1,
        reviews: 872,
        image: "Denim Jacket.jpg",
        description: "Classic slim-fit denim jacket with button-front closure and chest pockets. Stonewashed finish gives it a timeless worn-in look.",
        colors: ["Light Blue", "Dark Blue", "Black"],
        sizes: ["S", "M", "L", "XL"],
        badge: null,
        inStock: true
    },
    {
        id: 4,
        name: "Running Sneakers Pro",
        category: "Clothes",
        price: 59.99,
        originalPrice: 89.99,
        rating: 4.6,
        reviews: 4512,
        image: "Running Sneakers.jpg",
        description: "Lightweight performance running shoes with responsive cushioning and breathable mesh upper. Ideal for road running and gym workouts.",
        colors: ["White/Blue", "Black/Red", "Grey/Green"],
        sizes: ["6", "7", "8", "9", "10", "11", "12"],
        badge: "Best Seller",
        inStock: true
    },

    // Health & Personal Care
    {
        id: 5,
        name: "Vitamin C Brightening Serum",
        category: "Health & Personal Care",
        price: 18.99,
        originalPrice: 28.99,
        rating: 4.4,
        reviews: 6731,
        image: "Vitamin C Brightening Serum.jpg",
        description: "20% Vitamin C serum with hyaluronic acid and Vitamin E. Reduces dark spots, brightens skin tone, and provides antioxidant protection. Dermatologist-tested.",
        colors: [],
        sizes: ["30ml", "60ml"],
        badge: "Amazon's Choice",
        inStock: true
    },
    {
        id: 6,
        name: "Daily Multivitamin Pack",
        category: "Health & Personal Care",
        price: 22.99,
        originalPrice: 29.99,
        rating: 4.2,
        reviews: 3204,
        image: "Daily Multivitamin.jpg",
        description: "Complete daily multivitamin with 23 essential vitamins and minerals. Supports immune health, energy levels, and overall wellness. 90-day supply.",
        colors: [],
        sizes: ["30 Count", "90 Count", "180 Count"],
        badge: null,
        inStock: true
    },
    {
        id: 7,
        name: "Hydrating Face Moisturizer SPF 30",
        category: "Health & Personal Care",
        price: 15.49,
        originalPrice: 19.99,
        rating: 4.3,
        reviews: 2198,
        image: "Hydrating Moisturiser SPF 30.jpg",
        description: "Lightweight daily moisturizer with SPF 30 sun protection. Non-greasy formula absorbs quickly. Suitable for all skin types including sensitive skin.",
        colors: [],
        sizes: ["50ml", "100ml"],
        badge: null,
        inStock: true
    },

    // Furniture
    {
        id: 8,
        name: "Ergonomic Mesh Office Chair",
        category: "Furniture",
        price: 189.99,
        originalPrice: 299.99,
        rating: 4.5,
        reviews: 5823,
        image: "Ergonomic Mesh Office Chair.jpg",
        description: "Fully adjustable ergonomic office chair with breathable mesh back, lumbar support, and 3D armrests. Supports up to 300 lbs. Assembles in 20 minutes.",
        colors: ["Black", "Grey"],
        sizes: [],
        badge: "Best Seller",
        inStock: true
    },
    {
        id: 9,
        name: "5-Shelf Wooden Bookcase",
        category: "Furniture",
        price: 79.99,
        originalPrice: 119.99,
        rating: 4.0,
        reviews: 1432,
        image: "5 Shelf Bookcase.jpg",
        description: "Sturdy 5-shelf bookcase made from engineered wood with a clean modern design. Anti-tip wall mount hardware included. Holds up to 50 lbs per shelf.",
        colors: ["Natural", "White", "Espresso"],
        sizes: [],
        badge: null,
        inStock: true
    },

    // Electronics
    {
        id: 10,
        name: "Wireless Noise-Cancelling Earbuds",
        category: "Electronics",
        price: 49.99,
        originalPrice: 79.99,
        rating: 4.4,
        reviews: 9241,
        image: "Noise Cancelling Earbuds.jpg",
        description: "True wireless earbuds with active noise cancellation, 30-hour battery life (with case), IPX5 water resistance, and touch controls. Works with Alexa.",
        colors: ["White", "Black", "Navy"],
        sizes: [],
        badge: "Amazon's Choice",
        inStock: true
    },
    {
        id: 11,
        name: "Smart Watch Fitness Tracker",
        category: "Electronics",
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.2,
        reviews: 7102,
        image: "Smartwatch.jpg",
        description: "Multisport smartwatch with heart rate monitoring, GPS, sleep tracking, and 100+ workout modes. 7-day battery life. Compatible with iOS and Android.",
        colors: ["Black", "Rose Gold", "Silver"],
        sizes: [],
        badge: "Sale",
        inStock: true
    },
    {
        id: 12,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 39.99,
        originalPrice: 59.99,
        rating: 4.3,
        reviews: 4088,
        image: "Portable Bluetooth Speakers.jpg",
        description: "360° waterproof portable speaker with 20-hour playtime, deep bass, and built-in microphone. Pairs instantly with any Bluetooth device. Floats in water.",
        colors: ["Black", "Blue", "Red", "Teal"],
        sizes: [],
        badge: null,
        inStock: true
    },

    // Beauty
    {
        id: 13,
        name: "Lipstick Gift Set — 12 Shades",
        category: "Beauty Picks",
        price: 24.99,
        originalPrice: 39.99,
        rating: 4.5,
        reviews: 3372,
        image: "Lipstick Gift Set.jpg",
        description: "Long-lasting matte lipstick collection with 12 vibrant shades from nude to bold red. Moisturizing formula with Vitamin E. Perfect gift set.",
        colors: ["12-Shade Set"],
        sizes: [],
        badge: "Best Seller",
        inStock: true
    },

    // Pet Care
    {
        id: 14,
        name: "Premium Dog Food — Grain Free",
        category: "Pet Care & Essentials",
        price: 34.99,
        originalPrice: 44.99,
        rating: 4.6,
        reviews: 8821,
        image: "Premium Dog Food.jpg",
        description: "High-protein grain-free dry dog food with real chicken as the #1 ingredient. No artificial preservatives, colors, or flavors. Supports healthy coat and digestion.",
        colors: [],
        sizes: ["5 lbs", "15 lbs", "30 lbs"],
        badge: "Amazon's Choice",
        inStock: true
    },
    {
        id: 15,
        name: "Interactive Cat Toy Bundle",
        category: "Pet Care & Essentials",
        price: 12.99,
        originalPrice: 19.99,
        rating: 4.4,
        reviews: 2103,
        image: "Cat Toy Bundle.jpg",
        description: "5-piece interactive cat toy set including feather wands, crinkle balls, and a catnip mouse. Stimulates natural hunting instincts and reduces boredom.",
        colors: [],
        sizes: [],
        badge: null,
        inStock: true
    },

    // Toys
    {
        id: 16,
        name: "STEM Building Blocks Set (500 pcs)",
        category: "New Arrivals in Toys",
        price: 29.99,
        originalPrice: 44.99,
        rating: 4.7,
        reviews: 1984,
        image: "Building Blocks Set.jpg",
        description: "500-piece colorful building block set compatible with major brands. Encourages creativity, spatial reasoning, and engineering skills. Ages 4+.",
        colors: ["Classic Colors", "Pastel"],
        sizes: [],
        badge: "New",
        inStock: true
    },
    {
        id: 17,
        name: "Remote Control Racing Car",
        category: "New Arrivals in Toys",
        price: 44.99,
        originalPrice: 64.99,
        rating: 4.3,
        reviews: 1421,
        image: "Remote Control Racing Car.jpg",
        description: "High-speed RC car with 4WD off-road capability, reaching up to 30 mph. 2.4GHz interference-free remote. 40-minute playtime per charge. Ages 8+.",
        colors: ["Red", "Blue"],
        sizes: [],
        badge: "New",
        inStock: true
    },

    // Discover Fashion Trends
    {
        id: 18,
        name: "Leather Crossbody Bag",
        category: "Discover Fashion Trends",
        price: 38.99,
        originalPrice: 64.99,
        rating: 4.4,
        reviews: 2671,
        image: "Leather Crossbody Bag.jpg",
        description: "Genuine leather crossbody bag with adjustable strap, gold-tone hardware, and multiple interior pockets. Perfect for everyday use.",
        colors: ["Tan", "Black", "Burgundy", "Navy"],
        sizes: [],
        badge: null,
        inStock: true
    }
];

// Helper: get product by ID
function getProductById(id) {
    return PRODUCTS.find(p => p.id === parseInt(id));
}

// Helper: get products by category
function getProductsByCategory(category) {
    return PRODUCTS.filter(p => p.category === category);
}

// Helper: search products
function searchProducts(query, category = "All") {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(q) ||
                             p.category.toLowerCase().includes(q) ||
                             p.description.toLowerCase().includes(q);
        const matchesCategory = category === "All" || p.category === category;
        return matchesQuery && matchesCategory;
    });
}

// Helper: render star rating HTML
function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return (
        '<span class="stars">' +
        '★'.repeat(full) +
        (half ? '½' : '') +
        '☆'.repeat(empty) +
        '</span>'
    );
}