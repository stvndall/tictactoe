import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CellComponent extends Component {
  get isClaimed() {
    return this.args.detail.ownedBy !== '';
  }

  get className() {
    return `mdl-button mdl-js-button mdl-button--raised board-zone ${
      this.isClaimed ? 'mdl-button--accent' : 'mdl-button--colored'
    }`;
  }

  @action
  click(item) {
    console.log(item);
    if (this.isClaimed) {
      return;
    }
    this.args.detail.claim('O');
  }
}
