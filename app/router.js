import Ember        from 'ember';
import config       from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType
});

//todo @ANKU @BUG_OUT @Ember - При удалении этих папок падает ошибка компиляции
//\app\templates\.gitkeep
//\app\styles\.gitkeep
//- видимо не предусмотрели что может быть pod структура, поэтому приходится хранить там файлы gitkeep чтобы гит пустые папки не удалил

Router.map(function () {
	this.route('otypes', {path: '/otypes'}, () => {
		this.route('otype', {path: '/otypes/:otype_id'});
	});

	this.route('login');
});

export default Router;
