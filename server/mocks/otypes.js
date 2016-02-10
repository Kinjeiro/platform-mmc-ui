var DBClass = function(data) {
	this.data = data;
};
DBClass.prototype.findAll = function() {
	return this.data;
};
DBClass.prototype.findById = function(id) {
	return this.data.find(function(dataItem) {
		return dataItem.id === id;
	});
};
DBClass.prototype.generateId = function() {
	return (new Date()).getTime();
};
DBClass.prototype.create = function(item) {
	item.id = this.generateId();
	this.data.push(item);
	return item;
};
DBClass.prototype.update = function(id, itemAttrs) {
	var dataItem = this.findById(id);
	//merge
	for(var attr in itemAttrs) {
		if (itemAttrs.hasOwnProperty(attr)) {
			dataItem[attr] = itemAttrs[attr];
		}
	}
	return dataItem;
};
DBClass.prototype.remove = function(itemId) {
	var dataItem = 0;
	for(var i=0; i<this.data.length;i++)
		if(this.data[i].id === itemId) {
			dataItem = this.data[i];
			this.data.splice(i, 1);
			break;
		}
	return dataItem;
};



/*jshint node:true*/
module.exports = function (app) {
	var express = require('express');
	var otypesRouter = express.Router();

	var otypeDB = new DBClass([
		{"id": 1, "parent": "#", "name": "Root OT id1"},
		{"id": 2, "parent": 1, "name": "OT1_2 id2"},
		{"id": 3, "parent": 2, "name": "OT2_3 id3"},
		{"id": 4, "parent": 1, "name": "OT1_4 id4"}
	]);

	//LIST
	otypesRouter.get('/', function (req, res) {
		res.send({
			'otypes': otypeDB.findAll()
		});
	});

	//GET
	otypesRouter.get('/:id', function (req, res) {
		var id = parseInt(req.params.id);
		res.send({
			'otypes': otypeDB.findById(id)
		});
	});

	//CREATE
	otypesRouter.post('/', function (req, res) {
		var otype = req.body.otype;
		res.send({
			'otypes': otypeDB.create(otype)
		});
	});

	//UPDATE
	otypesRouter.put('/:id', function (req, res) {
		var id = parseInt(req.params.id),
			otype = req.body.otype;
		res.send({
			'otypes': otypeDB.update(id, otype)
			//'otypes': otype
		});
	});

	//REMOVE
	otypesRouter.delete('/:id', function (req, res) {
		var id = parseInt(req.params.id);
		res.send({
			'otypes': otypeDB.remove(id)
		});
	});

	// The POST and PUT call will not contain a request body
	// because the body-parser is not included by default.
	// To use req.body, run:

	//    npm install --save-dev body-parser

	// After installing, you need to `use` the body-parser for
	// this mock uncommenting the following line:
	//
	//app.use('/api/otypes', require('body-parser').json());
	app.use('/api/otypes', otypesRouter);
};
