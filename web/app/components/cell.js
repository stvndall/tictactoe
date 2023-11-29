import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class CellComponent extends Component {
  @service('game-state') gameState;
  @tracked cell = this.args.cell;
  @tracked ownedBy = this.cell.ownedBy;

  get className() {
    return `mdl-button mdl-js-button mdl-button--raised board-zone ${
      this.cell.isClaimed ? 'mdl-button--accent' : 'mdl-button--colored'
    }`;
  }

  @action
  tryClaim() {
    if (this.cell.isClaimed) {
      return;
    }
    this.cell.claim();
  }
}
