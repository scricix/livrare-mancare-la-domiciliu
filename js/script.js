// Exemplu de funcționalitate JavaScript de bază
document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const restaurantItems = document.querySelectorAll('.restaurant-item');

    restaurantItems.forEach(item => {
        const restaurantName = item.querySelector('h3').textContent.toLowerCase();
        if (restaurantName.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
