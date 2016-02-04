import Ember from 'ember';

export default Ember.Component.extend({
	username: null,
	password: null,

	actions: {
		login (username, password) {
			this.sendAction('onLogin', username, password);
		}
	}
});


