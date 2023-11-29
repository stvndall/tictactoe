import { module, test } from 'qunit';
import { setupTest } from 'web/tests/helpers';

module('Unit | Route | multiplayer-game', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:multiplayer-game');
    assert.ok(route);
  });
});
