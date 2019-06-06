const models = require('../models');

var redis = require("redis");
var redisClient = redis.createClient();

redisClient.on("message", function (channel, message) {
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

				/* Add to device history. */
				return models.History.create(obj).then(history => {
					console.log('[DB_WORKER] insert:');
					console.log(history.dataValues);

					/* Publish not working. Why? */
					redisClient.publish("inserted_data", JSON.stringify(history.dataValues), function(){
						console.log('... & published');
					});
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

redisClient.subscribe("input_data");
