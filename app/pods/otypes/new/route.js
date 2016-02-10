import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		const parentId = params.parent_otype_id;
		//создаем пустой для заполнения эмбер дата объект
		//return this.store.createRecord('otype', {
		//	parent: parentId
		//});
		//@guide - важно когда мы определяем динамический айди в урле - это айди этой модели, если он не меняется метод "model" не будет вызываться при похожем роутинге. Поэтому создадим темповый объект уже в методе setupController (он будет запускаться всегда)
		return this.store.findRecord('otype', parentId);
	},

	//todo @ANKU @BUG_OUT @Ember - у Эмбер проблема с темповыми чистыми объектами без id
	//Вопрос касательно создания нового темпового объекта для формы
	//Best Practice for Temporary Models in Forms
	//http://discuss.emberjs.com/t/best-practice-for-temporary-models-in-forms/6415
	//
	//понятно что использовать plainObject не подходит (так как контрол предполагает переиспользование как для создания, так и для редактирования и для просмотра, поэтому должен быть минимум Ember Data объектом).
	//
	//Вопрос лишь Record это или Ember.Object?
	//
	//Как вы делаете?
	//1) Создаете пустую record в store (что негативно сказывается на computed свойствах - приходят сообщения с пустыми элементами)
	//2) Создаете пустой Ember.Object (приходится дублировать структуру модели, копипастить аттрибуты)
	//3) Можно скопировать из модели аттрибуты в новый объект this.store.modelFor('otype').attributes
	//4) плохое решение можно использовать private метод модели MyModel._create()
	//5) Или придумали что-нибудь лучше?
	//
	//Кстати к вопросу о темп объектах при создании:
	//пишут что Yehuda Katz предлагает создавать пустые record в сторе и везде фильтровать списки на получения списка records
	//http://stackoverflow.com/questions/21344539/emberjs-cannot-clone-an-ember-object-that-does-not-implement-ember-copyable/24367742#24367742
	//Но это явно неправильно, ибо тогда вычислимые аттрибуты на изменение коллекции не работают, так как изменяется стор, а отфильтрованная коллекция не изменяется, поэтому не будет эвента
	//
	// @BUG - Но тут все равно косяк, у решения с Object проблема что сначала создается рекорд, проходят все события с пуcтым id, а только потом происходит save. То есть вычислимые проперти на основе массива с этим типом данных работают без id
	createTempObject(initialProperties) {
		//return this.store.createRecord('otype', properties);
		//return new Ember.Object(properties);
		//console.log(this.store.modelFor('otype').toJSON());
		return Ember.Object.create(Ember.merge({
			parent: null,
			name: null
		}, initialProperties));
	},
	saveTempObject(tempOtypeObject) {
		//return tempOtype
		//see http://stackoverflow.com/questions/21344539/emberjs-cannot-clone-an-ember-object-that-does-not-implement-ember-copyable/24367742#24367742
		//return this.store.createRecord('otype', tempOtypeObject)
		return this.store.createRecord('otype', Ember.merge({}, tempOtypeObject))
			.save();
	},

	setupController(controller, model) {
		const parentOtype = model,
			parentId = parentOtype.get('id');

		controller.set('tempOtype', this.createTempObject({
			parent: parentId
		}));
		controller.set('parentOtype', parentOtype);
	},

	actions: {
		createOtype(tempOtypeObject) {
			//see http://stackoverflow.com/questions/21344539/emberjs-cannot-clone-an-ember-object-that-does-not-implement-ember-copyable/24367742#24367742
			//tempOtype.save().then((otype) => {
			//this.store.createRecord('otype', tempOtype).save().then((otype) => {
			this.saveTempObject(tempOtypeObject).then((otype) => {
				//переходим на страницу созданного otype
				this.transitionTo('otypes.otype', otype);
			});
		},

		removeOtype(tempOtypeObject) {
			//ничего не делаем, так как это объект нигде не сохранен

			//просто переходим
			//todo @ANKU - сделать фильтр проверку, что если по объекту на который мы переходим нету - значит редиректить на otypes
			const parentOType = tempOtypeObject.get('parent') ? this.store.peekRecord('otype', tempOtypeObject.get('parent')) : null;
			if(parentOType) {
				//переходим на родителя если он есть
				this.transitionTo('otypes.otype', parentOType);
			} else {
				this.transitionTo('otypes');
			}
		}
	}
});
