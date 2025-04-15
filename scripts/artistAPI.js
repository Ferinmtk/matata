export async function fetchArtistDetails(artistName) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
  const targetUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artistName}`;

  try {
    // Fetch artist details using the proxy to bypass CORS issues
    const res = await fetch(proxyUrl + targetUrl);

    // Check if the response is okay
    if (!res.ok) {
      throw new Error('Error fetching artist details');
    }

    const data = await res.json();

    // If data is available and artist exists
    if (data.artists && data.artists.length > 0) {
      const artist = data.artists[0]; // Get first artist's details

      // Extract relevant details from the JSON response
      const artistInfo = {
        name: artist.strArtist,
        label: artist.strLabel,
        genre: artist.strGenre,
        mood: artist.strMood,
        biography: artist.strBiographyEN || "Biography not available.",
        website: artist.strWebsite || "No website available.",
        socialLinks: {
          facebook: artist.strFacebook || "No Facebook available.",
          twitter: artist.strTwitter || "No Twitter available."
        },
        formedYear: artist.intFormedYear,
      };

      // Update HTML with the artist's details
      document.getElementById("artistName").innerText = artistInfo.name;
      document.getElementById("artistLabel").innerText = `Label: ${artistInfo.label}`;
      document.getElementById("artistGenre").innerText = `Genre: ${artistInfo.genre}`;
      document.getElementById("artistMood").innerText = `Mood: ${artistInfo.mood}`;
      document.getElementById("artistBiography").innerText = artistInfo.biography;
      document.getElementById("formedYear").innerText = `Formed: ${artistInfo.formedYear}`;

      // Display social media links if available
      document.getElementById("facebookLink").innerText = artistInfo.socialLinks.facebook;
      document.getElementById("twitterLink").innerText = artistInfo.socialLinks.twitter;

    } else {
      console.log("Artist not found");
    }

  } catch (err) {
    console.error("Error:", err);
    // Optionally update the UI to inform the user
    document.getElementById("errorMessage").innerText = "Failed to load artist details. Please try again later.";
  }
}

// Example usage: Call the function to fetch details of an artist
fetchArtistDetails("Coldplay");
