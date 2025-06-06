// Sticky Navbar on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    const stickyOffset = navbar.offsetTop;
    function handleScroll() {
        if (window.pageYOffset > stickyOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
    window.addEventListener('scroll', handleScroll);
}
// Update Current Year in Footer
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {currentYearSpan.textContent = new Date().getFullYear();}
// Navigation Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
function changeNavOnScroll() {
    if (!navLinks || navLinks.length === 0) return;
    let currentSection = '';
    const offset = navbar ? navbar.offsetHeight + 20 : 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - offset) {
            currentSection = section.getAttribute('id');
        }
    });
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) currentSection = lastSection.id;
    }
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    if (pageYOffset < sections[0].offsetTop - offset) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-menu a[href="#hero"]');
        if (homeLink) homeLink.classList.add('active');
    }
}
window.addEventListener('scroll', changeNavOnScroll);
changeNavOnScroll();
// Quick View Modal Functionality
const quickViewButtons = document.querySelectorAll('.quick-view-btn');
const modal = document.getElementById('quickViewModal');
const modalClose = document.querySelector('.modal-close');
const modalAddToCart = document.getElementById('modalAddToCart');
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.product-card');
        const img = card.querySelector('img').src;
        const title = card.querySelector('h5').textContent;
        const description = card.querySelector('p').textContent;
        const price = card.querySelector('.price').textContent;
        document.getElementById('modalImage').src = img;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalPrice').textContent = price;
        modal.classList.add('active');
    });
});
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
// Cart and Mini-Cart Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.getElementById('cartCount');
const miniCart = document.getElementById('miniCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const miniCartClose = document.querySelector('.mini-cart-close');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="cart-item-details">
                <span>${item.title} - ${item.price}</span>
            </div>
            <button class="delete-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(li);
        const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        total += priceValue;
    });
    cartTotal.textContent = total.toLocaleString('en-IN', { minimumFractionDigits: 0 });
    localStorage.setItem('cart', JSON.stringify(cart));
    const miniCartContent = document.querySelector('.mini-cart-content');
    if (cart.length === 0) {
        miniCartContent.classList.add('empty');
        cartItems.innerHTML = '<li style="text-align: center; color: #6c757d;">Your cart is empty</li>';
    } else {
        miniCartContent.classList.remove('empty');
    }
}
function addToCart(img, title, price) {
    const clonedImg = img.cloneNode();
    clonedImg.classList.add('cart-animation');
    clonedImg.style.width = '50px';
    clonedImg.style.height = '50px';
    clonedImg.style.position = 'fixed';
    clonedImg.style.left = `${img.getBoundingClientRect().left}px`;
    clonedImg.style.top = `${img.getBoundingClientRect().top}px`;
    document.body.appendChild(clonedImg);
    const cartRect = cartIcon.getBoundingClientRect();
    setTimeout(() => {
        clonedImg.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
        clonedImg.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
        clonedImg.style.transform = 'scale(0.5)';
        clonedImg.style.opacity = '0';
        setTimeout(() => clonedImg.remove(), 600);
    }, 10);
    cart.push({ img: img.src, title, price });
    updateCart();
}
document.querySelectorAll('.product-card .product-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.product-card');
        const img = card.querySelector('img');
        const title = card.querySelector('h5').textContent;
        const price = card.querySelector('.price').textContent;
        addToCart(img, title, price);
    });
});
modalAddToCart.addEventListener('click', (e) => {
    e.preventDefault();
    const img = document.getElementById('modalImage');
    const title = document.getElementById('modalTitle').textContent;
    const price = document.getElementById('modalPrice').textContent;
    addToCart(img, title, price);
    modal.classList.remove('active');
});
cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCart();
    }
});
cartIcon.addEventListener('click', () => {
    miniCart.classList.toggle('open');
});
miniCartClose.addEventListener('click', () => {
    miniCart.classList.remove('open');
});
updateCart();
// Testimonial Slider Functionality
const testimonials = [
    {
        img: 'https://images.unsplash.com/photo-1642364861013-2c33f2dcfbcf',
        quote: 'Amazing selection and fast shipping! Found exactly what I needed for my new setup.',
        author: 'Alex Johnson',
    },
    {
        img: 'https://images.unsplash.com/photo-1659353220441-9207b962a133',
        quote: 'The customer service was top-notch. They helped me choose the perfect laptop.',
        author: 'Maria Garcia',
    },
    {
        img: 'https://images.unsplash.com/photo-1733796941440-9935f13a1cec',
        quote: 'Great prices and the quality of the smartwatch exceeded my expectations. Highly recommend!',
        author: 'David Smith',
    },
    {
        img: 'https://images.unsplash.com/photo-1700832161143-de261675534b',
        quote: 'ElectroHub is my go-to for tech gadgets. Always reliable and great deals.',
        author: 'Sam Lee',
    },
];
let currentSlide = 0;
const sliderContent = document.querySelector('.testimonial-slider .slider-content');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let autoSlideInterval;
function renderSlider() {
    if (!sliderContent) return;
    sliderContent.innerHTML = '';
    testimonials.forEach((testimonial, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('testimonial-slide');
        slideDiv.innerHTML = `
            <img src="${testimonial.img}" alt="Customer ${testimonial.author}">
            <blockquote>"${testimonial.quote}"</blockquote>
            <p class="author">- ${testimonial.author}</p>
        `;
        sliderContent.appendChild(slideDiv);
    });
}
function showSlide(index) {
    if (!sliderContent) return;
    const slides = sliderContent.querySelectorAll('.testimonial-slide');
    if (slides.length === 0) return;
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}
function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        stopAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        stopAutoSlide();
    });
}
renderSlider();
showSlide(currentSlide);
startAutoSlide();