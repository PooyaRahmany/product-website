# TechStore - E-Commerce Website

A modern, responsive e-commerce website for selling electronics, built with HTML, CSS, and JavaScript.

## Features

### ✅ Complete Features

- **Homepage**: Featured products, promotional banners, category navigation
- **Product Listing**: Categories, filters (price, rating, category), and sorting options
- **Product Details**: Individual product pages with images, descriptions, prices, and Add to Cart
- **Shopping Cart**: Full cart functionality with quantity management
- **Checkout Flow**: Complete checkout process with shipping and payment options
- **User Authentication**: Login and registration pages with social login options
- **Mobile-Friendly**: Fully responsive design for all screen sizes
- **Payment Integration**: Support for Credit Card, PayPal, and Apple Pay
- **SEO-Friendly**: Meta tags and semantic HTML structure
- **Modern UI/UX**: Professional color scheme and smooth animations

## Project Structure

```
project/
├── index.html              # Homepage
├── products.html           # Product listing page
├── product-detail.html     # Individual product page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout page
├── login.html             # Login/Registration
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── main.js           # Core functionality, hero slider
│   ├── products.js       # Product listing, filters, sorting
│   ├── product-detail.js # Product detail page
│   ├── cart.js           # Shopping cart functionality
│   ├── checkout.js       # Checkout process
│   └── auth.js           # Authentication
└── README.md             # This file

```

## Getting Started

1. **Open the website**: Simply open `index.html` in a web browser
2. **No build process required**: This is a static website that works directly in the browser
3. **Browse products**: Navigate to the Products page to see all items
4. **Add to cart**: Click "Add to Cart" on any product
5. **Checkout**: Go to the cart and proceed to checkout

## Features Explained

### Homepage (`index.html`)
- Hero banner with auto-sliding promotional content
- Featured products section
- Category quick links
- Promotional banner with discount code
- Footer with newsletter signup

### Products Page (`products.html`)
- Sidebar filters:
  - Category selection
  - Price range filters
  - Rating filters
- Sorting options:
  - Price (Low to High / High to Low)
  - Highest Rated
  - Name (A-Z)
- Product cards with images, ratings, and prices

### Product Detail (`product-detail.html`)
- Large product image
- Detailed description
- Quantity selector
- Add to Cart button
- Related products section
- Product features list

### Shopping Cart (`cart.html`)
- List of cart items with images
- Quantity adjustment
- Remove items
- Order summary with:
  - Subtotal
  - Shipping (Free over $100)
  - Tax calculation
  - Total price

### Checkout (`checkout.html`)
- Shipping information form
- Payment method selection:
  - Credit/Debit Card
  - PayPal
  - Apple Pay
- Order summary
- Secure checkout process

### Login/Register (`login.html`)
- Tabbed interface for Login/Register
- Form validation
- Social login options (Google, Facebook)
- Remember me functionality

## Data Storage

The website uses **localStorage** to:
- Save cart items
- Persist user session data (demo mode)

## Customization

### Adding Products

Edit `js/main.js` and update the `productsData` array:

```javascript
{
    id: 13,
    name: "Product Name",
    category: "category",
    price: 999,
    image: "image-url",
    rating: 4.5,
    description: "Product description"
}
```

### Changing Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #f59e0b;
    /* ... */
}
```

### Categories

Categories can be customized in:
- `index.html` - Category cards section
- `products.html` - Filter sidebar

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **localStorage API**: Client-side data storage

## Payment Integration

Currently in demo mode. To integrate real payments:

1. **Stripe**: Add Stripe.js for credit card processing
2. **PayPal**: Integrate PayPal SDK
3. **Apple Pay**: Use Apple Pay JS API

## SEO Features

- Semantic HTML5 structure
- Meta descriptions on all pages
- Proper heading hierarchy
- Alt text for images
- Descriptive URLs

## Performance

- Optimized images (using placeholder URLs - replace with actual optimized images)
- Minimal JavaScript
- CSS Grid for efficient layouts
- Lazy loading ready structure

## Future Enhancements

- Backend API integration
- User account dashboard
- Order history
- Product reviews and ratings
- Wishlist functionality
- Advanced search
- Email notifications
- Admin panel

## License

This is a demo project. Feel free to use and modify for your needs.

## Support

For questions or issues, please refer to the code comments or modify as needed.

---

**Built with ❤️ for modern e-commerce**

