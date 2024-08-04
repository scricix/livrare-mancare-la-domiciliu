const API_URL = 'http://your-domain.com/api.php';

const cmsAPI = {
    getRestaurants: async () => {
        const response = await fetch(`${API_URL}?action=restaurants`);
        return await response.json();
    },
    getMenus: async () => {
        const response = await fetch(`${API_URL}?action=menus`);
        return await response.json();
    },
    getDeliveryPersons: async () => {
        const response = await fetch(`${API_URL}?action=delivery_persons`);
        return await response.json();
    },
    getOrders: async () => {
        const response = await fetch(`${API_URL}?action=orders`);
        return await response.json();
    },
    addRestaurant: async (name, address) => {
        const response = await fetch(`${API_URL}?action=restaurant`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address })
        });
        return await response.json();
    },
    updateRestaurant: async (id, name, address) => {
        const response = await fetch(`${API_URL}?action=restaurant`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, address })
        });
        return await response.json();
    },
    deleteRestaurant: async (id) => {
        const response = await fetch(`${API_URL}?action=restaurant&id=${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    addMenu: async (restaurant_id, item, price) => {
        const response = await fetch(`${API_URL}?action=menu`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_id, item, price })
        });
        return await response.json();
    },
    updateMenu: async (id, item, price) => {
        const response = await fetch(`${API_URL}?action=menu`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, item, price })
        });
        return await response.json();
    },
    deleteMenu: async (id) => {
        const response = await fetch(`${API_URL}?action=menu&id=${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    addDeliveryPerson: async (name) => {
        const response = await fetch(`${API_URL}?action=delivery_person`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        return await response.json();
    },
    updateDeliveryPerson: async (id, name, blocked, paused) => {
        const response = await fetch(`${API_URL}?action=delivery_person`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, blocked, paused })
        });
        return await response.json();
    },
    deleteDeliveryPerson: async (id) => {
        const response = await fetch(`${API_URL}?action=delivery_person&id=${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    },
    addOrder: async (restaurant_id, delivery_person_id, details) => {
        const response = await fetch(`${API_URL}?action=order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_id, delivery_person_id, details })
        });
        return await response.json();
    },
    deleteOrder: async (id) => {
        const response = await fetch(`${API_URL}?action=order&id=${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
};
