let cartItems = [];
    
function loadCartItems() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        try {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                cartItems = Object.values(cartItems);
            }
        } catch (e) {
            console.error("Eroare la parsarea datelor din coș:", e);
            cartItems = [];
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Elimină';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);

        totalPrice += parseFloat(item.price);
    });

    document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

loadCartItems();
displayCartItems();

const orderForm = document.getElementById('order-form');
const orderFormContainer = document.getElementById('order-form-container');
const thankYouMessage = document.getElementById('thank-you-message');

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
        alert('Coșul dumneavoastră este gol. Vă rugăm să adăugați produse înainte de a plasa comanda.');
        return;
    }

    const orderData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        phone: document.getElementById('ph

let cartItems = [];

function loadCartItems() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        try {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                cartItems = Object.values(cartItems);
            }
        } catch (e) {
            console.error("Eroare la parsarea datelor din coș:", e);
            cartItems = [];
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Elimină';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);

        totalPrice += parseFloat(item.price);
    });

    document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

loadCartItems();
displayCartItems();

const orderForm = document.getElementById('order-form');
const orderFormContainer = document.getElementById('order-form-container');
const thankYouMessage = document.getElementById('thank-you-message');

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
        alert('Coșul dumneavoastră este gol. Vă rugăm să adăugați produse înainte de a plasa comanda.');
        return;
    }

    const orderData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        orderNumber: 'CMD' + Date.now(),
        products: cartItems.map(item => `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`).join(', '),
        totalPrice: cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)
    };

    localStorage.setItem('currentOrder

let cartItems = [];

function loadCartItems() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        try {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                cartItems = Object.values(cartItems);
            }
        } catch (e) {
            console.error("Eroare la parsarea datelor din coș:", e);
            cartItems = [];
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Elimină';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);

        totalPrice += parseFloat(item.price);
    });

    document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

loadCartItems();
displayCartItems();

const orderForm = document.getElementById('order-form');
const orderFormContainer = document.getElementById('order-form-container');
const thankYouMessage = document.getElementById('thank-you-message');

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
        alert('Coșul dumneavoastră este gol. Vă rugăm să adăugați produse înainte de a plasa comanda.');
        return;
    }

    const orderData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        orderNumber: 'CMD' + Date.now(),
        products: cartItems.map(item => `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`).join(', '),
        totalPrice: cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderData));

    orderFormContainer.style.display = 'non

let cartItems = [];

function loadCartItems() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        try {
            cartItems = JSON.parse(cartData);
            if (!Array.isArray(cartItems)) {
                cartItems = Object.values(cartItems);
            }
        } catch (e) {
            console.error("Eroare la parsarea datelor din coș:", e);
            cartItems = [];
        }
    }
}

function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Elimină';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);

        totalPrice += parseFloat(item.price);
    });

    document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

loadCartItems();
displayCartItems();

const orderForm = document.getElementById('order-form');
const orderFormContainer = document.getElementById('order-form-container');
const thankYouMessage = document.getElementById('thank-you-message');

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
        alert('Coșul dumneavoastră este gol. Vă rugăm să adăugați produse înainte de a plasa comanda.');
        return;
    }

    const orderData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        orderNumber: 'CMD' + Date.now(),
        products: cartItems.map(item => `${item.name} - ${parseFloat(item.price).toFixed(2)} lei`).join(', '),
        totalPrice: cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderData));

    orderFormContainer.style.display = 'none';
    thankYouMessage.style.display = 'block';

    localStorage.removeItem('cart');
    cartItems = [];
});