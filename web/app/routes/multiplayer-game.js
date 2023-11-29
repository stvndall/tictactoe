import Route from '@ember/routing/route';

export default class MultiplayerGameRoute extends Route {
  model(params) {
    return {
      gameId: params.id,
      player: params.player,
    };
  }
}
