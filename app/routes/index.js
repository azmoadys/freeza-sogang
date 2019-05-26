var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user');
let device = require('../controllers/device');

let {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js')

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);

router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/leads', hasAuth, landing.show_leads);
router.get('/lead/:lead_id', hasAuth, landing.show_lead);
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead);
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead);
router.post('/lead/:lead_id/delete', hasAuth, landing.delete_lead);
router.post('/lead/:lead_id/delete-json', hasAuth, landing.delete_lead_json)
router.get('/about', landing.get_about);

/* How to distinguish users? */
router.get('/get_data/', device.get_ingredient_from_sensor);

/* register. */
router.get('/register_sensor', isLoggedIn, device.get_register);
router.post('/register_sensor', isLoggedIn, device.register_device);

router.get('/view_device', isLoggedIn, device.show_status);
module.exports = router;
