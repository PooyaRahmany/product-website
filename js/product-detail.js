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

    // Update meta tags for SEO
    updateProductMetaTags(product);

    // Display product details
    const container = document.getElementById('productDetail');
    if (container) {
        const categoryName = getCategoryName(product.category);
        const priceToman = formatPriceToman(product.price);
        const reviewCount = Math.floor(Math.random() * 100 + 50);
        
        container.innerHTML = `
            <div>
                <div style="width: 100%; height: 500px; overflow: hidden; border-radius: 12px; background: var(--bg-light); display: flex; align-items: center; justify-content: center;">
                    <img src="${product.image}" alt="${product.name} - ${categoryName}" class="product-detail-image" 
                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'500\\' height=\\'500\\'%3E%3Crect width=\\'500\\' height=\\'500\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' font-family=\\'Arial\\' font-size=\\'24\\' fill=\\'%239ca3af\\'%3E${encodeURIComponent(product.name)}%3C/text%3E%3C/svg%3E';"
                         style="max-width: 100%; max-height: 100%; object-fit: contain;"
                         itemprop="image">
                </div>
            </div>
            <div class="product-detail-info" itemscope itemtype="https://schema.org/Product">
                <meta itemprop="name" content="${product.name}">
                <meta itemprop="description" content="${product.description}">
                <link itemprop="image" href="${product.image}">
                <meta itemprop="category" content="${categoryName}">
                <div itemprop="brand" itemscope itemtype="https://schema.org/Brand">
                    <meta itemprop="name" content="تک استور">
                </div>
                <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                    <meta itemprop="ratingValue" content="${product.rating}">
                    <meta itemprop="reviewCount" content="${reviewCount}">
                    <meta itemprop="bestRating" content="5">
                    <meta itemprop="worstRating" content="1">
                </div>
                <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <meta itemprop="price" content="${product.price * 50000}">
                    <meta itemprop="priceCurrency" content="IRR">
                    <meta itemprop="availability" content="https://schema.org/InStock">
                    <meta itemprop="url" content="https://techstore.ir/product-detail.html?id=${product.id}">
                </div>
                
                <p style="color: #666; margin-bottom: 0.5rem;">${categoryName}</p>
                <h1 itemprop="name">${product.name}</h1>
                <div class="product-rating" style="margin: 1rem 0;">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span>${product.rating} (${reviewCount} نظر)</span>
                </div>
                <p class="product-detail-price">${priceToman}</p>
                <p class="product-description" itemprop="description">${product.description}</p>
                <div class="quantity-selector">
                    <label style="font-weight: 600; margin-right: 1rem;">تعداد:</label>
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" id="productQuantity" value="1" min="1" aria-label="تعداد محصول">
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 1.125rem; margin-bottom: 1rem;" onclick="addProductToCart()" aria-label="افزودن ${product.name} به سبد خرید">
                    <i class="fas fa-shopping-cart"></i> افزودن به سبد خرید
                </button>
                <div style="padding: 1rem; background: #f9fafb; border-radius: 8px; margin-top: 2rem;">
                    <h3 style="margin-bottom: 0.5rem;">ویژگی‌های محصول</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> کیفیت پریمیوم</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> ارسال سریع</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> گارانتی یک ساله</li>
                        <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--success-color); margin-right: 0.5rem;"></i> بازگشت ۳۰ روزه</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add Product Schema
        addProductSchema(product, reviewCount);
    }

    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Update meta tags dynamically
function updateProductMetaTags(product) {
    const categoryName = getCategoryName(product.category);
    const priceToman = formatPriceToman(product.price);
    
    // Update title
    document.title = `${product.name} | ${categoryName} | تک استور`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = `${product.description} قیمت: ${priceToman} - خرید آنلاین ${product.name} از تک استور`;
    }
    
    // Update Open Graph
    const ogTitle = document.getElementById('ogTitle');
    const ogDesc = document.getElementById('ogDescription');
    const ogImage = document.getElementById('ogImage');
    const ogPrice = document.getElementById('ogPrice');
    
    if (ogTitle) ogTitle.content = `${product.name} | تک استور`;
    if (ogDesc) ogDesc.content = product.description;
    if (ogImage) ogImage.content = product.image;
    if (ogPrice) ogPrice.content = (product.price * 50000).toString();
    
    // Update Twitter
    const twitterTitle = document.getElementById('twitterTitle');
    const twitterDesc = document.getElementById('twitterDescription');
    if (twitterTitle) twitterTitle.content = `${product.name} | تک استور`;
    if (twitterDesc) twitterDesc.content = product.description;
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.href = `https://techstore.ir/product-detail.html?id=${product.id}`;
    }
}

// Add Product Structured Data
function addProductSchema(product, reviewCount) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "category": getCategoryName(product.category),
        "brand": {
            "@type": "Brand",
            "name": "تک استور"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.toString(),
            "reviewCount": reviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://techstore.ir/product-detail.html?id=${product.id}`,
            "priceCurrency": "IRR",
            "price": (product.price * 50000).toString(),
            "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "تک استور"
            }
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
});

