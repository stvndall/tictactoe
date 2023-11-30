import { module, test } from 'qunit';
import { setupRenderingTest } from 'web/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | recent-games/game-entry', function (hooks) {
  setupRenderingTest(hooks);

  test('when loading as only playerX', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(
      hbs`<RecentGames::GameEntry @gameName="name" @playerX="playerX"  />`,
    );
    assert.equal(
      this.element.querySelectorAll('md-assist-chip').length,
      2,
      'should only have 2 chips',
    );
  });
  test('when loading with both players and a winner', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(
      hbs`<RecentGames::GameEntry @name="name" @playerX="playerX" @playerO="playerO" @winner="winner"  />`,
    );
    const chips = this.element.querySelectorAll('md-assist-chip');
    assert.equal(chips.length, 4, 'should have 4 chips');
    assert.equal(chips[0].label, 'name', 'should have the game name');
    assert.equal(
      chips[0].textContent.trim(),
      'Joystick',
      'Should use Joystick as the icon for the game name',
    );
    assert.equal(
      chips[1].label,
      'playerX',
      'should have playerX in second position',
    );
    assert.equal(
      chips[1].textContent.trim(),
      'person',
      'Should use person as the icon for player',
    );
    assert.equal(
      chips[2].label,
      'playerO',
      'should have playerO in third position',
    );
    assert.equal(
      chips[2].textContent.trim(),
      'person',
      'Should use person as the icon for player',
    );
    assert.equal(
      chips[3].label,
      'winner',
      'should have winning text in 4th position',
    );
    assert.equal(
      chips[3].textContent.trim(),
      'Trophy',
      'Should use Joystick as the icon for the game name',
    );
  });
});
