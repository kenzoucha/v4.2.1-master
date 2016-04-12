var LocalStrategy = require('passport-local').Strategy;
var User         = require(appRoot + '/api/models/User');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        return done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        return User.findById(id, function(err, user){
            return done(null, user);
        });
    });
    passport.use('local-register-front', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
            User.findOne({$and: [{$or : [{'username': username},{'email': req.body.email}]},{'role': 'user'}]})
                .exec(function(err, user){
                    if(err){
                        return done(err);
                    }
                    if(user){
                        return done(null,false);
                    }else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.email = req.body.email;

                        newUser.save(function (err, user) {
                            if (err) {
                                throw err;
                            }
                            return done(null, user);
                        });
                    }
                });
    }));
    passport.use('local-login-front', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    }, function (req, username, password, done) {
        User.findOne({$and : [{$or : [{'username': username},{'email': username}]},{'role': 'user'},{'activated': true}]})
            .exec(function(err,user){
                if(err){
                    return done(err);
                }
                if(!user){
                    return done(null, false);
                }
                if(!user.validPassword(password)){
                    return done(null, false);
                }
                return done(null, {id: user._id});
            });
    }));
};

