
exports.get_ingredient_from_sensor = function(req, res) {
  // input format: { "sensor_id": id, "user" : userName, "ingredient" : inGrams }
  // TODO: add this data to the proper user and in DB.
  console.log('Got %j', req.query);

}

exports.display_ingredients = function(req, res) {
	return models.Fridge.findAll().then(leads => {
		res.render('lead/leads', { title: 'Express', leads: leads });
	})
}
