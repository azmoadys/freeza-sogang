const models = require('../models') 
exports.get_ingredient_from_sensor = function(req, res) {
	// input format: { "SID": id, "WEIGHT": inGrams}
	// TODO: add this data to the proper user and in DB.
	console.log('Got %j', req.query);

	// TODO: find SID in DB.
	return models.Ownership.findOne({
		where: {
			deviceID: req.query.SID
		}
	}).then(owns => {
		if (owns !== null) {
			//add to DB
			return models.Device.create({
				id: 0,
				filledAt:  0,
				type: 0,
				weight: req.query.WEIGHT
			})
		}
		else {
			console.log("Unregistered device detected. [%d]", req.query.SID);
		}
	})
}

/* For what? */
exports.display_ingredients = function(req, res) {
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

			return newOwns.save();
		}
	}).catch(function(err) {
		console.log(err, req.body.SID);
	});
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

