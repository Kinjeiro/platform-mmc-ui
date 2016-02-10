import Ember from 'ember';
//import DS           from 'ember-data';
//import Validator    from 'npm:validator';

export default Ember.Component.extend({
	/*
	 comp properties:
	 otype - required
	 onSaveAction
	 onCancelAction
	 onRemoveAction
	 */

	//errors: DS.Error.create(),
	//
	//isNew:      Ember.computed.bool('otype.id'),
	isTemp:     Ember.computed.empty('otype.id'),
	isView:     Ember.computed.empty('onSaveAction'),
	hasCancel:  Ember.computed.notEmpty('onCancelAction'),
	hasDelete:  Ember.computed.notEmpty('onRemoveAction'),

	//@guide - 3 способа парсинга параметров в компоненте
	//1) через computed (зависимости от других данных)
	//  isNew: Ember.computed.empty('otype.id'),
	//2) или через didReceiveAttrs() {
	//	this._super(...arguments);
	//	const otype = this.get('otype');
	//	this.set('isNew', !!otype.id);
	//}
	//3) через проперти функции - старый способ
	//isNew: function() {
	//	return !!this.get('otype').id;
	//}.property()
	//@guide - func(){}.property() - ember расширил прототип Function и добавил функцию property чтобы помечать функции как проперти, чтобы их можно было из разных мест через this.get('isNew') вызывать (либо явно в темплейте использовать {{isNew}})

	actions: {
		submit() {
			if(this.validate()){
				this.sendAction('onSaveAction', this.get('otype'));
			}
		},
		cancel() {
			this.sendAction('onCancelAction', this.get('otype'));
		},
		deleteOtype() {
			this.sendAction('onRemoveAction', this.get('otype'));
		}
	},


	validate() {
		//this.set('error', DS.Errors.create());

		//todo @ANKU - validation

		//return this.get('error.isEmpty');
		return true;
	}
});
