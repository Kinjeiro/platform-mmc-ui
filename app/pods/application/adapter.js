import DS           from 'ember-data';
import config       from './../../config/environment';

//@guide - RESTAdapter - стандартный json rest, по умолчанию > 2.3 стоит JSONAPIAdapter с новым jsonapi протоколом
export default DS.RESTAdapter.extend({
	namespace: config.platformMmc.SERVER_API_NAMESPACE

	//serialize: function (record, options) {
	//	options = options ? options : {}; // handle the case where options is undefined
	//	options.includeId = true;
	//	return this._super.apply(this, [record, options]); // Call the parent serializer
	//}
});
