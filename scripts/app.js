import { fetchLyrics } from './lyricsAPI.js';
import { fetchArtistDetails } from './artistAPI.js';
import { displayLyrics, showError, showLoader, hideLoader, showArtistDetails } from './ui.js';
import { saveSearch, getSearches } from './storage.js';

document.getElementById('searchBtn').addEventListener('click', async () => {
  const artist = document.getElementById('artistInput').value.trim();
  const title = document.getElementById('songInput').value.trim();

  if (!artist || !title) {
    alert("Please enter both artist and song title.");
    return;
  }

  showLoader();

  try {
    const [lyrics, artistInfo] = await Promise.all([
      fetchLyrics(artist, title),
      fetchArtistDetails(artist)
    ]);

    displayLyrics(lyrics, artist, title);
    showArtistDetails(artistInfo);
    saveSearch(artist, title);
    updateRecentSearches(); // Refresh recent searches UI
  } catch (err) {
    showError("Could not fetch lyrics or artist info.");
    console.error(err); 
  } finally {
    hideLoader();
  }
});

function updateRecentSearches() {
  const container = document.getElementById('recentSearches');
  if (!container) return;

  container.innerHTML = '';
  const recent = getSearches();

  recent.forEach(({ artist, song }) => {
    const item = document.createElement('p');
    item.classList.add('search-history-item');
    item.textContent = `${artist} - ${song}`;
    item.addEventListener('click', () => {
      document.getElementById('artistInput').value = artist;
      document.getElementById('songInput').value = song;
      document.getElementById('searchBtn').click();
    });
    container.appendChild(item);
  });
}

// Load saved searches on page load
document.addEventListener('DOMContentLoaded', () => {
  updateRecentSearches();
});
