import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RecentGames extends Component {
  @tracked completed = [];
  @tracked inProgress = [];

  @tracked loaded = false;

  shouldShowBreak = (index) => index > 0;

  constructor() {
    super(...arguments);
    fetch('http://localhost:3000/games')
      .then((response) => response.json())
      .then(({ inProgress, completed }) => {
        console.log(inProgress, completed);
        if (inProgress && inProgress.length > 0) {
          this.inProgress = inProgress;
        }
        if (completed && completed.length > 0) {
          this.completed = completed;
        }
        this.loaded = true;
      });
  }
}
