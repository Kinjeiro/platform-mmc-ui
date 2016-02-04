import Ember from 'ember';

export default Ember.Service.extend({
	//todo @ANKU - сделать на основе плагина для сессии - http://stackoverflow.com/questions/30872684/ember-simple-auth-injecting-current-user-into-every-route
	//user: null,
	//todo @ANKU @OFF - отключил пока проверку сессии
	user: "Test User",
	attemptedTransition: null,

	isLoggedIn: Ember.computed.notEmpty('user')
});
