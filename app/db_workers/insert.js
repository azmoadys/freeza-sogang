const models = require('../models');

var redis = require("redis");
var subscriber = redis.createClient();

subscriber.on("message", function (channel, message) {
	console.log("Message: " + message + " on channel: " + channel + " is arrive!");
	
	obj = JSON.parse(message);

	return models.Ownership.findOne({
		where: {
			deviceID: obj.SID
		}
	}).then(owns => {
		if (owns !== null) {
			//add to DB
			console.log("[DB_WORKER]: insert success!\n");
			return models.Device.create({
				id: obj.SID,
				filledAt: Date.now(),
				type: 0,
				weight: obj.WEIGHT
			})
		}
		else {
			console.log("Unregistered device detected. [%d]", req.query.SID);
			res.end('Unregistered Device');
		}
	}).catch(function(err) {
		console.log(err);
	});

});
subscriber.subscribe("input_data");
