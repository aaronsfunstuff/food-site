document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    const messageDiv = document.getElementById('form-message');
    const searchInput = document.getElementById('search');
    const dictionaryList = document.getElementById('dictionary-list');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    const dishes = [
        { name: 'Sushi', description: 'Vinegared rice paired with fresh fish, vegetables, or other ingredients, showcasing the art of Japanese culinary tradition.' },
        { name: 'Ramen', description: 'A comforting noodle soup with a savory broth, complemented by tender noodles and a variety of toppings.' },
        { name: 'Tempura', description: 'Lightly battered and deep-fried seafood or vegetables, highlighting the delicate balance of texture and flavor.' },
        { name: 'Udon', description: 'Thick wheat noodles served in a hot broth with various toppings such as tempura or vegetables.' },
        { name: 'Takoyaki', description: 'Ball-shaped savory snacks made with batter and octopus, topped with a variety of sauces and bonito flakes.' },
        { name: 'Yakitori', description: 'Grilled chicken skewers seasoned with salt or a savory sauce, often enjoyed as a popular street food.' },
        { name: 'Miso Soup', description: 'A traditional Japanese soup made with miso paste, dashi stock, and often containing tofu, seaweed, and green onions.' },
        { name: 'Okonomiyaki', description: 'A savory pancake filled with a variety of ingredients, such as cabbage, meat, and seafood, topped with a tangy sauce.' }
    ];

    const itemsPerPage = 3;
    let currentPage = 1;

    function renderDictionaryItems(items) {
        dictionaryList.innerHTML = '';
        items.forEach(dish => {
            const item = document.createElement('div');
            item.classList.add('dictionary-item');
            item.innerHTML = `<h3>${dish.name}</h3><p>${dish.description}</p>`;
            dictionaryList.appendChild(item);
        });
    }

    function updatePagination() {
        const totalPages = Math.ceil(dishes.length / itemsPerPage);
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        pageInfo.textContent = `Page ${currentPage}`;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, dishes.length);
        renderDictionaryItems(dishes.slice(startIndex, endIndex));
    }

    updatePagination();

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(query));
        renderDictionaryItems(filteredDishes);
        currentPage = 1;
        prevPageBtn.disabled = true;
        nextPageBtn.disabled = filteredDishes.length <= itemsPerPage;
        pageInfo.textContent = `Page 1`;
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
