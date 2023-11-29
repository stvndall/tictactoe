import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MultiplayerLandingComponent extends Component {
  @tracked newGame = '';
  @action
  createGame() {
    alert(`game is ${this.newGame}`);
  }

  @action
  handleNewGameInput(event) {
    this.newGame = event.target.value;
  }
}
