var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');

/* GET home page. Responds with res.render(). */
router.get('/', landing.get_landing);
router.get('/leads', landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);
router.get('/lead/:lead_id/edit', landing.show_edit_lead);

router.get('/contact', landing.get_contact);


/* POST data to server. Server updates the data and responds by res.redirect(). */
router.post('/', landing.submit_lead);
router.post('/lead/:lead_id/edit', landing.edit_lead);
router.post('/lead/:lead_id/delete', landing.delete_lead);
module.exports = router;
