// Inițializăm coșul de cumpărături
let cart = [];

// Recuperăm coșul de cumpărături din localStorage la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = storedCart;
    updateCart();
    updateCartIcon();
});

// Funcție pentru adăugarea unui produs în coșul de cumpărături
function adaugaInCos(numeProdus) {
    // Obținem selecturile de sosuri și băuturi corespunzătoare
    let selectSos, selectBautura;
    let pretBaza;

    switch (numeProdus) {
        case 'Burger':
            selectSos = document.getElementById('sos-burger');
            selectBautura = document.getElementById('bautura-burger');
            pretBaza = 25;
            break;
        case 'Pizza':
            selectSos = document.getElementById('sos-pizza');
            selectBautura = document.getElementById('bautura-pizza');
            pretBaza = 35;
            break;
        case 'Salată':
            selectSos = document.getElementById('sos-salata');
            selectBautura = document.getElementById('bautura-salata');
            pretBaza = 20;
            break;
        default:
            selectSos = null;
            selectBautura = null;
            pretBaza = 0;
            break;
    }

    // Obținem prețul sosului și al băuturii selectate
    let pretSos = parseFloat(selectSos ? selectSos.value : 0);
    let pretBautura = parseFloat(selectBautura ? selectBautura.value : 0);

    // Calculăm prețul total cu sosurile și băuturile adăugate
    let pretTotal = pretBaza + pretSos + pretBautura;

    // Adăugăm produsul în coșul de cumpărături
    cart.push({
        name: numeProdus,
        price: pretTotal
    });

    // Stocăm coșul de cumpărături în localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizăm afișarea coșului de cumpărături
    updateCart();

    // Actualizăm numărul de produse din coș pe iconița coșului
    updateCartIcon();
}

// Funcție pentru actualizarea afișării coșului de cumpărături
function updateCart() {
    let cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        let cartItemInfo = document.createElement('div');
        cartItemInfo.classList.add('cart-item-info');

        let cartItemImage = document.createElement('img');
        cartItemImage.src = `${item.name.toLowerCase()}.jpg`;
        cartItemImage.alt = item.name;

        let cartItemDetails = document.createElement('div');
        cartItemDetails.classList.add('cart-item-details');

        let cartItemName = document.createElement('div');
        cartItemName.classList.add('cart-item-name');
        cartItemName.textContent = item.name;

        let cartItemPrice = document.createElement('div');
        cartItemPrice.classList.add('cart-item-price');
        cartItemPrice.textContent = `${item.price.toFixed(2)} lei`;

        cartItemDetails.appendChild(cartItemName);
        cartItemDetails.appendChild(cartItemPrice);

        cartItemInfo.appendChild(cartItemImage);
        cartItemInfo.appendChild(cartItemDetails);

        let cartItemRemove = document.createElement('button');
        cartItemRemove.classList.add('cart-item-remove');
        cartItemRemove.textContent = 'Elimină';
        cartItemRemove.onclick = function() {
            removeFromCart(i);
        };

        cartItem.appendChild(cartItemInfo);
        cartItem.appendChild(cartItemRemove);

        cartItems.appendChild(cartItem);

        totalPrice += item.price;
    }

    document.getElementById('cart-total-price').textContent = totalPrice.toFixed(2);
}

// Funcție pentru eliminarea unui produs din coșul de cumpărături
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartIcon();
}

// Funcție pentru deschiderea/închiderea containerului coșului de cumpărături
function toggleCart() {
    let cartContainer = document.querySelector('.cart-container');
    cartContainer.classList.toggle('open');
}

// Funcție pentru plasarea comenzii
function placeOrder() {
    if (cart.length === 0) {
        alert('Coșul de cumpărături este gol.');
        return;
    }

    // Stocăm produsele din coș în localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // Redirecționăm către pagina de plasare a comenzii
    window.location.href = 'plaseazacomanda.html';
}

// Funcție pentru actualizarea numărului de produse din coș pe iconița coșului
function updateCartIcon() {
    let cartIcon = document.querySelector('.cart-icon');
    let cartCount = cart.length;

    if (cartCount > 0) {
        cartIcon.innerHTML = `&#128722; <span class="cart-count">${cartCount}</span>`;
    } else {
        cartIcon.innerHTML = '&#128722;';
    }
}
