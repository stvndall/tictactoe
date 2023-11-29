import { module, test } from 'qunit';
import { setupRenderingTest } from 'web/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | create-new-game', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CreateNewGame />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CreateNewGame>
        template block text
      </CreateNewGame>
    `);

    assert.dom().hasText('template block text');
  });
});
