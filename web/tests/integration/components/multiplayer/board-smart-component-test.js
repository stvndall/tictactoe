import { module, test } from 'qunit';
import { setupRenderingTest } from 'web/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | multiplayer/board-smart-component',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Multiplayer::BoardSmartComponent />`);

      assert.dom().hasText('');

      // Template block usage:
      await render(hbs`
      <Multiplayer::BoardSmartComponent>
        template block text
      </Multiplayer::BoardSmartComponent>
    `);

      assert.dom().hasText('template block text');
    });
  },
);
