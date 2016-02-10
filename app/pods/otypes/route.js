import Ember from 'ember';


////https://www.jstree.com/docs/json/
//const treeObject = [{
//	"text": "root",
//	"children": [
//		{
//			"text": "New node",
//			"children": false,
//			"id": "New node",
//			"type": "file",
//			"icon": "file file-ew node"
//		}, {
//			"text": "New node 2",
//			"children": true,
//			"id": "New node 2", "icon": "folder"
//		}, {
//			"text": "New node 4",
//			"children": true,
//			"id": "New node 4",
//			"icon": "folder"
//		}],
//	"id": "\/",
//	"icon": "folder",
//	"state": {
//		"opened": true,
//		"disabled": true
//	}
//}];
//
//const treeObjectAlternative = [
//	{ "id" : 1, "parent" : "#", "text" : "Root OT" },
//	{ "id" : 2, "parent" : 1,   "text" : "OT 1" },
//	{ "id" : 3, "parent" : 1,   "text" : "OT 2" }
//];

export default Ember.Route.extend({
	model (params) {
		//debugger;
		//return this.store.findAll('otype').then(otypes => otypes.filter(otype => !!otype.get('id')));
		return this.store.findAll('otype');
	},

	setupController(controller, model) {
		controller.set('otypes', this.store.peekAll('otype'));
		this.send('updatePageTitle', 'Object Types');
		this._super(controller, model);
	},

	actions: {
		selectOtype(otype) {
			this.transitionTo('otypes.otype', otype);
		},

		//bubling
		//createOtype(otype) {
		//},

		//@guide - action ищется в контроллере, потом в роутере, потом в родительском роуторе. Поэтому чтобы не копипастить в "new" и "otype" (onRemoveAction=removeOtype) роутере вынесем этот экшен выше в родительский роутер otypes
		removeOtype(otype) {
			otype.destroyRecord().then((otype) => {
				const parentOType = otype.get('parent') ? this.store.peekRecord('otype', otype.get('parent')) : null;
				if(parentOType) {
					//переходим на родителя если он есть
					this.transitionTo('otypes.otype', parentOType);
				} else {
					this.transitionTo('otypes');
				}
			});
		}
	}
});
