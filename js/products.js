// Load Products
let allProducts = [...productsData];
let filteredProducts = [...productsData];

function loadProducts() {
    const container = document.getElementById('productsGrid');
    const countElement = document.getElementById('productCount');
    
    if (!container) return;

    // Check for category filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    if (categoryFilter) {
        filteredProducts = allProducts.filter(p => p.category === categoryFilter);
        // Pre-check the category checkbox
        const checkboxes = document.querySelectorAll(`input[value="${categoryFilter}"]`);
        checkboxes.forEach(cb => cb.checked = true);
    }

    displayProducts(filteredProducts);
    updateProductCount();
}

function displayProducts(products) {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;"><p style="font-size: 1.25rem; color: #666;">محصولی یافت نشد</p></div>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\'%3E%3Crect width=\\'400\\' height=\\'400\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' font-family=\\'Arial\\' font-size=\\'20\\' fill=\\'%239ca3af\\'%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';">
            </div>
            <div class="product-info">
                <p class="product-category">${getCategoryName(product.category)}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <p class="product-price">${formatPriceToman(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> افزودن به سبد خرید
                </button>
                <a href="product-detail.html?id=${product.id}" class="btn btn-outline" style="width: 100%; margin-top: 0.5rem; text-align: center; display: block;">
                    مشاهده جزئیات
                </a>
            </div>
        </div>
    `).join('');
}

function updateProductCount() {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        const count = filteredProducts.length.toLocaleString('fa-IR');
        countElement.textContent = `${count} محصول یافت شد`;
    }
}

// Apply Filters
function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const priceFilter = document.querySelector('input[name="price"]:checked');
    const ratingFilters = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseInt(cb.value));

    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) {
            return false;
        }

        // Price filter (convert to dollar for comparison)
        if (priceFilter) {
            const priceRanges = {
                '0-500': { min: 0, max: 500 },
                '500-1000': { min: 500, max: 1000 },
                '1000-2000': { min: 1000, max: 2000 },
                '2000+': { min: 2000, max: Infinity }
            };
            const range = priceRanges[priceFilter.value];
            if (range) {
                if (product.price < range.min || (range.max !== Infinity && product.price > range.max)) {
                    return false;
                }
            }
        }

        // Rating filter
        if (ratingFilters.length > 0) {
            const maxRating = Math.max(...ratingFilters);
            if (product.rating < maxRating) {
                return false;
            }
        }

        return true;
    });

    displayProducts(filteredProducts);
    updateProductCount();
}

// Clear Filters
function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
    updateProductCount();
}

// Sort Products
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect.value;

    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts = [...allProducts];
    }

    displayProducts(filteredProducts);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

