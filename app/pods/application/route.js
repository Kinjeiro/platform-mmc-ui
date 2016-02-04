import Ember from 'ember';

export default Ember.Route.extend({
	//@guide - варианты подключения через DI
	//1 variant: - частное подключение
	//session: Ember.inject.service('session'),
	//use: this.get('session').get('isLoggedIn')
	//2 variant - для всех
	//this.session set by DI for all routes - see \app\initializers\session.js
	//use: this.session.get('isLoggedIn')

	beforeModel (transition) {
		//const sessionService = this.get('session');
		const isLoggedIn = this.session.get('isLoggedIn');
		//const isLoggedIn = sessionService.get('isLoggedIn');

		if (!isLoggedIn) {
			//sessionService.set('attemptedTransition', transition);
			if(transition.targetName !== 'login') {
				this.session.set('attemptedTransition', transition);
			}
			this.transitionTo('login');
		}
	}
});