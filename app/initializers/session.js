export function initialize(application) {
	//@guide - для всех роутов под параметров сессии будет пихнут объект фактори service найденный по адрессу - \app\services\session.js
	application.inject('route', 'session', 'service:session');
}

export default {
  name: 'session',
  initialize
};
