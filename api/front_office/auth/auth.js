var User = require(appRoot + '/api/models/User');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

module.exports = function(router,passport) {
    router
        .use(bodyParser.urlencoded({extended: false}))
        .post('/login',function (req, res) {
            passport.authenticate('local-login-front', function(err, user, info){
                if(!user) {
                    return res.send(401,{status: 401, message: 'Impossible de se connecter'});
                }
                else{
                    req.logIn(user, function(err){
                        if(err){
                            return res.send({status: 'error', message: 'Impossible de se connecter'});
                        }
                        return res.send({status: 'success', message: 'Vous ete bien connecté'});
                    });
                }
            })(req,res);
    });
    router
        .post('/register', function (req, res) {
                passport.authenticate('local-register-front', function(err, user, info){
                    if(!user) {
                        return res.send({status: 'info', title: 'Information', message: 'Ce compte existe deja'});
                    }
                    else{
                        return res.send({status: 'success', title: 'Inscription', message: 'Vous ete bien inscrit . L\' activiation est prevu dans 24 heures'});
                    }
                })(req,res);
         });
    router
        .get('/session', function(req, res){
            if(req.isAuthenticated()){
                return res.send(200,{user: req.user});
            }else{
                res.send(401, {status: 401, message: 'vous ete pas connecter pour accèder a cette page'});
            }
        })
    router
        .get('/logout', function(req, res){
            if(req.isAuthenticated()){
                req.logOut();
                return res.send({status: 'success', message: 'déconnexion avec succès'});
            }
            return;
        })
    router
        .get('/sendMail', function(req, res){
        })
}