let models = require('../models');
let validator = requre('validator');

const validateCreateUserFields = function(errors, req) {
    if (!validator.isEmail(req.body.email)) {
        errors["email"] = "Please use a valid email.";
    }
    if (!validator.isAscii(req.body.password)) {
        errors["password"] = "Invalid characters in password.";
    }
    if (!validator.isLength(req.body.password, {min: 8, max: 25})) {
        errors["password"] = "Please ensure that you password has minimum of 8 characters to maximum of 25 characters.";
    }
}

exports.validateUser = function(errors, req) {
    return new Promise(function(resolve, reject) {
        validateCreateUserFields(errors, req);
        return models.user.findOne({
            where: {
                email: req.body.email
            }
        }).then(u => {
            if (u != null) {
                errors["email"] = "Email is already in use. Please login or reset your password.";
            }
            resolve(errors);

        })
    })
}
