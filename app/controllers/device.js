const models = require('../models')

exports.get_ingredient_from_sensor = function(req, res) {
	// input format: { "SID": id, "WEIGHT_0": inGrams, "WEIGHT_1": inGrams }
	// TODO: add this data to the proper user and in DB.
	console.log('Got %j', req.query);
	let sensorVal;

	// TODO: find SID in DB.
	// If not present, initiate createdAt
	// find the recent SID in DB, compare. 
	// If sensorVal has larger weight, add createdAt
	// Otherwise, just add updatedAt.

	// Add it to DB.
}

exports.display_ingredients = function(req, res) {
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
		if (owns !== null) {
			console.log('Device re-register by user.\n');
			res.redirect('/');
		}
		else 
			return models.Ownership.create({
				userID: req.user.id,
				deviceID: req.body.SID
			}).then(lead => {
				res.redirect('/');
			})
	})
}

exports.show_status = function(req, res, next) {
	return models.Ownership.findAll({
		where : {
			userID : req.user.id
		}
	}).then(owns => {
		console.log ('found %j\n', owns);
		return models.Device.findAll({
			/* Solve this! */
			where : {
				id: owns[0].deviceID
			}
		}).then(devices => {
			res.render('device/status', {devices: devices});
		});
	});
}

