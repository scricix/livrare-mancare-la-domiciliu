document.addEventListener('DOMContentLoaded', function() {
    const orderNumberElement = document.getElementById('orderNumber');
    const clientNameElement = document.getElementById('clientName');
    const clientPhoneElement = document.getElementById('clientPhone');
    const clientEmailElement = document.getElementById('clientEmail');
    const deliveryAddressElement = document.getElementById('deliveryAddress');
    const productsElement = document.getElementById('products');
    const totalPriceElement = document.getElementById('totalPrice');
    const orderStatusElement = document.getElementById('orderStatus');

    function loadOrderDetails() {
        const orderData = JSON.parse(localStorage.getItem('currentOrder'));

        if (orderData) {
            orderNumberElement.textContent = orderData.orderNumber;
            clientNameElement.textContent = orderData.clientName;
            clientPhoneElement.textContent = orderData.clientPhone;
            clientEmailElement.textContent = orderData.clientEmail;
            deliveryAddressElement.textContent = orderData.deliveryAddress;
            productsElement.textContent = orderData.products;
            totalPriceElement.textContent = `${orderData.totalPrice} lei`;
            orderStatusElement.textContent = orderData.status || 'În așteptare';
        }
    }

    loadOrderDetails();
});


 // Setăm reîncărcarea paginii la fiecare 5 secunde (5000 milisecunde)
 setInterval(function() {
    window.location.reload();
}, 5000);
