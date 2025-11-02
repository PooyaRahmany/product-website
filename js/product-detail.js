// Load Product Detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }

    const product = productsData.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Display product details
    const container = document.getElementById('productDetail');
    if (container) {
        container.innerHTML = `
            <div>
                <div style="width: 100%; height: 500px; overflow: hidden; border-radius: 12px; background: var(--bg-light); display: flex; align-items: center; justify-content: center;">
                    <img src="${product.image}" alt="${product.name}" class="product-detail-image" 
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'500\\' height=\\'500\\'%3E%3Crect width=\\'500\\' height=\\'500\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' font-family=\\'Arial\\' font-size=\\'24\\' fill=\\'%239ca3af\\'%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';"
                         style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
            </div>
            <div class="product-detail-info">
                <p style="color: #666; margin-bottom: 0.5rem;">${product.category}</p>
                <h1>${product.name}</h1>
                <div class="product-rating" style="margin: 1rem 0;">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span>${product.rating} (${Math.floor(Math.random() * 100 + 50)} reviews)</span>
                </div>
                <p class="product-detail-price">$${product.price.toLocaleString()}</p>
                <p class="product-description">${product.description}</p>
                <div class="quantity-selector">
                    <label style="font-weight: 600; margin-right: 1rem;">Quantity:</label>
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" id="productQuantity" value="1" min="1">
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.125rem; margin-bottom: 1rem;" onclick="addProductToCart()">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <div style="padding: 1rem; background: #f9fafb; border-radius: 8px; margin-top: 2rem;">
                    <h3 style="margin-bottom: 0.5rem;">Product Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> Premium Quality</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> Fast Shipping</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> 1 Year Warranty</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> 30-Day Returns</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // Load related products
    loadRelatedProducts(product.category, product.id);
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('productQuantity');
    if (!quantityInput) return;
    
    let currentQty = parseInt(quantityInput.value) || 1;
    currentQty = Math.max(1, currentQty + change);
    quantityInput.value = currentQty;
}

function addProductToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const quantity = parseInt(document.getElementById('productQuantity').value) || 1;
    
    addToCart(productId, quantity);
}

function loadRelatedProducts(category, excludeId) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    const related = productsData
        .filter(p => p.category === category && p.id !== excludeId)
        .slice(0, 4);

    if (related.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = related.map(product => `
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
});

