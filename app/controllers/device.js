const models = require('../models');

var redis = require('redis');
var publisher = redis.createClient();

/* Recieves sensor data via web. */
exports.get_ingredient_from_sensor = function(req, res) {
	publisher.publish("input_data", JSON.stringify(req.query), function(){
		console.log('published %j\n', req.query);
	});

	res.end('Got' + JSON.stringify(req.query));
}

exports.get_register = function(req, res) {
	res.render('device/register');
}

exports.register_device = function(req, res) {
	console.log("Got [%d] from user.\n", req.body.SID);

	return models.Device.findOne({
		where: {
			id: req.body.SID
		}
	}).then(device => {
		/* Initialize Device info. */
		if (device == null) {
			return models.Device.create({
				id: req.body.SID,
				user_id: req.user.id,
				type: req.body.TYPE,
				weight: 0.0
			}).then(res.redirect('/'));
		}
		else {
			console.log('Device re-register by user.\n');
			res.redirect('/');
		}
	}).catch(function(err) {
		console.log(err);
	});
}

/* Shows device status. */
exports.show_status = function(req, res, next) {
	return models.Device.findAll({
		where: {
			user_id: req.user.id
		}
	}).then(devices => {
		res.render('device/status', {devices: devices});
	}).catch(function(err) {
		console.log(err);
	});
}

/* For what? */
exports.display_device_history = function(req, res) {
	/* Display the data. Using a graph? */
	return models.Fridge.findAll().then(leads => {
		res.render('lead/leads', { title: 'Express', leads: leads });
	})
}


