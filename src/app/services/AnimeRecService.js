export class AnimeRecService {
  static async recByTitle(animeTitle) {
    const url = `https://anime-rec-api.vercel.app/recommend/single?title=${animeTitle}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: animeTitle,
    });
    const recs = await res.json();
    return recs;
  }

  static async recByWatchlist(watchList) {
    if (!watchList) return;
    const res = await fetch('https://anime-rec-api.vercel.app/recommend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(watchList),
    });
    const recs = await res.json();
    return recs;
  }
}
