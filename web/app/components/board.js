import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class BoardComponent extends Component {
  @service('game-state') gameState;

  get board() {
    debugger;
    let board = this.gameState.board;
    debugger;
    return board;
  }

  @action
  handleClaim(row, col) {
    this.gameState.takeTurn(row, col);
  }
}
