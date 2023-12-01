import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class CreateNewGameComponent extends Component {
  @service('api_helper') API;
  @tracked playerX = '';
  @tracked gameName = '';

  @action
  handleInput(event) {
    switch (event.target.id) {
      case 'multiplayer_gameName':
        this.gameName = event.target.value;
        break;
      case 'multiplayer_playerXName':
        this.playerX = event.target.value;
        break;
      default:
        break;
    }
  }

  @action
  async createGame() {
    if (this.playerX === '' || this.gameName === '') {
      alert(
        `Please enter a game name and player name - ${this.gameName} ${this.playerX}`,
      );
      return;
    }
    const reply = await this.API.createGame(this.gameName, this.playerX);
    //stupid hack because I couldn't figure out how to programmatically transition to a new route
    history.pushState(null, null, `/game/${reply.id}/X`);
    history.go(0);
  }
}
