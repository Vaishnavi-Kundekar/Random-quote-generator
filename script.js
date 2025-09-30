// Quotes Database
const quotes = [
    // Motivation
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "motivation" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
    
    // Life
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "life" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "life" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "life" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll", category: "life" },
    
    // Success
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett", category: "success" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },
    { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr.", category: "success" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "success" },
    { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon", category: "success" },
    
    // Wisdom
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom" },
    { text: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare", category: "wisdom" },
    { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", category: "wisdom" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom" },
    
    // Happiness
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "happiness" },
    { text: "The most important thing is to enjoy your life—to be happy—it's all that matters.", author: "Audrey Hepburn", category: "happiness" },
    { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi", category: "happiness" },
    { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", category: "happiness" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle", category: "happiness" },
    
    // More quotes
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "motivation" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "motivation" }
];

// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteCategory = document.getElementById('quote-category');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtn = document.getElementById('copy-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const shareBtn = document.getElementById('share-btn');
const categorySelect = document.getElementById('category-select');
const favoritesContainer = document.getElementById('favorites-container');
const clearFavoritesBtn = document.getElementById('clear-favorites');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Current quote
let currentQuote = null;

// Favorites array
let favorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

// Event Listeners
newQuoteBtn.addEventListener('click', generateQuote);
copyBtn.addEventListener('click', copyQuote);
favoriteBtn.addEventListener('click', toggleFavorite);
shareBtn.addEventListener('click', shareQuote);
categorySelect.addEventListener('change', generateQuote);
clearFavoritesBtn.addEventListener('click', clearFavorites);

// Initialize
displayFavorites();
generateQuote();

// Generate Random Quote
function generateQuote() {
    const selectedCategory = categorySelect.value;
    
    // Filter quotes by category
    let filteredQuotes = quotes;
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex];
    
    // Animate quote change
    animateQuoteChange();
    
    // Display quote
    quoteText.textContent = currentQuote.text;
    quoteAuthor.innerHTML = `<span>- ${currentQuote.author}</span>`;
    quoteCategory.innerHTML = `<span class="category-badge">${currentQuote.category}</span>`;
    
    // Update favorite button state
    updateFavoriteButton();
}

// Animate Quote Change
function animateQuoteChange() {
    const container = document.getElementById('quote-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

// Copy Quote to Clipboard
function copyQuote() {
    const quoteString = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    navigator.clipboard.writeText(quoteString).then(() => {
        showToast('Quote copied to clipboard!', 'success');
    }).catch(err => {
        showToast('Failed to copy quote', 'error');
    });
}

// Toggle Favorite
function toggleFavorite() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const index = favorites.findIndex(fav => `${fav.text}-${fav.author}` === quoteId);
    
    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        showToast('Removed from favorites', 'info');
    } else {
        // Add to favorites
        favorites.push(currentQuote);
        showToast('Added to favorites!', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    
    // Update UI
    updateFavoriteButton();
    displayFavorites();
}

// Update Favorite Button State
function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const isFavorite = favorites.some(fav => `${fav.text}-${fav.author}` === quoteId);
    
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.querySelector('i').classList.remove('far');
        favoriteBtn.querySelector('i').classList.add('fas');
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.querySelector('i').classList.remove('fas');
        favoriteBtn.querySelector('i').classList.add('far');
    }
}

// Share Quote on Twitter
function shareQuote() {
    if (!currentQuote) return;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(currentQuote.text)}" - ${encodeURIComponent(currentQuote.author)}`;
    window.open(twitterUrl, '_blank');
}

// Display Favorites
function displayFavorites() {
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p class="no-favorites">No favorite quotes yet. Add some by clicking the heart button!</p>';
        return;
    }
    
    favoritesContainer.innerHTML = '';
    
    favorites.forEach((quote, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <button class="remove-favorite" onclick="removeFavorite(${index})">
                <i class="fas fa-times"></i>
            </button>
            <p class="favorite-quote">"${quote.text}"</p>
            <p class="favorite-author">- ${quote.author}</p>
        `;
        favoritesContainer.appendChild(favoriteItem);
    });
}

// Remove Favorite
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    displayFavorites();
    updateFavoriteButton();
    showToast('Quote removed from favorites', 'info');
}

// Clear All Favorites
function clearFavorites() {
    if (favorites.length === 0) {
        showToast('No favorites to clear', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
        displayFavorites();
        updateFavoriteButton();
        showToast('All favorites cleared', 'info');
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // Change toast color based on type
    if (type === 'success') {
        toast.style.background = '#10b981';
    } else if (type === 'error') {
        toast.style.background = '#ef4444';
    } else if (type === 'info') {
        toast.style.background = '#3b82f6';
    }
    
    // Show toast
    toast.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Space or Enter to generate new quote
    if (e.code === 'Space' || e.code === 'Enter') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
            e.preventDefault();
            generateQuote();
        }
    }
    
    // Ctrl/Cmd + C to copy quote
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (e.target.tagName !== 'INPUT') {
            e.preventDefault();
            copyQuote();
        }
    }
    
    // Ctrl/Cmd + F to favorite
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        toggleFavorite();
    }
});

// Auto-generate quote on page load
window.addEventListener('load', () => {
    console.log('Quote Generator Loaded!');
    console.log(`Total Quotes: ${quotes.length}`);
    console.log('Keyboard Shortcuts: Space/Enter = New Quote, Ctrl+C = Copy, Ctrl+F = Favorite');
});