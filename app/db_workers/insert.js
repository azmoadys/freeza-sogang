const models = require('../models');

var redis = require("redis");
var subscriber = redis.createClient();

subscriber.on("message", function (channel, message) {
	obj = JSON.parse(message);
	return models.Device.findOne({
		where: {
			id: obj.SID
		}
	}).then(device => {
		if (device == null) {
			console.log("[DB_WORKER]: Unregistered device detected. [%d]", obj.SID);
		}
		else {
			device.update({
				weight: obj.WEIGHT
			}).then(function(record) {
				var obj = record._previousDataValues;
				obj.device_id = obj.id;
				delete obj.id;

				return models.History.create(obj).then(lead => {
					console.log('[DB_WORKER] insert\n');
				}).catch(function(err) {
					console.log(err);
				});
			}).catch(function(err) {
				console.log(err);
			});
		}
	}).catch(function(err) {
		console.log(err);
	});
});

subscriber.subscribe("input_data");
