let slideIndex = 1;
showSlides(slideIndex);

// Navigation Sidebar
function toggleSidebar() {
            const sidebar = document.getElementById("mySidebar");
            if (sidebar.style.width === "250px") {
                sidebar.style.width = "0";
            } else {
                sidebar.style.width = "250px";
            }
        }

//Slider
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("Slider");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) {
        console.error("No slides found.");
        return;
    }
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (dots.length > 0) {
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    } else {
        console.error(`Slide at index ${slideIndex - 1} not found.`);
    }
    if (dots.length > 0 && dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

// Map API
document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([53.34772221132637, -6.264967476787721], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([53.34772221132637, -6.264967476787721]).addTo(map);

    marker.bindPopup("Studio No.7").openPopup();
});

// Store - Shopping Cart
let cart = [];

function addToCart(name, price) {
    if (cart.length >= 12) {
        displayMessage("Cart limit reached!", "error");
        return;
    }
    cart.push({ name, price });
    displayMessage(`${name} added to the cart.`, "success");
    updateCartUI();
}
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.length;

    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - €${item.price.toFixed(2)}
            <button class="remove-button" onclick="removeFromCart(${index})">&times;</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}
function removeFromCart(index) {
    const removedItem = cart[index].name;
    cart.splice(index, 1);
    displayMessage(`${removedItem} removed from the cart.`, "success");
    updateCartUI();
}
function toggleCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
}
function checkout() {
    if (cart.length === 0) {
        displayMessage("Your cart is empty. Add items before checkout.", "error");
        return;
    }
    displayMessage("Thank you! Your items will be available at our loaction.", "success");
    cart = [];
    updateCartUI();
    toggleCartPanel();
}
function displayMessage(message, type) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${type}`;
    messageContainer.textContent = message;

    document.body.appendChild(messageContainer);

    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}

// Services - Class Schedule
document.getElementById("class-booking-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedClass = document.getElementById("class-select").value;
    const userName = document.getElementById("user-name").value;

    if (!selectedClass || !userName) {
        alert("Please fill in all fields.");
        return;
    }

    const confirmationDiv = document.getElementById("booking-confirmation");
    confirmationDiv.style.display = "block";
    confirmationDiv.textContent = `Thank you, ${userName}! You are now booked in for your ${selectedClass} class.`;
    
    document.getElementById("class-booking-form").reset();
});

// Services - FAQs
document.addEventListener("DOMContentLoaded", function () {
    const accordionTitles = document.querySelectorAll(".accordion-title");

    accordionTitles.forEach(title => {
        title.addEventListener("click", function () {
            const content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                document.querySelectorAll(".accordion-content").forEach(item => {
                    item.style.display = "none";
                });
                content.style.display = "block";
            }
        });
    });
});

// About Us - Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || "";
        const email = document.getElementById('email')?.value.trim() || "";
        const subject = document.getElementById('subject')?.value.trim() || "";
        const message = document.getElementById('message')?.value.trim() || "";

        if (name === "" || email === "" || subject === "" || message === "") {
            displayMessage("Please fill in all fields.", "error");
            return;
        }
        if (!validateEmail(email)) {
            displayMessage("Please enter a valid email address.", "error");
            return;
        }
        contactForm.reset();
        displayMessage("Thank you for your message!", "success");
    });
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function displayMessage(message, type) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${type}`;
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}