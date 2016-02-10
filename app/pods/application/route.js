import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),

	//@guide - варианты подключения через DI
	//1 variant: - частное подключение
	//session: Ember.inject.service('session'),
	//use: this.get('session').get('isLoggedIn')
	//2 variant - для всех
	//this.session set by DI for all routes - see \app\initializers\session.js
	//use: this.session.get('isLoggedIn')

	beforeModel (transition) {
		const isAuthenticated = this.get('session').get('isAuthenticated');
		if (!isAuthenticated) {
			if(transition.targetName !== 'login') {
				this.get('session').set('attemptedTransition', transition);
			}
			this.transitionTo('login');
		}
	},

	setupController(controller, model) {
		controller.set('session', this.get('session'));
		controller.set('pageTitle', null);
	},

	actions: {
		authenticateSuccess() {
			const transition = this.get('session').get('attemptedTransition');
			if (transition) {
				this.get('session').set('attemptedTransition', null);
				transition.retry();
			} else {
				this.transitionTo('home');
			}
		},

		invalidateSession() {
			this.get('session').invalidate()
				.then(() => {
					this.transitionTo('login');
				});
		},

		updatePageTitle: function(title){
			this.controllerFor('application').set('pageTitle', title);
		}
	}
});