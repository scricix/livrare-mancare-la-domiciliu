const API_URL = 'http://your-domain.com/api.php'; // Înlocuiți cu URL-ul corect al API-ului dvs.

async function syncData() {
    try {
        const restaurants = await fetch(`${API_URL}?action=restaurants`).then(res => res.json());
        const menus = await fetch(`${API_URL}?action=menus`).then(res => res.json());
        const deliveryPersons = await fetch(`${API_URL}?action=delivery_persons`).then(res => res.json());

        updateRestaurantsUI(restaurants);
        updateMenusUI(menus);
        updateDeliveryPersonsUI(deliveryPersons);
    } catch (error) {
        console.error('Error syncing data:', error);
    }
}

function updateRestaurantsUI(restaurants) {
    const restaurantList = document.getElementById('restaurant-list');
    if (restaurantList) {
        restaurantList.innerHTML = '';
        restaurants.forEach(restaurant => {
            const restaurantElement = document.createElement('div');
            restaurantElement.className = 'restaurant-item';
            restaurantElement.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>${restaurant.address}</p>
            `;
            restaurantList.appendChild(restaurantElement);
        });
    }
}

function updateMenusUI(menus) {
    const menuList = document.getElementById('menu-list');
    if (menuList) {
        menuList.innerHTML = '';
        const groupedMenus = groupMenusByRestaurant(menus);
        
        for (const [restaurantName, items] of Object.entries(groupedMenus)) {
            const restaurantMenu = document.createElement('div');
            restaurantMenu.className = 'restaurant-menu';
            restaurantMenu.innerHTML = `<h3>${restaurantName}</h3>`;
            
            const itemList = document.createElement('ul');
            items.forEach(item => {
                const menuItem = document.createElement('li');
                menuItem.textContent = `${item.item} - ${item.price} lei`;
                itemList.appendChild(menuItem);
            });
            
            restaurantMenu.appendChild(itemList);
            menuList.appendChild(restaurantMenu);
        }
    }
}

function updateDeliveryPersonsUI(deliveryPersons) {
    const deliveryPersonList = document.getElementById('delivery-person-list');
    if (deliveryPersonList) {
        deliveryPersonList.innerHTML = '';
        deliveryPersons.forEach(person => {
            if (!person.blocked && !person.paused) {
                const personElement = document.createElement('div');
                personElement.className = 'delivery-person';
                personElement.textContent = person.name;
                deliveryPersonList.appendChild(personElement);
            }
        });
    }
}

function groupMenusByRestaurant(menus) {
    return menus.reduce((acc, item) => {
        if (!acc[item.restaurant_name]) {
            acc[item.restaurant_name] = [];
        }
        acc[item.restaurant_name].push(item);
        return acc;
    }, {});
}

// Apelați syncData() la încărcarea paginii și apoi la fiecare 5 minute
window.addEventListener('load', () => {
    syncData();
    setInterval(syncData, 5 * 60 * 1000);
});
