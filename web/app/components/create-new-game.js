import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CreateNewGameComponent extends Component {
  @tracked playerX = '';
  @action
  handleInput(event) {
    this.playerX = event.target.value;
  }

  @action
  createGame() {
    alert(`game is ${this.playerX}`);
  }
}
