import Ember from 'ember';

export default Ember.Controller.extend({
	//Application Controller has:
	// currentRouteName
	// currentPath
	isLoginRoute: Ember.computed.equal('currentRouteName', 'login')
});
