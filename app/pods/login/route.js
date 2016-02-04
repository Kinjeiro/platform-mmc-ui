import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		login (username, password) {

			//todo @ANKU - добавить проверку валидации auth
			this.session.set('user', { username });

			const transition = this.session.get('attemptedTransition');
			if (transition) {
				this.session.set('attemptedTransition', null);
				transition.retry();
			} else {
				this.transitionTo('/');
			}
		}
	}
});
