export class AnimeApiService {
  static API_URL = 'https://graphql.anilist.co';

  static MEDIA_FIELDS = `
    idMal
    status
    title { english romaji }
    coverImage { large }
    genres
  `;

  static STATUS_MAP = {
    FINISHED: 'Finished Airing',
    RELEASING: 'Currently Airing',
    NOT_YET_RELEASED: 'Not yet aired',
    CANCELLED: 'Cancelled',
    HIATUS: 'On Hiatus',
  };

  static async query(query, variables) {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) {
      throw new Error(`Anilist request failed with status ${response.status}`);
    }
    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors.map(e => e.message).join(', '));
    }

    return json.data;
  }

  static async getAnimeByName(name) {
    const search = `
    query ($search: String) {
      Page(perPage: 25) {
        media(search: $search, type: ANIME, isAdult: false, sort: SEARCH_MATCH) {
          ${this.MEDIA_FIELDS}
        }
      }
    }
    `;
    try {
      const data = await this.query(search, { search: name.trim() });
      return this.sanitizeResponse(data.Page.media);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getTopAiringAnime() {
    const topQuery = `
    query {
      Page(perPage: 25) {
        media(type: ANIME, status: RELEASING, isAdult: false, sort: POPULARITY_DESC) {
          ${this.MEDIA_FIELDS}
        }
      }
    }
    `;
    try {
      const data = await this.query(topQuery, {});
      return this.dedupeAnime(this.sanitizeResponse(data.Page.media));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static sanitizeResponse(animeList) {
    return (animeList || [])
      .filter(anime => anime?.idMal)
      .map(anime => ({
        mal_id: anime?.idMal,
        poster: anime.coverImage?.large || '',
        status: this.STATUS_MAP[anime.status] || 'Unknown',
        title: anime.title?.english || anime.title?.romaji || 'Untitled',
        genres: anime.genres || [],
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
