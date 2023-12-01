import Service from '@ember/service';
import ENV from 'web/config/environment';

// this needs to exist in a better place. I don't have a location because ideally this should be an adaptor which I haven't fully figured out.
class ApiWrapper {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }
  async fetchFromApi(path, options) {
    const url = `${this.BASE_URL}/${path}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  async post(path, body) {
    return await this.fetchFromApi(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  async patch(path, body) {
    return await this.fetchFromApi(path, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  async get(path) {
    return await this.fetchFromApi(path);
  }

  async delete(path) {
    return await this.fetchFromApi(path, {
      method: 'DELETE',
    });
  }
}

export default class ApiHelperService extends Service {
  constructor() {
    super(...arguments);
    this.api = new ApiWrapper(ENV.API_HOST);
  }
  async joinGame(gameId, playerOName) {
    return await this.api.patch(`/games/${gameId}`, {
      playerO: playerOName,
    });
  }

  async fetchRecentGames() {
    return await this.api.get('/games');
  }
  async createGame(gameName, playerXName) {
    return await this.api.post('/games', {
      name: gameName,
      playerX: playerXName,
    });
  }
}
