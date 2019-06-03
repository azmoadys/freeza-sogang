/* TODO: notify the user via Telegram.
 * Information needed - ????
 * */

const models = require('../models');

var redis = require("redis");
var redisClient = redis.createClient();

redisClient.on("message", function (channel, message) {
	obj = JSON.parse(message);

	/* TODO 
	 * 1. obj = { SID: int, WEIGHT: float }
	 * 2. If weight is near to zero, user should be notified.
	 * 3. If this function is not invoked in a critical timing
	 *    (i.e. 6:00 ~ 6:30), just reserve a message ..?
	 * 4. How are we going to send messages at a specific time?
	 */

});

redisClient.subscribe("input_data");

