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

/* For what? */
exports.display_ingredient_by_time = function(req, res) {
	/* Display the data. Using a graph? */
	return models.Fridge.findAll().then(leads => {
		res.render('lead/leads', { title: 'Express', leads: leads });
	})
}

exports.get_register = function(req, res) {
	res.render('device/register');
}

exports.register_device = function(req, res) {
	// userID ~ SID mapping in DB (via Ownership table)
	console.log("Got [%d] from user.\n", req.body.SID);

	return models.Ownership.findOne({
		where: {
			deviceID: req.body.SID
		}
	}).then(owns => {
		let newOwns;
		if (owns !== null) {
			console.log('Device re-register by user.\n');
			res.redirect('/');
		}
		else  {
			console.log('Register new device %j, %j.\n', req.user.id, req.body.SID);
			newOwns = models.Ownership.build({
				userID: req.user.id,
				deviceID: req.body.SID
			});

			return newOwns.save().then(req => {
				res.redirect('/');
			});
		}
	}).catch(function(err) {
		console.log(err);
	});
}

exports.show_status = function(req, res, next) {
	return models.Ownership.findAll({
		where : {
			userID : req.user.id
		}
	}).then(owns => {
		/* OWNS is a list! */
		console.log ('found %j\n', owns);
		
		let list = [];
		var i;
		/* list of device IDs. */
		for (i = 0; i < owns.length; ++i)
			list.push(owns[i].deviceID);

		return models.Device.findAll({
			/* Solve this! */
			where : {
				id: list
			},
			/* How to get only current data? */
		}).then(devices => {
			res.render('device/status', {devices: devices});
		});
	}).catch(function(err) {
		console.log(err);
	});
}

