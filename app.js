// Sample product data
const products = [
    { id: 1, name: "iPhone 13 Pro", category: "electronics", price: 999, rating: 4.8, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000" },
    { id: 2, name: "MacBook Air M1", category: "electronics", price: 999, rating: 4.7, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1633027804000" },
    { id: 3, name: "AirPods Pro", category: "electronics", price: 249, rating: 4.6, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000" },
    { id: 4, name: "Men's Casual Shirt", category: "clothing", price: 29.99, rating: 4.2, image: "https://m.media-amazon.com/images/I/61+Q6Rh+O4L._AC_UX679_.jpg" },
    { id: 5, name: "Women's Running Shoes", category: "clothing", price: 79.99, rating: 4.5, image: "https://m.media-amazon.com/images/I/71Kk9+2g6EL._AC_UX679_.jpg" },
    { id: 6, name: "Non-Stick Cookware Set", category: "home", price: 129.99, rating: 4.4, image: "https://m.media-amazon.com/images/I/81vJyb43URL._AC_SL1500_.jpg" },
    { id: 7, name: "Smart LED Bulb", category: "home", price: 19.99, rating: 4.1, image: "https://m.media-amazon.com/images/I/61H4qGHQO0L._AC_SL1500_.jpg" },
    { id: 8, name: "JavaScript: The Definitive Guide", category: "books", price: 34.99, rating: 4.7, image: "https://m.media-amazon.com/images/I/91hU6K6qP6L._AC_UL640_FMwebp_QL65_.jpg" },
    { id: 9, name: "Samsung Galaxy S22", category: "electronics", price: 799, rating: 4.6, image: "https://images.samsung.com/us/smartphones/galaxy-s22/images/galaxy-s22-share-image.jpg" },
    { id: 10, name: "Wireless Charging Pad", category: "electronics", price: 29.99, rating: 3.9, image: "https://m.media-amazon.com/images/I/61+Q6Rh+O4L._AC_UX679_.jpg" },
    { id: 11, name: "Cotton Bed Sheets", category: "home", price: 49.99, rating: 4.3, image: "https://m.media-amazon.com/images/I/91hU6K6qP6L._AC_UL640_FMwebp_QL65_.jpg" },
    { id: 12, name: "Coffee Table Book: World Travel", category: "books", price: 45.00, rating: 4.5, image: "https://m.media-amazon.com/images/I/81vJyb43URL._AC_SL1500_.jpg" }
];

// DOM elements
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchResults = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');
const loadingSpinner = document.getElementById('loadingSpinner');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const suggestionItems = document.querySelectorAll('.suggestion-item');

// Display all products initially
displayProducts(products);

// Event listeners
searchInput.addEventListener('input', handleSearch);
clearSearch.addEventListener('click', clearSearchInput);
categoryFilter.addEventListener('change', handleFilterAndSort);
sortBy.addEventListener('change', handleFilterAndSort);

// Add click event to suggestion items
suggestionItems.forEach(item => {
    item.addEventListener('click', () => {
        searchInput.value = item.textContent;
        handleSearch();
        searchSuggestions.classList.add('hidden');
    });
});

// Show/hide search suggestions
searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim() === '') {
        searchSuggestions.classList.remove('hidden');
    }
});

document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.add('hidden');
    }
});

// Search function
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Show/hide clear button
    if (searchTerm.length > 0) {
        clearSearch.classList.remove('hidden');
        searchSuggestions.classList.add('hidden');
    } else {
        clearSearch.classList.add('hidden');
        searchSuggestions.classList.remove('hidden');
    }

    // Trigger filter and sort
    handleFilterAndSort();
}

// Clear search input
function clearSearchInput() {
    searchInput.value = '';
    clearSearch.classList.add('hidden');
    searchSuggestions.classList.remove('hidden');
    handleFilterAndSort();
    searchInput.focus();
}

// Filter and sort products
function handleFilterAndSort() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortOption = sortBy.value;

    // Show loading spinner
    loadingSpinner.classList.remove('hidden');
    searchResults.innerHTML = '';
    noResults.classList.add('hidden');

    // Simulate API delay
    setTimeout(() => {
        let filteredProducts = [...products];

        // Filter by search term
        if (searchTerm.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product =>
                product.category === selectedCategory
            );
        }

        // Sort products
        switch (sortOption) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default sorting (by ID or whatever)
                filteredProducts.sort((a, b) => a.id - b.id);
        }

        // Display results
        displayProducts(filteredProducts);

        // Hide loading spinner
        loadingSpinner.classList.add('hidden');

        // Show no results message if empty
        if (filteredProducts.length === 0) {
            noResults.classList.remove('hidden');
        }
    }, 500); // Simulate network delay
}

// Display products in the UI
function displayProducts(productsToDisplay) {
    searchResults.innerHTML = '';

    if (productsToDisplay.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl';
        productCard.innerHTML = `
                    <div class="h-48 bg-gray-100 flex items-center justify-center p-4">
                        <img src="${product.image}" alt="${product.name}" class="max-h-full max-w-full object-contain">
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-semibold text-lg text-gray-800 truncate">${product.name}</h3>
                            <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">${product.category}</span>
                        </div>
                        <div class="flex items-center mb-2">
                            <div class="flex text-yellow-400">
                                ${renderRatingStars(product.rating)}
                            </div>
                            <span class="text-gray-600 text-sm ml-1">(${product.rating})</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
                            <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
        searchResults.appendChild(productCard);
    });
}

// Helper function to render rating stars
function renderRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }

    return stars;
}