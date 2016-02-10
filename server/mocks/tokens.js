/*jshint node:true*/


module.exports = function (app) {
	var express = require('express');
	var tokensRouter = express.Router();
	var jwt = require('jsonwebtoken');

	var ADMIN = {
		username: 'test',
		password: 'test'
	};

	tokensRouter.post('/', function (req, res) {
		var username = req.body.username,
			password = req.body.password;


		if (username === ADMIN.username && password === ADMIN.password) {
			var payload = {
					username: username
				},
				secretKey = 'secretKey';
			var token = jwt.sign(payload, secretKey);
			res.send({
				username: username,
				token: token
			});
		} else {
			res.status(401).send("Неправильный логин или пароль. Для тестирование введите test\\test.");
		}
	});

	app.use('/api/tokens', tokensRouter);
};
