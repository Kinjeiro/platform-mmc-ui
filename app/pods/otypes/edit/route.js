import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.store.findRecord('otype', params.otype_id);
	},

	actions: {
		updateOtype(otype) {
			otype.save().then((otype) => {
				//переходим на страницу обновленного otype без режима редактирования
				this.transitionTo('otypes.otype', otype);
			});
		},
		cancelUpdateOtype(otype) {
			otype.rollbackAttributes();
			this.transitionTo('otypes.otype', otype);
		}
	}
});
