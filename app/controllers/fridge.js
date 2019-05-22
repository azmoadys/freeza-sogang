const models = require('../models')

exports.get_ingredient_from_sensor = function(req, res) {
  // input format: { "SID": id, "weight" : inGrams }
  // TODO: add this data to the proper user and in DB.
  console.log('Got %j', req.query);
  let sensorVal;

  // TODO: find SID in DB.
  // If not present, initiate createdAt
  sensorVal = models.Fridge.build({
	  deviceId: req.query.SID,
  })
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
	res.render('fridge/register');
}

exports.register_sensor = function(req, res) {
  // userID ~ SID mapping in DB (via Ownership table)
    console.log("<<<<POST>>>>  ");
    
	console.log("got [%d]\n", req.body.SID);

	return models.Ownership.create({
		ID: req.user.id,
		SID: req.body.SID
	}).then(lead => {
		res.redirect('/');
	})

	/*
	return models.Ownership.findOne({
		where: {
			SID: req.body.SID
		}
	}).then(owns => {
		let newOwns;
		if (owns !== null) {
		} else {
			return models.Ownership.create({
				userId: req.user.id,
				SID: req.body.SID
			});
		}
	});
	*/
}
