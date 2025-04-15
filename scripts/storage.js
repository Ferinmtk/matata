// storage.js

const STORAGE_KEY = 'matataRecentSearches';

// Save search to localStorage
export function saveSearch(artist, song) {
  const newEntry = { artist, song };
  let searches = getSearches();

  // Prevent duplicates
  searches = searches.filter(entry => entry.artist !== artist || entry.song !== song);
  searches.unshift(newEntry); // Add to the top
  if (searches.length > 5) searches.pop(); // Keep only 5 most recent

  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
}

// Retrieve saved searches
export function getSearches() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Clear saved searches
export function clearSearches() {
  localStorage.removeItem(STORAGE_KEY);
}
