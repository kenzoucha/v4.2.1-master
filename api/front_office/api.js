var express = require('express');
var passport = require('passport');

var router = express.Router();

require(appRoot +'/api/front_office/auth/auth')(router,passport);
module.exports = router;




