import Ember from 'ember';

const AUTHENTICATOR = 'authenticator:jwt';

export default Ember.Component.extend({
	//attrs:
	// onLogin
	session: Ember.inject.service(), //equals to: session: Ember.inject.service('session')

	actions: {
		authenticate() {
			let credentials = this.getProperties('identification', 'password');
			this.get('session').authenticate(AUTHENTICATOR, credentials)
				.then(this.sendAction.bind(this, 'onLogin'))
				.catch((reason) => {
					this.set('errorMessage', reason.error || reason);
				});
		}
	}
});


