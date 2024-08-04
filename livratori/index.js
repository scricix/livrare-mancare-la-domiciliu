document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM încărcat complet');
    let orderData = null;

    function playNewOrderSound() {
        const audio = document.getElementById('newOrderSound');
        if (audio) {
            audio.play().catch(error => {
                console.error('Eroare la redarea sunetului:', error);
                showVisualNotification();
            });
        } else {
            console.error('Elementul audio nu a fost găsit');
            showVisualNotification();
        }
    }

    function showVisualNotification() {
        const notification = document.createElement('div');
        notification.textContent = 'Comandă nouă primită!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    function displayOrderData(data) {
        console.log('Afișare date comandă:', data);
        orderData = data;
        document.getElementById('orderNumber').textContent = data.orderNumber || 'N/A';
        document.getElementById('clientName').textContent = `${data.firstName || ''} ${data.lastName || ''}`;
        document.getElementById('clientPhone').textContent = data.phone || 'N/A';
        document.getElementById('clientEmail').textContent = data.email || 'N/A';
        document.getElementById('deliveryAddress').textContent = data.address || 'N/A';
        document.getElementById('products').textContent = data.products || 'N/A';
        document.getElementById('totalPrice').textContent = data.totalPrice || '0';

        playNewOrderSound();
    }

    function clearOrderInfo() {
        document.getElementById('orderNumber').textContent = '';
        document.getElementById('clientName').textContent = '';
        document.getElementById('clientPhone').textContent = '';
        document.getElementById('clientEmail').textContent = '';
        document.getElementById('deliveryAddress').textContent = '';
        document.getElementById('products').textContent = '';
        document.getElementById('totalPrice').textContent = '';
    }

    function loadOrderFromStorage() {
        const storedOrderData = localStorage.getItem('currentOrder');
        console.log('Date stocate în localStorage:', storedOrderData);
        if (storedOrderData) {
            try {
                const parsedData = JSON.parse(storedOrderData);
                displayOrderData(parsedData);
            } catch (error) {
                console.error('Eroare la parsarea datelor din localStorage:', error);
                document.getElementById('order-info').innerHTML = "<p>Eroare la încărcarea datelor comenzii.</p>";
            }
        } else {
            console.log('Nu există date în localStorage');
            document.getElementById('order-info').innerHTML = "<p>Nu există comenzi active în acest moment.</p>";
        }
    }

    loadOrderFromStorage();

    const buttons = document.querySelectorAll('.button-group button, #acceptOrder');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Buton apăsat:', this.id);
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
                this.disabled = true;
                // Am eliminat alert-ul de aici
                if (this.id === 'delivered') {
                    console.log('Activare buton Trimite Informații');
                    document.getElementById('sendInfoButton').classList.add('active');
                    document.getElementById('sendInfoButton').disabled = false;
                }
            }
        });
    });

    document.getElementById('sendInfoButton').addEventListener('click', function() {
        console.log('Buton Trimite Informații apăsat');
        if (this.classList.contains('active')) {
            if (orderData) {
                console.log('Pregătire date pentru salvare:', orderData);
                orderData.completedAt = new Date().toISOString();
                
                sessionStorage.setItem('completedOrder', JSON.stringify(orderData));
                console.log('Date salvate în sessionStorage');
                
                localStorage.removeItem('currentOrder');
                console.log('Date șterse din localStorage');
                
                // Am înlocuit alert-ul cu o notificare vizuală
                showVisualNotification('Informațiile comenzii au fost salvate cu succes!');
                
                this.disabled = true;
                this.classList.remove('active');
                this.textContent = 'Informații Salvate';
                document.getElementById('deliveryStatusButton').disabled = false;
                document.getElementById('virtualReceiptButton').disabled = false;
                clearOrderInfo();
                const savedData = sessionStorage.getItem('completedOrder');
                if (savedData) {
                    console.log('Date salvate în sessionStorage:', JSON.parse(savedData));
                } else {
                    console.log('Nu s-au găsit date salvate în sessionStorage');
                }
            } else {
                console.error('Nu există date valide pentru a fi salvate');
                showVisualNotification('Nu există date valide pentru a fi salvate.');
            }
        } else {
            console.log('Butonul Trimite Informații nu este activ');
        }
    });

    const toggleSavedInfoButton = document.getElementById('toggleSavedInfo');
    const savedOrderInfo = document.getElementById('savedOrderInfo');
    toggleSavedInfoButton.addEventListener('click', function() {
        const savedData = sessionStorage.getItem('completedOrder');
        const savedOrderDetails = document.getElementById('savedOrderDetails');
        
        if (savedOrderInfo.style.display === 'none') {
            if (savedData) {
                const orderInfo = JSON.parse(savedData);
                let html = '';
                for (const [key, value] of Object.entries(orderInfo)) {
                    html += `<p><strong>${key}:</strong> ${value}</p>`;
                }
                savedOrderDetails.innerHTML = html;
                savedOrderInfo.style.display = 'block';
                this.textContent = 'Ascunde Informații Salvate';
                console.log('Informații afișate:', html);
            } else {
                showVisualNotification('Nu există informații salvate despre comandă.');
                console.log('Nu s-au găsit date salvate în sessionStorage');
            }
        } else {
            savedOrderInfo.style.display = 'none';
            this.textContent = 'Afișează Informații Salvate';
            console.log('Informații ascunse');
        }
    });

    const deliveryStatusButton = document.getElementById('deliveryStatusButton');
    deliveryStatusButton.addEventListener('click', function() {
        if (this.classList.contains('free')) {
            this.classList.remove('free');
            this.textContent = 'Livrator Ocupat';
            this.style.backgroundColor = '#ff0000';
        } else {
            this.classList.add('free');
            this.textContent = 'Livrator Liber';
            this.style.backgroundColor = '#4CAF50';
        }
    });

    const virtualReceiptButton = document.getElementById('virtualReceiptButton');
    const receiptModal = document.getElementById('receiptModal');
    const closeModal = document.querySelector('.close');
    virtualReceiptButton.addEventListener('click', function() {
        receiptModal.style.display = 'block';
    });
    closeModal.addEventListener('click', function() {
        receiptModal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target == receiptModal) {
            receiptModal.style.display = 'none';
        }
    });

    function sendReceipt(method) {
        const savedData = JSON.parse(sessionStorage.getItem('completedOrder'));
        if (!savedData) {
            showVisualNotification('Nu există informații salvate despre comandă.');
            return;
        }
        const phoneNumber = savedData.phone || '';
        const email = savedData.email || '';
        const orderNumber = savedData.orderNumber || '';
        let detailedText = `Bon virtual pentru comanda ${orderNumber}\n\n`;
        for (const [key, value] of Object.entries(savedData)) {
            detailedText += `${key}: ${value}\n`;
        }
        const encodedText = encodeURIComponent(detailedText);
        switch (method) {
            case 'SMS':
                if (phoneNumber) {
                    window.open(`sms:${phoneNumber}?body=${encodedText}`);
                } else {
                    showVisualNotification('Nu există un număr de telefon salvat pentru această comandă.');
                }
                break;
            case 'WhatsApp':
                if (phoneNumber) {
                    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`);
                } else {
                    showVisualNotification('Nu există un număr de telefon salvat pentru această comandă.');
                }
                break;
            case 'Email':
                if (email) {
                    window.open(`mailto:${email}?subject=Bon Virtual Comandă ${orderNumber}&body=${encodedText}`);
                } else {
                    showVisualNotification('Nu există o adresă de email salvată pentru această comandă.');
                }
                break;
        }
        console.log(`Trimitere bon virtual prin ${method}`);
        receiptModal.style.display = 'none';
    }

    document.getElementById('sendSMS').addEventListener('click', function() {
        sendReceipt('SMS');
    });
    document.getElementById('sendWhatsApp').addEventListener('click', function() {
        sendReceipt('WhatsApp');
    });
    document.getElementById('sendEmail').addEventListener('click', function() {
        sendReceipt('Email');
    });

    function handleNewOrder(newOrderData) {
        displayOrderData(newOrderData);
        localStorage.setItem('currentOrder', JSON.stringify(newOrderData));
    }

    // Simulare primire comandă nouă (pentru testare)
    document.getElementById('testNewOrder').addEventListener('click', function() {
        const mockData = {
            orderNumber: Math.floor(Math.random() * 1000000),
            firstName: 'John',
            lastName: 'Doe',
            phone: '0123456789',
            email: 'john@example.com',
            address: 'Strada Exemplu, Nr. 123',
            products: 'Produs 1, Produs 2',
            totalPrice: Math.floor(Math.random() * 500) + 50
        };
        handleNewOrder(mockData);
    });

    // Aici ar trebui să fie codul care primește date reale de la server
    // De exemplu, dacă folosiți WebSockets:
    // const socket = io('your-server-url');
    // socket.on('newOrder', function(newOrderData) {
    //     handleNewOrder(newOrderData);
    // });
});
