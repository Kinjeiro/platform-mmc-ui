import DS           from 'ember-data';
import config       from './../../config/environment';

export default DS.RESTAdapter.extend({
  namespace: config.SERVER_API_NAMESPACE
});
