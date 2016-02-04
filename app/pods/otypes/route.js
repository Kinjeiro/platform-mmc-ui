import Ember from 'ember';

export default Ember.Route.extend({
	model () {
	    return this.store.findAll('otype').then((otypes) => {
		    return otypes;
	    });
	}
});
