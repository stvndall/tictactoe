import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class JoinExistingGame extends Component {
  @service('api_helper') API;
  gameId = '';
  playerOName = '';

  @action
  handleInput(event) {
    switch (event.target.id) {
      case 'multiplayer_gameid':
        this.gameId = event.target.value;
        break;
      case 'multiplayer_player_name':
        this.playerOName = event.target.value;
        break;
      default:
        break;
    }
  }

  @action
  async joinGame() {
    if (this.gameId === '' || this.playerOName === '') {
      alert('Please enter a game id and player name');
      return;
    }
    const updateGame = await this.API.joinGame(this.gameId, this.playerOName);

    //stupid hack because I couldn't figure out how to programmatically transition to a new route
    history.pushState(null, null, `/game/${this.gameId}/O`);
    history.go(0);
    console.log(updateGame);
  }
}
