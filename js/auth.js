// Switch Tab
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    // Simulate login
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    
    // In a real application, this would make an API call
    alert(`Welcome back! (Demo: Login successful for ${email})`);
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    
    // Simulate registration
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    
    // In a real application, this would make an API call
    alert(`Account created successfully! (Demo: Registration successful for ${email})`);
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

// Social Login
function socialLogin(provider) {
    // Simulate social login
    alert(`Demo: ${provider.charAt(0).toUpperCase() + provider.slice(1)} login would be handled here.`);
    
    // In a real application, this would redirect to OAuth provider
    // window.location.href = `/auth/${provider}`;
}

