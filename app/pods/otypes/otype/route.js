import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		////@guide - по умолчанию возвращаемые данные записываются в параметр model, но чтобы явно в темплейте понимать с чем работаешь - лучше обозначить именной переменной
		//return Ember.RSVP.hash({
		//	otype: this.store.findRecord('otype', params.otype_id)
		//});
		return this.store.findRecord('otype', params.otype_id);
	}
});
