export async function fetchLyrics(artist, title) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (!res.ok) throw new Error("Lyrics not found.");
    const data = await res.json();
    return data.lyrics;
  }
  