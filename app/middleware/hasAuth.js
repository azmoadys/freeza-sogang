let createError = require('http-errors')

exports.isLoggedIn = function(req, res, next) {
	if (req.user)
		next();
	else
		next(res.render('user/login', { formData: {}, errors: {} }));
}

exports.hasAuth = function(req, res, next) {
	if (req.user && req.user.is_admin == true) {
		console.log("Admin user [%j] approval.\n", req.user);
		next();
	}
	else
		next(createError(404, "Page does not exist."));
}

/* Is given device (how?) owned by current user? */
exports.isOwner = function(req, res, next) {

}
