import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class GameComponent extends Component {
  @service('game-state') gameState;

  @action
  startNew() {
    this.gameState.startNew();
  }
}
