export function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('lyricsSection').style.display = 'none';
    document.getElementById('errorSection').style.display = 'none';
  }
  
  export function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }
  
  export function displayLyrics(lyrics, artist, title) {
    document.getElementById('lyricsTitle').textContent = `${title} by ${artist}`;
    document.getElementById('lyricsText').textContent = lyrics;
    document.getElementById('lyricsSection').style.display = 'block';
  }
  
  export function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorSection').style.display = 'block';
  }
  
  export function showArtistDetails(artist) {
    const section = document.getElementById('artist-details');
    if (!artist) {
      section.innerHTML = '<p>No artist info found.</p>';
      return;
    }
  
    section.innerHTML = `
      <div class="artist-card">
        <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="artist-image" />
        <div class="artist-info">
          <h2>${artist.strArtist}</h2>
          <p><strong>Biography:</strong> ${artist.strBiographyEN || 'N/A'}</p>
          <p><strong>Genre:</strong> ${artist.strGenre || 'N/A'}</p>
          <p><strong>Country:</strong> ${artist.strCountry || 'N/A'}</p>
          <p><strong>Formed Year:</strong> ${artist.intFormedYear || 'N/A'}</p>
          <p><strong>Style:</strong> ${artist.strStyle || 'N/A'}</p>
          <p><strong>Website:</strong> <a href="https://${artist.strWebsite}" target="_blank">${artist.strWebsite}</a></p>
          <p><strong>Facebook:</strong> <a href="${artist.strFacebook}" target="_blank">${artist.strFacebook}</a></p>
        </div>
      </div>
    `;
  }
  