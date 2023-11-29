import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class JoinExistingGame extends Component {
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
    const updateGame = await fetch(
      `http://localhost:3000/games/${this.gameId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerO: this.playerOName,
        }),
      },
    ).then((response) => response.json());
    //stupid hack because I couldn't figure out how to programmatically transition to a new route
    history.pushState(null, null, `/game/${this.gameId}/O`);
    history.go(0);
    console.log(updateGame);
  }
}
