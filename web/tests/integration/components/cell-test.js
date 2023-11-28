import { module, skip } from 'qunit';
import { setupRenderingTest } from 'web/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | cell', function (hooks) {
  setupRenderingTest(hooks);

  skip('it renders ', async function (assert) {
    await render(hbs`<Cell />`);

    assert.dom().hasText('');
  });
});
