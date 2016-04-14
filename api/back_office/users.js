var User = require('../models/User');
var nodemailer = require('nodemailer');

module.exports = function(router) {
    router
        .route('/user')
        .get(function (req, res) {
            User
                .find()
                .where('role').equals('user')
                .exec(function (error, users) {
                    res.send(200,users)
                });
        });
    router
        .param('id', function (req, res, next) {
            req.dbQuery = {id: req.params.id};
            next();
        })
        .route('/user/:id')
        .put(function (req, res) {
            console.log(req.dbQuery);
            User
                .findById(req.dbQuery.id)
                .exec(function (error, user) {
                    if(!user){
                        return res.send(404,{status: 'error', message: 'utilisateur non trouver'});
                    }
                    user.activated = true;
                    user.save(function(error, u){
                        var transporter = nodemailer.createTransport({
                            port: 1025,
                            ignoreTLS: true
                        });

                        var mailOptions = {
                            from: '"Kenza" <kenza@gmail.com>',
                            to: u.email,
                            subject: 'Activation Compte ',
                            text: 'Votre compte a bien été activé ',
                            html: '<b>Votre compte a bien été activé</b> <a href="http://localhost:3000/front/#/login">cliquez ici</a>'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        });
                        return res.send(200, {status: 'success', message: 'le compte a bien été activé', user: u});
                    })
                });
        })

    router
        .get('/getUsers', function(req, res){
            User
                .find()
                .where('activated').equals(false)
                .exec(function (error, users) {
                    res.send(200,users.length);
                });
          //  res.send({'count': req.isAuthenticated()});
        })

}