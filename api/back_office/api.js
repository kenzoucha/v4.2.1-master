var express = require('express');
var passport = require('passport');

var router = express.Router();

require('./categories')(router);
require('./subsCategories')(router);
require('./products')(router);
require('./fournisseurs')(router);
require('./users')(router);
require('./auth/auth')(router,passport);
module.exports = router;




