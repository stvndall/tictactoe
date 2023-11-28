import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class BoardComponent extends Component {
  @service('game-state') gameState;

  @tracked board = this.gameState.board;

  @action
  startNew() {
    this.gameState.startNew();
    this.board = this.gameState.board;
  }
}
