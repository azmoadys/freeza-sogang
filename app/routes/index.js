var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user');

/* GET home page. Responds with res.render(). */
router.get('/', landing.get_landing);
router.get('/leads', landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);
router.get('/lead/:lead_id/edit', landing.show_edit_lead);

router.get('/contact', landing.get_contact);

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);

router.get('/logout', user.logout);

/* POST data to server. Server updates the data and responds by res.redirect(). */
router.post('/', landing.submit_lead);
router.post('/lead/:lead_id/edit', landing.edit_lead);
router.post('/lead/:lead_id/delete', landing.delete_lead);

router.post('/login', user.login);
router.post('/signup', user.signup);

router.post('/logout', user.logout);
module.exports = router;
