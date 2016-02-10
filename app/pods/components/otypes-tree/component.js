import Ember        from 'ember';
//import EmberIdxTree from 'npm:ember-idx-tree';

export default Ember.Component.extend({
	/*
		comp properties:
			otypes - required
			onSelectOtypeAction
	*/

	//плагин, сохраннение всех состояний в localStorage
	stateOptions: {
		"key" : "otypes-tree-storage"
	},

	otypeNameChanged: Ember.observer('otypes.@each.name', function() {
		this.get('otypes').forEach(otype => {
			if(otype.get('id')) {
				this.sendCommandToTree('renameNode', otype.get('id'), otype.get('name'));
			}
		});
	}),
	otypeArrayChanged: Ember.observer('otypes.[]', function() {
		//@ANKU @HACK - нужно запустить это событие после того как произойдет save метод для записи, чтобы ей передался id. Потом мы просто создадим свое дерево на ember-data
		//Ember.run.scheduleOnce('afterRender', this, this.updateTreeData);
		Ember.run.later(this, this.updateTreeData, 500);
	}),
	//fullNameChanged5: Ember.observer('hasChanges', function() {
	//	debugger;
	//}),


	//пустой объект, который потом наполнит ember обертка над jsTree и можно будет посылать команды jsTree
	jstreeActionReceiver: {},

	sendCommandToTree(command, ...args) {
		//see https://www.npmjs.com/package/ember-cli-jstree#supported-actions
		const receiver = this.get('jstreeActionReceiver');
		receiver.send(command, ...args);
	},


	////@guide - по умолчанию отслеживается изменения только кол-ва элементов в массави, чтобы задать отслеживание изменений в самих объектах, нужно указать @each
	////но @each нужно указать явное поле, а у нас изменения могут быть в любых полях
	//
	// при изменении имени обновляем данные дерева
	// !!! не подходит так как меняается даже при создании темпового пустого элемента в хранилище
	//treeData: Ember.computed('otypes.@each.name', function() {
	//	return this._convertToJsTree(this.get('otypes'));
	//}),
	//treeData: Ember.computed('otypes.[]', function() {
	//	return this._convertToJsTree(this.get('otypes'));
	//}),
	//treeData: Ember.computed.map('otypes', function(otype, index) {
	//	console.log('CHANGE');
	//	return {
	//		id:     otype.get('id'),
	//		parent: otype.get('parent') || '#',
	//		text:   otype.get('name')
	//	};
	//}),

	//@guide - жизненный цикл компонента https://guides.emberjs.com/v2.2.0/components/the-component-lifecycle/
	///**
	// * @override
	// */
	didReceiveAttrs() {
		this._super(...arguments);
		this.updateTreeData();
	},




	updateTreeData() {
		const otypes = this.get('otypes');
		//конвертим ember-data array в данные, которые понимает jsTree
		this.set('treeData', this._convertToJsTree(otypes));
	},

	_convertToJsTree(otypes) {
		let treeData = [];
		otypes.forEach(otype => {
			if(otype.get('id')) {
				treeData.push({
					id: otype.get('id'),
					parent: otype.get('parent') || '#',
					text: otype.get('name')
				});
			}
		});

		return treeData;
	},


	actions: {
		selectTreeNode(treeNode) {
			const otypeId = treeNode.id;
			const otype = this.get('otypes').findBy('id', otypeId);
			this.sendAction('onSelectOtypeAction', otype);
		}
	}
});

