import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class BoardComponent extends Component {
  @service('game-state') gameState;

  @action
  handleClaim(row, col) {
    this.gameState.takeTurn(row, col);
  }
}
