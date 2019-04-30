var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');

/* GET home page. Responds with res.render(). */
router.get('/', landing.get_landing);


/* POST data to server. Server updates the data and responds by res.redirect(). */
router.post('/', landing.submit_lead);
module.exports = router;
