import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class GameComponent extends Component {
  @service('game-state') gameState;

  get board() {
    return this.gameState.board;
  }
}
