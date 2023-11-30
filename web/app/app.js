import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'web/config/environment';
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button';
import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/chips/chip-set';
import '@material/web/chips/assist-chip';
import '@material/web/icon/icon';
import '@material/web/divider/divider';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
