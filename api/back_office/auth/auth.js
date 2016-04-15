var Admin = require(appRoot + '/api/models/Admin');
var bodyParser = require('body-parser');

module.exports = function(router,passport) {
    router
        .use(bodyParser.urlencoded({extended: false}))
        .post('/login',function (req, res) {
            passport.authenticate('local-login-back', function(err, admin, info){
                if(!admin) {
                    return res.send({status: 'error', message: 'impossible de se connecter'});
                }
                else{
                    req.logIn(admin, function(err){
                        if(err){
                            return res.send({status: 'error', message: 'impossible de se connecter'});
                        }
                        console.log(req.session);
                        return res.send({status: 'success', message: 'vous ete connecté', admin: req.user});
                    })
                }
            })(req,res);
    });
    router
        .use(bodyParser.urlencoded({extended: false}))
        .post('/signup', passport.authenticate('local-signup-back'), function (req, res) {
         });
    router
        .get('/session', function(req, res){
            //console.log(req);
            res.send({'auth': req.isAuthenticated()});
        })
    router
        .get('/logout', function(req, res){
            if(req.isAuthenticated()){
                req.logOut();
                return res.send({status: 'success', message: 'déconnexion avec succès'});
            }
            return;
        })

}