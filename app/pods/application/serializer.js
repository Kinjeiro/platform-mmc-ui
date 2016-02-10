import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	//@guide - по REST спецификации для PUT методов id объекта передается через параметры, а в body его не должно быть
	////почему-то по умолчания для update запросов id не посылается
	//serialize: function(record, options) {
	//	options = options ? options : {};
	//	options.includeId = true;
	//	return this._super.apply(this, [record, options]); // Call the parent serializer
	//}
});
