import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class CellComponent extends Component {
  @service('game-state') gameState;
  @tracked cell = this.gameState.getCellReference(
    this.args.row,
    this.args.column,
  );
  @tracked isClaimed = this.cell.isClaimed;
  @tracked ownedBy = this.cell.ownedBy;

  @computed('cell.isClaimed')
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
