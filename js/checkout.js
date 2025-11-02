// Select Payment Method
function selectPayment(method) {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const creditCardForm = document.getElementById('creditCardForm');
    
    paymentOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    
    // Show/hide credit card form
    if (creditCardForm) {
        if (method === 'credit') {
            creditCardForm.style.display = 'block';
        } else {
            creditCardForm.style.display = 'none';
        }
    }
}

// Process Checkout
function processCheckout(event) {
    event.preventDefault();
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate form
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Show loading
    const submitBtn = event.target;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Show success message
        alert('Order placed successfully! Thank you for your purchase.');
        
        // Redirect to homepage
        window.location.href = 'index.html';
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('checkout.html')) {
        if (cart.length === 0) {
            alert('Your cart is empty. Redirecting to products page...');
            window.location.href = 'products.html';
            return;
        }
        loadCart();
    }
});

