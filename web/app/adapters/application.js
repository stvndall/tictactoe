import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'web/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.APP.API_HOST;
  namespace = '';
}
