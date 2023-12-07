import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class CellComponent extends Component {
  @tracked cell = this.args.cell;
  @tracked ownedBy = this.cell.ownedBy;

  @action
  tryClaim() {
    if (this.cell.isClaimed) {
      return;
    }
    this.cell.claim();
  }
}
