import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class RecentGames extends Component {
  @tracked completed = [];
  @tracked inProgress = [];
  @tracked loaded = false;
  @service('api_helper') API;

  constructor() {
    super(...arguments);
    this.API.fetchRecentGames().then(({ inProgress, completed }) => {
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
