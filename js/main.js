// Get Persian category name (needed for image generation)
function getCategoryName(category) {
    const categories = {
        'smartphones': 'گوشی‌های هوشمند',
        'laptops': 'لپ‌تاپ',
        'audio': 'لوازم صوتی',
        'tv': 'تلویزیون و نمایشگر',
        'gaming': 'گیمینگ',
        'wearables': 'ساعت‌های هوشمند'
    };
    return categories[category] || category;
}

// Generate SVG placeholder image
function getProductImage(productName, category, id) {
    const colors = {
        smartphones: { bg: '#2563eb', text: '#ffffff' },
        laptops: { bg: '#1e40af', text: '#ffffff' },
        audio: { bg: '#f59e0b', text: '#ffffff' },
        tv: { bg: '#1e40af', text: '#ffffff' },
        gaming: { bg: '#f59e0b', text: '#ffffff' },
        wearables: { bg: '#2563eb', text: '#ffffff' }
    };
    const color = colors[category] || { bg: '#6b7280', text: '#ffffff' };
    const categoryName = getCategoryName(category);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        <rect width="400" height="400" fill="${color.bg}"/>
        <text x="50%" y="45%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${color.text}">${productName}</text>
        <text x="50%" y="55%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="16" fill="${color.text}" opacity="0.8">${categoryName}</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// Sample product data
const productsData = [
    { id: 1, name: "iPhone 15 Pro", category: "smartphones", price: 999, image: getProductImage("iPhone 15 Pro", "smartphones", 1), rating: 4.8, description: "آخرین آیفون با ویژگی‌های پیشرفته و طراحی خیره‌کننده." },
    { id: 2, name: "Samsung Galaxy S24", category: "smartphones", price: 899, image: getProductImage("Galaxy S24", "smartphones", 2), rating: 4.7, description: "گوشی هوشمند اندروید پریمیوم با دوربین استثنایی." },
    { id: 3, name: "MacBook Pro 16\"", category: "laptops", price: 2499, image: getProductImage("MacBook Pro", "laptops", 3), rating: 4.9, description: "لپ‌تاپ قدرتمند برای حرفه‌ای‌ها و خالقان محتوا." },
    { id: 4, name: "Dell XPS 15", category: "laptops", price: 1799, image: getProductImage("Dell XPS 15", "laptops", 4), rating: 4.6, description: "لپ‌تاپ با عملکرد بالا با نمایشگر خیره‌کننده." },
    { id: 5, name: "Sony WH-1000XM5", category: "audio", price: 399, image: getProductImage("Sony WH-1000XM5", "audio", 5), rating: 4.8, description: "هدفون بی‌سیم پریمیوم با حذف نویز." },
    { id: 6, name: "AirPods Pro", category: "audio", price: 249, image: getProductImage("AirPods Pro", "audio", 6), rating: 4.7, description: "گوشی‌های بی‌سیم پیشرفته با صدا فضایی." },
    { id: 7, name: "Samsung 65\" QLED TV", category: "tv", price: 1499, image: getProductImage("QLED TV 65\"", "tv", 7), rating: 4.8, description: "نمایشگر ۴K QLED خیره‌کننده با ویژگی‌های هوشمند." },
    { id: 8, name: "PlayStation 5", category: "gaming", price: 499, image: getProductImage("PlayStation 5", "gaming", 8), rating: 4.9, description: "کنسول گیمینگ نسل بعدی." },
    { id: 9, name: "Apple Watch Series 9", category: "wearables", price: 399, image: getProductImage("Apple Watch", "wearables", 9), rating: 4.7, description: "ساعت هوشمند پیشرفته با ردیابی سلامت." },
    { id: 10, name: "Nintendo Switch OLED", category: "gaming", price: 349, image: getProductImage("Nintendo Switch", "gaming", 10), rating: 4.6, description: "کنسول گیمینگ همه‌کاره برای خانه و بیرون." },
    { id: 11, name: "iPad Pro 12.9\"", category: "laptops", price: 1099, image: getProductImage("iPad Pro", "laptops", 11), rating: 4.8, description: "تبلت قدرتمند با ویژگی‌های حرفه‌ای." },
    { id: 12, name: "Bose QuietComfort 45", category: "audio", price: 329, image: getProductImage("Bose QC45", "audio", 12), rating: 4.6, description: "هدفون راحت با حذف نویز." }
];

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));
            
            if (slides[index]) {
                slides[index].classList.add('active');
                if (indicators[index]) {
                    indicators[index].classList.add('active');
                }
            }
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Load featured products on homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
});

// Load Featured Products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featured = productsData.slice(0, 4);
    
    featuredContainer.innerHTML = featured.map(product => `
        <article class="product-card" role="listitem" itemscope itemtype="https://schema.org/Product">
            <div class="product-image-wrapper">
                <img src="${product.image}" 
                     alt="${product.name} - ${getCategoryName(product.category)} - قیمت ${formatPriceToman(product.price)}" 
                     class="product-image" 
                     loading="lazy"
                     itemprop="image"
                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\'%3E%3Crect width=\\'400\\' height=\\'400\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' font-family=\\'Arial\\' font-size=\\'20\\' fill=\\'%239ca3af\\'%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';">
            </div>
            <div class="product-info">
                <p class="product-category" itemprop="category">${getCategoryName(product.category)}</p>
                <h3 class="product-title" itemprop="name">${product.name}</h3>
                <div class="product-rating" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                    <meta itemprop="ratingValue" content="${product.rating}">
                    <meta itemprop="bestRating" content="5">
                    <span class="stars" aria-label="امتیاز ${product.rating} از ۵">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <p class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="price" content="${product.price * 50000}">
                    <meta itemprop="priceCurrency" content="IRR">
                    ${formatPriceToman(product.price)}
                </p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="افزودن ${product.name} به سبد خرید">
                    <i class="fas fa-shopping-cart" aria-hidden="true"></i> افزودن به سبد خرید
                </button>
                <a href="product-detail.html?id=${product.id}" class="btn btn-outline" style="width: 100%; margin-top: 0.5rem; text-align: center; display: block;" aria-label="مشاهده جزئیات ${product.name}">
                    مشاهده جزئیات
                </a>
            </div>
        </article>
    `).join('');
}


// Format price in Toman
function formatPriceToman(price) {
    // Convert dollar to Toman (approximate rate: 1 USD = 50,000 Toman)
    const toman = price * 50000;
    return `${toman.toLocaleString('fa-IR')} تومان`;
}

// Format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

