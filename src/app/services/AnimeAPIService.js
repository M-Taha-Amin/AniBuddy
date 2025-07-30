export class AnimeApiService {
  static BASE_URL = 'https://api.jikan.moe/v4/';

  static async getAnimeByName(name) {
    const sanitizedName = encodeURIComponent(name.toLowerCase());
    try {
      const response = await fetch(
        this.BASE_URL + `anime?sfw=true&q=${sanitizedName}`
      );
      const data = await response.json();
      return this.sanitizeResponse(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getTopAiringAnime() {
    try {
      const response = await fetch(
        this.BASE_URL + 'top/anime?sfw=true&filter=airing'
      );
      const data = await response.json();
      return this.dedupeAnime(this.sanitizeResponse(data));
    } catch (error) {
      console.log(error);
    }
  }

  static sanitizeResponse(responseObject) {
    return responseObject.data.map(anime => ({
      mal_id: anime?.mal_id,
      poster: anime.images?.jpg?.image_url || '',
      status: anime.status || 'Unknown',
      title: anime.title || 'Untitled',
      genres: anime.genres?.map(g => g.name) || [],
    }));
  }

  static dedupeAnime(animeList) {
    const seen = new Set();
    return animeList.filter(anime => {
      if (seen.has(anime.mal_id)) return false;
      seen.add(anime.mal_id);
      return true;
    });
  }
}
