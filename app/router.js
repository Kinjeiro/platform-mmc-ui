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
	this.route('login');

	this.route('home', {path: '/'});

    //resetNamespace: true
    this.route('otypes', function() {
	    this.route('otype', {path: ':otype_id'});
	    this.route('new',   {path: ':parent_otype_id/new'});
        this.route('edit',  {path: ':otype_id/edit'});
    });
});

export default Router;
